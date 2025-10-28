// ASX System Status Alerter - Backend Server
import express from 'express';
import cors from 'cors';
import { getAlerts } from './routes/alerts.js';
import { getRssFeed } from './routes/rss.js';
import { subscribe, unsubscribe, getSubscriptions } from './routes/notifications.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Alert endpoints
app.get('/api/alerts', getAlerts);

// RSS feed endpoint (placeholder)
app.get('/api/rss', getRssFeed);

// Email notification endpoints (placeholders)
app.post('/api/subscribe', subscribe);
app.post('/api/unsubscribe', unsubscribe);
app.get('/api/subscriptions', getSubscriptions);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'ASX System Status Alerter API',
    version: '1.0.0',
    endpoints: {
      alerts: {
        path: '/api/alerts',
        method: 'GET',
        description: 'Get all ASX system status alerts',
        status: 'active'
      },
      rss: {
        path: '/api/rss',
        method: 'GET',
        description: 'RSS feed of alerts',
        status: 'planned'
      },
      subscribe: {
        path: '/api/subscribe',
        method: 'POST',
        description: 'Subscribe to email notifications',
        status: 'planned'
      },
      unsubscribe: {
        path: '/api/unsubscribe',
        method: 'POST',
        description: 'Unsubscribe from notifications',
        status: 'planned'
      },
      subscriptions: {
        path: '/api/subscriptions',
        method: 'GET',
        description: 'Get user subscriptions',
        status: 'planned'
      }
    }
  });
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
app.listen(PORT, () => {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║   ASX SYSTEM STATUS ALERTER - BACKEND SERVER v1.0       ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API endpoint: http://localhost:${PORT}/api/alerts`);
  console.log('');
  console.log('Active endpoints:');
  console.log('  ✓ GET  /api/alerts         - Fetch ASX alerts');
  console.log('');
  console.log('Planned endpoints:');
  console.log('  ○ GET  /api/rss            - RSS feed');
  console.log('  ○ POST /api/subscribe      - Email subscription');
  console.log('  ○ POST /api/unsubscribe    - Unsubscribe');
  console.log('  ○ GET  /api/subscriptions  - Manage subscriptions');
  console.log('');
});

export default app;
