const express = require('express');
const axios = require('axios');
const router = express.Router();

// Logs route that fetches alerts.json
router.get('/', async (req, res) => {
    const alertsUrl = 'http://192.168.100.94:8080/alerts.json';

    try {
        console.log(`Fetching data from ${alertsUrl}...`);

        // Fetch the alerts.json file
        const response = await axios.get(alertsUrl);

     //   console.log('Successfully fetched alerts data:', response.data);

        // Respond with the parsed JSON data
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching alerts.json:', error.message);

        // Log detailed error information for debugging
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            console.error('Response data:', error.response.data);
        } else {
            console.error('Error details:', error);
        }

        // Respond with an error message
        res.status(500).json({ error: 'Failed to fetch alerts.json' });
    }
});

module.exports = router;
