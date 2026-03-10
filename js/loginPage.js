/**
 * Configuración y Constantes
 */
const ENDPOINTS = {
    ADMIN: "../json/info-admin.json",
    MODULES: "../json/modules.json",
    TEACHERS: "../json/profesores.json"
};

const REDIRECTS = {
    ADMIN: "modulo-admin.html",
    DASHBOARD: "../pages/gestion-cursos.html"
};

/**
 * Utilidades de Datos
 */
const api = {
    async fetchJson(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error cargando: ${url}`);
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }
};

/**
 * Lógica Principal
 */
document.addEventListener("DOMContentLoaded", () => {
    // Redirección si ya está logueado
    if (sessionStorage.getItem("isLoggedIn")) {
        window.location.href = REDIRECTS.ADMIN;
        return;
    }

    initPasswordToggle();
    initLoginForm();
});

/**
 * Funcionalidad de Mostrar/Ocultar Contraseña
 */
function initPasswordToggle() {
    const toggleBtn = document.getElementById("toggle-password");
    const passwordInput = document.getElementById("password-field");

    if (!toggleBtn || !passwordInput) return;

    toggleBtn.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";
        toggleBtn.style.opacity = isPassword ? "0.7" : "1";
    });
}

/**
 * Gestión del Formulario de Login
 */
function initLoginForm() {
    const loginForm = document.querySelector(".tarjeta-login");
    const passwordInput = document.getElementById("password-field");

    if (!loginForm) return;

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("user-name").value.trim();
        const password = passwordInput.value.trim();

        const adminData = await api.fetchJson(ENDPOINTS.ADMIN);
        if (!adminData) return;
        const { email: validEmail, password: validPass } = adminData[0];

        if (email === validEmail && password === validPass) {
            sessionStorage.setItem("isLoggedIn", "true");
            await syncInitialStorage();
            window.location.href = REDIRECTS.DASHBOARD;
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    });
}

/**
 * Inicialización de Base de Datos Local
 */
async function syncInitialStorage() {
    localStorage.clear();

    const [modules, teachers] = await Promise.all([
        api.fetchJson(ENDPOINTS.MODULES),
        api.fetchJson(ENDPOINTS.TEACHERS)
    ]);

    if (modules) {
        localStorage.setItem('courses', JSON.stringify(modules));
    }
    
    if (teachers) {
        localStorage.setItem('docentes', JSON.stringify(teachers));
    }
}