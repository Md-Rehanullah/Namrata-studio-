// JavaScript for Glamour Studio Website

// Portfolio data
const portfolioItems = [
    {
        id: 1,
        title: "Traditional Bridal",
        description: "Kolkata Wedding",
        image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=800&fit=crop",
        category: "bridal"
    },
    {
        id: 2,
        title: "Contemporary Bridal",
        description: "Delhi Reception",
        image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=800&fit=crop",
        category: "bridal"
    },
    {
        id: 3,
        title: "Glamour Party",
        description: "Birthday Celebration",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=800&fit=crop",
        category: "party"
    },
    {
        id: 4,
        title: "Behind the Scenes",
        description: "Our Process",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=800&fit=crop",
        category: "editorial"
    },
    {
        id: 5,
        title: "Natural Bridal",
        description: "Garden Wedding",
        image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=800&fit=crop",
        category: "bridal"
    },
    {
        id: 6,
        title: "Creative Party Look",
        description: "Fashion Event",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=800&fit=crop",
        category: "party"
    },
    {
        id: 7,
        title: "Editorial Shoot",
        description: "Magazine Feature",
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=800&fit=crop",
        category: "editorial"
    },
    {
        id: 8,
        title: "Royal Bridal",
        description: "Palace Wedding",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=800&fit=crop",
        category: "bridal"
    }
];

// DOM elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const scrollTopButton = document.getElementById('scroll-top');
const contactForm = document.getElementById('contact-form');
const portfolioGrid = document.getElementById('portfolio-grid');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeScrollEffects();
    initializePortfolio();
    initializeAnimations();
    initializeContactForm();
});

// Theme Management
function initializeTheme() {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
}

// Navigation Management
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId.substring(1)); // Remove the '#' from href
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    window.addEventListener('scroll', function() {
        handleNavbarScroll();
        handleScrollToTopButton();
    });
}

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function handleScrollToTopButton() {
    if (window.scrollY > 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
}

// Portfolio Management
function initializePortfolio() {
    renderPortfolio('all');
    
    // Portfolio filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter portfolio items
            const filter = this.getAttribute('data-filter');
            renderPortfolio(filter);
            
            // Track event
            console.log('Event tracked:', 'portfolio_filter', { filter });
        });
    });
}

function renderPortfolio(filter) {
    if (!portfolioGrid) return;
    
    const filteredItems = filter === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === filter);
    
    portfolioGrid.innerHTML = '';
    
    if (filteredItems.length === 0) {
        portfolioGrid.innerHTML = '<div class="no-results">No items found for this category.</div>';
        return;
    }
    
    filteredItems.forEach((item, index) => {
        const portfolioItem = createPortfolioItem(item, index);
        portfolioGrid.appendChild(portfolioItem);
    });
}

