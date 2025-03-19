import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logs2 from "./pages/Logs";
import Dashboard2 from "./pages/dashboard2";
import Alerts from "./pages/Alerts";
import Ruleset from "./pages/ruleset";
import SorryPage from "./pages/sorry.js";
import IntegrationsLayout from "./pages/Integrations.js";
import { LicenseInfo } from '@mui/x-license-pro';

// Set your license key here
LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');
// Import the Global Alert Provider
import { AlertProvider } from "./components/notifications.js";

const App = () => (
  <AlertProvider>  {/* Wrap the whole app */}
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logs" element={<Logs2 />} />
        <Route path="/dashboard" element={<Dashboard2 />} />
        <Route path="/Alerts" element={<Alerts />} />
        <Route path="/RuleSet" element={<Ruleset />} />
        <Route path="/SorryPage" element={<SorryPage />} />
        <Route path="/Integrations" element={<IntegrationsLayout />} />
      </Routes>
    </Router>
  </AlertProvider>
);

export default App;
