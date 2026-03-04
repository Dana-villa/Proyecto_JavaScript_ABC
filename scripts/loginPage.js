// script.js - funcionalidad mínima: mostrar/ocultar contraseña

document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('toggle-password');
    const passwordField = document.getElementById('password-field');

    if (togglePassword && passwordField) {
        togglePassword.addEventListener('click', function() {
            // Cambiar el tipo de input entre 'password' y 'text'
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);

            // Alternar el icono (opcional, pero se mantiene el mismo emoji)
            // Si se quisiera cambiar a un ojo tachado, se podría, pero la imagen usa el mismo.
            // Solo para dar feedback sutil:
            if (type === 'text') {
                togglePassword.style.opacity = '0.7';
            } else {
                togglePassword.style.opacity = '1';
            }
        });
    }
});