function createPortfolioItem(item, index) {
    const div = document.createElement('div');
    div.className = 'portfolio-item animate-on-scroll';
    div.style.animationDelay = `${index * 0.1}s`;
    
    div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="portfolio-overlay">
            <h4 class="portfolio-title">${item.title}</h4>
            <p class="portfolio-description">${item.description}</p>
        </div>
    `;
    
    return div;
}

// Animation Management
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add animation classes to various sections
    addAnimationClasses();
}

function addAnimationClasses() {
    // Add animation classes to all elements
    const elementsToAnimate = [
        '.service-card',
        '.testimonial-card', 
        '.feature-item',
        '.academy-img',
        '.pricing-card',
        '.highlight-card',
        '.rating-card'
    ];
    
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add('animate-on-scroll');
        });
    });
}

// Contact Form Management
function initializeContactForm() {
    contactForm.addEventListener('submit', handleFormSubmission);
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        serviceType: formData.get('serviceType'),
        eventDate: formData.get('eventDate'),
        location: formData.get('location'),
        message: formData.get('message')
    };
    
    // Validate required fields
    if (!data.fullName || !data.phone || !data.serviceType || !data.eventDate || !data.location) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.innerHTML = '<div class="loading"></div> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Thank you for your message! We\'ll contact you soon to confirm your appointment.', 'success');
        
        // In a real application, you would send the data to your server here
        console.log('Form data:', data);
    }, 2000);
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 100; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function openWhatsApp() {
    const phoneNumber = '919876543210'; // Replace with actual WhatsApp number
    const message = encodeURIComponent('Hi! I would like to book a makeup appointment.');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
}

function makeCall() {
    window.open('tel:+919876543210', '_blank');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 1001;
                max-width: 400px;
                padding: 1rem;
                border-radius: 12px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                backdrop-filter: blur(10px);
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification-success {
                background: rgba(34, 197, 94, 0.9);
                color: white;
            }
            
            .notification-error {
                background: rgba(239, 68, 68, 0.9);
                color: white;
            }
            
            .notification-info {
                background: rgba(59, 130, 246, 0.9);
                color: white;
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            
            .notification-message {
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                font-size: 1rem;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Handle video autoplay issues
function handleVideoAutoplay() {
    const video = document.querySelector('.hero-video');
    if (video) {
        video.muted = true;
        video.playsInline = true;
        
        // Try to play the video
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.log('Video autoplay prevented - this is normal on some browsers');
            });
        }
    }
}

// Initialize video when page loads
document.addEventListener('DOMContentLoaded', handleVideoAutoplay);

// Handle page visibility change to pause/resume video
document.addEventListener('visibilitychange', function() {
    const video = document.querySelector('.hero-video');
    if (video) {
        if (document.hidden) {
            video.pause();
        } else {
            video.play().catch(() => {
                console.log('Video play failed');
            });
        }
    }
});

// Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll handlers
window.addEventListener('scroll', debounce(() => {
    handleNavbarScroll();
    handleScrollToTopButton();
}, 10));

// Handle form input validation
function initializeFormValidation() {
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Validate based on field type
    switch (field.name) {
        case 'fullName':
            if (!value) {
                showFieldError(field, 'Name is required');
            }
            break;
        case 'phone':
            if (!value) {
                showFieldError(field, 'Phone number is required');
            } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(value)) {
                showFieldError(field, 'Please enter a valid phone number');
            }
            break;
        case 'email':
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
            }
            break;
        case 'serviceType':
            if (!value) {
                showFieldError(field, 'Please select a service type');
            }
            break;
        case 'eventDate':
            if (!value) {
                showFieldError(field, 'Event date is required');
            } else if (new Date(value) < new Date()) {
                showFieldError(field, 'Event date cannot be in the past');
            }
            break;
        case 'location':
            if (!value) {
                showFieldError(field, 'Location is required');
            }
            break;
    }
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Add error message if not already present
    let errorMsg = field.parentNode.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        field.parentNode.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
    
    // Add error styles if not already added
    if (!document.querySelector('#validation-styles')) {
        const styles = document.createElement('style');
        styles.id = 'validation-styles';
        styles.textContent = `
            .form-group input.error,
            .form-group select.error,
            .form-group textarea.error {
                border-color: #ef4444 !important;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
            }
            
            .error-message {
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.5rem;
            }
        `;
        document.head.appendChild(styles);
    }
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeFormValidation, 100); // Small delay to ensure form is ready
});

// Analytics and tracking (placeholder for future implementation)
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, properties);
}

// Track important user interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('button_click', {
                button_text: this.textContent.trim(),
                section: this.closest('section')?.id || 'unknown'
            });
        });
    });
    
    // Track form submission attempts
    contactForm.addEventListener('submit', function() {
        trackEvent('form_submission_attempt');
    });
    
    // Track portfolio filter usage
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('portfolio_filter', {
                filter: this.getAttribute('data-filter')
            });
        });
    });
});

// Error handling for unhandled errors
window.addEventListener('error', function(e) {
    console.error('Unhandled error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
