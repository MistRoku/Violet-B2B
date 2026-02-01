// script.js - Fully Expanded VioletCRM with Advanced Features
document.addEventListener('DOMContentLoaded', function () {
    // Simulated JWT Authentication
    let jwtToken = localStorage.getItem('jwtToken');
    const isLoggedIn = !!jwtToken && !isTokenExpired(jwtToken);
    const userRole = localStorage.getItem('userRole');

    function isTokenExpired(token) {
        // Simulate expiration (in production, decode JWT and check exp)
        const exp = localStorage.getItem('tokenExp');
        return exp && Date.now() > parseInt(exp);
    }

    function generateToken() {
        // Simulate JWT generation
        const token = 'simulated-jwt-' + Date.now();
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('tokenExp', Date.now() + 3600000); // 1 hour
        return token;
    }

    // Authentication check
    if (!isLoggedIn && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }

    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            const messageEl = document.getElementById('login-message');

            if (validateLogin(username, password)) {
                jwtToken = generateToken();
                localStorage.setItem('userRole', role);
                localStorage.setItem('username', username);
                messageEl.textContent = 'Login successful!';
                setTimeout(() => {
                    window.location.href = role === 'admin' ? 'admin-dashboard.html' : 'index.html';
                }, 1000);
            } else {
                messageEl.textContent = 'Invalid credentials.';
            }
        });
    }

    function validateLogin(username, password) {
        // Simulate validation (in production, API call)
        return username && password.length >= 6;
    }

    // Logout
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            localStorage.clear();
            window.location.href = 'login.html';
        });
    }

    // Simulated API Calls (using localStorage as "server")
    async function apiCall(endpoint, method = 'GET', data = null) {
        // Simulate fetch with localStorage
        return new Promise((resolve) => {
            setTimeout(() => {
                if (method === 'GET') {
                    const stored = localStorage.getItem(endpoint);
                    resolve(JSON.parse(stored) || []);
                } else if (method === 'POST') {
                    const stored = JSON.parse(localStorage.getItem(endpoint) || '[]');
                    stored.push(data);
                    localStorage.setItem(endpoint, JSON.stringify(stored));
                    resolve(data);
                } else if (method === 'DELETE') {
                    const stored = JSON.parse(localStorage.getItem(endpoint) || '[]');
                    const filtered = stored.filter(item => item.id !== data.id);
                    localStorage.setItem(endpoint, JSON.stringify(filtered));
                    resolve({ success: true });
                }
                // Simulate errors occasionally
                if (Math.random() < 0.1) resolve({ error: 'API Error' });
            }, 500); // Simulate delay
        });
    }

    // Real-time Updates (Simulated Polling for WebSockets)
    function startRealTimeUpdates() {
        setInterval(async () => {
            const leads = await apiCall('leads');
            const contacts = await apiCall('contacts');
            const businesses = await apiCall('businesses');
            updateDashboardStats(leads, contacts, businesses);
            showNotification('Data updated in real-time.');
        }, 10000); // Poll every 10 seconds
    }
    if (isLoggedIn) startRealTimeUpdates();

    // Form Validation
    function validateForm(formData, rules) {
        for (const [key, rule] of Object.entries(rules)) {
            if (rule.required && !formData[key]) return `${key} is required.`;
            if (rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[key])) return `Invalid ${key}.`;
            if (rule.minLength && formData[key].length < rule.minLength) return `${key} must be at least ${rule.minLength} characters.`;
        }
        return null;
    }

    // Search/Filter Functionality
    function addSearchFilter(listId, searchId, dataKey) {
        const searchInput = document.getElementById(searchId);
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                const query = this.value.toLowerCase();
                const list = document.getElementById(listId);
                const items = list.querySelectorAll('li');
                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    item.style.display = text.includes(query) ? '' : 'none';
                });
            });
        }
    }

    // Email/SMS Notifications (Mocked)
    function sendNotification(type, message) {
        console.log(`Sending ${type} notification: ${message}`);
        // In production: Use Nodemailer for email or Twilio for SMS
        showNotification(`Notification sent: ${message}`);
    }

    function showNotification(message) {
        const notifEl = document.getElementById('notifications');
        if (notifEl) {
            notifEl.textContent = message;
            setTimeout(() => notifEl.textContent = '', 5000);
        }
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            sidebar.classList.toggle('open');
        });
    }

    // User dropdown
    const userToggle = document.getElementById('user-toggle');
    const userDropdown = document.getElementById('user-dropdown');
    if (userToggle) {
        userToggle.addEventListener('click', function () {
            userDropdown.classList.toggle('hidden');
        });
    }

    // User Management (Admin Only)
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
    if (userForm && userList && userRole === 'admin') {
        let users = JSON.parse(localStorage.getItem('users')) || [];

        function updateUsersDisplay() {
            userList.innerHTML = '';
            users.forEach((user, index) => {
                const li = document.createElement('li');
                li.textContent = `${user.username} - ${user.email} - ${user.role}`;
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.addEventListener('click', () => {
                    document.getElementById('user-username').value = user.username;
                    document.getElementById('user-email').value = user.email;
                    document.getElementById('user-role').value = user.role;
                    users.splice(index, 1);
                });
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', () => {
                    users.splice(index, 1);
                    updateUsersDisplay();
                    localStorage.setItem('users', JSON.stringify(users));
                });
                li.appendChild(editBtn);
                li.appendChild(deleteBtn);
                userList.appendChild(li);
            });
        }

        userForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const formData = {
                username: document.getElementById('user-username').value,
                email: document.getElementById('user-email').value,
                role: document.getElementById('user-role').value,
                password: document.getElementById('user-password').value
            };
            const error = validateForm(formData, {
                username: { required: true, minLength: 3 },
                email: { required: true, email: true },
                password: { required: true, minLength: 6 }
            });
            if (error) {
                alert(error);
                return;
            }
            const newUser = await apiCall('users', 'POST', { ...formData, id: Date.now() });
            users.push(newUser);
            updateUsersDisplay();
            userForm.reset();
            sendNotification('email', `New user ${newUser.username} created.`);
        });

        updateUsersDisplay();
        addSearchFilter('user-list', 'user-search', 'users');
    }

    // Business Management (Admin Only)
    const businessForm = document.getElementById('business-form');
    const businessList = document.getElementById('business-list');
    if (businessForm && businessList && userRole === 'admin') {
        let businesses = JSON.parse(localStorage.getItem('businesses')) || [];

        function updateBusinessesDisplay() {
            businessList.innerHTML = '';
            businesses.forEach((business, index) => {
                const li = document.createElement('li');
                li.textContent = `${business.name} - ${business.industry} - ${business.email} - ${business.phone}`;
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.addEventListener('click', () => {
                    document.getElementById('business-name').value = business.name;
                    document.getElementById('business-industry').value = business.industry;
                    document.getElementById('business-email').value = business.email;
                    document.getElementById('business-phone').value = business.phone;
                    businesses.splice(index, 1);
                });
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', () => {
                    businesses.splice(index, 1);
                    updateBusinessesDisplay();
                    localStorage.setItem('businesses', JSON.stringify(businesses));
                });
                li.appendChild(editBtn);
                li.appendChild(deleteBtn);
                businessList.appendChild(li);
            });
        }

        businessForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const formData = {
                name: document.getElementById('business-name').value,
                industry: document.getElementById('business-industry').value,
                email: document.getElementById('business-email').value,
                phone: document.getElementById('business-phone').value
            };
            const error = validateForm(formData, {
                name: { required: true },
                industry: { required: true },
                email: { required: true, email: true }
            });
            if (error) {
                alert(error);
                return;
            }
            const newBusiness = await apiCall('businesses', 'POST', { ...formData, id: Date.now() });
            businesses.push(newBusiness);
            updateBusinessesDisplay();
            businessForm.reset();
            sendNotification('email', `New business ${newBusiness.name} added.`);
        });

        updateBusinessesDisplay();
        addSearchFilter('business-list', 'business-search', 'businesses'); // Assuming you add search to manage-businesses.html
    }

    // Lead Management
    const leadForm = document.getElementById('lead-form');
    const leadList = document.getElementById('lead-list');
    if (leadForm && leadList) {
        let leads = JSON.parse(localStorage.getItem('leads')) || [];

        function updateLeadsDisplay() {
            leadList.innerHTML = '';
            leads.forEach((lead, index) => {
                const li = document.createElement('li');
                li.textContent = `${lead.name} - ${lead.email} - ${lead.company}`;
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', () => {
                    leads.splice(index, 1);
                    updateLeadsDisplay();
                    localStorage.setItem('leads', JSON.stringify(leads));
                    updateDashboardStats();
                });
                li.appendChild(deleteBtn);
                leadList.appendChild(li);
            });
        }

        leadForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const formData = {
                name: document.getElementById('lead-name').value,
                email: document.getElementById('lead-email').value,
                company: document.getElementById('lead-company').value
            };
            const error = validateForm(formData, {
                name: { required: true },
                email: { required: true, email: true }
            });
            if (error) {
                alert(error);
                return;
            }
            const newLead = await apiCall('leads', 'POST', { ...formData, id: Date.now() });
            leads.push(newLead);
            updateLeadsDisplay();
            leadForm.reset();
            sendNotification('sms', `New lead ${newLead.name} added.`);
        });

        updateLeadsDisplay();
        addSearchFilter('lead-list', 'lead-search', 'leads'); // Assuming you add search to leads.html
    }

    // Contact Management
    const contactForm = document.getElementById('contact-form');
    const contactList = document.getElementById('contact-list');
    if (contactForm && contactList) {
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

        function updateContactsDisplay() {
            contactList.innerHTML = '';
            contacts.forEach((contact, index) => {
                const li = document.createElement('li');
                li.textContent = `${contact.name} - ${contact.email} - ${contact.company}`;
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', () => {
                    contacts.splice(index, 1);
                    updateContactsDisplay();
                    localStorage.setItem('contacts', JSON.stringify(contacts));
                });

                li.appendChild(deleteBtn);
                contactList.appendChild(li);
            });
        }

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const formData = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                company: document.getElementById('contact-company').value
            };
            const error = validateForm(formData, {
                name: { required: true },
                email: { required: true, email: true }
            });
            if (error) {
                alert(error);
                return;
            }
            const newContact = await apiCall('contacts', 'POST', { ...formData, id: Date.now() });
            contacts.push(newContact);
            updateContactsDisplay();
            contactForm.reset();
            sendNotification('email', `New contact ${newContact.name} added.`);
        });

        updateContactsDisplay();
        addSearchFilter('contact-list', 'contact-search', 'contacts'); // Assuming you add search to contacts.html
    }

    // Settings form
    const settingsForm = document.getElementById('settings-form');
    const themeSelect = document.getElementById('theme');
    if (settingsForm && themeSelect) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        themeSelect.value = savedTheme;
        applyTheme(savedTheme);

        settingsForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const selectedTheme = themeSelect.value;
            localStorage.setItem('theme', selectedTheme);
            applyTheme(selectedTheme);
        });
    }

    function applyTheme(theme) {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.style.setProperty('--primary-color', '#222');
            root.style.setProperty('--secondary-color', '#333');
            root.style.setProperty('--bg-color', '#111');
            root.style.setProperty('--text-color', '#fff');
        } else {
            root.style.setProperty('--primary-color', '#8A2BE2');
            root.style.setProperty('--secondary-color', '#000000');
            root.style.setProperty('--bg-color', '#fff');
            root.style.setProperty('--text-color', '#333');
        }
    }

    // Update dashboard stats
    function updateDashboardStats(leads = null, contacts = null, businesses = null) {
        leads = leads || JSON.parse(localStorage.getItem('leads')) || [];
        contacts = contacts || JSON.parse(localStorage.getItem('contacts')) || [];
        businesses = businesses || JSON.parse(localStorage.getItem('businesses')) || [];
        const activeDeals = JSON.parse(localStorage.getItem('activeDeals')) || 0;
        const revenueForecast = JSON.parse(localStorage.getItem('revenueForecast')) || 0;

        const totalLeadsEl = document.getElementById('total-leads');
        if (totalLeadsEl) totalLeadsEl.textContent = leads.length;
        const activeDealsEl = document.getElementById('active-deals');
        if (activeDealsEl) activeDealsEl.textContent = activeDeals;
        const revenueEl = document.getElementById('revenue-forecast');
        if (revenueEl) revenueEl.textContent = `$${revenueForecast}`;
        const totalBusinessesEl = document.getElementById('total-businesses');
        if (totalBusinessesEl) totalBusinessesEl.textContent = businesses.length;
        const totalUsersEl = document.getElementById('total-users');
        if (totalUsersEl) totalUsersEl.textContent = (JSON.parse(localStorage.getItem('users')) || []).length;
    }

    if (document.querySelector('#dashboard') || document.querySelector('#admin-dashboard')) {
        updateDashboardStats();
    }

    // Analytics chart placeholder
    const chartCanvas = document.getElementById('analytics-chart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        ctx.fillStyle = '#4B0082';
        ctx.fillRect(0, 0, 400, 200);
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.fillText('Sample Chart (Integrate Chart.js)', 50, 100);
    }

    // Add notifications section to dashboards (if not present, add <p id="notifications"></p> to HTML)
    if (document.querySelector('#dashboard') || document.querySelector('#admin-dashboard')) {
        const notifEl = document.createElement('p');
        notifEl.id = 'notifications';
        notifEl.style.color = 'yellow';
        document.querySelector('main').appendChild(notifEl);
    }
});