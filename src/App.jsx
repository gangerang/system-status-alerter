import React from 'react';
import { useAlertData } from './hooks/useAlertData';
import StatusBanner from './components/StatusBanner';
import AlertHistory from './components/AlertHistory';
import TerminalLoader from './components/TerminalLoader';

const App = () => {
  const { alerts, loading, error, lastUpdated, refresh } = useAlertData(120000); // Auto-refresh every 2 minutes

  const formatLastUpdated = (date) => {
    if (!date) return 'NEVER';
    return date.toLocaleTimeString('en-AU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  if (loading && alerts.length === 0) {
    return <TerminalLoader />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <pre className="app-title">
{`
   ╔═══════════════════════════════════════════════════════════════════════════╗
   ║                                                                           ║
   ║     █████╗ ███████╗██╗  ██╗    ███████╗██╗   ██╗███████╗████████╗███████╗║
   ║    ██╔══██╗██╔════╝╚██╗██╔╝    ██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝║
   ║    ███████║███████╗ ╚███╔╝     ███████╗ ╚████╔╝ ███████╗   ██║   ███████╗║
   ║    ██╔══██║╚════██║ ██╔██╗     ╚════██║  ╚██╔╝  ╚════██║   ██║   ╚════██║║
   ║    ██║  ██║███████║██╔╝ ██╗    ███████║   ██║   ███████║   ██║   ███████║║
   ║    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝║
   ║                                                                           ║
   ║                    STATUS MONITORING TERMINAL v1.0                        ║
   ║                    AUSTRALIAN SECURITIES EXCHANGE                         ║
   ║                                                                           ║
   ╚═══════════════════════════════════════════════════════════════════════════╝
`}
        </pre>
      </header>

      <div className="app-controls">
        <div className="control-left">
          <span className="status-text">
            LAST UPDATE: <span className="highlight">{formatLastUpdated(lastUpdated)}</span>
          </span>
          {loading && <span className="loading-indicator"> [UPDATING<span className="blink">...</span>]</span>}
        </div>
        <div className="control-right">
          <button
            className="terminal-button refresh-button"
            onClick={refresh}
            disabled={loading}
          >
            {loading ? '[UPDATING...]' : '[F5] REFRESH'}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <pre>
{`╔═══════════════════════════════════════════════════════════════════════════════╗
║ ERROR: FAILED TO RETRIEVE DATA - ${error.padEnd(44, ' ')}║
╚═══════════════════════════════════════════════════════════════════════════════╝`}
          </pre>
        </div>
      )}

      <main className="app-main">
        <StatusBanner alerts={alerts} />
        <AlertHistory alerts={alerts} />
      </main>

      <footer className="app-footer">
        <pre>
{`┌───────────────────────────────────────────────────────────────────────────────┐
│ ASX SYSTEM STATUS MONITOR │ CONNECTED │ AUTO-REFRESH: ENABLED (120s)         │
└───────────────────────────────────────────────────────────────────────────────┘`}
        </pre>
      </footer>
    </div>
  );
};

export default App;
