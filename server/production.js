// ASX System Status Alerter - Production Server
// Serves both the built frontend and API endpoints
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAlerts } from './routes/alerts.js';
import { getRssFeed } from './routes/rss.js';
import { subscribe, unsubscribe, getSubscriptions } from './routes/notifications.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes (must be before static file serving)
app.get('/api/alerts', getAlerts);
app.get('/api/rss', getRssFeed);
app.post('/api/subscribe', subscribe);
app.post('/api/unsubscribe', unsubscribe);
app.get('/api/subscriptions', getSubscriptions);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Serve static files from the Vite build
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// SPA fallback - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║   ASX SYSTEM STATUS ALERTER - PRODUCTION SERVER         ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log('');
  console.log('API endpoints:');
  console.log('  ✓ GET  /api/alerts         - Fetch ASX alerts');
  console.log('  ○ GET  /api/rss            - RSS feed (planned)');
  console.log('  ○ POST /api/subscribe      - Email subscription (planned)');
  console.log('  ○ POST /api/unsubscribe    - Unsubscribe (planned)');
  console.log('  ○ GET  /api/subscriptions  - Manage subscriptions (planned)');
  console.log('');
  console.log('Serving static frontend from /dist');
  console.log('');
});

export default app;
