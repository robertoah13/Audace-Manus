// ===== GLOBAL VARIABLES =====
let isScrolling = false;
let currentTheme = localStorage.getItem('theme') || 'light';

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== WEBSITE INITIALIZATION =====
function initializeWebsite() {
    // Initialize all components
    initializeTheme();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializePortfolio();
    initializeForms();
    initializeChat();
    initializeParticles();
    initializeCounters();
    initializeLazyLoading();
    
    // Add event listeners
    addEventListeners();
    
    console.log('Audace website initialized successfully');
}

// ===== THEME MANAGEMENT =====
function initializeTheme() {
    const themeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Apply saved theme
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Theme toggle event
    themeToggle.addEventListener('click', function() {
        if (currentTheme === 'light') {
            currentTheme = 'dark';
            body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            currentTheme = 'light';
            body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        localStorage.setItem('theme', currentTheme);
        
        // Add transition effect
        themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            header.classList.remove('scrolled');
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Back to top functionality
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', updateActiveNavLinkOnScroll);
}

function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavLinkOnScroll() {
    if (isScrolling) return;
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.getElementById('header').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Fade in animations
    const fadeElements = document.querySelectorAll('.fade-in, .service-card, .portfolio-item, .blog-card');
    
    fadeElements.forEach(element => {
        gsap.fromTo(element, 
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Section headers animation
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        const subtitle = header.querySelector('.section-subtitle');
        const title = header.querySelector('.section-title');
        const description = header.querySelector('.section-description');
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
        
        if (subtitle) tl.fromTo(subtitle, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.6});
        if (title) tl.fromTo(title, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.6}, "-=0.3");
        if (description) tl.fromTo(description, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.6}, "-=0.3");
    });
    
    // Parallax effect for hero section
    gsap.to('.hero-background', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Hero animations
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .fromTo('.hero-title', {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 1, delay: 0.5})
        .fromTo('.hero-subtitle', {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.8}, "-=0.5")
        .fromTo('.hero-cta', {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.8}, "-=0.3")
        .fromTo('.hero-scroll', {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.6}, "-=0.2");
    
    // Service cards hover animations
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.service-icon'), {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.service-icon'), {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn, .form-submit, .newsletter-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple CSS
    const rippleCSS = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = rippleCSS;
    document.head.appendChild(style);
}

// ===== PORTFOLIO =====
function initializePortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioModal = document.getElementById('portfolioModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    // Portfolio filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    gsap.to(item, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                    item.style.display = 'block';
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.3,
                        ease: "power2.out",
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
    
    // Portfolio modal
    const portfolioButtons = document.querySelectorAll('.portfolio-btn[data-project]');
    portfolioButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openPortfolioModal(projectId);
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closePortfolioModal);
    portfolioModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closePortfolioModal();
        }
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && portfolioModal.classList.contains('active')) {
            closePortfolioModal();
        }
    });
}

function openPortfolioModal(projectId) {
    const modal = document.getElementById('portfolioModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    // Project data (in a real application, this would come from a database)
    const projects = {
        '1': {
            title: 'Rebranding Luxo Premium',
            content: `
                <div class="modal-project">
                    <img src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop" alt="Projeto Branding" style="width: 100%; border-radius: 8px; margin-bottom: 2rem;">
                    <h4>Desafio</h4>
                    <p>Uma marca de luxo precisava de um rebranding completo para se posicionar no mercado premium e atrair um público mais sofisticado.</p>
                    <h4>Solução</h4>
                    <p>Desenvolvemos uma identidade visual elegante e minimalista, com paleta de cores premium e tipografia refinada. O resultado foi um aumento de 150% no reconhecimento da marca.</p>
                    <h4>Resultados</h4>
                    <ul>
                        <li>150% de aumento no reconhecimento da marca</li>
                        <li>200% de crescimento nas vendas online</li>
                        <li>85% de melhoria na percepção de qualidade</li>
                    </ul>
                </div>
            `
        },
        '2': {
            title: 'Campanha Viral #TechFuture',
            content: `
                <div class="modal-project">
                    <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop" alt="Campanha Social" style="width: 100%; border-radius: 8px; margin-bottom: 2rem;">
                    <h4>Desafio</h4>
                    <p>Criar uma campanha viral para uma startup de tecnologia que precisava aumentar sua visibilidade e engajamento nas redes sociais.</p>
                    <h4>Solução</h4>
                    <p>Desenvolvemos a campanha #TechFuture com conteúdo interativo, influenciadores estratégicos e storytelling envolvente sobre o futuro da tecnologia.</p>
                    <h4>Resultados</h4>
                    <ul>
                        <li>5 milhões de impressões em 30 dias</li>
                        <li>300% de aumento no engajamento</li>
                        <li>50.000 novos seguidores</li>
                    </ul>
                </div>
            `
        },
        '3': {
            title: 'E-commerce Premium',
            content: `
                <div class="modal-project">
                    <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop" alt="E-commerce" style="width: 100%; border-radius: 8px; margin-bottom: 2rem;">
                    <h4>Desafio</h4>
                    <p>Desenvolver um e-commerce premium com experiência de usuário excepcional e alta taxa de conversão.</p>
                    <h4>Solução</h4>
                    <p>Criamos uma plataforma elegante com design responsivo, checkout otimizado e integração com sistemas de pagamento seguros.</p>
                    <h4>Resultados</h4>
                    <ul>
                        <li>400% de aumento nas vendas online</li>
                        <li>65% de melhoria na taxa de conversão</li>
                        <li>90% de satisfação do cliente</li>
                    </ul>
                </div>
            `
        }
    };
    
    const project = projects[projectId];
    if (project) {
        modalTitle.textContent = project.title;
        modalBody.innerHTML = project.content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== FORMS =====
function initializeForms() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const blogSearch = document.getElementById('blogSearch');
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
        
        // Form validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
    
    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterForm(this);
        });
    }
    
    // Blog search
    if (blogSearch) {
        blogSearch.addEventListener('input', function() {
            handleBlogSearch(this.value);
        });
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    clearFieldError(e);
    
    // Validation rules
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Por favor, insira um e-mail válido';
    } else if (field.type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Por favor, insira um telefone válido';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function clearFieldError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#dc3545';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function handleContactForm(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('.form-submit');
    const originalText = submitButton.innerHTML;
    
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (!validateField({target: input})) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showNotification('Por favor, corrija os erros no formulário', 'error');
        return;
    }
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
    }, 2000);
}

