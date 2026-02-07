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

let captchaExpectedAnswer = "";

const generateCaptcha = () => {
    const operators = [
        { symbol: "+", fn: (a, b) => a + b },
        { symbol: "−", fn: (a, b) => a - b },
        { symbol: "×", fn: (a, b) => a * b },
    ];

    const op = operators[Math.floor(Math.random() * operators.length)];

    let a, b;
    if (op.symbol === "×") {
        // Keep multiplication simple: 2-9
        a = Math.floor(Math.random() * 8) + 2;
        b = Math.floor(Math.random() * 8) + 2;
    } else {
        a = Math.floor(Math.random() * 9) + 1;
        b = Math.floor(Math.random() * 9) + 1;
    }

    // For subtraction, ensure a >= b so the answer is never negative
    if (op.symbol === "−" && a < b) {
        [a, b] = [b, a];
    }

    captchaExpectedAnswer = String(op.fn(a, b));

    const questionEl = document.getElementById("captchaQuestion");
    if (questionEl) {
        questionEl.textContent = `What is ${a} ${op.symbol} ${b}?`;
    }

    // Clear the input when generating a new question
    const input = document.getElementById("captchaAnswer");
    if (input) {
        input.value = "";
        clearError(input);
    }
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
    const phoneInput = document.getElementById("userPhone");

    // Generate initial CAPTCHA question
    generateCaptcha();

    // Set timestamp for bot detection
    const timestampInput = document.getElementById("formTimestamp");
    if (timestampInput) {
        timestampInput.value = Date.now();
    }

    // Track which fields the user has interacted with
    const touchedFields = new Set();

    // --- Real-time: clear errors on input, validate on blur ---
    Object.keys(VALIDATION_RULES).forEach((fieldId) => {
        const field = document.getElementById(fieldId);
        if (!field) return;

        const rules = VALIDATION_RULES[fieldId];

        if (rules.isCheckbox) {
            // Checkboxes: validate immediately on change
            field.addEventListener("change", () => {
                touchedFields.add(fieldId);
                validateField(field);
            });
        } else {
            // Text inputs: clear error on input, validate on blur
            field.addEventListener("input", () => {
                touchedFields.add(fieldId);
                clearError(field);
            });

            field.addEventListener("blur", () => {
                if (touchedFields.has(fieldId)) {
                    validateField(field);
                }
            });
        }
    });

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
        const honeypot = document.getElementById("website");
        if (honeypot && honeypot.value !== "") {
            // Silently fake-succeed so the bot thinks it worked
            silentFakeSuccess(submitBtn);
            return;
        }

        // --- Bot detection: form submitted too fast (< 3 seconds) ---
        if (timestampInput) {
            const elapsed = Date.now() - parseInt(timestampInput.value, 10);
            if (elapsed < 3000) {
                silentFakeSuccess(submitBtn);
                return;
            }
        }

        // Mark all required fields as touched
        Object.keys(VALIDATION_RULES).forEach((id) => touchedFields.add(id));

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
            form.reset();
            clearAllValidation();

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
   6. VALIDATE A SINGLE FIELD
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
    let allValid = true;

    Object.keys(VALIDATION_RULES).forEach((fieldId) => {
        const field = document.getElementById(fieldId);
        if (field && !validateField(field)) {
            allValid = false;
        }
    });

    return allValid;
};

/* --------------------------------------------------------------------------
   8. ERROR / CLEAR HELPERS
   -------------------------------------------------------------------------- */

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

const showSuccessMessage = (text) => {
    const el = document.getElementById("formSuccess");
    const span = document.getElementById("formSuccessText");
    if (!el) return;

    if (span) span.textContent = text;
    el.classList.remove("d-none");

    // Hide the form itself
    const form = document.getElementById("contactForm");
    if (form) form.classList.add("d-none");
};

const showErrorMessage = (text) => {
    const el = document.getElementById("formError");
    const span = document.getElementById("formErrorText");
    if (!el) return;

    if (span) span.textContent = text;
    el.classList.remove("d-none");
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
