// Language Management
let currentLanguage = 'en';

const translations = {
    en: {
        // Hero typed text options
        typedOptions: ['Engineer', 'Developer', 'Analyst', 'Specialist'],
        
        // Navigation
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        contact: 'Contact',
        
        // Hero section
        heroTitle1: 'Analytics',
        heroTitle2: 'Professional',
        heroDescription: 'Analytics Engineer & BI Developer | Data Analyst | Skilled in Power BI, SQL, Oracle & Databricks | Data Governance & Management | Driving Scalable Data Solutions.',
        viewProjects: 'View Projects',
        getInTouch: 'Get In Touch',
        
        // Live metrics
        liveMetrics: 'Live Performance Metrics',
        performanceImprovement: 'Performance Improvement',
        resourceReduction: 'Resource Reduction',
        dashboardsMigrated: 'Dashboards Migrated',
        mlAccuracyBoost: 'ML Accuracy Boost',
        currentStatus: 'Current Status',
        active: 'Active',
        
        // Skills section
        technicalExpertise: 'Technical Expertise',
        skillsDescription: 'Comprehensive skill set across data analytics, business intelligence, and machine learning domains',
        powerBIExpert: 'Power BI Expert',
        powerBIDesc: 'Dashboard development, optimization, migration',
        dataEngineering: 'Data Engineering',
        dataEngDesc: 'ETL/ELT, SQL optimization, data modeling',
        machineLearning: 'Machine Learning',
        mlDesc: 'Predictive analytics, model optimization',
        automation: 'Automation',
        automationDesc: 'Power Automate, workflow optimization',
        
        // CTA section
        readyToTransform: 'Ready to Transform Your Data?',
        ctaDescription: 'Let\'s discuss how we can turn your data challenges into competitive advantages',
        startConversation: 'Start a Conversation',
        
        // Footer
        dataAnalystBI: 'Analytics Engineer & BI Developer',
        allRightsReserved: '© 2025 Imane Haddouch. All rights reserved.'
    },
    fr: {
        // Hero typed text options
        typedOptions: ['Ingénieure', 'Développeuse', 'Analyste', 'Spécialiste'],
        
        // Navigation
        home: 'Accueil',
        about: 'À Propos',
        projects: 'Projets',
        contact: 'Contact',
        
        // Hero section
        heroTitle1: 'Analytique',
        heroTitle2: 'Professionnelle',
        heroDescription: 'Ingénieur en Analytique & Développeur BI | Analyste de Données | Spécialisé en Power BI, SQL, Oracle & Databricks | Gouvernance et Gestion des Données | Conception de Solutions de Données Évolutives.',
        viewProjects: 'Voir Projets',
        getInTouch: 'Contactez-moi',
        
        // Live metrics
        liveMetrics: 'Métriques de Performance en Direct',
        performanceImprovement: 'Amélioration des Performances',
        resourceReduction: 'Réduction des Ressources',
        dashboardsMigrated: 'Tableaux de Bord Migrés',
        mlAccuracyBoost: 'Amélioration Précision ML',
        currentStatus: 'Statut Actuel',
        active: 'Actif',
        
        // Skills section
        technicalExpertise: 'Expertise Technique',
        skillsDescription: 'Ensemble de compétences complet dans les domaines de l\'analytique de données, de la business intelligence et de l\'apprentissage automatique',
        powerBIExpert: 'Experte Power BI',
        powerBIDesc: 'Développement, optimisation, migration de tableaux de bord',
        dataEngineering: 'Ingénierie des Données',
        dataEngDesc: 'ETL/ELT, optimisation SQL, modélisation de données',
        machineLearning: 'Apprentissage Automatique',
        mlDesc: 'Analytique prédictive, optimisation de modèles',
        automation: 'Automatisation',
        automationDesc: 'Power Automate, optimisation des workflows',
        
        // CTA section
        readyToTransform: 'Prêt à Transformer Vos Données ?',
        ctaDescription: 'Discutons de la manière dont nous pouvons transformer vos défis de données en avantages concurrentiels',
        startConversation: 'Commencer une Conversation',
        
        // Footer
        dataAnalystBI: 'Ingénieur en Analytique & Développeur BI',
        allRightsReserved: '© 2025 Imane Haddouch. Tous droits réservés.'
    }
};

// Initialize typed text effect
let typed;

function initTyped() {
    if (typed) {
        typed.destroy();
    }
    
    const options = translations[currentLanguage].typedOptions;
    typed = new Typed('#typed-text', {
        strings: options,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Helper: Go to home after navigation
function goHomeAfterNavigation() {
    window.location.href = 'index.html';
}

// Smooth scrolling for navigation links (HTML pages)
function initPageNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Close mobile menu first for better UX
            closeMobileMenu();
            // If link points to homepage or same page, allow default navigation
            const href = link.getAttribute('href');
            // Small delay to allow menu close animation
            setTimeout(() => {
                if (href && href !== '#') {
                    window.location.href = href;
                }
            }, 250);
            e.preventDefault();
        });
    });
}

