# Multi-stage build for ASX System Status Alerter

# Stage 1: Build the frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the frontend
RUN npm run build

# Stage 2: Production runtime
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy server code
COPY server ./server

# Copy built frontend from builder stage
COPY --from=frontend-builder /app/dist ./dist

# Expose port (Coolify will set this via PORT env var)
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the production server
CMD ["node", "server/production.js"]
