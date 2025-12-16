// main.js - Consolidated Logic with Cursor Fix & Updated Visuals

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // 1. Initialize Global Features
    initLanguage();
    initMobileMenu();
    initSmoothScroll();
    
    // 2. Initialize EmailJS (Replace with your actual Public Key later)
    // emailjs.init("YOUR_PUBLIC_KEY"); 

    // 3. Page-Specific Initializations
    if (document.getElementById('typed-text')) initHero();
    if (document.querySelector('.filter-btn')) initProjects();
    if (document.getElementById('contact-form')) initContactForm();
    if (document.getElementById('skills-chart')) initSkillsChart();
    
    // 4. Global Animations
    initScrollAnimations();
    createParticles();
});

/* =========================================
   1. LANGUAGE MANAGEMENT
   ========================================= */
let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

const translations = {
    en: { typedOptions: ['Engineer', 'Developer', 'Analyst', 'Specialist'] },
    fr: { typedOptions: ['Ingénieure', 'Développeuse', 'Analyste', 'Spécialiste'] }
};

function initLanguage() {
    applyLanguage(currentLanguage);
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'fr' : 'en';
    localStorage.setItem('preferredLanguage', currentLanguage);
    applyLanguage(currentLanguage);
}

function applyLanguage(lang) {
    // Update Text
    document.querySelectorAll('[data-en][data-fr]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.textContent = text;
    });

    // Update Placeholders
    document.querySelectorAll('[data-en-placeholder][data-fr-placeholder]').forEach(el => {
        const ph = el.getAttribute(`data-${lang}-placeholder`);
        if (ph) el.setAttribute('placeholder', ph);
    });

    // Update Hrefs (CVs)
    document.querySelectorAll('[data-href-en][data-href-fr]').forEach(el => {
        const url = el.getAttribute(`data-href-${lang}`);
        if (url) el.setAttribute('href', url);
    });

    // Update Flags
    document.querySelectorAll('.lang-flag').forEach(el => el.textContent = lang === 'en' ? '🇺🇸' : '🇫🇷');
    document.querySelectorAll('.lang-text').forEach(el => el.textContent = lang.toUpperCase());

    // Restart Typed.js if on Hero
    if (window.typedInstance) {
        window.typedInstance.destroy();
        initHero();
    }
}

/* =========================================
   2. MOBILE MENU
   ========================================= */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const overlay = document.getElementById('mobile-menu-overlay');
    const closeBtn = document.getElementById('close-mobile-menu');
    const panel = document.getElementById('mobile-menu-panel');
    const links = document.querySelectorAll('#mobile-menu-panel a');

    if (!btn || !overlay) return;

    function openMenu() {
        overlay.classList.remove('hidden');
        setTimeout(() => {
            panel.classList.remove('opacity-0', 'scale-95', '-translate-y-2');
            panel.classList.add('opacity-100', 'scale-100', 'translate-y-0');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        panel.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
        panel.classList.add('opacity-0', 'scale-95', '-translate-y-2');
        setTimeout(() => {
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }

    btn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    links.forEach(link => link.addEventListener('click', closeMenu));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.id === 'mobile-menu-backdrop') closeMenu();
    });
}

/* =========================================
   3. HERO SECTION (With Cursor Fix)
   ========================================= */
function initHero() {
    const typedEl = document.getElementById('typed-text');
    if (!typedEl) return;
    
    // --- LAYOUT FIX: Ensure cursor tracks text tightly ---
    if (typedEl.classList.contains('block')) {
        typedEl.classList.remove('block');
        const wrapper = document.createElement('div');
        wrapper.className = 'block'; 
        typedEl.parentNode.insertBefore(wrapper, typedEl);
        wrapper.appendChild(typedEl);
    }

    const options = translations[currentLanguage].typedOptions;
    window.typedInstance = new Typed('#typed-text', {
        strings: options,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true
    });

    // Animate counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.counter').forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current);
                    }, 30);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    observer.observe(document.querySelector('#home'));
}

function createParticles() {
    const container = document.querySelector('.floating-particles');
    if (!container) return;
    container.innerHTML = ''; 
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 5 + 's';
        p.style.animationDuration = (6 + Math.random() * 4) + 's';
        container.appendChild(p);
    }
}

/* =========================================
   4. PROJECTS FILTERING
   ========================================= */
