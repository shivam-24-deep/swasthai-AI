// Swasthai AI - JavaScript Functions
// Simple, Clean, Accessible

// Language Toggle Function
function setLanguage(lang) {
    // Save preference
    localStorage.setItem('preferredLanguage', lang);

    // Update button states
    const hiBtn = document.getElementById('langHi');
    const enBtn = document.getElementById('langEn');
    if (hiBtn && enBtn) {
        hiBtn.classList.toggle('active', lang === 'hi');
        enBtn.classList.toggle('active', lang === 'en');
    }

    // Show/hide content based on language
    const hiElements = document.querySelectorAll('.lang-hi');
    const enElements = document.querySelectorAll('.lang-en');

    if (lang === 'hi') {
        hiElements.forEach(el => el.style.display = '');
        enElements.forEach(el => el.style.display = 'none');
    } else {
        hiElements.forEach(el => el.style.display = 'none');
        enElements.forEach(el => el.style.display = '');
    }

    // Update chatbot UI
    updateChatbotLanguage(lang);
}

// Update chatbot language
function updateChatbotLanguage(lang) {
    // Update chatbot title
    const chatbotTitle = document.getElementById('chatbotTitle');
    if (chatbotTitle) {
        chatbotTitle.textContent = lang === 'hi' ? 'स्वास्थ AI' : 'Swasthai AI';
    }

    // Update input placeholder
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.placeholder = lang === 'hi'
            ? 'अपना सवाल यहां लिखें...'
            : 'Type your question here...';
    }

    // Update quick response buttons
    const quickResponses = document.getElementById('quickResponses');
    if (quickResponses) {
        if (lang === 'hi') {
            quickResponses.innerHTML = `
                <button class="quick-response-btn" onclick="sendQuickResponse('बुखार')">बुखार</button>
                <button class="quick-response-btn" onclick="sendQuickResponse('सिरदर्द')">सिरदर्द</button>
                <button class="quick-response-btn" onclick="sendQuickResponse('स्वास्थ्य टिप्स')">टिप्स</button>
            `;
        } else {
            quickResponses.innerHTML = `
                <button class="quick-response-btn" onclick="sendQuickResponse('Fever')">Fever</button>
                <button class="quick-response-btn" onclick="sendQuickResponse('Headache')">Headache</button>
                <button class="quick-response-btn" onclick="sendQuickResponse('Health tips')">Tips</button>
            `;
        }
    }
}

// Dark Mode Toggle
function toggleDarkMode() {
    const body = document.body;
    const toggle = document.getElementById('darkModeToggle');

    body.classList.toggle('dark-mode');

    // Update icon
    if (body.classList.contains('dark-mode')) {
        toggle.textContent = '☀️';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        toggle.textContent = '🌙';
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Load saved language preference on page load
document.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem('preferredLanguage') || 'hi';
    setLanguage(savedLang);

    // Load dark mode preference
    const darkMode = localStorage.getItem('darkMode');
    const toggle = document.getElementById('darkModeToggle');

    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        if (toggle) toggle.textContent = '☀️';
    }
});

// Toggle Mobile Menu
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Close menu when clicking outside
document.addEventListener('click', function (event) {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');

    if (navMenu && menuToggle) {
        if (!event.target.closest('nav') && !event.target.closest('.menu-toggle')) {
            navMenu.classList.remove('active');
        }
    }
});

// Ask Swasthai - Interactive Helper
let currentStep = 1;
let userAnswers = {};

function showStep(stepNumber) {
    // Hide all steps
    const steps = document.querySelectorAll('.question-step');
    steps.forEach(step => step.classList.remove('active'));

    // Show current step
    const currentStepElement = document.getElementById('step' + stepNumber);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
        currentStep = stepNumber;
    }
}

function selectOption(step, option, nextStep) {
    // Save answer
    userAnswers['step' + step] = option;

    // Show response based on option
    showResponse(step, option);

    // Move to next step after delay
    if (nextStep) {
        setTimeout(() => {
            showStep(nextStep);
        }, 2000);
    }
}

function showResponse(step, option) {
    const responseBox = document.getElementById('response' + step);
    if (responseBox) {
        responseBox.classList.add('show');

        // Scroll to response
        setTimeout(() => {
            responseBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

function restartHelper() {
    currentStep = 1;
    userAnswers = {};

    // Hide all responses
    const responses = document.querySelectorAll('.response-box');
    responses.forEach(response => response.classList.remove('show'));

    // Show first step
    showStep(1);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Emergency Call Function
function makeEmergencyCall(number) {
    if (confirm('आप ' + number + ' पर कॉल करने वाले हैं। क्या आप तैयार हैं?\n\nYou are about to call ' + number + '. Are you ready?')) {
        window.location.href = 'tel:' + number;
    }
}

// Smooth Scroll for Anchor Links
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Print Function for Health Tips
function printTips() {
    window.print();
}

// Share Function (if Web Share API is supported)
function shareContent(title, text, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        }).then(() => {
            console.log('Content shared successfully');
        }).catch((error) => {
            console.log('Error sharing:', error);
        });
    } else {
        // Fallback - copy to clipboard
        const fullText = title + '\n' + text + '\n' + url;
        navigator.clipboard.writeText(fullText).then(() => {
            alert('Link copied! You can share it now.');
        });
    }
}

// Accessibility - Keyboard Navigation Enhancement
document.addEventListener('keydown', function (e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

// Form Validation (if contact form exists)
function validateContactForm(event) {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    let isValid = true;
    let errorMessage = '';

    if (name && name.value.trim() === '') {
        errorMessage += 'कृपया अपना नाम लिखें। Please enter your name.\n';
        isValid = false;
    }

    if (email && email.value.trim() === '') {
        errorMessage += 'कृपया अपना ईमेल लिखें। Please enter your email.\n';
        isValid = false;
    } else if (email && !isValidEmail(email.value)) {
        errorMessage += 'कृपया सही ईमेल लिखें। Please enter a valid email.\n';
        isValid = false;
    }

    if (message && message.value.trim() === '') {
        errorMessage += 'कृपया अपना संदेश लिखें। Please enter your message.\n';
        isValid = false;
    }

    if (!isValid) {
        alert(errorMessage);
        return false;
    }

    // If valid, show success message
    alert('धन्यवाद! आपका संदेश भेज दिया गया है।\n\nThank you! Your message has been sent.');

    // Reset form
    if (event.target) {
        event.target.reset();
    }

    return false;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Show first step if on Ask page
    const firstStep = document.getElementById('step1');
    if (firstStep) {
        showStep(1);
    }

    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
