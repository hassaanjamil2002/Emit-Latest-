const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const rulesFilePath = path.join(__dirname, '../rules.xml');
const parser = new xml2js.Parser();
const builder = new xml2js.Builder({ headless: true, rootName: 'rules' });

// Helper function to read rules from the XML file
const readRulesFromFile = () => {
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
    rules = result.rules?.rule || [];
  });

  console.log('✅ Successfully Read Rules From XML File:', rules);
  return rules;
};

// Helper function to write rules to the XML file
const writeRulesToFile = (rules) => {
  const xmlData = builder.buildObject({ rule: rules });
  fs.writeFileSync(rulesFilePath, xmlData);
};

// Fetch all rules
router.get('/rules', (req, res) => {
  try {
    const rules = readRulesFromFile();

    // Format rules to include top-level 'id' property
    const formattedRules = rules.map((rule, index) => ({
      id: rule.$.id || `rule-${index}`,  // Adding 'id' to each rule
      level: rule.$.level || 'Unknown',
      description: rule.description?.[0] || 'No description',
      matches: rule.match || [],
      action: rule.action?.[0] || 'log',
      tags: rule.tags?.[0] || ''
    }));

    console.log('✅ Fetched and formatted rules successfully:', formattedRules);
    res.json(formattedRules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rules' });
  }
});
// Create a new rule
router.post('/rules', (req, res) => {
  try {
    const rules = readRulesFromFile();
    const newRule = { 
      $: { id: Date.now().toString(), level: req.body.level || "1" },
      description: [req.body.description],
      match: req.body.matches.split(',').map(match => match.trim()), 
      action: [req.body.action],
      tags: [req.body.tags || '']
    };
    
    rules.push(newRule);
    writeRulesToFile(rules);
    res.json(rules);
  } catch (error) {
    res.status(500).json({ message: 'Error saving rule' });
  }
});

// Update an existing rule
router.put('/rules/:id', (req, res) => {
  try {
    const rules = readRulesFromFile();
    const index = rules.findIndex(rule => rule.$.id === req.params.id);
    
    if (index !== -1) {
      rules[index] = { 
        $: { id: req.params.id, level: req.body.level || "1" },
        description: [req.body.description],
        match: req.body.matches.split(',').map(match => match.trim()), 
        action: [req.body.action],
        tags: [req.body.tags || '']
      };
      writeRulesToFile(rules);
      res.json(rules);
    } else {
      res.status(404).json({ message: 'Rule not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating rule' });
  }
});

// Delete a rule
router.delete('/rules/:id', (req, res) => {
  try {
    const rules = readRulesFromFile();
    const filteredRules = rules.filter(rule => rule.$.id !== req.params.id);
    
    writeRulesToFile(filteredRules);
    res.json(filteredRules);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting rule' });
  }
});

module.exports = router;
