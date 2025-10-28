import { useState, useEffect, useCallback } from 'react';
import { API_URL } from '../utils/alertHelpers';

export const useAlertData = (autoRefreshInterval = 120000) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'success' && Array.isArray(data.data)) {
        // Sort by start date (newest first)
        const sortedAlerts = data.data.sort((a, b) => {
          const dateA = new Date(a.startStr || a.start);
          const dateB = new Date(b.startStr || b.start);
          return dateB - dateA;
        });

        setAlerts(sortedAlerts);
        setLastUpdated(new Date());
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (err) {
      console.error('Error fetching alerts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefreshInterval) return;

    const interval = setInterval(() => {
      fetchAlerts();
    }, autoRefreshInterval);

    return () => clearInterval(interval);
  }, [autoRefreshInterval, fetchAlerts]);

  const refresh = useCallback(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  return {
    alerts,
    loading,
    error,
    lastUpdated,
    refresh
  };
};
