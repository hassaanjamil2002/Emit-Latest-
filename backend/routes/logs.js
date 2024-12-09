const express = require('express');
const axios = require('axios');
const router = express.Router();

const https = require('https');
// Function to fetch the Wazuh API token
async function getAuthToken() {
    try {
      console.log('Making request to Wazuh API...');
      const response = await axios.post(
        'https://192.168.100.94:55000/security/user/authenticate',
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
  
     // console.log('Response received:', response.data); // Log the response data for debugging
      return response.data;
      // Adjust the token extraction logic to match the actual response structure
      if (response.data && response.data.token) {
        return response.data.token;
      } else {
        throw new Error('Failed to retrieve token');
      }
    } catch (error) {
      console.error('Error obtaining Wazuh API token:', error.message);
      
      // Log more details for debugging
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
// Logs route that uses the auth token to fetch logs from Wazuh
router.get('/', async (req, res) => {
  try {
    // Get authentication token
    const response = await getAuthToken();
    console.log(response); // Log the entire response object to see its structure

const token2 = response.data.token; // Try accessing token again
console.log(token2); // Log the token
    
    // Use the token to fetch logs from Wazuh
    const logsResponse = await axios.get(
        ' https://192.168.100.94:55000/manager/logs',
        {
          headers: {
            'Authorization': `Bearer ${token2}`,
          },
          httpsAgent: new https.Agent({
            rejectUnauthorized: false, // Disable SSL verification for self-signed certificates
          }),
        }
      );

    // Respond with the logs data
    res.json(logsResponse.data);
  } catch (error) {
    console.error('Error fetching logs:', error.message);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

module.exports = router;
