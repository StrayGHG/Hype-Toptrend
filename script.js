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

// Snowfall Animation
function createSnowflakes() {
    const container = document.querySelector('header');
    const containerWidth = container.offsetWidth;
    const maxSnowflakes = 50; // Adjust number of snowflakes

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Random starting position
        const startX = Math.random() * containerWidth;
        // Random horizontal drift
        const endX = startX + (Math.random() - 0.5) * 200;
        
        snowflake.style.left = `${startX}px`;
        snowflake.style.setProperty('--end-x', `${endX - startX}px`);
        
        // Random size
        const size = (Math.random() * 15 + 5);
        snowflake.style.fontSize = `${size}px`;
        
        // Random duration
        const duration = (Math.random() * 3 + 2);
        snowflake.style.animation = `snowfall ${duration}s linear`;
        
        container.appendChild(snowflake);
        
        // Remove snowflake after animation
        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
            createSnowflake(); // Create new snowflake to maintain constant number
        });
    }

    // Initial creation of snowflakes
    for (let i = 0; i < maxSnowflakes; i++) {
        setTimeout(() => {
            createSnowflake();
        }, Math.random() * 3000); // Stagger initial creation
    }
}

// Initialize snowfall on page load
document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();
});

// Adjust snowfall when window is resized
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const snowflakes = document.querySelectorAll('.snowflake');
        snowflakes.forEach(s => s.remove());
        createSnowflakes();
    }, 200);
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    const body = document.body;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    body.appendChild(overlay);

    // Open sidebar
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
    });

    // Close sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }

    sidebarClose.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Close sidebar on link click
    document.querySelectorAll('.sidebar-items a').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
});
