document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    const glassDiv = document.querySelector('.hero-content .glass');

    // Toggle menu visibility
    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('active');
    };

    menuIcon.addEventListener('click', toggleMenu);

    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !menuIcon.contains(event.target)) {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('active');
        }
    });

    navLinks.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('active');
        }
    });

    // Header background change on scroll
    let ticking = false;

    const toggleHeaderScrolledClass = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };

    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                toggleHeaderScrolledClass();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll);
    toggleHeaderScrolledClass(); // Initial call

    // Show/hide glassDiv based on window size
    const handleResize = () => {
        glassDiv.style.display = window.innerWidth <= 560 ? 'none' : 'block';
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    // Initialize Swipers
    initSwipers();
});

// Initialize Swipers with optimized configurations
const initSwipers = () => {
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

    devicesSwiper.el.addEventListener('mouseenter', () => devicesSwiper.autoplay.stop());
    devicesSwiper.el.addEventListener('mouseleave', () => devicesSwiper.autoplay.start());
};

// Lazy loading of images with IntersectionObserver
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll("img[data-src]");

    if ("IntersectionObserver" in window) {
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.removeAttribute("data-src");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach((lazyImage) => {
            lazyImageObserver.observe(lazyImage);
        });
    }
});