// Mobile menu toggle with overlay and animation
function toggleMobileMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
    const panel = document.getElementById('mobile-menu-panel');
    if (!overlay || !panel) return;

    if (overlay.classList.contains('hidden')) {
        // Open
        overlay.classList.remove('hidden');
        overlay.setAttribute('aria-hidden', 'false');
        panel.setAttribute('aria-hidden', 'false');
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-modal', 'true');
        // Start animation
        requestAnimationFrame(() => {
            panel.classList.remove('opacity-0', 'scale-95', '-translate-y-2');
            panel.classList.add('opacity-100', 'scale-100', 'translate-y-0');
        });
        // trap focus
        const cleanup = trapFocus(panel);
        overlay._cleanupFocus = cleanup;
        // save previously focused element
        overlay._previouslyFocused = document.activeElement;
        // focus first element
        const first = panel.querySelector('a,button,textarea,input,select');
        if (first) first.focus();
        document.body.style.overflow = 'hidden';
    } else {
        // Close
        panel.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
        panel.classList.add('opacity-0', 'scale-95', '-translate-y-2');
        setTimeout(() => {
            overlay.classList.add('hidden');
            overlay.setAttribute('aria-hidden', 'true');
            panel.setAttribute('aria-hidden', 'true');
            try {
                if (overlay._cleanupFocus) overlay._cleanupFocus();
                if (overlay._previouslyFocused) overlay._previouslyFocused.focus();
            } catch (e) {}
            document.body.style.overflow = '';
        }, 300);
    }
}

// Accessibility: focus trap utilities for mobile menu
function trapFocus(modal) {
    const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableEls = Array.from(modal.querySelectorAll(focusableSelectors)).filter(el => el.offsetParent !== null);
    if (focusableEls.length === 0) return () => {};
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    function handleKey(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) { // shift + tab
                if (document.activeElement === firstFocusableEl) {
                    e.preventDefault();
                    lastFocusableEl.focus();
                }
            } else { // tab
                if (document.activeElement === lastFocusableEl) {
                    e.preventDefault();
                    firstFocusableEl.focus();
                }
            }
        } else if (e.key === 'Escape' || e.key === 'Esc') {
            closeMobileMenu();
        }
    }

    document.addEventListener('keydown', handleKey);
    // return a cleanup fn
    return () => document.removeEventListener('keydown', handleKey);
}

// Ensure initMobileMenuListeners rebinds after modal changes
function initMobileMenuListeners() {
    const overlay = document.getElementById('mobile-menu-overlay');
    const backdrop = document.getElementById('mobile-menu-backdrop');
    const panel = document.getElementById('mobile-menu-panel');

    if (!overlay || !panel) return;

    // set ARIA
    overlay.setAttribute('role', 'presentation');
    overlay.setAttribute('aria-hidden', 'true');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-hidden', 'true');

    if (backdrop) {
        backdrop.addEventListener('click', function() {
            closeMobileMenu();
        });
    }

    // Ensure nav links close the menu
    const mobileLinks = panel.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            closeMobileMenu();
            const href = link.getAttribute('href');
            setTimeout(() => {
                if (href && href !== '#') window.location.href = href;
            }, 300);
            e.preventDefault();
        });
    });
}

// Language toggle function (works for mobile)
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'fr' : 'en';
    updateLanguage();
    document.querySelectorAll('#lang-flag').forEach(flag => {
        flag.textContent = currentLanguage === 'en' ? '🇺🇸' : '🇫🇷';
    });
    document.querySelectorAll('#lang-text').forEach(langText => {
        langText.textContent = currentLanguage.toUpperCase();
    });
}

// Update all text content based on current language
function updateLanguage() {
    const elements = document.querySelectorAll('[data-en][data-fr]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Reinitialize typed text
    initTyped();
}

// Animated counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stat-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);
    
    // Observe stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Particle animation
function createParticles() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (6 + Math.random() * 4) + 's';
    });
}

// Utility: throttle
function throttle(fn, wait) {
    let time = Date.now();
    return function() {
        if ((time + wait - Date.now()) < 0) {
            fn.apply(this, arguments);
            time = Date.now();
        }
    }
}

// Improved updateActiveNavigation with throttling
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const onScroll = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', throttle(onScroll, 150));
}

// Site title/logo navigation: make sure clicking header leads to index
function initLogoNavigation() {
    const logo = document.querySelector('.gradient-text');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typed text
    initTyped();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Create particles
    createParticles();
    
    // Update active navigation
    updateActiveNavigation();
    
    // Start counter animation when hero section is visible
    const heroSection = document.querySelector('#home');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 500);
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // Add loading animation
    document.body.style.opacity = '0';
    anime({
        targets: document.body,
        opacity: 1,
        duration: 1000,
        easing: 'easeOutQuad'
    });
    
    initPageNavigation();
    initLogoNavigation();
    initMobileMenuListeners();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        if (typed) {
            typed.stop();
        }
    } else {
        // Resume animations when tab becomes visible
        if (typed) {
            typed.start();
        }
    }
});

// Export functions for use in other files
window.toggleLanguage = toggleLanguage;
window.toggleMobileMenu = toggleMobileMenu;