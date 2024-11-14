/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50
        const sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== CHANGE HEADER BACKGROUND =====*/
function scrollHeader() {
    const nav = document.querySelector('.l-header')
    if (this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '100px',
    duration: 1000,
    delay: 200,
    reset: false  // Disable global reset to prevent interference with decorative elements
});

// Home Section Animations
sr.reveal('.home__title', { delay: 200, reset: true });
sr.reveal('.home__name', { delay: 400, reset: true });
sr.reveal('.home__subtitle', { delay: 600, reset: true });
sr.reveal('.button', { delay: 800, reset: true });
sr.reveal('.home__social-icon', { interval: 200, delay: 1000, reset: true });
sr.reveal('.home__img', { delay: 1200, reset: true });

// About Section Animations
sr.reveal('.about__subtitle', { delay: 200, reset: true });
sr.reveal('.about__text', { delay: 400, reset: true });
sr.reveal('.about__img', { delay: 600, reset: true });

// Skills Section Animations
sr.reveal('.skills__subtitle', { delay: 200, reset: true });
sr.reveal('.skills__text', { delay: 400, reset: true });
sr.reveal('.skills__data', { interval: 200, reset: true });
sr.reveal('.skills__img', { delay: 600, reset: true });

// Projects Section Animations
sr.reveal('.projects__img', { interval: 200, reset: true });

// Contact Section Animations
sr.reveal('.contact__input', { interval: 200, reset: true });
