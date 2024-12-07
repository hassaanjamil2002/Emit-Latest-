import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Optional: Add custom CSS for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook


const Navbar = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleDashboardClick = () => {
    navigate('/dashboard'); // Navigate to /dashboard
  };
  
  const handleLogsClick = () => {
    navigate('/logs'); // Navigate to /logs
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-buttons">
      <button onClick={handleDashboardClick}>Dashboard</button>
      <button onClick={handleLogsClick}>Logs</button>
        <button>Projects</button>
        <button>Settings</button>
        <button>Support</button>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>🔍</button>
      </div>
    </nav>
  );
};

export default Navbar;
