// loginPage.js
// Mostrar / ocultar contraseña + login con sessionStorage

document.addEventListener('DOMContentLoaded', function () {

    /* =========================
       MOSTRAR / OCULTAR PASSWORD
    ========================== */

    const togglePassword = document.getElementById('toggle-password');
    const passwordField = document.getElementById('password-field');

    if (togglePassword && passwordField) {
        togglePassword.addEventListener('click', function () {

            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);

            togglePassword.style.opacity = type === 'text' ? '0.7' : '1';
        });
    }


    /* =========================
       LOGIN
    ========================== */

    const loginForm = document.getElementById('login-form');

    // Si ya está logueado, redirigir automáticamente
    if (sessionStorage.getItem("isLoggedIn")) {
        window.location.href = "../index.html"; // Ajusta la ruta si es necesario
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {

            e.preventDefault();

            const email = document.getElementById('username').value.trim();
            const password = passwordField.value.trim();

            // 🔐 Credenciales de prueba
            const VALID_EMAIL = "admin@abc.com";
            const VALID_PASS = "1234";

            if (email === VALID_EMAIL && password === VALID_PASS) {

                sessionStorage.setItem("isLoggedIn", "true");

                window.location.href = "../index.html"; // Ajusta ruta

            } else {
                alert("Correo o contraseña incorrectos.");
            }

        });
    }

});