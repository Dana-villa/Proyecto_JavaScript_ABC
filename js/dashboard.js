/**
 * Navigation & Quick Access Management
 */
document.addEventListener('DOMContentLoaded', () => {

  const sidebarMenu = document.querySelector('.sidebar-nav'); // Assuming a parent container exists
  const menuItems = document.querySelectorAll('.menu-item');
  const accesosItems = document.querySelectorAll('.acceso-item');

  /**
   * Updates the 'active' class for sidebar navigation
   * @param {HTMLElement} clickedItem 
   */
  const setActiveMenuItem = (clickedItem) => {
    menuItems.forEach(item => item.classList.remove('active'));
    clickedItem.classList.add('active');

    const label = clickedItem.querySelector('span')?.innerText;
    console.log(`Navegando a: ${label}`);
  };

  // Sidebar Menu Events
  menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      setActiveMenuItem(this);
    });
  });

  // Quick Access (Accesos Rápidos) Events
  accesosItems.forEach(item => {
    item.addEventListener('click', function() {
      const texto = this.querySelector('span')?.innerText || 'elemento';
      console.log(`Acceso rápido seleccionado: ${texto}`);
      
    });
  });

});