document.addEventListener('DOMContentLoaded', function() {

    const menuItems = document.querySelectorAll('.menu-item');

    function setActiveMenuItem(clickedItem) {
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
        clickedItem.classList.add('active');
        
        console.log('Ítem activo:', clickedItem.querySelector('span')?.innerText);
    }

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            setActiveMenuItem(this);
        });
    });

    const accesosItems = document.querySelectorAll('.acceso-item');
    accesosItems.forEach(item => {
        item.addEventListener('click', function() {
            const texto = this.querySelector('span')?.innerText || 'elemento';
            console.log(`Acceso rápido seleccionado: ${texto}`);
        });
    });

});