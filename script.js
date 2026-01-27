// HomeFix Pro - Interactive JavaScript

// ========================================
// Mobile Menu Toggle
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========================================
// Booking Modal
// ========================================
const bookingModal = document.getElementById('bookingModal');
const modalClose = document.getElementById('modalClose');
const bookingForm = document.getElementById('bookingForm');
const successMessage = document.getElementById('successMessage');

// All booking buttons
const bookNowButtons = [
    document.getElementById('bookNowHeader'),
    document.getElementById('bookNowHero'),
    document.getElementById('bookOtherService')
];

// Open modal
bookNowButtons.forEach(button => {
    if (button) {
        button.addEventListener('click', () => {
            bookingModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });
    }
});

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking outside
if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            closeModal();
        }
    });
}

function closeModal() {
    bookingModal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scroll

    // Reset form after closing
    setTimeout(() => {
        bookingForm.style.display = 'block';
        successMessage.style.display = 'none';
        bookingForm.reset();
        clearErrors();
    }, 300);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal.classList.contains('show')) {
        closeModal();
    }
});

// ========================================
// Form Validation
// ========================================
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear previous errors
        clearErrors();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;

        // Validation flags
        let isValid = true;

        // Name validation
        if (name === '') {
            showError('name', 'nameError', 'Please enter your name');
            isValid = false;
        }

        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        if (phone === '' || !phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
            showError('phone', 'phoneError', 'Please enter a valid phone number');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '' || !emailRegex.test(email)) {
            showError('email', 'emailError', 'Please enter a valid email address');
            isValid = false;
        }

        // Service validation
        if (service === '') {
            showError('service', 'serviceError', 'Please select a service');
            isValid = false;
        }

        // Date validation
        if (date === '') {
            showError('date', 'dateError', 'Please select a preferred date');
            isValid = false;
        } else {
            // Check if date is in the future
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                showError('date', 'dateError', 'Please select a future date');
                isValid = false;
            }
        }

        // If valid, show success message
        if (isValid) {
            console.log('Form submitted:', { name, phone, email, service, date });

            // Hide form and show success message
            bookingForm.style.display = 'none';
            successMessage.style.display = 'block';

            // Auto-close modal after 3 seconds
            setTimeout(() => {
                closeModal();
            }, 3000);
        }
    });
}

function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    input.classList.add('error');
    error.textContent = message;
    error.classList.add('show');
}

function clearErrors() {
    const inputs = document.querySelectorAll('.form-input, .form-select');
    const errors = document.querySelectorAll('.form-error');

    inputs.forEach(input => input.classList.remove('error'));
    errors.forEach(error => error.classList.remove('show'));
}

// ========================================
// FAQ Accordion
// ========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only prevent default for internal anchors (not just #)
        if (href !== '#' && href.startsWith('#')) {
            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// Set min date for booking form
// ========================================
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const minDate = tomorrow.toISOString().split('T')[0];
    dateInput.setAttribute('min', minDate);
}

// ========================================
// Scroll animations (optional enhancement)
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card, .card-service, .testimonial');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(card);
    });
});

// ========================================
// Active navigation highlight
// ========================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to current section link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});
