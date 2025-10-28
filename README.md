# ASX System Status Alerter

A retro terminal-style web application for monitoring Australian Securities Exchange (ASX) system status alerts in real-time.

## Features

- **Real-time Status Monitoring**: Dashboard view showing current status of all ASX systems
- **Visual Alert System**: Color-coded status indicators with retro terminal aesthetics
  - Green: Normal operation
  - Yellow: Informational alerts
  - Orange: Partial service
  - Red: System offline
- **Auto-refresh**: Automatically fetches latest data every 2 minutes
- **Manual Refresh**: Click refresh button or press F5 to update immediately
- **Alert History**: Complete searchable history of all system alerts
- **Advanced Filtering**: Search and filter by:
  - Status type (normal, informational, partial, offline)
  - System (ASX Trade, ASX24, Supporting Services)
  - Date range
  - Text search (title, system, description)
- **Detailed Alert View**: Click any alert to view full details including:
  - Complete description (with HTML formatting)
  - Associated documents and links
  - Start and end times
  - System affected

## Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Custom CSS** - Retro terminal styling with CRT scanline effects

### Backend
- **Express** - Node.js web framework
- **CORS** - Cross-origin resource sharing middleware
- **node-fetch** - Fetch API for Node.js

## Installation

```bash
# Install dependencies
npm install
```

## Development

The application requires both frontend and backend servers to run:

```bash
# Option 1: Run both servers concurrently (recommended)
npm run dev:all

# Option 2: Run servers separately (in different terminals)
# Terminal 1 - Backend server (runs on port 3001)
npm run server

# Terminal 2 - Frontend dev server (runs on port 5173)
npm run dev
```

**Important:** The backend server must be running for the application to fetch data from the ASX API. The backend acts as a proxy to avoid CORS issues.

## Production Build

```bash
# Build frontend for production
npm run build

# Preview production build (frontend only)
npm preview

# For production deployment:
# 1. Build the frontend: npm run build
# 2. Deploy the 'dist' folder as static files
# 3. Deploy the backend server separately (server/ folder)
# 4. Update API_URL in src/utils/alertHelpers.js to point to your production backend
```

## Usage

1. Start both servers using `npm run dev:all`
2. Open your browser to `http://localhost:5173/`
3. View current system status in the top banner
4. Scroll down to browse alert history
5. Use filters to narrow down alerts
6. Click any row to view detailed information
7. Press ESC or click "CLOSE" to dismiss detail modal

## API Architecture

The application uses a client-server architecture:

```
Browser (localhost:5173)
    ↓ /api/alerts
Vite Proxy
    ↓
Backend Server (localhost:3001)
    ↓
ASX API (https://mcw59b7dl3hk0mnrsr49zd4b7jby.pub.sfmc-content.com/...)
```

The backend proxy solves CORS issues and provides a foundation for future features like RSS feeds and email notifications.

Data refreshes automatically every 120 seconds (configurable in `src/App.jsx`).

## Project Structure

```
asx-system-status-alerter/
├── src/                          # Frontend source code
│   ├── components/
│   │   ├── AlertDetails.jsx      # Modal for detailed alert view
│   │   ├── AlertHistory.jsx      # Alert history table with filtering
│   │   ├── SearchFilters.jsx     # Search and filter controls
│   │   ├── StatusBanner.jsx      # Current status dashboard
│   │   └── TerminalLoader.jsx    # Loading animation
│   ├── hooks/
│   │   └── useAlertData.js       # Data fetching with auto-refresh
│   ├── utils/
│   │   └── alertHelpers.js       # Helper functions and constants
│   ├── styles/
│   │   └── terminal.css          # Retro terminal styling
│   ├── App.jsx                   # Main application component
│   └── main.jsx                  # Application entry point
├── server/                       # Backend server
│   ├── routes/
│   │   ├── alerts.js             # Alert proxy endpoint
│   │   ├── rss.js                # RSS feed (placeholder for future)
│   │   └── notifications.js      # Email notifications (placeholder)
│   └── index.js                  # Express server entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## RSS Feed

The application provides an RSS 2.0 feed of ASX system status alerts that can be subscribed to in any RSS reader.

### RSS Endpoint

```
GET /api/rss
```

### Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `system` | string | Filter by specific ASX system | `ASX Trade` |
| `status` | string | Filter by status type | `informational`, `partial`, `offline`, `normal` |
| `limit` | number | Maximum number of alerts to return (default: 50) | `20` |

### Examples

**All alerts (default 50 most recent):**
```
https://yourdomain.com/api/rss
```

**ASX Trade alerts only:**
```
https://yourdomain.com/api/rss?system=ASX%20Trade
```

**Only informational and partial status alerts:**
```
https://yourdomain.com/api/rss?status=informational
```

**Last 10 CHESS alerts:**
```
https://yourdomain.com/api/rss?system=CHESS&limit=10
```

### Feed Features

- **RSS 2.0 format** - Compatible with all RSS readers
- **Rich metadata** - Includes system, status, start/close times
- **HTML descriptions** - Full alert details with formatting
- **Categories** - Alerts tagged by system and status for filtering
- **Custom namespace** - Additional ASX-specific fields (`asx:system`, `asx:status`, etc.)
- **TTL: 10 minutes** - Feed cached for 10 minutes for performance

### Using with RSS Readers

Add the feed URL to your favorite RSS reader:
- Feedly
- Inoreader
- NewsBlur
- Apple Mail
- Thunderbird
- Any RSS/Atom reader

### Development Usage

```bash
# Development server
http://localhost:3001/api/rss

