// Funciones de utilidad
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Función para manejar la visibilidad del menú
const toggleMenu = () => {
    $('.nav-links').classList.toggle('active');
    $('.menu-icon').classList.toggle('active');
};

// Función para manejar el cambio de fondo del header
const toggleHeaderScrolledClass = () => {
    $('.header').classList.toggle('scrolled', window.scrollY > 50);
};

// Función para manejar el tamaño de la ventana
const handleResize = () => {
    $('.hero-content .glass').style.display = window.innerWidth <= 560 ? 'none' : 'block';
};

// Inicialización de Swipers
const initSwipers = () => {
    if ($('.mySwiper')) {
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
    }

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
        breakpoints: {
            320: { slidesPerView: 3, spaceBetween: 20 },
            480: { slidesPerView: 4, spaceBetween: 30 },
            640: { slidesPerView: 5, spaceBetween: 40 },
            1024: { slidesPerView: 7, spaceBetween: 50 }
        }
    });

    const swiperEl = $('.devices-swiper');
    if (swiperEl) {
        swiperEl.addEventListener('mouseenter', () => devicesSwiper.autoplay.stop());
        swiperEl.addEventListener('mouseleave', () => devicesSwiper.autoplay.start());
        swiperEl.addEventListener('touchstart', () => devicesSwiper.autoplay.stop(), { passive: true });
        swiperEl.addEventListener('touchend', () => devicesSwiper.autoplay.start());
    }
};

// Carga diferida de imágenes
const lazyLoadImages = () => {
    const lazyImages = [...$$("img[data-src]")];
    
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.removeAttribute("data-src");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach((lazyImage) => {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        lazyImages.forEach((lazyImage) => {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.removeAttribute("data-src");
        });
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    $('.menu-icon').addEventListener('click', toggleMenu);

    document.addEventListener('click', (event) => {
        const isClickInside = $('.nav-links').contains(event.target) || $('.menu-icon').contains(event.target);
        if (!isClickInside) {
            $('.nav-links').classList.remove('active');
            $('.menu-icon').classList.remove('active');
        }
    });

    $('.nav-links').addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            $('.nav-links').classList.remove('active');
            $('.menu-icon').classList.remove('active');
        }
    });

    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                toggleHeaderScrolledClass();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });
    toggleHeaderScrolledClass(); // Llamada inicial

    window.addEventListener('resize', handleResize);
    handleResize(); // Llamada inicial

    initSwipers();
    lazyLoadImages();
});