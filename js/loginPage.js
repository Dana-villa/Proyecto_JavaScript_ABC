// loginPage.js
// Mostrar / ocultar contraseña + login con sessionStorage

async function jsonLoader() {
    const response = await fetch("../json/info-admin.json")
    const data = await response.json()
    return data[0]
}


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

    const loginForm = document.querySelector('.tarjeta-login');

    // Si ya está logueado, redirigir automáticamente
    if (sessionStorage.getItem("isLoggedIn")) {
        window.location.href = "../index.html"; // Ajusta la ruta si es necesario
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {

            e.preventDefault();

            const email = document.getElementById('user-name').value.trim();
            const password = passwordField.value.trim();

            // 🔐 Credenciales de prueba
            const data = await jsonLoader()

            const VALID_EMAIL = data.email;
            const VALID_PASS = data.password;

            if (email === VALID_EMAIL && password === VALID_PASS) {

                sessionStorage.setItem("isLoggedIn", "true");

                window.location.href = "../index.html"; // Ajusta ruta

            } else {
                alert("Correo o contraseña incorrectos.");
            }

        });
    }

});