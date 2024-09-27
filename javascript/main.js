document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    const glassDiv = document.querySelector('.hero-content .glass');

    // Maneja la visibilidad del menú y la clase activa
    menuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {
        if (!navLinks.contains(event.target) && !menuIcon.contains(event.target)) {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('active');
        }
    });

    // Cierra el menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('active');
        });
    });

    // Maneja el cambio de fondo del header al hacer scroll
    const toggleHeaderScrolledClass = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', toggleHeaderScrolledClass);
    toggleHeaderScrolledClass(); // Llamada inicial para establecer el estado correcto del header

    // Oculta o muestra el div glass según el tamaño de la ventana
    const handleResize = () => {
        glassDiv.style.display = window.innerWidth <= 560 ? 'none' : 'block';
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Inicialización de Swipers
    initSwipers();
});

// Inicialización Swipers
const initSwipers = () => {
    // Swiper de .mySwiper
    new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 15,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: true,
        },
        loop: true,
    });

    // Swiper de .devices-swiper
    const devicesSwiper = new Swiper('.devices-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        speed: 5000,
        freeMode: {
            enabled: true,
            momentum: false,
        },
        allowTouchMove: false,
        breakpoints: {
            320: { slidesPerView: 3, spaceBetween: 20 },
            480: { slidesPerView: 4, spaceBetween: 30 },
            640: { slidesPerView: 5, spaceBetween: 40 },
            1024: { slidesPerView: 7, spaceBetween: 50 }
        }
    });

    // Pausa el autoplay en hover y lo reanuda al salir
    devicesSwiper.el.addEventListener('mouseenter', () => devicesSwiper.autoplay.stop());
    devicesSwiper.el.addEventListener('mouseleave', () => devicesSwiper.autoplay.start());
};
