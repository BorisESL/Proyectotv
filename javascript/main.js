document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');

    menuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {
        const isClickInsideMenu = navLinks.contains(event.target) || menuIcon.contains(event.target);
        if (!isClickInsideMenu && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('active');
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('active');
        });
    });

    // Maneja el cambio de fondo del header al hacer scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Llamada inicial para establecer el estado correcto del header
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
});


