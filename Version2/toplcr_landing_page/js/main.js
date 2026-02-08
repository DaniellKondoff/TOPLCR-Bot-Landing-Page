/* ==========================================================================
   TOPLCR Landing Page - Main JavaScript
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    console.log("TOPLCR Landing Page Initialized");

    initSmoothScroll();
    initContactForm();
});

/* --------------------------------------------------------------------------
   1. SMOOTH SCROLL TO CONTACT FORM
   -------------------------------------------------------------------------- */

const initSmoothScroll = () => {
    const ctaButtons = document.querySelectorAll(".cta-button, .btn-cta");
    const target = document.getElementById("contact-form");

    if (!target) return;

    ctaButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
            const offset = 80; // account for potential sticky header

            window.scrollTo({
                top: targetTop - offset,
                behavior: "smooth",
            });
        });
    });
};

/* --------------------------------------------------------------------------
   2. DYNAMIC MATH CAPTCHA
   -------------------------------------------------------------------------- */

// Track form submission timing for bot detection
const formTimingData = {
    formLoadTime: Date.now(),
    lastSubmissionTime: 0,
    currentCaptcha: null
};

const generateCaptcha = () => {
    const operators = [
        { symbol: "+", name: "addition" },
        { symbol: "−", name: "subtraction" },
        { symbol: "×", name: "multiplication" },
    ];

    const op = operators[Math.floor(Math.random() * operators.length)];

    let a, b;
    if (op.name === "addition") {
        // Addition: 1-50 for both numbers
        a = Math.floor(Math.random() * 50) + 1;
        b = Math.floor(Math.random() * 50) + 1;
    } else if (op.name === "subtraction") {
        // Subtraction: num1 (10-59), num2 (0 to num1-1) ensures positive result
        a = Math.floor(Math.random() * 50) + 10;
        b = Math.floor(Math.random() * a);
    } else { // multiplication
        // Multiplication: 1-12 for both numbers
        a = Math.floor(Math.random() * 12) + 1;
        b = Math.floor(Math.random() * 12) + 1;
    }

    // Calculate correct answer
    let correctAnswer;
    if (op.name === "addition") {
        correctAnswer = a + b;
    } else if (op.name === "subtraction") {
        correctAnswer = a - b;
    } else {
        correctAnswer = a * b;
    }

    // Store current CAPTCHA data in formTimingData
    formTimingData.currentCaptcha = {
        question: `${a} ${op.symbol} ${b}`,
        answer: correctAnswer.toString()
    };

    // Update the question in the UI
    const questionEl = document.getElementById("captchaQuestion");
    if (questionEl) {
        questionEl.textContent = `What is ${formTimingData.currentCaptcha.question}?`;
    }

    // Clear the input when generating a new question
    const input = document.getElementById("captchaAnswer");
    if (input) {
        input.value = "";
        clearError(input);
    }

    console.log('New CAPTCHA generated');
};

/* --------------------------------------------------------------------------
   3. VALIDATION RULES
   -------------------------------------------------------------------------- */

const VALIDATION_RULES = {
    userName: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s\-']+$/,
        errorId: "userNameError",
        messages: {
            required: "Please enter your name.",
            minLength: "Name must be at least 2 characters.",
            pattern: "Name can only contain letters, spaces, and hyphens.",
        },
    },
    userEmail: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorId: "userEmailError",
        messages: {
            required: "Please enter your email address.",
            pattern: "Please enter a valid email address.",
        },
    },
    userPhone: {
        required: true,
        // only require at least 7 digits (covers local and international numbers)
        minDigits: 7,
        maxDigits: 15,
        errorId: "userPhoneError",
        messages: {
            required: "Please enter your phone number.",
            digits: "Please enter a valid phone number.",
        },
    },
    captchaAnswer: {
        required: true,
        dynamicValue: true,
        errorId: "captchaError",
        messages: {
            required: "Please solve the math problem.",
            dynamicValue: "Incorrect answer. Please try again.",
        },
    },
    confirmHuman: {
        isCheckbox: true,
        required: true,
        errorId: "confirmHumanError",
        messages: {
            required: "Please confirm you are a real person.",
        },
    },
};

/* --------------------------------------------------------------------------
   4. CONTACT FORM INITIALIZATION
   -------------------------------------------------------------------------- */

