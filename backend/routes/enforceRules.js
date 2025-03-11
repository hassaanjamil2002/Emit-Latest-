const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const xml2js = require('xml2js');

const rulesFilePath = path.join(__dirname, '../rules.xml');
const parser = new xml2js.Parser();

// Helper function to read and parse XML rules
const readRulesFromXML = () => {
  if (!fs.existsSync(rulesFilePath)) {
    console.log('❌ Rules file not found at:', rulesFilePath);
    return [];
  }

  const xmlData = fs.readFileSync(rulesFilePath, 'utf-8');
  let rules = [];

  parser.parseString(xmlData, (err, result) => {
    if (err) {
      console.error('❌ Error parsing XML file:', err);
      return;
    }
    if (result.rules && result.rules.rule) {
      rules = result.rules.rule.map(rule => ({
        id: rule.$.id,
        level: rule.$.level,
        description: rule.description?.[0] || 'No description',
        matches: rule.match?.map(m => m.toLowerCase()) || []
      }));
    }
  });

  console.log('✅ Successfully Read Rules From XML File:', rules);
  return rules;
};

// Helper function to fetch logs from the server and parse them properly
const fetchLogs = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/logs');
    console.log("📥 Logs Response:", response.data);

    let logsData = [];

    if (Array.isArray(response.data)) {
      logsData = response.data;
    } else if (typeof response.data === "string") {
      logsData = response.data
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => {
          try {
            return JSON.parse(line);
          } catch (parseError) {
            console.error("❌ Error parsing log line:", line, parseError);
            return null;
          }
        })
        .filter((log) => log !== null);
    } else {
      console.error("❌ Unexpected API response format:", response.data);
    }

    console.log(`✅ Parsed ${logsData.length} Logs Successfully`);
    return logsData;
  } catch (error) {
    console.error("❌ Error fetching logs:", error);
    return [];
  }
};

// Check if a log matches a rule using OR logic
const doesLogMatchRule = (log, rule) => {
  const logContent = JSON.stringify(log).toLowerCase();

  if (log.rule && log.rule.description && log.rule.description.toLowerCase().includes(rule.description.toLowerCase())) {
    return true;
  }

  return rule.matches.some(matchPattern => logContent.includes(matchPattern));
};

// Enforce rules against logs
router.get('/enforce-rules', async (req, res) => {
  try {
    const rules = readRulesFromXML();
    const logs = await fetchLogs();

    if (!Array.isArray(logs)) {
      console.log('❌ Logs are not an array. Response received:', logs);
      return res.status(500).json({ message: 'Logs format is invalid. Expected an array.' });
    }

    const matchedAlerts = [];
    let matchedCount = 0;

    logs.forEach(log => {
      rules.forEach(rule => {
        if (doesLogMatchRule(log, rule)) {
          matchedAlerts.push({
            log,
            rule,
            message: `Rule "${rule.description}" matched!`
          });
          matchedCount++;
        }
      });
    });

    console.log(`🚨 Total Matched Alerts: ${matchedCount}`);
    res.json(matchedAlerts);

  } catch (error) {
    console.error('❌ Error enforcing rules:', error);
    res.status(500).json({ message: 'Error enforcing rules' });
  }
});

module.exports = router;
