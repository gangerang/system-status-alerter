import React from 'react';
import { formatDateTime, getStatusText } from '../utils/alertHelpers';

const AlertDetails = ({ alert, onClose }) => {
  if (!alert) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <pre>
{`╔════════════════════════════════════════════════════════════════════════════════╗
║                              ALERT DETAILS                                     ║
╚════════════════════════════════════════════════════════════════════════════════╝`}
          </pre>
        </div>

        <div className="modal-body">
          <div className="detail-row">
            <span className="detail-label">SYSTEM:</span>
            <span className="detail-value">{alert.system}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">STATUS:</span>
            <span className={`detail-value status-${alert.status}`}>
              {getStatusText(alert.status)}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">TITLE:</span>
            <span className="detail-value">{alert.title}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">START TIME:</span>
            <span className="detail-value">{formatDateTime(alert.startStr || alert.start)}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">CLOSE TIME:</span>
            <span className="detail-value">
              {alert.closeStr || alert.close ? formatDateTime(alert.closeStr || alert.close) : 'ONGOING'}
            </span>
          </div>

          {alert.summary && (
            <div className="detail-section">
              <div className="detail-label">SUMMARY:</div>
              <div className="detail-content">
                <pre className="detail-text">{alert.summary}</pre>
              </div>
            </div>
          )}

          {alert.description && (
            <div className="detail-section">
              <div className="detail-label">DESCRIPTION:</div>
              <div className="detail-content">
                <div
                  className="detail-html"
                  dangerouslySetInnerHTML={{ __html: alert.description }}
                />
              </div>
            </div>
          )}

          {alert.document && alert.link && (
            <div className="detail-section">
              <div className="detail-label">DOCUMENT:</div>
              <div className="detail-content">
                <a
                  href={alert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-link"
                >
                  ► {alert.document}
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="terminal-button" onClick={onClose}>
            [ESC] CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDetails;