function handleNewsletterForm(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('.newsletter-btn');
    const originalText = submitButton.innerHTML;
    
    if (!isValidEmail(emailInput.value)) {
        showNotification('Por favor, insira um e-mail válido', 'error');
        return;
    }
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscrevendo...';
    submitButton.disabled = true;
    
    // Simulate subscription (replace with actual handling)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Inscrição realizada com sucesso!', 'success');
    }, 1500);
}

function handleBlogSearch(query) {
    const blogCards = document.querySelectorAll('.blog-card');
    const searchQuery = query.toLowerCase().trim();
    
    blogCards.forEach(card => {
        const title = card.querySelector('.blog-title').textContent.toLowerCase();
        const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
        const category = card.querySelector('.blog-category').textContent.toLowerCase();
        
        const isMatch = title.includes(searchQuery) || 
                       excerpt.includes(searchQuery) || 
                       category.includes(searchQuery);
        
        if (searchQuery === '' || isMatch) {
            gsap.to(card, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            card.style.display = 'block';
        } else {
            gsap.to(card, {
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    card.style.display = 'none';
                }
            });
        }
    });
}

// ===== CHAT WIDGET =====
function initializeChat() {
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    
    chatToggle.addEventListener('click', function() {
        chatWindow.classList.toggle('active');
        
        // Animation
        if (chatWindow.classList.contains('active')) {
            gsap.fromTo(chatWindow, 
                {opacity: 0, y: 20, scale: 0.9}, 
                {opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out"}
            );
        }
    });
    
    chatClose.addEventListener('click', function() {
        chatWindow.classList.remove('active');
    });
    
    // Close chat when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.chat-widget')) {
            chatWindow.classList.remove('active');
        }
    });
}

// ===== PARTICLES =====
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(212, 175, 55, 0.3)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    
    container.appendChild(particle);
    
    // Animate particle
    gsap.to(particle, {
        y: -100,
        opacity: 0,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        ease: "none",
        delay: Math.random() * 2
    });
    
    gsap.to(particle, {
        x: Math.random() * 100 - 50,
        duration: Math.random() * 4 + 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
    });
}

// ===== COUNTERS =====
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        gsap.fromTo(counter, 
            {textContent: 0},
            {
                textContent: target,
                duration: 2,
                ease: "power2.out",
                snap: {textContent: 1},
                scrollTrigger: {
                    trigger: counter,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
}

// ===== LAZY LOADING =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }
}

// ===== EVENT LISTENERS =====
function addEventListeners() {
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                isScrolling = true;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            }
        });
    });
    
    // Window resize handler
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function handleResize() {
    // Refresh ScrollTrigger on resize
    ScrollTrigger.refresh();
    
    // Update mobile navigation
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleKeyboardNavigation(e) {
    // ESC key handlers
    if (e.key === 'Escape') {
        // Close mobile menu
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Close chat
        const chatWindow = document.getElementById('chatWindow');
        if (chatWindow.classList.contains('active')) {
            chatWindow.classList.remove('active');
        }
    }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== PERFORMANCE OPTIMIZATION =====
// Preload critical resources
function preloadResources() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// ===== ANALYTICS PLACEHOLDER =====
function trackEvent(category, action, label) {
    // Google Analytics event tracking placeholder
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    console.log(`Analytics Event: ${category} - ${action} - ${label}`);
}

// Track important interactions
document.addEventListener('click', function(e) {
    const target = e.target.closest('a, button');
    if (target) {
        const text = target.textContent.trim();
        const href = target.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            trackEvent('Navigation', 'Internal Link Click', text);
        } else if (href && href.startsWith('http')) {
            trackEvent('Navigation', 'External Link Click', href);
        } else if (target.tagName === 'BUTTON') {
            trackEvent('Interaction', 'Button Click', text);
        }
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
function enhanceAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    // Link directly para a seção de home já existente
    skipLink.href = '#home';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10001;
        border-radius: 4px;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        // Apenas define o papel principal sem alterar o ID existente
        heroSection.setAttribute('role', 'main');
    }
    
    // Enhance form labels
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (!input.getAttribute('aria-label') && input.placeholder) {
            input.setAttribute('aria-label', input.placeholder);
        }
    });
}

// Initialize accessibility enhancements
enhanceAccessibility();

console.log('Audace website JavaScript loaded successfully!');

