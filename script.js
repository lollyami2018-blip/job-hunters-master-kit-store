// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// CTA Button Click Handler
const ctaButtons = document.querySelectorAll('.cta-button, .buy-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Redirect to checkout or payment page
        window.location.href = '#checkout';
        alert('Thank you for your interest! Checkout feature coming soon.');
    });
});

// Add active state to navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Feature card hover effect enhancement
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.1)';
    });
});

// Pricing card selection
const buyButtons = document.querySelectorAll('.buy-button');
buyButtons.forEach(button => {
    button.addEventListener('click', function() {
        const plan = this.closest('.pricing-card').querySelector('h3').textContent;
        console.log(`Selected plan: ${plan}`);
        // Here you would typically redirect to a payment processor
        // window.location.href = `checkout.html?plan=${plan}`;
    });
});

// Mobile menu toggle (if you add mobile menu later)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and testimonial cards
document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card').forEach(el => {
    observer.observe(el);
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Email validation for contact form (if added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

console.log('Job Hunters Master Kit Store - Website Loaded Successfully');
