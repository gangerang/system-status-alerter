import React from 'react';
import { STATUS_TYPES, SYSTEMS } from '../utils/alertHelpers';

const SearchFilters = ({ filters, onFilterChange }) => {
  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="search-filters">
      <div className="filter-section">
        <label className="filter-label">
          SEARCH:
          <input
            type="text"
            className="terminal-input"
            placeholder="Search title, system, or description..."
            value={filters.searchText}
            onChange={(e) => handleChange('searchText', e.target.value)}
          />
        </label>
      </div>

      <div className="filter-row">
        <div className="filter-section">
          <label className="filter-label">
            STATUS:
            <select
              className="terminal-select"
              value={filters.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="">ALL</option>
              <option value={STATUS_TYPES.NORMAL}>NORMAL</option>
              <option value={STATUS_TYPES.INFORMATIONAL}>INFORMATIONAL</option>
              <option value={STATUS_TYPES.PARTIAL}>PARTIAL</option>
              <option value={STATUS_TYPES.OFFLINE}>OFFLINE</option>
            </select>
          </label>
        </div>

        <div className="filter-section">
          <label className="filter-label">
            SYSTEM:
            <select
              className="terminal-select"
              value={filters.system}
              onChange={(e) => handleChange('system', e.target.value)}
            >
              <option value="">ALL</option>
              <option value={SYSTEMS.ASX_TRADE}>{SYSTEMS.ASX_TRADE}</option>
              <option value={SYSTEMS.ASX24}>{SYSTEMS.ASX24}</option>
              <option value={SYSTEMS.SUPPORTING}>{SYSTEMS.SUPPORTING}</option>
            </select>
          </label>
        </div>

        <div className="filter-section">
          <label className="filter-label">
            DATE FROM:
            <input
              type="date"
              className="terminal-input"
              value={filters.dateFrom}
              onChange={(e) => handleChange('dateFrom', e.target.value)}
            />
          </label>
        </div>

        <div className="filter-section">
          <label className="filter-label">
            DATE TO:
            <input
              type="date"
              className="terminal-input"
              value={filters.dateTo}
              onChange={(e) => handleChange('dateTo', e.target.value)}
            />
          </label>
        </div>

        <button
          className="terminal-button"
          onClick={() => onFilterChange({
            searchText: '',
            status: '',
            system: '',
            dateFrom: '',
            dateTo: ''
          })}
        >
          CLEAR FILTERS
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
