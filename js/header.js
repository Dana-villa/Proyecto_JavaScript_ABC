async function jsonHandler(file) {
    const response = await fetch(file)
    const data = await response.json();
    return data
}

document.addEventListener('DOMContentLoaded', async function() {

    const data = await jsonHandler("../json/info-admin.json")

    const avatarTrigger = document.getElementById('avatarMenuTrigger');
    const avatarDropdown = document.getElementById('avatarDropdown');

    if (avatarTrigger && avatarDropdown) {
        avatarTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            avatarDropdown.classList.toggle('show');
        });

        document.addEventListener('click', function(event) {
            if (!avatarTrigger.contains(event.target) && !avatarDropdown.contains(event.target)) {
                avatarDropdown.classList.remove('show');
            }
        });

        avatarDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            if (e.target.tagName === 'LI') {
                console.log('Opción seleccionada:', e.target.innerText);
                avatarDropdown.classList.remove('show');
            }
        });
    }

    const cerrarSesionBtn = document.querySelector('.cerrar-sesion');
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', function() {
            console.log('Cerrar sesión (simulado)');
            alert('Sesión cerrada (demostración)');
        });
    }

    const notificacionIcon = document.querySelector('.notificacion');
    if (notificacionIcon) {
        notificacionIcon.addEventListener('click', function() {
            console.log('Notificaciones: 3 no leídas');
            alert('Tienes 3 notificaciones nuevas (simulación)');
        });
    }

    document.querySelector(".welcome-title").textContent = `Bienvenido de Vuelta, ${data[0].name}`
    document.querySelector(".avatar-nombre").textContent = `${data[0].name}`
});