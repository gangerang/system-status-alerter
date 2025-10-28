// Alerts API route - Proxy to ASX API
import fetch from 'node-fetch';

const ASX_API_URL = 'https://mcw59b7dl3hk0mnrsr49zd4b7jby.pub.sfmc-content.com/tezwp3l1olh?a=historyAll';

export const getAlerts = async (req, res) => {
  try {
    console.log('Fetching alerts from ASX API...');

    const response = await fetch(ASX_API_URL);

    if (!response.ok) {
      throw new Error(`ASX API returned status ${response.status}`);
    }

    const data = await response.json();

    console.log(`Successfully fetched ${data.data?.length || 0} alerts`);

    // Return the data to the client
    res.json(data);

  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch alerts from ASX API',
      error: error.message
    });
  }
};
