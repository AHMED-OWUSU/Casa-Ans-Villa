// ===== CASA VILLA - INTERACTIVE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initLazyLoading();
    initSmoothScrolling();
    initWhatsAppButton();
    initLanguageSwitcher();
    initRoomDetails();
});

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Close language menus if open
        const languageMenu = document.getElementById('language-menu');
        const mobileLanguageMenu = document.getElementById('mobile-language-menu');
        if (languageMenu) {
            languageMenu.classList.remove('active');
        }
        if (mobileLanguageMenu) {
            mobileLanguageMenu.classList.remove('active');
        }
    });

    // Close mobile menu when clicking on desktop links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close mobile menu when clicking on mobile links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.room-card, .gallery-item, .feature, .about-text, .about-image');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}



// ===== CONTACT FORM FUNCTIONALITY =====
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your inquiry! We will contact you soon.', 'success');
        contactForm.reset();
    });
}

// ===== LAZY LOADING =====
function initLazyLoading() {
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

        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
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

// Throttle function for resize events
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


// ===== PRELOAD CRITICAL IMAGES =====
function preloadImages() {
    const criticalImages = [
        'casa assets/images/hero images/hero 1.JPG',
        'casa assets/images/casa logo.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// ===== WHATSAPP BUTTON FUNCTIONALITY =====
function initWhatsAppButton() {
    console.log('Initializing WhatsApp button...');
    
    const whatsappFloat = document.getElementById('whatsapp-float');
    const whatsappLink = document.querySelector('.whatsapp-link');
    
    if (!whatsappFloat) {
        console.error('WhatsApp float element not found');
        return;
    }
    
    if (!whatsappLink) {
        console.error('WhatsApp link element not found');
        return;
    }
    
    console.log('WhatsApp elements found, setting up...');
    
    // Force button to be visible
    whatsappFloat.style.display = 'block !important';
    whatsappFloat.style.visibility = 'visible !important';
    whatsappFloat.style.opacity = '1 !important';
    whatsappFloat.style.transform = 'translateY(0) !important';
    whatsappFloat.style.position = 'fixed !important';
    whatsappFloat.style.bottom = '30px !important';
    whatsappFloat.style.right = '30px !important';
    whatsappFloat.style.zIndex = '1500 !important';
    
    // Show/hide WhatsApp button based on scroll position
    let lastScrollTop = 0;
    let isVisible = true;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show button when scrolling up, hide when scrolling down
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            if (isVisible) {
                whatsappFloat.style.transform = 'translateY(100px)';
                whatsappFloat.style.opacity = '0';
                isVisible = false;
            }
        } else if (scrollTop < lastScrollTop || scrollTop < 200) {
            // Scrolling up or near top
            if (!isVisible) {
                whatsappFloat.style.transform = 'translateY(0)';
                whatsappFloat.style.opacity = '1';
                isVisible = true;
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add click tracking
    whatsappLink.addEventListener('click', () => {
        console.log('WhatsApp button clicked');
        trackEvent('WhatsApp', 'Button Click', 'Floating Button');
    });
    
    // Add hover effects
    whatsappLink.addEventListener('mouseenter', () => {
        if (isVisible) {
            whatsappFloat.style.transform = 'translateY(0) scale(1.1)';
        }
    });
    
    whatsappLink.addEventListener('mouseleave', () => {
        if (isVisible) {
            whatsappFloat.style.transform = 'translateY(0) scale(1)';
        }
    });
    
    console.log('WhatsApp button initialized successfully');
}

// ===== LANGUAGE SWITCHER FUNCTIONALITY =====
const translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.rooms': 'Rooms',
        'nav.gallery': 'Gallery',
        'nav.contact': 'Contact',
        'nav.location': 'Location',
        
        // Hero Section
        'hero.luxury': 'Luxury',
        'hero.redefined': 'Redefined',
        'hero.subtitle': 'Experience unparalleled elegance and comfort at Casa Ans Villa',
        'hero.explore_rooms': 'Explore Rooms',
        'hero.book_now': 'Book Now',
        
        // About Section
        'about.title': 'About Casa Ans Villa',
        'about.subtitle': 'Where luxury meets comfort in perfect harmony',
        'about.experience_title': 'Exceptional Living Experience',
        'about.description1': 'At Casa Ans Villa, we believe that luxury is not just about opulence, but about creating meaningful experiences that stay with you forever. Our meticulously designed villas offer the perfect blend of modern sophistication and timeless elegance.',
        'about.description2': 'Each space has been carefully curated to provide our guests with an unparalleled level of comfort and style, ensuring every moment spent with us is truly memorable.',
        'about.feature1_title': 'Premium Amenities',
        'about.feature1_desc': 'World-class facilities and services',
        'about.feature2_title': 'Breathtaking Views',
        'about.feature2_desc': 'Stunning vistas from every room',
        'about.feature3_title': '24/7 Concierge',
        'about.feature3_desc': 'Personalized service at your fingertips',
        
        // Rooms Section
        'rooms.title': 'Our Rooms',
        'rooms.subtitle': 'Luxurious accommodations designed for your comfort',
        
        // Gallery Section
        'gallery.title': 'Gallery',
        'gallery.subtitle': 'A visual journey through our luxury spaces',
        
        // Contact Section
        'contact.title': 'Contact Us',
        'contact.subtitle': 'Ready to experience luxury? Get in touch with us today',
        
        // Services Section
        'services.title': 'Our Premium Services',
        'services.subtitle': 'Everything you need for the perfect luxury stay',
        'services.minibar_title': 'Built-in Minibar',
        'services.minibar_desc': 'Fully stocked minibar with premium beverages and snacks for your convenience',
        'services.parking_title': 'Free Parking',
        'services.parking_desc': 'Complimentary secure parking space for your vehicle during your stay',
        'services.airport_title': 'Airport Pickup',
        'services.airport_desc': 'Arranged and paid airport pickup service for a seamless arrival experience',
        'services.kitchen_title': 'Fully Equipped Kitchen',
        'services.kitchen_desc': 'Complete kitchen with modern appliances - cook yourself or request our paid chef service',
        'services.wifi_title': 'Free High-Speed WiFi',
        'services.wifi_desc': 'Fiber-fast internet connection throughout the villa for all your digital needs',
        'services.concierge_title': '24/7 Concierge',
        'services.concierge_desc': 'Round-the-clock assistance for any requests or special arrangements',
        
        // WhatsApp
        'whatsapp.tooltip': 'Chat with us on WhatsApp'
    },
    es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.about': 'Acerca de',
        'nav.services': 'Servicios',
        'nav.rooms': 'Habitaciones',
        'nav.gallery': 'Galería',
        'nav.contact': 'Contacto',
        'nav.location': 'Ubicación',
        
        // Hero Section
        'hero.luxury': 'Lujo',
        'hero.redefined': 'Redefinido',
        'hero.subtitle': 'Experimenta elegancia y comodidad sin igual en Casa Ans Villa',
        'hero.explore_rooms': 'Explorar Habitaciones',
        'hero.book_now': 'Reservar Ahora',
        
        // About Section
        'about.title': 'Acerca de Casa Ans Villa',
        'about.subtitle': 'Donde el lujo se encuentra con la comodidad en perfecta armonía',
        'about.experience_title': 'Experiencia de Vida Excepcional',
        'about.description1': 'En Casa Ans Villa, creemos que el lujo no se trata solo de opulencia, sino de crear experiencias significativas que permanezcan contigo para siempre. Nuestras villas meticulosamente diseñadas ofrecen la combinación perfecta de sofisticación moderna y elegancia atemporal.',
        'about.description2': 'Cada espacio ha sido cuidadosamente curado para brindar a nuestros huéspedes un nivel incomparable de comodidad y estilo, asegurando que cada momento que pasen con nosotros sea verdaderamente memorable.',
        'about.feature1_title': 'Amenidades Premium',
        'about.feature1_desc': 'Instalaciones y servicios de clase mundial',
        'about.feature2_title': 'Vistas Impresionantes',
        'about.feature2_desc': 'Vistas espectaculares desde cada habitación',
        'about.feature3_title': 'Conserjería 24/7',
        'about.feature3_desc': 'Servicio personalizado al alcance de tu mano',
        
        // Rooms Section
        'rooms.title': 'Nuestras Habitaciones',
        'rooms.subtitle': 'Alojamientos lujosos diseñados para tu comodidad',
        
        // Gallery Section
        'gallery.title': 'Galería',
        'gallery.subtitle': 'Un viaje visual a través de nuestros espacios de lujo',
        
        // Contact Section
        'contact.title': 'Contáctanos',
        'contact.subtitle': '¿Listo para experimentar el lujo? Ponte en contacto con nosotros hoy',
        
        // Services Section
        'services.title': 'Nuestros Servicios Premium',
        'services.subtitle': 'Todo lo que necesitas para la estadía de lujo perfecta',
        'services.minibar_title': 'Minibar Integrado',
        'services.minibar_desc': 'Minibar completamente abastecido con bebidas premium y snacks para tu conveniencia',
        'services.parking_title': 'Estacionamiento Gratuito',
        'services.parking_desc': 'Espacio de estacionamiento seguro gratuito para tu vehículo durante tu estadía',
        'services.airport_title': 'Recogida en el Aeropuerto',
        'services.airport_desc': 'Servicio de recogida en el aeropuerto organizado y pagado para una experiencia de llegada sin problemas',
        'services.kitchen_title': 'Cocina Completamente Equipada',
        'services.kitchen_desc': 'Cocina completa con electrodomésticos modernos - cocina tú mismo o solicita nuestro servicio de chef pagado',
        'services.wifi_title': 'WiFi Gratuito de Alta Velocidad',
        'services.wifi_desc': 'Conexión a internet de fibra ultrarrápida en toda la villa para todas tus necesidades digitales',
        'services.concierge_title': 'Conserjería 24/7',
        'services.concierge_desc': 'Asistencia las 24 horas para cualquier solicitud o arreglo especial',
        
        // WhatsApp
        'whatsapp.tooltip': 'Chatea con nosotros en WhatsApp'
    },
    de: {
        // Navigation
        'nav.home': 'Startseite',
        'nav.about': 'Über uns',
        'nav.services': 'Dienstleistungen',
        'nav.rooms': 'Zimmer',
        'nav.gallery': 'Galerie',
        'nav.contact': 'Kontakt',
        'nav.location': 'Standort',
        
        // Hero Section
        'hero.luxury': 'Luxus',
        'hero.redefined': 'Neu definiert',
        'hero.subtitle': 'Erleben Sie unvergleichliche Eleganz und Komfort in Casa Ans Villa',
        'hero.explore_rooms': 'Zimmer erkunden',
        'hero.book_now': 'Jetzt buchen',
        
        // About Section
        'about.title': 'Über Casa Ans Villa',
        'about.subtitle': 'Wo Luxus und Komfort in perfekter Harmonie zusammentreffen',
        'about.experience_title': 'Außergewöhnliche Lebenserfahrung',
        'about.description1': 'Bei Casa Ans Villa glauben wir, dass Luxus nicht nur Opulenz bedeutet, sondern die Schaffung bedeutungsvoller Erfahrungen, die für immer bei Ihnen bleiben. Unsere sorgfältig gestalteten Villen bieten die perfekte Mischung aus moderner Raffinesse und zeitloser Eleganz.',
        'about.description2': 'Jeder Raum wurde sorgfältig kuratiert, um unseren Gästen ein unvergleichliches Maß an Komfort und Stil zu bieten und sicherzustellen, dass jeder Moment, den sie bei uns verbringen, wirklich unvergesslich ist.',
        'about.feature1_title': 'Premium-Ausstattung',
        'about.feature1_desc': 'Weltklasse-Einrichtungen und Service',
        'about.feature2_title': 'Atemberaubende Aussichten',
        'about.feature2_desc': 'Beeindruckende Ausblicke aus jedem Zimmer',
        'about.feature3_title': '24/7 Concierge',
        'about.feature3_desc': 'Personalisierter Service in Ihrer Nähe',
        
        // Rooms Section
        'rooms.title': 'Unsere Zimmer',
        'rooms.subtitle': 'Luxuriöse Unterkünfte für Ihren Komfort konzipiert',
        
        // Gallery Section
        'gallery.title': 'Galerie',
        'gallery.subtitle': 'Eine visuelle Reise durch unsere Luxusräume',
        
        // Contact Section
        'contact.title': 'Kontaktieren Sie uns',
        'contact.subtitle': 'Bereit, Luxus zu erleben? Kontaktieren Sie uns noch heute',
        
        // Services Section
        'services.title': 'Unsere Premium-Dienstleistungen',
        'services.subtitle': 'Alles was Sie für den perfekten Luxusaufenthalt benötigen',
        'services.minibar_title': 'Eingebaute Minibar',
        'services.minibar_desc': 'Vollständig ausgestattete Minibar mit Premium-Getränken und Snacks für Ihre Bequemlichkeit',
        'services.parking_title': 'Kostenloses Parken',
        'services.parking_desc': 'Kostenloser sicherer Parkplatz für Ihr Fahrzeug während Ihres Aufenthalts',
        'services.airport_title': 'Flughafen-Abholung',
        'services.airport_desc': 'Organisierter und bezahlter Flughafen-Abholservice für eine nahtlose Ankunftserfahrung',
        'services.kitchen_title': 'Vollausgestattete Küche',
        'services.kitchen_desc': 'Komplette Küche mit modernen Geräten - kochen Sie selbst oder buchen Sie unseren bezahlten Chefservice',
        'services.wifi_title': 'Kostenloses Highspeed-WiFi',
        'services.wifi_desc': 'Faser-schnelle Internetverbindung in der gesamten Villa für alle Ihre digitalen Bedürfnisse',
        'services.concierge_title': '24/7 Concierge',
        'services.concierge_desc': 'Rund-um-die-Uhr-Assistenz für alle Anfragen oder besondere Arrangements',
        
        // WhatsApp
        'whatsapp.tooltip': 'Chatten Sie mit uns auf WhatsApp'
    },
    fr: {
        // Navigation
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
        'nav.services': 'Services',
        'nav.rooms': 'Chambres',
        'nav.gallery': 'Galerie',
        'nav.contact': 'Contact',
        'nav.location': 'Emplacement',
        
        // Hero Section
        'hero.luxury': 'Luxe',
        'hero.redefined': 'Redéfini',
        'hero.subtitle': 'Découvrez une élégance et un confort inégalés à Casa Ans Villa',
        'hero.explore_rooms': 'Explorer les Chambres',
        'hero.book_now': 'Réserver Maintenant',
        
        // About Section
        'about.title': 'À propos de Casa Ans Villa',
        'about.subtitle': 'Où le luxe rencontre le confort en parfaite harmonie',
        'about.experience_title': 'Expérience de Vie Exceptionnelle',
        'about.description1': 'Chez Casa Ans Villa, nous croyons que le luxe ne se résume pas à l\'opulence, mais à la création d\'expériences significatives qui restent avec vous pour toujours. Nos villas méticuleusement conçues offrent le mélange parfait de sophistication moderne et d\'élégance intemporelle.',
        'about.description2': 'Chaque espace a été soigneusement organisé pour offrir à nos invités un niveau de confort et de style incomparable, garantissant que chaque moment passé avec nous soit vraiment mémorable.',
        'about.feature1_title': 'Équipements Premium',
        'about.feature1_desc': 'Installations et services de classe mondiale',
        'about.feature2_title': 'Vues à Couper le Souffle',
        'about.feature2_desc': 'Vues époustouflantes depuis chaque chambre',
        'about.feature3_title': 'Conciergerie 24/7',
        'about.feature3_desc': 'Service personnalisé à portée de main',
        
        // Rooms Section
        'rooms.title': 'Nos Chambres',
        'rooms.subtitle': 'Hébergements luxueux conçus pour votre confort',
        
        // Gallery Section
        'gallery.title': 'Galerie',
        'gallery.subtitle': 'Un voyage visuel à travers nos espaces de luxe',
        
        // Contact Section
        'contact.title': 'Contactez-nous',
        'contact.subtitle': 'Prêt à vivre le luxe ? Contactez-nous dès aujourd\'hui',
        
        // Services Section
        'services.title': 'Nos Services Premium',
        'services.subtitle': 'Tout ce dont vous avez besoin pour un séjour de luxe parfait',
        'services.minibar_title': 'Minibar Intégré',
        'services.minibar_desc': 'Minibar entièrement approvisionné avec des boissons premium et des collations pour votre commodité',
        'services.parking_title': 'Parking Gratuit',
        'services.parking_desc': 'Place de parking sécurisée gratuite pour votre véhicule pendant votre séjour',
        'services.airport_title': 'Navette Aéroport',
        'services.airport_desc': 'Service de navette aéroport organisé et payé pour une expérience d\'arrivée sans tracas',
        'services.kitchen_title': 'Cuisine Entièrement Équipée',
        'services.kitchen_desc': 'Cuisine complète avec des appareils modernes - cuisinez vous-même ou demandez notre service de chef payant',
        'services.wifi_title': 'WiFi Gratuit Haut Débit',
        'services.wifi_desc': 'Connexion internet fibre ultra-rapide dans toute la villa pour tous vos besoins numériques',
        'services.concierge_title': 'Conciergerie 24/7',
        'services.concierge_desc': 'Assistance 24h/24 pour toute demande ou arrangement spécial',
        
        // WhatsApp
        'whatsapp.tooltip': 'Discutez avec nous sur WhatsApp'
    }
};

function initLanguageSwitcher() {
    const languageBtn = document.getElementById('language-btn');
    const languageMenu = document.getElementById('language-menu');
    const currentLangSpan = document.getElementById('current-lang');
    const languageOptions = document.querySelectorAll('.language-option');
    
    // Mobile language elements
    const mobileLanguageBtn = document.getElementById('mobile-language-btn');
    const mobileLanguageMenu = document.getElementById('mobile-language-menu');
    const mobileCurrentLangSpan = document.getElementById('mobile-current-lang');
    const mobileLanguageOptions = document.querySelectorAll('.mobile-language-option');
    
    // Get saved language or default to English
    let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
    // Apply saved language on page load
    applyLanguage(currentLanguage);
    updateCurrentLanguageDisplay(currentLanguage);
    
    // Desktop language menu toggle
    if (languageBtn) {
        languageBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            languageMenu.classList.toggle('active');
            
            // Close mobile menu if it's open
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburger = document.getElementById('hamburger');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Mobile language menu toggle
    if (mobileLanguageBtn) {
        mobileLanguageBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mobileLanguageMenu.classList.toggle('active');
        });
    }
    
    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (languageBtn && !languageBtn.contains(e.target) && !languageMenu.contains(e.target)) {
            languageMenu.classList.remove('active');
        }
        if (mobileLanguageBtn && !mobileLanguageBtn.contains(e.target) && !mobileLanguageMenu.contains(e.target)) {
            mobileLanguageMenu.classList.remove('active');
        }
    });
    
    // Handle desktop language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLang = option.getAttribute('data-lang');
            
            if (selectedLang && selectedLang !== currentLanguage) {
                currentLanguage = selectedLang;
                applyLanguage(currentLanguage);
                updateCurrentLanguageDisplay(currentLanguage);
                localStorage.setItem('selectedLanguage', currentLanguage);
                
                // Close menu
                languageMenu.classList.remove('active');
                
                // Track language change
                trackEvent('Language', 'Change', selectedLang);
            } else {
                // Close menu even if same language selected
                languageMenu.classList.remove('active');
            }
        });
    });
    
    // Handle mobile language selection
    mobileLanguageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLang = option.getAttribute('data-lang');
            
            if (selectedLang && selectedLang !== currentLanguage) {
                currentLanguage = selectedLang;
                applyLanguage(currentLanguage);
                updateCurrentLanguageDisplay(currentLanguage);
                localStorage.setItem('selectedLanguage', currentLanguage);
                
                // Close menu
                mobileLanguageMenu.classList.remove('active');
                
                // Track language change
                trackEvent('Language', 'Change', selectedLang);
            } else {
                // Close menu even if same language selected
                mobileLanguageMenu.classList.remove('active');
            }
        });
    });
    
}