# With filters
http://localhost:3001/api/rss?system=ASX%20Trade&limit=10
```

## Future Features (Planned)

### Email Notifications (`/api/subscribe`, `/api/unsubscribe`)
- Subscribe to alerts for specific systems
- Filter by status types (only critical alerts)
- Configurable notification frequency (instant, daily digest)
- Email confirmation and unsubscribe links
- Background job to monitor changes and send notifications

See `server/routes/notifications.js` for planned architecture.

## Styling

The application features a retro terminal aesthetic inspired by old banking systems:
- Monospace fonts (Courier New)
- Green-on-black color scheme
- CRT scanline effects
- ASCII art borders and headers
- Blinking cursors and status indicators
- Terminal-style buttons and inputs

## Browser Support

Works on all modern browsers supporting ES6+ and CSS Grid:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Deployment to Coolify

This application is ready for deployment to Coolify with a single Docker container that serves both the frontend and backend.

### Prerequisites

1. Coolify instance running and accessible
2. GitHub repository with your code
3. (Optional) Custom domain pointed to your Coolify server

### Deployment Steps

#### 1. Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit: ASX System Status Alerter"
git remote add origin <your-github-repo-url>
git push -u origin main
```

#### 2. Create New Project in Coolify

1. Log into your Coolify dashboard
2. Click **+ New Resource** > **Public Repository**
3. Select **GitHub** as the source
4. Enter your repository URL
5. Set **Branch** to `main` (or your default branch)

#### 3. Configure Build Settings

Coolify will auto-detect the Dockerfile. Verify these settings:

- **Build Pack**: Dockerfile
- **Dockerfile Location**: `./Dockerfile` (default)
- **Port**: `3000` (automatically set from Dockerfile EXPOSE)

#### 4. Set Environment Variables (Optional)

In the Coolify service settings, add:

```
NODE_ENV=production
PORT=3000
```

Note: Coolify automatically sets PORT, so this is usually not needed.

#### 5. Configure Domain

**Option A: Use Coolify Subdomain**
- Coolify will provide a subdomain automatically (e.g., `https://abc123.yourdomain.com`)

**Option B: Use Custom Domain**
1. In Coolify service settings, go to **Domains**
2. Add your custom domain (e.g., `asx-status.yourdomain.com`)
3. Ensure your DNS A record points to your Coolify server IP
4. Coolify will automatically provision SSL certificate via Let's Encrypt

#### 6. Deploy

1. Click **Deploy** button in Coolify
2. Monitor the build logs
3. Build process:
   - Stage 1: Build frontend with Vite
   - Stage 2: Copy production files and dependencies
   - Start production server serving static files + API

#### 7. Verify Deployment

Once deployed, visit your domain and verify:
- Frontend loads correctly
- Status banner shows system statuses
- Alert history displays data
- Filters work properly
- Check `/health` endpoint returns `{"status":"ok"}`

### Architecture in Production

```
Internet
    ↓
Coolify (Reverse Proxy + SSL)
    ↓
Docker Container (Port 3000)
    ├─ Express Server
    │   ├─ /api/alerts → ASX API proxy
    │   ├─ /api/rss (future)
    │   ├─ /api/subscribe (future)
    │   └─ Static files from /dist
    └─ Built React Frontend
```

### Troubleshooting

**Build fails:**
- Check Coolify build logs for errors
- Ensure all files are committed to Git
- Verify Dockerfile syntax

**App not loading:**
- Check if container is running: Coolify > Service > Logs
- Verify PORT environment variable
- Check health endpoint: `https://yourdomain.com/health`

**API not working:**
- Check backend logs in Coolify
- Ensure ASX API is accessible from your server
- Verify firewall allows outbound HTTPS

### Updating the Application

1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update: description"
   git push
   ```
3. In Coolify, click **Redeploy** or enable **Auto Deploy** for automatic updates on push

### Monitoring

- **Health Check**: Built-in Docker health check monitors `/health` endpoint
- **Logs**: View real-time logs in Coolify dashboard
- **Metrics**: Coolify provides CPU, memory, and network usage metrics

## License

This project is provided as-is for monitoring ASX system status.

## Development

Built with Claude Code - Anthropic's AI-powered development assistant.
