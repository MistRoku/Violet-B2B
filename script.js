// script.js - Full-Stack VioletCRM with PHP/MySQL
document.addEventListener('DOMContentLoaded', async function () {
    // Check session on load
    const response = await fetch('check_session.php');
    const sessionData = await response.json();
    const isLoggedIn = sessionData.loggedIn;
    const userRole = sessionData.role;

    if (!isLoggedIn && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const response = await fetch('login.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                window.location.href = result.role === 'admin' ? 'admin-dashboard.html' : 'index.html';
            } else {
                document.getElementById('login-message').textContent = result.message;
            }
        });
    }

    // Logout
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function () {
            await fetch('logout.php');
            window.location.href = 'login.html';
        });
    }

    // Mobile menu
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

    // Form validation
    function validateForm(formData, rules) {
        for (const [key, rule] of Object.entries(rules)) {
            if (rule.required && !formData[key]) return `${key} is required.`;
            if (rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[key])) return `Invalid ${key}.`;
            if (rule.minLength && formData[key].length < rule.minLength) return `${key} must be at least ${rule.minLength} characters.`;
        }
        return null;
    }

    // Search/Filter
    function addSearchFilter(listId, searchId, data) {
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

    // Notifications
    function sendNotification(type, message) {
        console.log(`Sending ${type}: ${message}`);
        // For email: fetch('send_notification.php', { method: 'POST', body: JSON.stringify({ type, message }) });
    }

    // Real-time updates
    function startRealTimeUpdates() {
        setInterval(async () => {
            await updateDashboardStats();
            showNotification('Data updated.');
        }, 10000);
    }
    if (isLoggedIn) startRealTimeUpdates();

    // User Management (Admin)
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
    if (userForm && userList && userRole === 'admin') {
        async function updateUsersDisplay() {
            const response = await fetch('users.php');
            const users = await response.json();
            userList.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.username} - ${user.email} - ${user.role}`;
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', async () => {
                    await fetch('users.php', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: user.id })
                    });
                    updateUsersDisplay();
                });
                li.appendChild(deleteBtn);
                userList.appendChild(li);
            });
        }

        userForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const formData = {
                username: document.getElementById('user-username').value,
                email: document.getElementById('user-email').value,
                password: document.getElementById('user-password').value,
                role: document.getElementById('user-role').value
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
            await fetch('users.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            updateUsersDisplay();
            userForm.reset();
            sendNotification('email', `User ${formData.username} added.`);
        });

        updateUsersDisplay();
        addSearchFilter('user-list', 'user-search', []);
    }

    // Business Management (Admin)
    const businessForm = document.getElementById('business-form');
    const businessList = document.getElementById('business-list');
    if (businessForm && businessList && userRole === 'admin') {
        async function updateBusinessesDisplay() {
            const response = await fetch('businesses.php');
            const businesses = await response.json();
            businessList.innerHTML = '';
            businesses.forEach(business => {
                const li = document.createElement('li');
                li.textContent = `${business.name} - ${business.industry}`;
                businessList.appendChild(li);
            });
            const totalBusinessesEl = document.getElementById('total-businesses');
            if (totalBusinessesEl) totalBusinessesEl.textContent = businesses.length;
            const totalUsersEl = document.getElementById('total-users');
            if (totalUsersEl) totalUsersEl.textContent = users.length;
        }
        updateBusinessesDisplay();
    }

    if (document.querySelector('#dashboard') || document.querySelector('#admin-dashboard')) {
        updateDashboardStats();
    }

    // Analytics chart
    const chartCanvas = document.getElementById('analytics-chart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        ctx.fillStyle = '#4B0082';
        ctx.fillRect(0, 0, 400, 200);
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.fillText('Sample Chart (Integrate Chart.js)', 50, 100);
    }

    // Notifications
    function showNotification(message) {
        const notifEl = document.getElementById('notifications');
        if (notifEl) {
            notifEl.textContent = message;
            setTimeout(() => notifEl.textContent = '', 5000);
        }
    }

    if (document.querySelector('#dashboard') || document.querySelector('#admin-dashboard')) {
        const notifEl = document.createElement('p');
        notifEl.id = 'notifications';
        notifEl.style.color = 'yellow';
        document.querySelector('main').appendChild(notifEl);
    }
});
});
