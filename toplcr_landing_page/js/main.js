/**
 * TOPLCR Landing Page - Main JavaScript
 * Initialize landing page functionality
 */

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('TOPLCR Landing Page Initialized');
    
    // Verify Bootstrap is loaded
    if (typeof bootstrap !== 'undefined') {
        console.log('Bootstrap 5 loaded successfully');
    } else {
        console.warn('Bootstrap 5 failed to load. Please check CDN connection.');
    }
    
    // Initialize form validation
    initializeContactFormValidation();
    
    // Smooth scroll functionality will go here
    // TODO: Add smooth scroll behavior for anchor links
    
});

/**
 * Contact Form Validation
 * Validates all form fields with real-time feedback
 */
function initializeContactFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.warn('Contact form not found in DOM');
        return;
    }
    
    // Form fields
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const phoneInput = document.getElementById('userPhone');
    const messageInput = document.getElementById('userMessage');
    const captchaInput = document.getElementById('captchaAnswer');
    const submitButton = document.getElementById('submitButton');
    const formMessages = document.getElementById('formMessages');
    
    // Real-time validation listeners
    if (nameInput) {
        nameInput.addEventListener('blur', () => validateNameField());
        nameInput.addEventListener('input', () => clearFieldError(nameInput, 'userNameError'));
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => validateEmailField());
        emailInput.addEventListener('input', () => clearFieldError(emailInput, 'userEmailError'));
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', () => validatePhoneField());
        phoneInput.addEventListener('input', () => clearFieldError(phoneInput, 'userPhoneError'));
    }
    
    if (messageInput) {
        messageInput.addEventListener('input', () => clearFieldError(messageInput, 'userMessageError'));
    }
    
    if (captchaInput) {
        captchaInput.addEventListener('blur', () => validateCaptchaField());
        captchaInput.addEventListener('input', () => clearFieldError(captchaInput, 'captchaAnswerError'));
    }
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous messages
        if (formMessages) {
            formMessages.innerHTML = '';
        }
        
        // Validate all fields
        const isNameValid = validateNameField();
        const isEmailValid = validateEmailField();
        const isPhoneValid = validatePhoneField();
        const isCaptchaValid = validateCaptchaField();
        
        // If all validations pass
        if (isNameValid && isEmailValid && isPhoneValid && isCaptchaValid) {
            // TODO: Hook into your backend API endpoint here
            // Example:
            // submitFormToBackend(contactForm);
            
            // Show success message
            showSuccessMessage(formMessages, 'Thank you! Your request has been received. We\'ll contact you within 24 hours.');
            
            // Reset form
            contactForm.reset();
            
            // Remove is-valid classes
            [nameInput, emailInput, phoneInput, messageInput, captchaInput].forEach(input => {
                if (input) input.classList.remove('is-valid');
            });
            
            // Log for debugging (remove in production)
            console.log('Form submitted with data:', {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                message: messageInput.value,
                captcha: captchaInput.value
            });
        } else {
            // Show error message
            showErrorMessage(formMessages, 'Please fix the errors above and try again.');
        }
    });
}

/**
 * Validate Name Field
 * @returns {boolean} True if valid, false otherwise
 */
function validateNameField() {
    const nameInput = document.getElementById('userName');
    const errorElement = document.getElementById('userNameError');
    
    if (!nameInput.value.trim()) {
        showFieldError(nameInput, errorElement, 'Full name is required');
        return false;
    }
    
    if (nameInput.value.trim().length < 2) {
        showFieldError(nameInput, errorElement, 'Name must be at least 2 characters long');
        return false;
    }
    
    // Check for valid name pattern (letters, spaces, hyphens, apostrophes)
    const namePattern = /^[a-zA-Z\s'-]+$/;
    if (!namePattern.test(nameInput.value.trim())) {
        showFieldError(nameInput, errorElement, 'Name can only contain letters, spaces, hyphens, and apostrophes');
        return false;
    }
    
    clearFieldError(nameInput, 'userNameError');
    nameInput.classList.add('is-valid');
    return true;
}

/**
 * Validate Email Field
 * @returns {boolean} True if valid, false otherwise
 */
function validateEmailField() {
    const emailInput = document.getElementById('userEmail');
    const errorElement = document.getElementById('userEmailError');
    
    if (!emailInput.value.trim()) {
        showFieldError(emailInput, errorElement, 'Email address is required');
        return false;
    }
    
    // Email pattern validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        showFieldError(emailInput, errorElement, 'Please enter a valid email address');
        return false;
    }
    
    clearFieldError(emailInput, 'userEmailError');
    emailInput.classList.add('is-valid');
    return true;
}

