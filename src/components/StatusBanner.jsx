import React from 'react';
import { getSystemStatuses, getStatusText, STATUS_TYPES, hasActiveIssues } from '../utils/alertHelpers';

const StatusBanner = ({ alerts }) => {
  const systemStatuses = getSystemStatuses(alerts);
  const hasIssues = hasActiveIssues(alerts);

  return (
    <div className="status-banner">
      <div className="banner-header">
        <pre className="banner-title">
{`╔═══════════════════════════════════════════════════════════════════════════════╗
║                    AUSTRALIAN SECURITIES EXCHANGE - LIVE STATUS              ║
╚═══════════════════════════════════════════════════════════════════════════════╝`}
        </pre>
      </div>

      <div className="system-status-grid">
        {Object.entries(systemStatuses).map(([systemName, { status, alerts: systemAlerts }]) => (
          <div
            key={systemName}
            className={`system-status-card status-${status} ${status !== STATUS_TYPES.NORMAL ? 'status-alert' : ''}`}
          >
            <div className="system-name">
              <span className="status-indicator">■</span> {systemName}
            </div>
            <div className="system-status-text">
              STATUS: <span className="status-value">{getStatusText(status)}</span>
            </div>
            {systemAlerts.length > 0 && (
              <div className="system-active-alerts">
                {systemAlerts.map((alert, idx) => (
                  <div key={idx} className="active-alert-summary">
                    › {alert.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {hasIssues && (
        <div className="alert-notice">
          <pre>
{`┌─────────────────────────────────────────────────────────────────┐
│ ⚠ WARNING: NON-NORMAL STATUS DETECTED - REVIEW ALERTS BELOW ⚠  │
└─────────────────────────────────────────────────────────────────┘`}
          </pre>
        </div>
      )}
    </div>
  );
};

export default StatusBanner;