function initProjects() {
    const btns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => {
                b.classList.remove('active', 'bg-[#ff6b6b]', 'text-white');
                b.classList.add('bg-gray-200', 'text-gray-700');
            });
            btn.classList.remove('bg-gray-200', 'text-gray-700');
            btn.classList.add('active', 'bg-[#ff6b6b]', 'text-white');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    anime({
                        targets: card,
                        scale: [0.9, 1],
                        opacity: [0, 1],
                        duration: 400,
                        easing: 'easeOutQuad'
                    });
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* =========================================
   5. CONTACT FORM
   ========================================= */
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    // Real-time validation
    form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) validateField(input);
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        form.querySelectorAll('input, textarea').forEach(input => {
            if (!validateField(input)) isValid = false;
        });

        if (!isValid) return;

        // UI Loading
        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const btnLoading = document.getElementById('btn-loading');
        
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');

        // EmailJS Integration 
        // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this) ...
        
        setTimeout(() => {
            form.classList.add('hidden');
            document.getElementById('success-message').classList.remove('hidden');
            
            setTimeout(() => {
                form.reset();
                form.classList.remove('hidden');
                document.getElementById('success-message').classList.add('hidden');
                submitBtn.disabled = false;
                btnText.classList.remove('hidden');
                btnLoading.classList.add('hidden');
                form.querySelectorAll('.success').forEach(el => el.classList.remove('success'));
            }, 5000);
        }, 1500);
    });
}

function validateField(field) {
    const value = field.value.trim();
    const errorEl = field.nextElementSibling;
    let valid = true;
    
    field.classList.remove('error', 'success');
    if(errorEl) errorEl.classList.add('hidden');

    if (field.hasAttribute('required') && !value) valid = false;
    if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) valid = false;

    if (!valid) {
        field.classList.add('error');
        if(errorEl) errorEl.classList.remove('hidden');
    } else if (value) {
        field.classList.add('success');
    }
    return valid;
}

/* =========================================
   6. SKILLS CHARTS (UPDATED VISUAL)
   ========================================= */
function initSkillsChart() {
    const chartDom = document.getElementById('skills-chart');
    if (!chartDom) return;
    
    // Animate Progress Bars (in About page list)
    const bars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                bars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
            }
        });
    });
    const skillsSection = document.querySelector('.skill-progress');
    if(skillsSection) observer.observe(skillsSection.parentElement);

    // Radar Chart - UPDATED WITH ALL COMPETENCIES
    const myChart = echarts.init(chartDom);
    
    // Helper to wrap long text
    const wrap = (s) => s.length > 8 && s.includes(' ') ? s.replace(' ', '\n') : s;

    const option = {
        backgroundColor: 'transparent',
        tooltip: { trigger: 'item' },
        radar: {
            radius: '65%', // Adjusted size to fit more labels
            indicator: [
                { name: 'Power BI', max: 100 },
                { name: 'SQL', max: 100 },
                { name: 'Python/ML', max: 100 },
                { name: 'Data Modeling', max: 100 },
                { name: 'Databricks', max: 100 },
                { name: 'Azure Data Factory', max: 100 },
                { name: 'Azure Storage', max: 100 },
                { name: 'ETL', max: 100 },
                { name: 'Automation', max: 100 },
                { name: 'Excel', max: 100 },
                { name: 'Business Intel.', max: 100 },
                { name: 'Oracle', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 4,
            name: { textStyle: { color: '#2c3e50', fontSize: 10 }, formatter: wrap },
            splitLine: { lineStyle: { color: 'rgba(255, 107, 107, 0.2)' } },
            splitArea: { show: false },
            axisLine: { lineStyle: { color: 'rgba(255, 107, 107, 0.3)' } }
        },
        series: [{
            type: 'radar',
            data: [{
                // Values matching your list: 
                // PBI(95), SQL(90), Py(85), Mod(88), Databricks(91), ADF(90), 
                // Storage(86), ETL(89), Auto(87), Excel(92), BI(92), Oracle(83)
                value: [95, 90, 85, 88, 91, 90, 86, 89, 87, 92, 92, 83],
                name: 'Skills Proficiency',
                itemStyle: { color: '#ff6b6b' },
                areaStyle: { color: 'rgba(255, 107, 107, 0.2)' },
                lineStyle: { width: 2 }
            }]
        }]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}

/* =========================================
   7. UTILS
   ========================================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}