import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Navbar from '../components/navbar.js';

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Sidenav</h2>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
          <li>Item 5</li>
        </ul>
      </aside>

      <div className="content-area">
        {/* Navbar */}
        <Navbar></Navbar>
        {/* Main Tables */}
        <main className="main-content">
          <section className="tables">
            <table className="bordered-table">
              <thead>
                <tr>
                  <th>Alert ID</th>
                  <th>Description</th>
                  <th>Machine IP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Host Based Anomaly Detection</td>
                  <td>192.168.3.4</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>USB Connected at unusual time</td>
                  <td>192.168.3.20</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Unauthorized application installation</td>
                  <td>192.168.3.12</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Multiple failed login attempts</td>
                  <td>192.168.3.14</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>High CPU usage detected</td>
                  <td>192.168.3.8</td>
                </tr>
              </tbody>
            </table>

            <table className="striped-table">
              <thead>
                <tr>
                  <th>Log ID</th>
                  <th>Description</th>
                  <th>Machine IP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Shell command execution</td>
                  <td>192.168.3.7</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Login</td>
                  <td>192.168.3.27</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>File deletion</td>
                  <td>192.168.3.15</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Configuration change</td>
                  <td>192.168.3.9</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>System reboot</td>
                  <td>192.168.3.2</td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>

      {/* Alert Messages */}
      <aside className="alerts">
        <div className="alert short-alert">
          Short alert message. <a href="#learn-more">Learn more</a>
        </div>
        <div className="alert emergency-alert">
          Emergency alert message. <a href="#learn-more">Learn more</a>
        </div>
      </aside>
      
    </div>
    
  );
};

export default Dashboard;
