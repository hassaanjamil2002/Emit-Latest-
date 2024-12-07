import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; // Import the new Dashboard component
import Logs2 from './pages/Logs';
import Dashboard2 from './pages/dashboard2';
import Alerts from './pages/Alerts';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
           
            <Route path="/logs" element={<Logs2 />} />
            <Route path="/dashboard" element={<Dashboard2 />} />
            <Route path="/Alerts" element={<Alerts/>}/>
        </Routes>
    </Router>
);  

export default App;
