// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const menuIcon = menuBtn.querySelector('.menu-icon');
const closeIcon = menuBtn.querySelector('.close-icon');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
});

// Update Current Year in Footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Toast Notification System
class Toast {
    constructor(type, message, duration = 3000) {
        this.type = type;
        this.message = message;
        this.duration = duration;
        this.createToast();
    }

    createToast() {
        const toast = document.createElement('div');
        toast.className = `toast ${this.type}`;
        toast.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${this.type === 'success' 
                    ? '<path d="M20 6L9 17l-5-5"></path>'
                    : '<path d="M18 6L6 18M6 6l12 12"></path>'}
            </svg>
            <span>${this.message}</span>
        `;

        const container = document.getElementById('toastContainer');
        container.appendChild(toast);

        // Remove toast after duration
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        }, this.duration);
    }
}

// Form Handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form (basic example)
        if (!data.name || !data.email || !data.message) {
            new Toast('error', 'Please fill in all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            new Toast('error', 'Please enter a valid email address');
            return;
        }

        // Simulate form submission
        console.log('Form submitted:', data);
        new Toast('success', 'Message sent successfully! We\'ll get back to you soon.');
        contactForm.reset();
    });
}

// Smooth Scroll for Navigation Links
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

// Active Navigation Link Handling
const setActiveNavLink = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

// Set active link on page load
setActiveNavLink();