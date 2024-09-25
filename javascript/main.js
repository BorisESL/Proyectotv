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

const initSwiper = () => {
    const swiper = new Swiper(".mySwiper", {
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

initSwiper();

/********** Ocultar div del glass ********/

document.addEventListener('DOMContentLoaded', function() {
    const glassDiv = document.querySelector('.hero-content .glass');
    
    function handleResize() {
        if (window.innerWidth <= 560) {
            glassDiv.style.display = 'none';
        } else {
            glassDiv.style.display = 'block'; // o el valor original, como 'flex' si es necesario
        }
    }

    // Ejecutar la función al cargar la página y en cada cambio de tamaño
    handleResize();
    window.addEventListener('resize', handleResize);
});

