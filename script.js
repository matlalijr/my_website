
// Smooth scroll implementation
const smoothScroll = (target, duration = 1000) => {
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - 80;
    let startTime = null;

    const animation = currentTime => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
};

// Reveal animations on scroll
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

// Mobile menu functionality
const initMobileMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const spans = menuToggle.querySelectorAll('span');

    menuToggle.addEventListener('click', () => {
        navMobile.classList.toggle('active');

        spans[0].style.transform = navMobile.classList.contains('active') 
            ? 'rotate(45deg) translate(5px, 5px)' 
            : '';
        spans[1].style.opacity = navMobile.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMobile.classList.contains('active')
            ? 'rotate(-45deg) translate(7px, -7px)'
            : '';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMobile.contains(e.target)) {
            navMobile.classList.remove('active');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '1';
            });
        }
    });

    // Close menu on navigation
    document.querySelectorAll('.nav-mobile a').forEach(link => {
        link.addEventListener('click', () => {
            navMobile.classList.remove('active');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '1';
            });
        });
    });
};

// Form submission handler
const initContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (button.disabled) return;

        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            button.innerHTML = '<i class="fas fa-check"></i> Sent!';
            button.classList.add('success');
            form.reset();

            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = originalText;
                button.classList.remove('success');
            }, 3000);

        } catch (error) {
            button.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed';
            button.classList.add('error');

            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = originalText;
                button.classList.remove('error');
            }, 3000);
        }
    });
};

// Navbar scroll effect
const initNavbarScroll = () => {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
};

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScroll(target);
            }
        });
    });

    // Initialize components
    observeElements();
    initMobileMenu();
    initContactForm();
    initNavbarScroll();
});
