// Script para mostrar/ocultar contraseña
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.querySelector('.icon-eye');

// Evento para el ícono de ojo
eyeIcon.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text'; // Mostrar texto
        eyeIcon.style.color = '#007bff'; // Cambiar color del ícono
    } else {
        passwordInput.type = 'password'; // Ocultar texto
        eyeIcon.style.color = '#aaa'; // Restaurar color del ícono
    }
});
});