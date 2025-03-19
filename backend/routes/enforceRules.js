const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const xml2js = require('xml2js');

const rulesFilePath = path.join(__dirname, '../rules.xml');
const suspicionLevelsFilePath = path.join(__dirname, '../suspicionLevels.json');
const parser = new xml2js.Parser();

// In-memory storage for suspicion levels
let suspicionLevels = {};

// Load suspicion levels from file on server start
const loadSuspicionLevels = () => {
  if (!fs.existsSync(suspicionLevelsFilePath)) {
    console.log('❌ Suspicion levels file not found. Creating a new one.');
    return {};
  }

  try {
    const data = fs.readFileSync(suspicionLevelsFilePath, 'utf-8').trim();
    if (data) {
      return JSON.parse(data);
    }
    return {};
  } catch (error) {
    console.error('❌ Error reading suspicion levels file:', error);
    return {};
  }
};

// Save suspicion levels to file
const saveSuspicionLevels = () => {
  try {
    fs.writeFileSync(suspicionLevelsFilePath, JSON.stringify(suspicionLevels, null, 2));
    console.log('✅ Suspicion levels successfully saved to file.');
  } catch (error) {
    console.error('❌ Error saving suspicion levels:', error);
  }
};

// Load suspicion levels when the server starts
suspicionLevels = loadSuspicionLevels();

// Save suspicion levels when the server shuts down
process.on('exit', saveSuspicionLevels);
process.on('SIGINT', () => { saveSuspicionLevels(); process.exit(); });
process.on('SIGTERM', () => { saveSuspicionLevels(); process.exit(); });

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
        level: parseInt(rule.$.level),
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
          } catch {
            return null;
          }
        })
        .filter(Boolean);
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
  if (log.rule?.description?.toLowerCase().includes(rule.description.toLowerCase())) {
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

          const agentName = log.agent?.name || 'Unknown_Agent';
          
          if (!suspicionLevels[agentName]) {
            suspicionLevels[agentName] = { level: 0, hitCount: 0, lastUpdate: Date.now() };
          }

          suspicionLevels[agentName].hitCount += 1;

          if (suspicionLevels[agentName].hitCount % 5 === 0) {
            const currentTime = Date.now();
            const timeDiff = (currentTime - suspicionLevels[agentName].lastUpdate) / 1000;

            if (timeDiff <= 120) { // 2 minutes
              suspicionLevels[agentName].level = Math.min(suspicionLevels[agentName].level + 5, 100);
            }
            suspicionLevels[agentName].lastUpdate = currentTime;
          }

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
router.get('/enforce-rules/count', async (req, res) => {
  try {
    const rules = readRulesFromXML();
    const logs = await fetchLogs();
    let matchedCount = 0;

    logs.forEach(log => {
      rules.forEach(rule => {
        if (doesLogMatchRule(log, rule)) {
          matchedCount++;
        }
      });
    });

    res.json({ alertCount: matchedCount });
  } catch (error) {
    console.error('❌ Error fetching alert count:', error);
    res.status(500).json({ message: 'Error fetching alert count' });
  }
});
// Fetch suspicion levels for frontend display
router.get('/suspicion-levels', (req, res) => {
  res.json(suspicionLevels);
});

module.exports = router;