function applyLanguage(language) {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = translations[language] && translations[language][key];
        
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Update WhatsApp tooltip
    const whatsappTooltip = document.querySelector('.whatsapp-tooltip');
    if (whatsappTooltip) {
        whatsappTooltip.textContent = translations[language]['whatsapp.tooltip'];
    }
}

function updateCurrentLanguageDisplay(language) {
    const currentLangSpan = document.getElementById('current-lang');
    const mobileCurrentLangSpan = document.getElementById('mobile-current-lang');
    
    const langCodes = {
        'en': 'EN',
        'es': 'ES',
        'de': 'DE',
        'fr': 'FR'
    };
    
    if (currentLangSpan) {
        currentLangSpan.textContent = langCodes[language] || 'EN';
    }
    
    if (mobileCurrentLangSpan) {
        mobileCurrentLangSpan.textContent = langCodes[language] || 'EN';
    }
}

// ===== ANALYTICS AND TRACKING =====
function trackEvent(category, action, label) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Console log for development
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// ===== ROOM DETAILS FUNCTIONALITY =====
function initRoomDetails() {
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    const closeDetailsBtns = document.querySelectorAll('.close-details-btn');
    const bookRoomBtns = document.querySelectorAll('.book-room-btn');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // View details functionality
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const roomId = btn.getAttribute('data-room');
            const roomDetails = document.getElementById(`room-details-${roomId}`);
            
            // Close any other open room details
            document.querySelectorAll('.room-details-expanded.active').forEach(expanded => {
                if (expanded.id !== `room-details-${roomId}`) {
                    expanded.classList.remove('active');
                }
            });
            
            // Toggle current room details
            roomDetails.classList.toggle('active');
            
            // Scroll to room details if opening
            if (roomDetails.classList.contains('active')) {
                setTimeout(() => {
                    roomDetails.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 300);
            }
        });
    });
    
    // Close details functionality
    closeDetailsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const roomId = btn.getAttribute('data-room');
            const roomDetails = document.getElementById(`room-details-${roomId}`);
            roomDetails.classList.remove('active');
        });
    });
    
    // Book room functionality
    bookRoomBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const roomId = btn.getAttribute('data-room');
            
            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            const roomSelect = document.querySelector('#room-type');
            
            // Pre-fill room type in contact form
            if (roomSelect) {
                const roomOptions = {
                    1: 'executive',
                    2: 'deluxe', 
                    3: 'presidential',
                    4: 'royal'
                };
                roomSelect.value = roomOptions[roomId];
            }
            
            // Close room details
            const roomDetails = document.getElementById(`room-details-${roomId}`);
            roomDetails.classList.remove('active');
            
            // Scroll to contact form
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Track booking attempt
            trackEvent('Rooms', 'Book Now', `Room ${roomId}`);
        });
    });
    
    // Thumbnail image switching
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (e) => {
            e.preventDefault();
            const roomId = thumbnail.getAttribute('data-room');
            const imageIndex = thumbnail.getAttribute('data-image');
            const mainImage = document.getElementById(`main-image-${roomId}`);
            
            // Update main image
            if (mainImage) {
                mainImage.src = thumbnail.src;
                mainImage.alt = thumbnail.alt;
            }
            
            // Update active thumbnail
            const roomThumbnails = document.querySelectorAll(`[data-room="${roomId}"]`);
            roomThumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });
}

// Track important user interactions
document.addEventListener('click', function(e) {
    
    if (e.target.matches('.gallery-item img')) {
        trackEvent('Gallery', 'View Image', e.target.src);
    }
    
    if (e.target.matches('.btn-primary')) {
        trackEvent('CTA', 'Button Click', e.target.textContent);
    }
    
    if (e.target.matches('.view-details-btn')) {
        const roomId = e.target.getAttribute('data-room');
        trackEvent('Rooms', 'View Details', `Room ${roomId}`);
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== SERVICE WORKER REGISTRATION (for PWA capabilities) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
