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

## Future Features (Planned)

The backend architecture is designed to support:

### RSS Feed (`/api/rss`)
- Generate RSS 2.0 or Atom feeds
- Filter by system or status type
- Configurable feed length
- Subscribe via RSS readers

### Email Notifications (`/api/subscribe`, `/api/unsubscribe`)
- Subscribe to alerts for specific systems
- Filter by status types (only critical alerts)
- Configurable notification frequency (instant, daily digest)
- Email confirmation and unsubscribe links
- Background job to monitor changes and send notifications

See placeholder implementations in `server/routes/` for detailed architecture plans.

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

## License

This project is provided as-is for monitoring ASX system status.

## Development

Built with Claude Code - Anthropic's AI-powered development assistant.
