// ================================
// DOM Elements
// ================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const faqItems = document.querySelectorAll('.faq-item');
const contactForm = document.getElementById('contactForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const foodItems = document.querySelectorAll('.food-item');

// ================================
// Mobile Navigation Toggle
// ================================

function toggleNav() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeNav() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Hamburger click
if (hamburger) {
    hamburger.addEventListener('click', toggleNav);
    
    // Keyboard support for hamburger
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleNav();
        }
    });
}

// Close nav when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeNav();
    });
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        closeNav();
    }
});

// ESC key closes menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeNav();
    }
});

// ================================
// Smooth Scrolling
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just '#'
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// Active Link on Scroll
// ================================

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            const section = document.querySelector(href);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        }
    });
}

// ================================
// Header Scroll Effect
// ================================

function handleScroll() {
    const scrollY = window.scrollY;
    
    // Header style on scroll
    if (scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    if (scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
    
    // Update active navigation link
    updateActiveLink();
    
    // Parallax effect for hero section
    const heroBackground = document.querySelector('.hero-background');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroBackground && scrollY < window.innerHeight) {
        const parallaxSpeed = 0.5;
        heroBackground.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
    }
    
    if (heroImage && scrollY < window.innerHeight) {
        const imageParallaxSpeed = 0.3;
        heroImage.style.transform = `translateY(${scrollY * imageParallaxSpeed}px)`;
    }
}

window.addEventListener('scroll', handleScroll);

// ================================
// Scroll to Top Button
// ================================

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ================================
// FAQ Accordion
// ================================

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQs
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
    
    // Keyboard support
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// ================================
// Food Filters
// ================================

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Add loading effect
        const foodMenu = document.querySelector('.food-menu');
        foodMenu.style.opacity = '0.5';
        foodMenu.style.pointerEvents = 'none';
        
        // Filter food items with animation
        setTimeout(() => {
            foodItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    // Staggered fade-in animation
                    setTimeout(() => {
                        item.classList.remove('hidden');
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) translateY(0)';
                    }, index * 50);
                } else {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9) translateY(10px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Remove loading effect
            setTimeout(() => {
                foodMenu.style.opacity = '1';
                foodMenu.style.pointerEvents = 'auto';
            }, 300);
        }, 150);
    });
});

// Initialize food items with transition
foodItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// ================================
// Testimonials Slider
// ================================

class TestimonialsSlider {
    constructor() {
        this.track = document.querySelector('.testimonial-track');
        this.slides = document.querySelectorAll('.testimonial-card');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.nextBtn = document.querySelector('.slider-btn.next');
        this.dotsContainer = document.querySelector('.slider-dots');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        
        if (this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.createDots();
        this.setupEventListeners();
        this.startAutoPlay();
    }
    
    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        this.dots = document.querySelectorAll('.slider-dot');
    }
    
    setupEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Pause on hover
        if (this.track) {
            this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.track.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
    
    goToSlide(index) {
        this.slides[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');
        
        this.currentIndex = index;
        
        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize testimonials slider
const testimonialsSlider = new TestimonialsSlider();

// ================================
// Form Validation
// ================================

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        
        let isValid = true;
        
        // Get form fields
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Validate name
        if (!name.value.trim()) {
            showError(name, 'Please enter your name');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError(name, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate phone
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phone.value.trim()) {
            showError(phone, 'Please enter your phone number');
            isValid = false;
        } else if (!phoneRegex.test(phone.value.trim()) || phone.value.trim().length < 10) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Please enter your email address');
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            showError(message, 'Please enter your message');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If valid, show success message
        if (isValid) {
            const formSuccess = document.getElementById('formSuccess');
            formSuccess.classList.add('show');
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    errorMessage.textContent = message;
}

// Clear error on input
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
    input.addEventListener('input', () => {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
    });
});

// ================================
// Dynamic Copyright Year
// ================================

const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ================================
// Intersection Observer for Animations
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for multiple cards in the same container
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.classList.add('animated');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all glass cards for scroll animations with staggered delays
document.querySelectorAll('.glass-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    // Add staggered delay based on position
    const container = card.closest('.features-grid, .supermarket-grid, .food-menu, .offers-grid');
    if (container) {
        const cardsInContainer = Array.from(container.querySelectorAll('.glass-card'));
        const cardIndex = cardsInContainer.indexOf(card);
        card.dataset.delay = cardIndex * 100; // 100ms delay between each card
    }
    
    observer.observe(card);
});

// Observe section headers with special animation
document.querySelectorAll('.section-header').forEach(header => {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sectionObserver.observe(header);
});

// ================================
// Performance: Lazy Loading Enhancement
// ================================

// Add intersection observer for lazy-loaded images
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ================================
// Accessibility Enhancements
// ================================

// Trap focus in mobile menu when open
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

// Apply focus trap when mobile menu is active
const menuObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('active')) {
            trapFocus(navMenu);
        }
    });
});

if (navMenu) {
    menuObserver.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
}

// ================================
// Console Welcome Message
// ================================

console.log('%c🏪 OMOOLA SUPERMARKET AND PHARMACY STORES', 
    'font-size: 20px; font-weight: bold; color: #722F37;');
console.log('%cYour trusted destination for quality shopping and healthcare.', 
    'font-size: 14px; color: #666;');
console.log('%c💼 Interested in working with us? Contact: info@omoolastores.com', 
    'font-size: 12px; color: #722F37;');

// ================================
// Service Worker Registration (Optional for PWA)
// ================================

// Uncomment the following code if you want to add PWA capabilities
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}
*/

// ================================
// Initialize on DOM Load
// ================================

document.addEventListener('DOMContentLoaded', () => {
    // Set initial scroll position
    handleScroll();
    
    // Preload critical images
    const heroImageElement = document.querySelector('.hero-image img');
    if (heroImageElement && heroImageElement.complete) {
        heroImageElement.classList.add('loaded');
    }
    
    // Add page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    // Fade in page
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.classList.add('loaded');
    }, 100);
    
    // Animate hero section elements on load
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    const heroImageContainer = document.querySelector('.hero-image');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            heroTitle.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(-15px)';
        setTimeout(() => {
            heroSubtitle.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 400);
    }
    
    if (heroCta) {
        heroCta.style.opacity = '0';
        heroCta.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            heroCta.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            heroCta.style.opacity = '1';
            heroCta.style.transform = 'translateY(0)';
        }, 600);
    }
    
    if (heroImageContainer) {
        heroImageContainer.style.opacity = '0';
        heroImageContainer.style.transform = 'scale(0.9) translateX(30px)';
        setTimeout(() => {
            heroImageContainer.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
            heroImageContainer.style.opacity = '1';
            heroImageContainer.style.transform = 'scale(1) translateX(0)';
        }, 400);
    }
});

// ================================
// Handle Window Resize
// ================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeNav();
        }
    }, 250);
});

// ================================
// Error Handling
// ================================

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});
