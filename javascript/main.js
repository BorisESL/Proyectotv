document.addEventListener('DOMContentLoaded', function() {
    // Selecciona los elementos necesarios
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');

    // Añade un event listener al icono del menú
    menuIcon.addEventListener('click', function() {
        // Alterna la clase 'active' en navLinks y menuIcon
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('active');
    });

    // Cierra el menú si se hace clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navLinks.contains(event.target) || menuIcon.contains(event.target);
        if (!isClickInsideMenu && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('active');
        }
    });

    // Cierra el menú cuando se hace clic en un enlace (para navegación de una sola página)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('active');
        });
    });

    // Maneja el cambio de fondo del header al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});