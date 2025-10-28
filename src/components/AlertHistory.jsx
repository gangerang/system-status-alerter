import React, { useState, useMemo } from 'react';
import { formatDateTime, getStatusText, stripHtml } from '../utils/alertHelpers';
import SearchFilters from './SearchFilters';
import AlertDetails from './AlertDetails';

const AlertHistory = ({ alerts }) => {
  const [filters, setFilters] = useState({
    searchText: '',
    status: '',
    system: '',
    dateFrom: '',
    dateTo: ''
  });
  const [selectedAlert, setSelectedAlert] = useState(null);

  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      // Search text filter
      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase();
        const matchesSearch =
          alert.title?.toLowerCase().includes(searchLower) ||
          alert.system?.toLowerCase().includes(searchLower) ||
          alert.summary?.toLowerCase().includes(searchLower) ||
          stripHtml(alert.description)?.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && alert.status !== filters.status) {
        return false;
      }

      // System filter
      if (filters.system && alert.system !== filters.system) {
        return false;
      }

      // Date from filter
      if (filters.dateFrom) {
        const alertDate = new Date(alert.startStr || alert.start);
        const filterDate = new Date(filters.dateFrom);
        if (alertDate < filterDate) return false;
      }

      // Date to filter
      if (filters.dateTo) {
        const alertDate = new Date(alert.startStr || alert.start);
        const filterDate = new Date(filters.dateTo);
        filterDate.setHours(23, 59, 59, 999); // End of day
        if (alertDate > filterDate) return false;
      }

      return true;
    });
  }, [alerts, filters]);

  const handleRowClick = (alert) => {
    setSelectedAlert(alert);
  };

  const handleCloseModal = () => {
    setSelectedAlert(null);
  };

  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedAlert) {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAlert]);

  return (
    <div className="alert-history">
      <div className="history-header">
        <pre>
{`╔═══════════════════════════════════════════════════════════════════════════════╗
║                             ALERT HISTORY LOG                                 ║
╚═══════════════════════════════════════════════════════════════════════════════╝`}
        </pre>
      </div>

      <SearchFilters filters={filters} onFilterChange={setFilters} />

      <div className="results-info">
        SHOWING {filteredAlerts.length} OF {alerts.length} ALERTS
      </div>

      <div className="alert-table-container">
        <table className="alert-table">
          <thead>
            <tr>
              <th>STATUS</th>
              <th>SYSTEM</th>
              <th>TITLE</th>
              <th>START TIME</th>
              <th>CLOSE TIME</th>
              <th>SUMMARY</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-results">
                  NO ALERTS FOUND MATCHING CRITERIA
                </td>
              </tr>
            ) : (
              filteredAlerts.map((alert, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(alert)}
                  className={`alert-row status-${alert.status}`}
                >
                  <td className="status-cell">
                    <span className={`status-badge status-${alert.status}`}>
                      {getStatusText(alert.status)}
                    </span>
                  </td>
                  <td className="system-cell">{alert.system}</td>
                  <td className="title-cell">{alert.title}</td>
                  <td className="time-cell">
                    {formatDateTime(alert.startStr || alert.start)}
                  </td>
                  <td className="time-cell">
                    {alert.closeStr || alert.close
                      ? formatDateTime(alert.closeStr || alert.close)
                      : 'ONGOING'}
                  </td>
                  <td className="summary-cell">
                    {stripHtml(alert.summary).substring(0, 80)}
                    {stripHtml(alert.summary).length > 80 ? '...' : ''}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedAlert && (
        <AlertDetails alert={selectedAlert} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AlertHistory;