/**
 * Validate Phone Field
 * @returns {boolean} True if valid, false otherwise
 */
function validatePhoneField() {
    const phoneInput = document.getElementById('userPhone');
    const errorElement = document.getElementById('userPhoneError');
    
    if (!phoneInput.value.trim()) {
        showFieldError(phoneInput, errorElement, 'Phone number is required');
        return false;
    }
    
    // Remove all non-digit characters for validation
    const digitsOnly = phoneInput.value.replace(/\D/g, '');
    
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
        showFieldError(phoneInput, errorElement, 'Phone number must be between 10-15 digits');
        return false;
    }
    
    clearFieldError(phoneInput, 'userPhoneError');
    phoneInput.classList.add('is-valid');
    return true;
}

/**
 * Validate CAPTCHA Field
 * Simple math verification: 5 + 3 = 8
 * @returns {boolean} True if valid, false otherwise
 */
function validateCaptchaField() {
    const captchaInput = document.getElementById('captchaAnswer');
    const errorElement = document.getElementById('captchaAnswerError');
    const correctAnswer = '8';
    
    if (!captchaInput.value.trim()) {
        showFieldError(captchaInput, errorElement, 'Please answer the verification question');
        return false;
    }
    
    if (captchaInput.value.trim() !== correctAnswer) {
        showFieldError(captchaInput, errorElement, 'Incorrect answer. What is 5 + 3?');
        return false;
    }
    
    clearFieldError(captchaInput, 'captchaAnswerError');
    captchaInput.classList.add('is-valid');
    return true;
}

/**
 * Display field error state
 * @param {HTMLElement} input - The input element
 * @param {HTMLElement} errorElement - The error message element
 * @param {string} errorMessage - The error message to display
 */
function showFieldError(input, errorElement, errorMessage) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
    }
}

/**
 * Clear field error state
 * @param {HTMLElement} input - The input element
 * @param {string} errorElementId - The error element ID
 */
function clearFieldError(input, errorElementId) {
    input.classList.remove('is-invalid');
    
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

/**
 * Display success message
 * @param {HTMLElement} container - The message container
 * @param {string} message - The success message
 */
function showSuccessMessage(container, message) {
    if (!container) return;
    
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success-message show';
    successDiv.setAttribute('role', 'alert');
    successDiv.setAttribute('aria-live', 'polite');
    successDiv.innerHTML = `<strong>Success!</strong> ${message}`;
    
    container.innerHTML = '';
    container.appendChild(successDiv);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        successDiv.classList.remove('show');
    }, 5000);
}

/**
 * Display error message
 * @param {HTMLElement} container - The message container
 * @param {string} message - The error message
 */
function showErrorMessage(container, message) {
    if (!container) return;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message show';
    errorDiv.setAttribute('role', 'alert');
    errorDiv.setAttribute('aria-live', 'polite');
    errorDiv.innerHTML = `<strong>Error!</strong> ${message}`;
    
    container.innerHTML = '';
    container.appendChild(errorDiv);
}

/**
 * Submit form data to backend
 * TODO: Update with your actual API endpoint
 * @param {HTMLFormElement} form - The form element
 */
function submitFormToBackend(form) {
    // Get form data
    const formData = new FormData(form);
    
    // Convert to JSON object
    const data = {
        name: formData.get('userName'),
        email: formData.get('userEmail'),
        phone: formData.get('userPhone'),
        message: formData.get('userMessage') || '',
        timestamp: new Date().toISOString()
    };
    
    // TODO: Replace with your actual API endpoint
    // Example:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch((error) => console.error('Error:', error));
    
    console.log('Form data ready to send:', data);
}

/**
 * Error handler for CDN failures
 * Falls back if Bootstrap CDN is unavailable
 */
window.addEventListener('error', function(event) {
    if (event.filename && event.filename.includes('bootstrap')) {
        console.error('Bootstrap CDN failed to load. App may not function correctly.');
        // TODO: Implement fallback mechanism if needed
    }
});

// Additional placeholder for future enhancements
// TODO: Add analytics tracking
// TODO: Add Telegram bot integration handlers
// TODO: Add dynamic form submission
