# Emit - Insider Threat Detection Engine

Emit is a powerful insider threat detection engine designed to collect logs from various machines using Wazuh, apply static rules and machine learning-based detection, and generate real-time alerts via a user-friendly MERN stack web application. The purpose of Emit is to enhance the security of organizations by identifying malicious insider activities before they escalate.

## Features
- 🔑 **User Authentication:** Secure login and registration system with MongoDB integration.
- 📦 **Log Collection:** Integration with Wazuh for collecting logs from multiple machines.
- 📊 **Log Analysis:** Supports both static rule-based detection and machine learning-based anomaly detection.
- 📂 **Custom Rules:** Define custom detection rules via a user interface, saved in JSON format.
- 📈 **Visualization Dashboard:** View alerts and threat analysis results in real-time through a sleek web application.
- 🚀 **Machine Learning Integration:** Trains models to detect insider threats using collected logs.
- 💾 **Rule Management System:** Allows creating, editing, and managing custom rules for threat detection.

## Tech Stack
### Frontend
- React.js (MERN stack)
- Tailwind CSS
- ShadCN/UI Components

### Backend
- Node.js (MERN stack)
- Express.js
- MongoDB (Database)
- Python (Machine Learning Integration)

### Tools & Integrations
- Wazuh (Log Collection)
- Docker (For DVWA testing)
- Azure Cloud VM (Hosting Wazuh)

## Installation
1. **Clone the repository:**  
```bash
 git clone https://github.com/your-username/emit.git
```

2. **Install dependencies:**  
```bash
 cd emit/frontend
 npm install

 cd ../backend
 npm install
```

3. **Set up MongoDB:**  
Ensure MongoDB is running and configured properly.

4. **Set up Wazuh:**  
Install Wazuh on Azure Cloud VM and configure it to collect logs from other machines.

5. **Run the application:**  
```bash
# Frontend
npm start

# Backend
node server.js
```

## Usage
- Visit the web application’s login page.
- Register a new account or log in with existing credentials.
- Create custom rules using the provided UI.
- Upload or stream logs from Wazuh’s `alerts.json` file.
- View alerts and analysis results via the dashboard.





## Future Enhancements
- Integration of CI/CD pipelines for automated security checks.
- Improved AI models for better detection accuracy.
- Enhanced visualization and filtering of alerts.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## Screenshots

Dashboard
![WhatsApp Image 2025-03-11 at 22 02 26_e542bbea](https://github.com/user-attachments/assets/7485a603-1ed4-4c6d-b5e1-b1f07bb61bb5)

Alerts Table
![WhatsApp Image 2025-03-11 at 22 03 41_90fcc294](https://github.com/user-attachments/assets/d7d29c65-90b2-4d97-b7d9-c99b2f893df1)

Logs Table
![WhatsApp Image 2025-03-11 at 22 02 34_ec2a6c13](https://github.com/user-attachments/assets/ed791182-d78f-4780-9fd2-c732067cade5)

Rule Creation
![WhatsApp Image 2025-03-11 at 22 03 13_32944166](https://github.com/user-attachments/assets/f4b4570c-2ab8-4d7d-bcd6-3d988419bcc4)


