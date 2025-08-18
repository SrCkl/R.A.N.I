// ===== GLOBAL VARIABLES =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const backToTopBtn = document.querySelector('.back-to-top');
const navLinks = document.querySelectorAll('.nav-link');

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== MAIN FUNCTIONS =====
function initializeApp() {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeFAQ();
    initializeParticles();
    initializeTypingEffect();
    
    // Add smooth scrolling to all anchor links
    addSmoothScrolling();
    
    // Initialize intersection observer for animations
    initializeIntersectionObserver();
    
    console.log('R.A.N.I. Website initialized successfully! 🚀');
}

function initializeNavigation() {
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
    
    // Update active nav link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], main');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}` || 
                    (sectionId === null && link.getAttribute('href') === 'index.html')) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function initializeScrollEffects() {
    // Back to top button
    if (backToTopBtn) {
        window.addEventListener('scroll', toggleBackToTopButton);
        backToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Header background on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 10, 15, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(10, 10, 15, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
            }
        });
    }
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            const heroBackground = heroSection.querySelector('.hero-background');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
}

function toggleBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeAnimations() {
    // Animate hero stats on load
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        animateCounter(stat);
    });
    
    // Animate floating icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 2}s`;
        
        // Add hover effects
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) translateY(-10px)';
            icon.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.6)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
            icon.style.boxShadow = '';
        });
    });
    
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Add hover effects to game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.game-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.filter = 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.8))';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.game-icon');
            if (icon) {
                icon.style.transform = '';
                icon.style.filter = '';
            }
        });
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const isNumber = /^\d+/.test(target);
    
    if (!isNumber) return;
    
    const finalNumber = parseInt(target.match(/\d+/)[0]);
    const suffix = target.replace(/\d+/, '');
    let current = 0;
    const increment = finalNumber / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            element.textContent = finalNumber + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 40);
}

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item details');
    
    faqItems.forEach(item => {
        item.addEventListener('toggle', function() {
            if (this.open) {
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== this && otherItem.open) {
                        otherItem.open = false;
                    }
                });
                
                // Add animation class
                this.classList.add('opening');
                setTimeout(() => {
                    this.classList.remove('opening');
                }, 300);
            }
        });
        
        // Add click animation to summary
        const summary = item.querySelector('summary');
        summary.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

function initializeParticles() {
    // Create dynamic particles in hero section
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles) {
        createParticles(heroParticles, 20);
    }
    
    // Add mouse movement effect to hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPercent = (clientX / innerWidth) * 100;
            const yPercent = (clientY / innerHeight) * 100;
            
            const heroLogo = document.querySelector('.hero-logo');
            if (heroLogo) {
                heroLogo.style.transform = `translate(${xPercent * 0.02}px, ${yPercent * 0.02}px) rotate(${xPercent * 0.01}deg)`;
            }
            
            const floatingIcons = document.querySelectorAll('.floating-icon');
            floatingIcons.forEach((icon, index) => {
                const multiplier = (index + 1) * 0.01;
                icon.style.transform = `translate(${xPercent * multiplier}px, ${yPercent * multiplier}px)`;
            });
        });
    }
}

function createParticles(container, count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
    
    // Add particle animation keyframes
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let index = 0;
        const typeSpeed = 50;
        
        function typeText() {
            if (index < text.length) {
                heroTitle.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeText, typeSpeed);
            } else {
                // Add blinking cursor effect
                heroTitle.innerHTML += '<span class="cursor">|</span>';
                
                // Add cursor animation
                const style = document.createElement('style');
                style.textContent = `
                    .cursor {
                        animation: blink 1s infinite;
                        color: var(--primary-color);
                    }
                    @keyframes blink {
                        0%, 50% { opacity: 1; }
                        51%, 100% { opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
                
                // Remove cursor after 3 seconds
                setTimeout(() => {
                    const cursor = document.querySelector('.cursor');
                    if (cursor) cursor.remove();
                }, 3000);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeText, 1000);
    }
}

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('feature-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, delay);
                }
                
                if (entry.target.classList.contains('game-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    }, delay);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .game-card, .faq-item, .community-feature');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function getRandomColor() {
    const colors = ['#00d4ff', '#ff6b35', '#ffd700', '#00ff88', '#ff4757'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ===== EVENT HANDLERS =====
// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.addEventListener('click', createRippleEffect);
    });
});

// Add ripple animation keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Performance optimized scroll handlers
const optimizedScrollHandler = throttle(() => {
    toggleBackToTopButton();
    updateActiveNavLink();
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Handle window resize
const optimizedResizeHandler = debounce(() => {
    // Recalculate positions and sizes if needed
    const heroLogo = document.querySelector('.hero-logo');
    if (heroLogo) {
        heroLogo.style.transform = '';
    }
    
    // Close mobile menu on resize
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// Handle visibility change (tab switching)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when tab becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// ===== EASTER EGGS & FUN FEATURES =====
// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Create rainbow effect
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    // Show easter egg message
    const message = document.createElement('div');
    message.textContent = '🎮 RANI POWER ACTIVATED! 🚀';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b35, #00d4ff);
        color: white;
        padding: 2rem 3rem;
        border-radius: 1rem;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        animation: bounce 1s ease-in-out;
        box-shadow: 0 0 50px rgba(0, 212, 255, 0.8);
    `;
    
    document.body.appendChild(message);
    
    // Remove effects after 5 seconds
    setTimeout(() => {
        document.body.style.animation = '';
        message.remove();
        rainbowStyle.remove();
    }, 5000);
}

// Add bounce animation for easter egg
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate(-50%, -50%) translateY(0);
        }
        40%, 43% {
            transform: translate(-50%, -50%) translateY(-30px);
        }
        70% {
            transform: translate(-50%, -50%) translateY(-15px);
        }
        90% {
            transform: translate(-50%, -50%) translateY(-4px);
        }
    }
`;
document.head.appendChild(bounceStyle);

// ===== PERFORMANCE MONITORING =====
// Monitor performance and log warnings
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                if (loadTime > 3000) {
                    console.warn('⚠️ Page load time is slow:', loadTime + 'ms');
                } else {
                    console.log('✅ Page loaded successfully in', loadTime + 'ms');
                }
            }, 0);
        });
    }
}

monitorPerformance();

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    // Enter key activates buttons
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
});

// Focus management for mobile menu
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMobileMenu();
    }
});

// Announce page changes to screen readers
function announcePageChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    
    // Don't break the user experience
    e.preventDefault();
    return true;
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

// ===== EXPORT/IMPORT =====
// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        toggleMobileMenu,
        scrollToTop,
        debounce,
        throttle
    };
}

// Log successful initialization
console.log(`
🎮 R.A.N.I. Website v1.0
🚀 Rushadores Anônimos Não Identificados
✨ Onde a sua jornada gamer encontra a melhor companhia!

Features loaded:
- ✅ Responsive Navigation
- ✅ Smooth Scrolling
- ✅ Interactive Animations
- ✅ FAQ System
- ✅ Particle Effects
- ✅ Performance Monitoring
- ✅ Accessibility Support
- ✅ Easter Eggs
- ✅ Error Handling

Join us: https://discord.gg/y4cT7qVSHj
`);

