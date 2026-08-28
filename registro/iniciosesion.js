const tabButtons = document.querySelectorAll('.tab-btn');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

if (tabButtons.length) {
    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const link = button.dataset.link;
            if (link) {
                window.location.href = link;
            }
        });
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        window.location.href = '/index.html';
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        window.location.href = 'iniciosesion.html';
    });
}
