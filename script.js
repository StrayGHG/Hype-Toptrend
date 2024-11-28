// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.parentElement;
        const productName = product.querySelector('h3').textContent;
        
        // Animation for button
        this.innerHTML = '✓ Added';
        this.style.background = '#4CAF50';
        
        setTimeout(() => {
            this.innerHTML = 'Add to Cart';
            this.style.background = '#8a2be2';
        }, 2000);
        
        // Alert user
        alert(`${productName} has been added to your cart!`);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on scroll for products
window.addEventListener('scroll', () => {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productPosition = product.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if(productPosition < screenPosition) {
            product.style.opacity = '1';
            product.style.transform = 'translateY(0)';
        }
    });
});

// Add this to your existing script.js
document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        document.querySelectorAll('.category-tab').forEach(t => 
            t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Here you would typically filter products
        // For now, just add a visual feedback
        const category = this.textContent;
        if(category !== 'All') {
            alert(`Showing ${category} category`);
        }
    });
});

// Enhanced parallax effect for hero section
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const moveX = (x * speed) * 50;
        const moveY = (y * speed) * 50;
        
        // Different movement for different shape types
        if (shape.classList.contains('circle')) {
            shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${x * 360}deg)`;
        } else if (shape.classList.contains('square')) {
            shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(45deg) scale(${1 + x * 0.2})`;
        } else if (shape.classList.contains('ring')) {
            shape.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + y * 0.2})`;
        }
    });
});

// Add scroll reveal animation for sections
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if(sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Combined cursor animation and snowfall
function initializeAnimations() {
    const container = document.querySelector('header');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const maxSnowflakes = 30; // Adjusted number of snowflakes

    // Create snowflake function
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Random starting position across full width
        const startX = Math.random() * containerWidth;
        // Random horizontal drift
        const endX = startX + (Math.random() - 0.5) * 400; // Increased drift
        
        snowflake.style.left = `${startX}px`;
        snowflake.style.setProperty('--end-x', `${endX - startX}px`);
        
        // Random size between 20px and 35px
        const size = (Math.random() * 15 + 20);
        snowflake.style.fontSize = `${size}px`;
        
        // Slower duration for better visibility
        const duration = (Math.random() * 4 + 6); // 6-10 seconds
        snowflake.style.animation = `snowfall ${duration}s linear`;
        
        container.appendChild(snowflake);
        
        // Remove and recreate snowflake after animation
        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
            createSnowflake();
        });
    }

    // Initialize snowflakes
    for (let i = 0; i < maxSnowflakes; i++) {
        setTimeout(() => {
            createSnowflake();
        }, Math.random() * 3000);
    }

    // Cursor particle effect
    document.addEventListener('mousemove', (e) => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        
        const duration = 10 + Math.random() * 10;
        particle.style.animation = `particleFall ${duration}s linear`;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    });

    // Click burst effect
    document.addEventListener('click', (e) => {
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const angle = (i / 10) * Math.PI * 2;
            const radius = 20;
            particle.style.left = `${e.clientX + Math.cos(angle) * radius}px`;
            particle.style.top = `${e.clientY + Math.sin(angle) * radius}px`;
            
            const duration = 10 + Math.random() * 10;
            particle.style.animation = `particleFall ${duration}s linear`;
            
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeAnimations);

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const snowflakes = document.querySelectorAll('.snowflake');
        snowflakes.forEach(s => s.remove());
        initializeAnimations();
    }, 200);
});
