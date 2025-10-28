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

- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Custom CSS** - Retro terminal styling with CRT scanline effects

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

## Usage

1. Open your browser to `http://localhost:5173/`
2. View current system status in the top banner
3. Scroll down to browse alert history
4. Use filters to narrow down alerts
5. Click any row to view detailed information
6. Press ESC or click "CLOSE" to dismiss detail modal

## API

The application fetches data from the ASX system status API:
```
https://mcw59b7dl3hk0mnrsr49zd4b7jby.pub.sfmc-content.com/tezwp3l1olh?a=historyAll
```

Data refreshes automatically every 120 seconds (configurable in `src/App.jsx`).

## Project Structure

```
asx-system-status-alerter/
├── src/
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
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

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
