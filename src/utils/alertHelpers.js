// Alert helper functions

export const API_URL = 'https://mcw59b7dl3hk0mnrsr49zd4b7jby.pub.sfmc-content.com/tezwp3l1olh?a=historyAll';

export const STATUS_TYPES = {
  NORMAL: 'normal',
  INFORMATIONAL: 'informational',
  PARTIAL: 'partial',
  OFFLINE: 'offline'
};

export const STATUS_COLORS = {
  [STATUS_TYPES.NORMAL]: '#00ff00',
  [STATUS_TYPES.INFORMATIONAL]: '#ffff00',
  [STATUS_TYPES.PARTIAL]: '#ff8800',
  [STATUS_TYPES.OFFLINE]: '#ff0000'
};

export const SYSTEMS = {
  ASX_TRADE: 'ASX Trade',
  ASX24: 'ASX24 (NTP)',
  SUPPORTING: 'Supporting Services and Platforms'
};

// Check if an alert is currently active (not yet closed or close time is in the future)
export const isAlertActive = (alert) => {
  if (!alert.closeStr) return true;
  const closeTime = new Date(alert.closeStr);
  return closeTime > new Date();
};

// Check if there are any non-normal active alerts
export const hasActiveIssues = (alerts) => {
  return alerts.some(alert =>
    isAlertActive(alert) && alert.status !== STATUS_TYPES.NORMAL
  );
};

// Get all currently active alerts
export const getActiveAlerts = (alerts) => {
  return alerts.filter(isAlertActive);
};

// Get current status for each system
export const getSystemStatuses = (alerts) => {
  const activeAlerts = getActiveAlerts(alerts);
  const systems = {};

  // Initialize all systems as normal
  Object.values(SYSTEMS).forEach(system => {
    systems[system] = { status: STATUS_TYPES.NORMAL, alerts: [] };
  });

  // Update with active alerts (worst status wins)
  activeAlerts.forEach(alert => {
    const system = alert.system;
    if (!systems[system]) {
      systems[system] = { status: STATUS_TYPES.NORMAL, alerts: [] };
    }

    systems[system].alerts.push(alert);

    // Determine worst status (offline > partial > informational > normal)
    const statusPriority = {
      [STATUS_TYPES.OFFLINE]: 4,
      [STATUS_TYPES.PARTIAL]: 3,
      [STATUS_TYPES.INFORMATIONAL]: 2,
      [STATUS_TYPES.NORMAL]: 1
    };

    if (statusPriority[alert.status] > statusPriority[systems[system].status]) {
      systems[system].status = alert.status;
    }
  });

  return systems;
};

// Format date/time for display
export const formatDateTime = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    const date = new Date(dateStr);
    return date.toLocaleString('en-AU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  } catch (e) {
    return dateStr;
  }
};

// Format date for display (date only)
export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (e) {
    return dateStr;
  }
};

// Get status display text
export const getStatusText = (status) => {
  return status.toUpperCase();
};

// Strip HTML tags for plain text display (simple version)
export const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};
