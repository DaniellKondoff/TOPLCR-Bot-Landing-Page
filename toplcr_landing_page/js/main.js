/**
 * TOPLCR Landing Page - Main JavaScript
 * Initialize landing page functionality
 */

// Track form submission timing for bot detection
const formTimingData = {
    formLoadTime: Date.now(),
    lastSubmissionTime: 0,
    currentCaptcha: null
};

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
    
    // Generate initial CAPTCHA question
    generateDynamicCaptcha();
    
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
        
        // Check honeypot - if filled, silently reject (bot detected)
        if (!validateHoneypot()) {
            console.warn('Honeypot field detected - submission blocked');
            showSuccessMessage(formMessages, 'Thank you! Your request has been received. We\'ll contact you within 24 hours.');
            contactForm.reset();
            generateDynamicCaptcha();
            return;
        }
        
        // Check submission timing - reject if too fast
        if (!validateSubmissionTiming()) {
            showErrorMessage(formMessages, 'Please wait a moment before submitting again.');
            return;
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
            
            // Update last submission time
            formTimingData.lastSubmissionTime = Date.now();
            
            // Reset form
            contactForm.reset();
            
            // Generate new CAPTCHA for next submission
            generateDynamicCaptcha();
            
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
 * Generate a new dynamic CAPTCHA question
 * Creates random math problems with different operations and numbers
 */
function generateDynamicCaptcha() {
    const operations = [
        { symbol: '+', name: 'addition' },
        { symbol: '-', name: 'subtraction' },
        { symbol: '×', name: 'multiplication' }
    ];
    
    // Select random operation
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    // Generate random numbers based on operation
    let num1, num2;
    if (operation.name === 'addition') {
        num1 = Math.floor(Math.random() * 50) + 1;  // 1-50
        num2 = Math.floor(Math.random() * 50) + 1;  // 1-50
    } else if (operation.name === 'subtraction') {
        num1 = Math.floor(Math.random() * 50) + 10; // 10-59
        num2 = Math.floor(Math.random() * num1);    // 0 to num1-1 (ensures positive result)
    } else { // multiplication
        num1 = Math.floor(Math.random() * 12) + 1;  // 1-12
        num2 = Math.floor(Math.random() * 12) + 1;  // 1-12
    }
    
    // Calculate correct answer
    let correctAnswer;
    if (operation.name === 'addition') {
        correctAnswer = num1 + num2;
    } else if (operation.name === 'subtraction') {
        correctAnswer = num1 - num2;
    } else {
        correctAnswer = num1 * num2;
    }
    
    // Store current CAPTCHA data
    formTimingData.currentCaptcha = {
        question: `${num1} ${operation.symbol} ${num2}`,
        answer: correctAnswer.toString()
    };
    
    // Update the question in the UI
    const questionElement = document.getElementById('captchaQuestion');
    if (questionElement) {
        questionElement.textContent = `What is ${formTimingData.currentCaptcha.question}?`;
    }
    
    // Clear the input field
    const captchaInput = document.getElementById('captchaAnswer');
    if (captchaInput) {
        captchaInput.value = '';
        captchaInput.classList.remove('is-valid', 'is-invalid');
    }
    
    console.log('New CAPTCHA generated');
}

/**
 * Validate Honeypot Field
 * If the hidden field is filled, it's likely a bot
 * @returns {boolean} True if honeypot is empty (human), false if filled (bot)
 */
function validateHoneypot() {
    const honeypotField = document.getElementById('websiteUrl');
    if (!honeypotField) return true;
    
    // If honeypot field has a value, it's a bot
    return honeypotField.value.trim() === '';
}

/**
 * Validate Submission Timing
 * Rejects submissions that happen too quickly (likely bot)
 * @returns {boolean} True if timing is normal, false if too fast
 */
function validateSubmissionTiming() {
    const currentTime = Date.now();
    const timeSinceLastSubmission = currentTime - formTimingData.lastSubmissionTime;
    const timeSinceFormLoad = currentTime - formTimingData.formLoadTime;
    
    // Reject if form was filled out in less than 2 seconds (too fast to be human)
    if (timeSinceFormLoad < 2000) {
        console.warn('Form submission too fast - likely bot');
        return false;
    }
    
    // Reject if resubmitting within 3 seconds (spam prevention)
    if (formTimingData.lastSubmissionTime > 0 && timeSinceLastSubmission < 3000) {
        console.warn('Rapid resubmission detected - likely bot');
        return false;
    }
    
    return true;
}

/**
 * Validate CAPTCHA Field
 * Compares user input against dynamically generated question
 * @returns {boolean} True if valid, false otherwise
 */
function validateCaptchaField() {
    const captchaInput = document.getElementById('captchaAnswer');
    const errorElement = document.getElementById('captchaAnswerError');
    
    if (!captchaInput.value.trim()) {
        showFieldError(captchaInput, errorElement, 'Please answer the verification question');
        return false;
    }
    
    // Compare against current CAPTCHA answer
    const correctAnswer = formTimingData.currentCaptcha ? formTimingData.currentCaptcha.answer : '8';
    if (captchaInput.value.trim() !== correctAnswer) {
        const question = formTimingData.currentCaptcha ? formTimingData.currentCaptcha.question : '5 + 3';
        showFieldError(captchaInput, errorElement, `Incorrect answer. What is ${question}?`);
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
