const express = require('express');
const axios = require('axios');
const router = express.Router();
const https = require('https');

// Function to fetch the Wazuh API token
async function getAuthToken() {
  try {
    console.log('Making request to Wazuh API...');
    const response = await axios.post(
      'https://20.6.130.36:55000/security/user/authenticate',
      {}, // Empty body as credentials are in the header
      {
        auth: {
          username: 'wazuh',
          password: 'wazuh',
        },
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000, // Timeout after 5 seconds
        httpsAgent: new https.Agent({  
          rejectUnauthorized: false, // Disable SSL verification for self-signed certificates
        }),
      }
    );
    console.log(response);
    return response;
    if (response.data && response.data.token) {
      return response.data.token;
    } else {
      throw new Error('Failed to retrieve token');
    }
  } catch (error) {
    console.error('Error obtaining Wazuh API token:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      console.error('Response data:', error.response.data);
    } else {
      console.error('No response received:', error);
    }
    throw error;
  }
}


// New route to get the connected agents (or PCs) on Wazuh
router.get('/', async (req, res) => {
  try {
    // Get authentication token
    const response = await getAuthToken();
    console.log(response); // Log the entire response object to see its structure

const token2 = response.data.data.token; // Try accessing token again
console.log(token2); // Log the token
    // Fetch connected agents using the token
    const agentsResponse = await axios.get(
      'https://192.168.100.94:55000/agents',
      {
        headers: {
          'Authorization': `Bearer ${token2}`,
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false, // Disable SSL verification for self-signed certificates
        }),
      }
    );

    res.json(agentsResponse.data); // Return connected agents data
  } catch (error) {
    console.error('Error fetching connected agents:', error.message);
    res.status(500).json({ error: 'Failed to fetch connected agents' });
  }
});

module.exports = router;