const initContactForm = () => {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const submitBtn = document.getElementById("submitButton");

    // Generate initial CAPTCHA question
    generateCaptcha();

    // --- Real-time: clear errors on input, validate on blur ---
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const phoneInput = document.getElementById('userPhone');
    const captchaInput = document.getElementById('captchaAnswer');
    const checkboxInput = document.getElementById('confirmHuman');

    // Name field validation
    if (nameInput) {
        nameInput.addEventListener('blur', () => validateNameField());
        nameInput.addEventListener('input', () => clearFieldError(nameInput, 'userNameError'));
    }

    // Email field validation
    if (emailInput) {
        emailInput.addEventListener('blur', () => validateEmailField());
        emailInput.addEventListener('input', () => clearFieldError(emailInput, 'userEmailError'));
    }

    // Phone field validation
    if (phoneInput) {
        phoneInput.addEventListener('blur', () => validatePhoneField());
        phoneInput.addEventListener('input', () => clearFieldError(phoneInput, 'userPhoneError'));
    }

    // CAPTCHA field validation
    if (captchaInput) {
        captchaInput.addEventListener('blur', () => validateCaptchaField());
        captchaInput.addEventListener('input', () => clearFieldError(captchaInput, 'captchaError'));
    }

    // Checkbox validation (keep existing logic)
    if (checkboxInput) {
        checkboxInput.addEventListener('change', () => {
            validateField(checkboxInput);
        });
    }

    // --- Phone formatting as user types ---
    if (phoneInput) {
        phoneInput.addEventListener("input", () => {
            formatPhoneNumber(phoneInput);
        });
    }

    // --- Form submission ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        hideFormMessages();

        // --- Bot detection: honeypot must be empty ---
        const honeypot = document.getElementById("websiteUrl");
        if (honeypot && honeypot.value !== "") {
            // Silently fake-succeed so the bot thinks it worked
            console.warn('Honeypot field detected - submission blocked');
            silentFakeSuccess(submitBtn);
            return;
        }

        // --- Bot detection: Check submission timing ---
        // Check 1: Form submitted too fast since load (< 2 seconds)
        const timeSinceLoad = Date.now() - formTimingData.formLoadTime;
        if (timeSinceLoad < 2000) {
            console.warn('Form submission too fast - likely bot');
            silentFakeSuccess(submitBtn);
            return;
        }

        // Check 2: Rapid resubmission (< 3 seconds since last submission)
        if (formTimingData.lastSubmissionTime > 0) {
            const timeSinceLastSubmit = Date.now() - formTimingData.lastSubmissionTime;
            if (timeSinceLastSubmit < 3000) {
                console.warn('Rapid resubmission detected - likely bot');
                silentFakeSuccess(submitBtn);
                return;
            }
        }

        const isValid = validateForm();

        if (!isValid) {
            showErrorMessage("Please fix the errors below and try again.");

            // Regenerate CAPTCHA on wrong answer so bots can't replay
            const captchaField = document.getElementById("captchaAnswer");
            if (captchaField && captchaField.classList.contains("is-invalid")) {
                generateCaptcha();
            }

            // Focus the first invalid field
            const firstInvalid = form.querySelector(".is-invalid");
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        // --- Valid: simulate submission ---
        setSubmitLoading(submitBtn, true);

        // Simulate network request (Django backend will replace this)
        setTimeout(() => {
            setSubmitLoading(submitBtn, false);
            showSuccessMessage("Thank you! We'll contact you within 24 hours.");

            // Update last submission time for bot detection
            formTimingData.lastSubmissionTime = Date.now();

            // Reset form and validation
            form.reset();
            clearAllValidation();

            // Generate new CAPTCHA for next submission
            generateCaptcha();

            // Scroll success message into view
            const msgEl = document.getElementById("formMessages");
            if (msgEl) {
                msgEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }, 1200);
    });
};

/* --------------------------------------------------------------------------
   5. SILENT FAKE SUCCESS (for bot traps)
   -------------------------------------------------------------------------- */

const silentFakeSuccess = (submitBtn) => {
    setSubmitLoading(submitBtn, true);
    setTimeout(() => {
        setSubmitLoading(submitBtn, false);
        showSuccessMessage("Thank you! We'll contact you within 24 hours.");
    }, 1200);
};

/* --------------------------------------------------------------------------
   6. INDIVIDUAL FIELD VALIDATION FUNCTIONS
   -------------------------------------------------------------------------- */

/**
 * Validate Name Field
 * @returns {boolean} True if valid, false otherwise
 */
const validateNameField = () => {
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
};

