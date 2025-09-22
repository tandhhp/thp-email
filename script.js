// Redirect functionality
document.addEventListener('DOMContentLoaded', function() {
    // Countdown timer for redirect
    let countdown = 30;
    const countdownElement = document.getElementById('countdown');
    
    const timer = setInterval(function() {
        countdown--;
        countdownElement.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(timer);
            // You can change this URL to wherever you want to redirect
            // For now, it will just show an alert
            // alert('Redirect would happen here! Update the URL in script.js');
            window.location.href = 'https://outlook.office.com/owa/?path=/mail/inbox';
        }
    }, 1000);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Button click handlers
    const primaryBtn = document.querySelector('.btn-primary');
    const secondaryBtn = document.querySelector('.btn-secondary');
    
    primaryBtn.addEventListener('click', function() {
        // Handle primary button click - redirect to main application
        alert('Get Started clicked! Add your application URL here.');
        // window.location.href = 'https://your-app-url.com/signup';
    });
    
    secondaryBtn.addEventListener('click', function() {
        // Handle secondary button click - show more information
        document.querySelector('.features-section').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Add some interactive animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature items for animation
    document.querySelectorAll('.feature-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Add hover effects to cards
    document.querySelectorAll('.feature-item, .feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add particles effect to the background (optional enhancement)
    createParticles();
});

// Create floating particles for visual enhancement
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '-1';
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(102, 126, 234, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        particleContainer.appendChild(particle);
    }
    
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg); 
                opacity: 0.7;
            }
            50% { 
                transform: translateY(-20px) rotate(180deg); 
                opacity: 0.3;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
        e.target.click();
    }
});

// Performance optimization: Lazy load images when they exist
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
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
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();