/**
 * Utility: Fetch JSON data
 */
async function jsonHandler(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch JSON:", error);
    return null;
  }
}

/**
 * Main Dashboard Initialization
 */
document.addEventListener('DOMContentLoaded', async () => {
  const data = await jsonHandler("../json/info-admin.json");

  // Update UI with Admin Data
  if (data && data[0]) {
    const admin = data[0];
    const welcomeTitle = document.querySelector(".welcome-title");
    const avatarName = document.querySelector(".avatar-nombre");

    if (welcomeTitle) welcomeTitle.textContent = `Bienvenido de Vuelta, ${admin.name}`;
    if (avatarName) avatarName.textContent = admin.name;
  }

  /**
   * Avatar Menu Logic
   */
  const avatarTrigger = document.getElementById('avatarMenuTrigger');
  const avatarDropdown = document.getElementById('avatarDropdown');

  if (avatarTrigger && avatarDropdown) {
    // Toggle menu
    avatarTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      avatarDropdown.classList.toggle('show');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!avatarTrigger.contains(e.target) && !avatarDropdown.contains(e.target)) {
        avatarDropdown.classList.remove('show');
      }
    });

    // Handle menu item clicks (Event Delegation)
    avatarDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      const listItem = e.target.closest('li');
      if (listItem) {
        console.log('Opción seleccionada:', listItem.innerText);
        avatarDropdown.classList.remove('show');
      }
    });
  }

  /**
   * Action Buttons (Logout & Notifications)
   */
  const cerrarSesionBtn = document.querySelector('.cerrar-sesion');
  if (cerrarSesionBtn) {
    cerrarSesionBtn.onclick = () => {
      console.log('Cerrar sesión (simulado)');
      alert('Sesión cerrada (demostración)');
    };
  }

  const notificacionIcon = document.querySelector('.notificacion');
  if (notificacionIcon) {
    notificacionIcon.onclick = () => {
      console.log('Notificaciones: 3 no leídas');
      alert('Tienes 3 notificaciones nuevas (simulación)');
    };
  }
});