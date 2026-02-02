VioletCRM
Description

VioletCRM is a comprehensive, scalable Business-to-Business (B2B) Customer Relationship Management (CRM) system designed to streamline interactions between businesses. Built with a modern stack including HTML, CSS, JavaScript, PHP, and MySQL, it offers role-based authentication, full CRUD operations for leads, contacts, businesses, and users, real-time data updates, form validation, search/filtering, notifications, and password reset functionality. The system features a professional violet/black/indigo color theme and is fully responsive across all devices.

This is a production-ready application with secure backend integration, where data persists in a MySQL database and user sessions manage authentication.
Features

    Authentication & Authorization: Secure login/logout with PHP sessions. Role-based access (users vs. admins). Password reset via email.
    Dashboards: Real-time stats for leads, contacts, businesses, users, active deals, and revenue forecasts.
    Lead & Contact Management: Create, read, update, delete (CRUD), and search leads and contacts.
    Business Profile Management (Admin Only): Manage business profiles with full CRUD and search.
    User Management (Admin Only): Add, edit, delete users with role assignment.
    Analytics: Placeholder for data visualizations (integrate Chart.js for charts).
    Settings: Switch between light and dark themes.
    Notifications: Automated email/SMS alerts for key actions (e.g., new lead added). Integrates with PHPMailer for emails.
    Real-Time Updates: Polls server every 10 seconds for live data refreshes.
    Form Validation: Client-side checks for required fields, email formats, and minimum lengths.
    Search & Filter: Dynamic, real-time filtering for all data lists.
    Responsive Design: Optimized for desktop, tablet, and mobile devices.
    Scalability: Modular architecture for easy expansion (e.g., add new modules, integrate APIs, or enhance security).

Installation

    Prerequisites:
        Install XAMPP, WAMP, or a similar stack with PHP 7+ and MySQL.
        Ensure Apache and MySQL services are running.

    Database Setup:
        Access phpMyAdmin at http://localhost/phpmyadmin.
        Create a new database named violetcrm.
        Import the provided violetcrm.sql file to set up tables and insert a default admin user (username: admin, password: admin123 – change in production).

    Project Deployment:
        Place all project files in your web server's root directory (e.g., C:\xampp\htdocs\violetcrm\ on Windows).
        Update database credentials in config.php (default: host=localhost, user=root, password=``, database=violetcrm).
        For email notifications, install PHPMailer via Composer: composer require phpmailer/phpmailer. Configure SMTP settings in send_notification.php (e.g., Gmail or your provider).

    Launch:
        Open your browser and navigate to http://localhost/violetcrm/login.html.
        Log in with the default admin credentials or create new users.

Usage

    Login: On login.html, enter your username, password, and select your role (user or admin). Forgot password? Use forgot_password.html.
    Navigation: Use the header navigation or collapsible sidebar. On mobile, tap the menu icon to expand.
    Data Management:
        Add: Fill forms on relevant pages (e.g., leads.html for leads).
        Edit: Click "Edit" on any list item to modify details.
        Delete: Click "Delete" to remove items (with confirmation).
        Search: Type in search boxes to filter lists instantly.
    Admin Privileges: Admins can access admin-dashboard.html to manage businesses and users.
    Themes: Adjust in settings.html for light or dark mode.
    Notifications: Check the dashboard for alerts; emails are sent for major actions.
    Logout: Click the user dropdown and select "Logout".

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
├── edit_lead.html          # Edit Lead Page
├── edit_contact.html       # Edit Contact Page
├── edit_business.html      # Edit Business Page (Admin)
├── edit_user.html          # Edit User Page (Admin)
├── forgot_password.html    # Forgot Password Page
├── reset_password.html     # Reset Password Page
├── styles.css              # Shared CSS Stylesheet
├── script.js               # Shared JavaScript File
├── violetcrm.sql           # Database Schema and Initial Data
├── config.php              # Database Configuration
├── login.php               # Login API
├── register.php            # User Registration API
├── leads.php               # Leads CRUD API
├── contacts.php            # Contacts CRUD API
├── businesses.php          # Businesses CRUD API
├── users.php               # Users CRUD API
├── edit_lead.php           # Edit Lead API
├── edit_contact.php        # Edit Contact API
├── edit_business.php       # Edit Business API
├── edit_user.php           # Edit User API
├── forgot_password.php     # Password Reset Request API
├── reset_password.php      # Password Reset API
├── send_notification.php   # Notification API
├── check_session.php       # Session Check API
├── logout.php              # Logout API
├── dashboard_stats.php     # Dashboard Stats API
└── error_log.php           # Error Logging Utility

Technologies Used

    Frontend: HTML5 (semantic structure), CSS3 (responsive design with CSS variables), JavaScript (ES6+ for interactivity).
    Backend: PHP 7+ (server-side logic), MySQL (database).
    Libraries: PHPMailer (email notifications), Chart.js (analytics charts, optional).
    Security: PDO for database queries, bcrypt password hashing, session management.
    Tools: XAMPP/WAMP for local development.

Contributing

We welcome contributions to improve VioletCRM!

    Fork the repository.
    Create a new branch for your feature (git checkout -b feature/your-feature-name).
    Make your changes and test thoroughly.
    Commit your updates (git commit -m "Describe your changes").
    Push to your branch and submit a pull request.
    Ensure code follows best practices for security and performance.

License

This project is licensed under the MIT License. You are free to use, modify, and distribute the code, provided you include the original license.
Contact

For questions, support, or bug reports:

    Email: thabangmokgonyana@gmail.com
    GitHub Issues: Open an issue in the repository.

Note: VioletCRM is designed for demo and production use. For live deployment, ensure HTTPS, regular backups, and input sanitization. Test all features in a development environment first. Thank you for using VioletCRM!

