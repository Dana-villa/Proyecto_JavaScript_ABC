async function jsonLoader() {
    const response = await fetch("../json/info-admin.json");
    const data = await response.json();
    return data[0];
}
localStorage.clear()

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
                await setStorage()
                window.location.href = "../pages/gestion-cursos.html";

            } else {
                alert("Correo o contraseña incorrectos.");
            }

        });
    }

});

async function setStorage(){
    const courseResponse = await fetch('../json/modules.json')
    const teachersResponse = await fetch('../json/profesores.json')

    const courseData = await courseResponse.json()
    const teacherData = await teachersResponse.json()  
    
    const courseExistingData = JSON.parse(localStorage.getItem("courses")) || [];
    const teacherExistingData = JSON.parse(localStorage.getItem("docentes")) || [];

    courseData.forEach((module,i) => {
        courseExistingData.push(courseData[i]);
    });
    teacherData.forEach((module,i) => {
        teacherExistingData.push(teacherData[i]);
    });
    localStorage.setItem('courses', JSON.stringify(courseExistingData))
    localStorage.setItem('docentes', JSON.stringify(teacherExistingData))
}
