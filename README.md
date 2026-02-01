VioletCRM is a scalable, web-based Business-to-Business (B2B) Customer Relationship Management (CRM) system designed to help companies manage leads, contacts, business profiles, and user interactions. Built with semantic HTML, CSS, and JavaScript, it features role-based authentication (users and admins), real-time updates, form validation, search/filter functionality, and simulated API integrations. The system uses a violet/black/indigo color theme for a professional, modern look and is fully responsive across devices.

This is a frontend-only demo using localStorage for data persistence. For production use, integrate a backend (e.g., Node.js with Express and MongoDB) to replace simulated features like API calls and authentication.
Features

    Authentication: Simulated JWT-based login for users and admins. Role-based access control (admins can manage users and businesses; users have limited access).
    Dashboard: Overview stats for leads, deals, revenue, businesses, and users (with real-time updates via polling).
    Lead Management: Add, view, edit, delete, and search leads.
    Contact Management: Similar CRUD operations for contacts.
    Business Profile Management (Admin Only): Create, edit, delete, and search business profiles.
    User Management (Admin Only): Add, edit, delete users with roles.
    Analytics: Placeholder for charts (integrate Chart.js for bar/pie charts).
    Settings: Theme switching (light/dark modes).
    Notifications: Mocked email/SMS alerts for actions like adding leads (logs to console; integrate services like SendGrid/Twilio in production).
    Real-Time Updates: Simulated WebSocket polling for data refreshes.
    Form Validation: Basic client-side validation for required fields, email formats, and minimum lengths.
    Search/Filter: Dynamic filtering for lists (leads, contacts, businesses, users).
    Responsive Design: Works on desktop, tablet, and mobile with pixel-based sizing.
    Scalability: Modular code for easy expansion (e.g., add new pages or integrate APIs).

Installation

    Clone or Download: Download all files (index.html, leads.html, contacts.html, analytics.html, settings.html, login.html, admin-dashboard.html, manage-businesses.html, user-management.html, styles.css, script.js) into a single directory.
    Open in Browser: Open login.html in any modern web browser (Chrome, Firefox, etc.). No server required for the demo.
    Production Setup (Optional):
        Set up a backend server (e.g., Node.js with Express).
        Replace localStorage with a database (e.g., MongoDB).
        Install dependencies for real features: npm install jsonwebtoken socket.io nodemailer twilio chart.js.
        Update script.js to use actual API endpoints instead of simulated calls.

Usage

    Login: Start at login.html. Enter any username/password (demo validation: password must be ≥6 characters). Select "User" or "Admin" role.
        Users: Access index.html (dashboard, leads, contacts, analytics, settings).
        Admins: Access all pages, including admin-dashboard.html, manage-businesses.html, and user-management.html.
    Navigation: Use the header nav or sidebar. Mobile users can toggle the menu.
    Managing Data:
        Add items via forms (e.g., leads on leads.html).
        Search/filter lists in real-time.
        Edit by clicking "Edit" (populates form); delete with "Delete".
    Real-Time Features: Data updates every 10 seconds. Notifications appear on dashboards.
    Logout: Click "Admin Profile" or "User Profile" > "Logout" to clear session.
    Themes: Switch in Settings (affects colors dynamically).

File Structure

VioletCRM/
├── index.html              # User Dashboard
├── leads.html              # Lead Management
├── contacts.html           # Contact Management
├── analytics.html          # Analytics Page
├── settings.html           # Settings Page
├── login.html              # Login Page
├── admin-dashboard.html    # Admin Dashboard
├── manage-businesses.html  # Business Management (Admin)
├── user-management.html    # User Management (Admin)
├── styles.css              # Shared CSS (responsive, themed)
└── script.js               # Shared JavaScript (auth, CRUD, real-time)

Technologies

    HTML5: Semantic structure for accessibility.
    CSS3: Responsive design with CSS variables for theming, pixel-based sizing.
    JavaScript (ES6+): DOM manipulation, event handling, localStorage, simulated APIs.
    Simulated Integrations: JWT (localStorage), WebSockets (polling), Email/SMS (console logs), Charts (Canvas API).
    Browser Compatibility: Modern browsers with ES6 support.

Contributing

    Fork the repository.
    Create a feature branch (git checkout -b feature/new-feature).
    Make changes and test in a browser.
    Commit changes (git commit -m "Add new feature").
    Push to branch and create a pull request.
    For production enhancements, integrate a backend and add tests (e.g., Jest for JS).

License

This project is open-source under the MIT License. Feel free to use, modify, and distribute.
Contact

For questions or support, contact the developer at [your-email@example.com] or open an issue in the repository.

Note: This is a demo system. Data is stored locally and will reset on browser clear. For a full application, deploy with a secure backend and database. Enjoy using VioletCRM!
