document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    const glassDiv = document.querySelector('.hero-content .glass');

    // Maneja la visibilidad del menú y la clase activa
    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('active');
    };

    menuIcon.addEventListener('click', toggleMenu);

    document.addEventListener('click', function (event) {
        const isClickInside = navLinks.contains(event.target) || menuIcon.contains(event.target);
        if (!isClickInside) {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('active');
        }
    });

    // Cierra el menú al hacer clic en un enlace
    navLinks.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('active');
        }
    });

    // Maneja el cambio de fondo del header al hacer scroll
    let ticking = false;

    const toggleHeaderScrolledClass = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                toggleHeaderScrolledClass();
                ticking = false;
            });
            ticking = true;
        }
    });
    toggleHeaderScrolledClass(); // Llamada inicial

    // Oculta o muestra el div glass según el tamaño de la ventana
    const handleResize = () => {
        glassDiv.style.display = window.innerWidth <= 560 ? 'none' : 'block';
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Llamada inicial

    // Inicialización de Swipers
    initSwipers();
});

// Inicialización de Swipers
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

/***************Carga diferida de imagenes  ****************/
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img[data-src]"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.removeAttribute("data-src");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
    }
});