/**
 * Validate Email Field
 * @returns {boolean} True if valid, false otherwise
 */
const validateEmailField = () => {
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
};

/**
 * Validate Phone Field
 * @returns {boolean} True if valid, false otherwise
 */
const validatePhoneField = () => {
    const phoneInput = document.getElementById('userPhone');
    const errorElement = document.getElementById('userPhoneError');

    if (!phoneInput.value.trim()) {
        showFieldError(phoneInput, errorElement, 'Phone number is required');
        return false;
    }

    // Remove all non-digit characters for validation
    const digitsOnly = phoneInput.value.replace(/\D/g, '');

    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        showFieldError(phoneInput, errorElement, 'Phone number must be between 7-15 digits');
        return false;
    }

    clearFieldError(phoneInput, 'userPhoneError');
    phoneInput.classList.add('is-valid');
    return true;
};

/**
 * Validate CAPTCHA Field
 * Compares user input against dynamically generated question
 * @returns {boolean} True if valid, false otherwise
 */
const validateCaptchaField = () => {
    const captchaInput = document.getElementById('captchaAnswer');
    const errorElement = document.getElementById('captchaError');

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

    clearFieldError(captchaInput, 'captchaError');
    captchaInput.classList.add('is-valid');
    return true;
};

/* --------------------------------------------------------------------------
   7. VALIDATE A SINGLE FIELD (Generic - for checkbox)
   -------------------------------------------------------------------------- */

const validateField = (field) => {
    const rules = VALIDATION_RULES[field.id];
    if (!rules) return true; // no rules = always valid

    // Checkbox validation
    if (rules.isCheckbox) {
        if (rules.required && !field.checked) {
            showError(field, rules.messages.required);
            return false;
        }
        clearError(field);
        field.classList.add("is-valid");
        return true;
    }

    const value = field.value.trim();

    // Required check
    if (rules.required && value === "") {
        showError(field, rules.messages.required);
        return false;
    }

    // Min length check
    if (rules.minLength && value.length < rules.minLength) {
        showError(field, rules.messages.minLength);
        return false;
    }

    // Pattern check (for name, email)
    if (rules.pattern && !rules.pattern.test(value)) {
        showError(field, rules.messages.pattern);
        return false;
    }

    // Phone digit-count check
    if (rules.minDigits !== undefined) {
        const digits = value.replace(/\D/g, "");
        if (digits.length < rules.minDigits || digits.length > rules.maxDigits) {
            showError(field, rules.messages.digits);
            return false;
        }
    }

    // Dynamic value check (CAPTCHA)
    if (rules.dynamicValue && value !== captchaExpectedAnswer) {
        showError(field, rules.messages.dynamicValue);
        return false;
    }

    // All checks passed
    clearError(field);
    field.classList.add("is-valid");
    return true;
};

/* --------------------------------------------------------------------------
   7. VALIDATE ENTIRE FORM
   -------------------------------------------------------------------------- */

const validateForm = () => {
    // Validate all fields using individual validation functions
    const isNameValid = validateNameField();
    const isEmailValid = validateEmailField();
    const isPhoneValid = validatePhoneField();
    const isCaptchaValid = validateCaptchaField();

    // Validate checkbox using generic validateField
    const checkboxField = document.getElementById('confirmHuman');
    const isCheckboxValid = checkboxField ? validateField(checkboxField) : true;

    return isNameValid && isEmailValid && isPhoneValid && isCaptchaValid && isCheckboxValid;
};

/* --------------------------------------------------------------------------
   8. ERROR / CLEAR HELPERS
   -------------------------------------------------------------------------- */

/**
 * Display field error state
 * @param {HTMLElement} input - The input element
 * @param {HTMLElement} errorElement - The error message element
 * @param {string} errorMessage - The error message to display
 */
const showFieldError = (input, errorElement, errorMessage) => {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');

    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
    }

    input.setAttribute('aria-invalid', 'true');
};

/**
 * Clear field error state
 * @param {HTMLElement} input - The input element
 * @param {string} errorElementId - The error element ID
 */
const clearFieldError = (input, errorElementId) => {
    input.classList.remove('is-invalid');

    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    input.removeAttribute('aria-invalid');
};

// Backward compatibility aliases
const showError = (field, message) => {
    field.classList.remove("is-valid");
    field.classList.add("is-invalid");

    const rules = VALIDATION_RULES[field.id];
    if (rules && rules.errorId) {
        const errorDiv = document.getElementById(rules.errorId);
        if (errorDiv) {
            errorDiv.textContent = message;
        }
    }

    // ARIA
    field.setAttribute("aria-invalid", "true");
};

