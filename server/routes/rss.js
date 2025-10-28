// RSS Feed route - Generate RSS 2.0 feed of ASX alerts
import RSS from 'rss';
import fetch from 'node-fetch';

const ASX_API_URL = 'https://mcw59b7dl3hk0mnrsr49zd4b7jby.pub.sfmc-content.com/tezwp3l1olh?a=historyAll';

export const getRssFeed = async (req, res) => {
  try {
    // Get query parameters for filtering
    const { system, status, limit = 50 } = req.query;

    // Fetch alerts from ASX API
    const response = await fetch(ASX_API_URL);
    if (!response.ok) {
      throw new Error(`ASX API returned status ${response.status}`);
    }

    const data = await response.json();
    let alerts = data.data || [];

    // Filter by system if specified
    if (system) {
      alerts = alerts.filter(alert => alert.system === system);
    }

    // Filter by status if specified
    if (status) {
      alerts = alerts.filter(alert => alert.status === status);
    }

    // Sort by start date (newest first) and limit
    alerts = alerts
      .sort((a, b) => {
        const dateA = new Date(a.startStr || a.start);
        const dateB = new Date(b.startStr || b.start);
        return dateB - dateA;
      })
      .slice(0, parseInt(limit));

    // Get site URL from request
    const protocol = req.get('x-forwarded-proto') || req.protocol;
    const host = req.get('host');
    const siteUrl = `${protocol}://${host}`;

    // Create RSS feed
    const feed = new RSS({
      title: 'ASX System Status Alerts',
      description: 'Real-time alerts and status updates for Australian Securities Exchange systems',
      feed_url: `${siteUrl}/api/rss`,
      site_url: siteUrl,
      language: 'en-AU',
      pubDate: new Date(),
      ttl: 10, // Cache for 10 minutes
      custom_namespaces: {
        'asx': 'http://asx.com.au/status'
      }
    });

    // Add each alert as a feed item
    alerts.forEach(alert => {
      const startDate = new Date(alert.startStr || alert.start);
      const closeDate = alert.closeStr || alert.close ? new Date(alert.closeStr || alert.close) : null;

      // Build description with summary and status info
      let description = `<strong>System:</strong> ${alert.system}<br/>`;
      description += `<strong>Status:</strong> ${alert.status.toUpperCase()}<br/>`;
      description += `<strong>Start:</strong> ${startDate.toLocaleString('en-AU')}<br/>`;
      if (closeDate) {
        description += `<strong>Close:</strong> ${closeDate.toLocaleString('en-AU')}<br/>`;
      } else {
        description += `<strong>Status:</strong> ONGOING<br/>`;
      }
      description += `<br/>${alert.summary || ''}`;
      if (alert.description) {
        description += `<br/><br/>${alert.description}`;
      }

      feed.item({
        title: `[${alert.status.toUpperCase()}] ${alert.system}: ${alert.title}`,
        description: description,
        url: siteUrl,
        guid: `${alert.system}-${alert.startStr || alert.start}-${alert.title}`,
        categories: [alert.status, alert.system],
        date: startDate,
        custom_elements: [
          { 'asx:system': alert.system },
          { 'asx:status': alert.status },
          { 'asx:start': alert.startStr || alert.start },
          { 'asx:close': alert.closeStr || alert.close || 'ongoing' }
        ]
      });
    });

    // Set content type and send RSS XML
    res.type('application/rss+xml');
    res.send(feed.xml({ indent: true }));

  } catch (error) {
    console.error('Error generating RSS feed:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate RSS feed',
      error: error.message
    });
  }
};
