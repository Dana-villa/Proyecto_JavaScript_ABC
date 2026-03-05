// dashboard.js - Interacciones visuales mínimas para el dashboard

document.addEventListener('DOMContentLoaded', function() {
    // ===== 1. MANEJO DEL ÍTEM ACTIVO EN EL MENÚ LATERAL =====
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Función para quitar la clase 'active' de todos y ponerla en el clicado
    function setActiveMenuItem(clickedItem) {
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
        clickedItem.classList.add('active');
        
        // Aquí se podría cambiar el contenido principal, pero solo es visual
        console.log('Ítem activo:', clickedItem.querySelector('span')?.innerText);
    }

    // Asignar evento a cada ítem del menú
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar conflictos
            setActiveMenuItem(this);
        });
    });

    // ===== 2. DROPDOWN DEL AVATAR (al hacer clic en User Pérez) =====
    const avatarTrigger = document.getElementById('avatarMenuTrigger');
    const avatarDropdown = document.getElementById('avatarDropdown');

    if (avatarTrigger && avatarDropdown) {
        avatarTrigger.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que el clic cierre inmediatamente
            avatarDropdown.classList.toggle('show');
        });

        // Cerrar dropdown si se hace clic fuera
        document.addEventListener('click', function(event) {
            if (!avatarTrigger.contains(event.target) && !avatarDropdown.contains(event.target)) {
                avatarDropdown.classList.remove('show');
            }
        });

        // Evitar que el dropdown se cierre al hacer clic dentro de sus opciones (opcional)
        avatarDropdown.addEventListener('click', function(e) {
            e.stopPropagation(); // Mantener abierto si se hace clic en las opciones
            // Podrías agregar acciones para cada opción aquí
            if (e.target.tagName === 'LI') {
                console.log('Opción seleccionada:', e.target.innerText);
                avatarDropdown.classList.remove('show'); // Cerrar tras seleccionar (opcional)
            }
        });
    }

    // ===== 3. EFECTO EN BOTÓN "CERRAR SESIÓN" (solo console.log) =====
    const cerrarSesionBtn = document.querySelector('.cerrar-sesion');
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', function() {
            console.log('Cerrar sesión (simulado)');
            // Aquí no se implementa lógica real, solo feedback visual
            alert('Sesión cerrada (demostración)');
        });
    }

    // ===== 4. PEQUEÑA INTERACCIÓN EN TARJETAS DE ACCESO RÁPIDO =====
    const accesosItems = document.querySelectorAll('.acceso-item');
    accesosItems.forEach(item => {
        item.addEventListener('click', function() {
            const texto = this.querySelector('span')?.innerText || 'elemento';
            console.log(`Acceso rápido seleccionado: ${texto}`);
            // Podría resaltarse visualmente, pero mantenemos solo console
        });
    });

    // ===== 5. NOTIFICACIÓN SIMULADA (al hacer clic en campana) =====
    const notificacionIcon = document.querySelector('.notificacion');
    if (notificacionIcon) {
        notificacionIcon.addEventListener('click', function() {
            console.log('Notificaciones: 3 no leídas');
            alert('Tienes 3 notificaciones nuevas (simulación)');
        });
    }
});