const clearError = (field) => {
    field.classList.remove("is-invalid", "is-valid");

    const rules = VALIDATION_RULES[field.id];
    if (rules && rules.errorId) {
        const errorDiv = document.getElementById(rules.errorId);
        if (errorDiv) {
            errorDiv.textContent = "";
        }
    }

    field.removeAttribute("aria-invalid");
};

const clearAllValidation = () => {
    Object.keys(VALIDATION_RULES).forEach((fieldId) => {
        const field = document.getElementById(fieldId);
        if (field) clearError(field);
    });
};

/* --------------------------------------------------------------------------
   9. PHONE FORMATTING
   -------------------------------------------------------------------------- */

const formatPhoneNumber = (input) => {
    // Strip everything except digits and leading +
    const raw = input.value;
    const hasPlus = raw.startsWith("+");
    let digits = raw.replace(/\D/g, "");

    // Cap at 15 digits
    if (digits.length > 15) {
        digits = digits.slice(0, 15);
    }

    let formatted = "";

    if (hasPlus) {
        // International format: +X (XXX) XXX-XXXX
        if (digits.length <= 1) {
            formatted = "+" + digits;
        } else if (digits.length <= 4) {
            formatted = "+" + digits.slice(0, 1) + " (" + digits.slice(1);
        } else if (digits.length <= 7) {
            formatted = "+" + digits.slice(0, 1) + " (" + digits.slice(1, 4) + ") " + digits.slice(4);
        } else {
            formatted = "+" + digits.slice(0, 1) + " (" + digits.slice(1, 4) + ") " + digits.slice(4, 7) + "-" + digits.slice(7);
        }
    } else {
        // Domestic format: (XXX) XXX-XXXX
        if (digits.length <= 3) {
            formatted = digits;
        } else if (digits.length <= 6) {
            formatted = "(" + digits.slice(0, 3) + ") " + digits.slice(3);
        } else {
            formatted = "(" + digits.slice(0, 3) + ") " + digits.slice(3, 6) + "-" + digits.slice(6);
        }
    }

    input.value = formatted;
};

/* --------------------------------------------------------------------------
   10. FORM-LEVEL SUCCESS / ERROR MESSAGES
   -------------------------------------------------------------------------- */

/**
 * Display success message
 * @param {string} message - The success message
 */
const showSuccessMessage = (text) => {
    const container = document.getElementById('formMessages');
    if (!container) return;

    const successDiv = document.createElement('div');
    successDiv.className = 'form-success-message show';
    successDiv.setAttribute('role', 'alert');
    successDiv.setAttribute('aria-live', 'polite');
    successDiv.innerHTML = `<strong>Success!</strong> ${text}`;

    container.innerHTML = '';
    container.appendChild(successDiv);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        successDiv.classList.remove('show');
    }, 5000);
};

/**
 * Display error message
 * @param {string} message - The error message
 */
const showErrorMessage = (text) => {
    const container = document.getElementById('formMessages');
    if (!container) return;

    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message show';
    errorDiv.setAttribute('role', 'alert');
    errorDiv.setAttribute('aria-live', 'polite');
    errorDiv.innerHTML = `<strong>Error!</strong> ${text}`;

    container.innerHTML = '';
    container.appendChild(errorDiv);
};

const hideFormMessages = () => {
    const error = document.getElementById("formError");
    const success = document.getElementById("formSuccess");
    if (error) error.classList.add("d-none");
    if (success) success.classList.add("d-none");
};

/* --------------------------------------------------------------------------
   11. SUBMIT BUTTON LOADING STATE
   -------------------------------------------------------------------------- */

const setSubmitLoading = (btn, isLoading) => {
    if (!btn) return;

    if (isLoading) {
        btn.disabled = true;
        btn.dataset.originalText = btn.textContent;
        btn.innerHTML =
            '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
    } else {
        btn.disabled = false;
        btn.textContent = btn.dataset.originalText || "Request FREE Credits Now";
    }
};

/* --------------------------------------------------------------------------
   12. RESET FORM (public utility — can be called from console or future code)
   -------------------------------------------------------------------------- */

const resetForm = () => {
    const form = document.getElementById("contactForm");
    if (form) {
        form.reset();
        form.classList.remove("d-none");
    }
    clearAllValidation();
    hideFormMessages();
    generateCaptcha();
};
