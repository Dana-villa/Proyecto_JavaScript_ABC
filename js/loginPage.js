async function jsonLoader() {
    const response = await fetch("../json/info-admin.json");
    const data = await response.json();
    return data[0];
}

document.addEventListener("DOMContentLoaded", function () {

    const togglePassword = document.getElementById("toggle-password");
    const passwordField = document.getElementById("password-field");

    if (togglePassword && passwordField) {
        togglePassword.addEventListener("click", function () {

            const type = passwordField.type === "password" ? "text" : "password";
            passwordField.type = type;

            togglePassword.style.opacity = type === "text" ? "0.7" : "1";
        });
    }

    const loginForm = document.querySelector(".tarjeta-login");

    if (sessionStorage.getItem("isLoggedIn")) {
        window.location.href = "modulo-admin.html";
        return;
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {

            e.preventDefault();

            const email = document.getElementById("user-name").value.trim();
            const password = passwordField.value.trim();

            const data = await jsonLoader();

            const VALID_EMAIL = data.email;
            const VALID_PASS = data.password;

            if (email === VALID_EMAIL && password === VALID_PASS) {

                sessionStorage.setItem("isLoggedIn", "true");
                window.location.href = "modulo-admin.html";

            } else {
                alert("Correo o contraseña incorrectos.");
            }

        });
    }

});