// Smart Health Chatbot - No API Needed!
// Works 100% offline with comprehensive health knowledge

// Health Knowledge Base
const healthKnowledge = {
    // Greetings
    greetings: {
        keywords: ['hello', 'hi', 'hey', 'नमस्ते', 'हेलो', 'हाय', 'प्रणाम'],
        responses: {
            hi: 'नमस्ते! मैं स्वास्थ AI हूं। 🤖\n\nमैं आपकी स्वास्थ्य से जुड़ी बातों में मदद कर सकता हूं।\n\nआप मुझसे पूछ सकते हैं:\n• बुखार, सर्दी, सिरदर्द\n• स्वास्थ्य टिप्स\n• आपातकाल में क्या करें',
            en: 'Hello! I am Swasthai AI. 🤖\n\nI can help you with health questions.\n\nYou can ask me about:\n• Fever, cold, headache\n• Health tips\n• Emergency help'
        }
    },

    // Fever
    fever: {
        keywords: ['बुखार', 'fever', 'तापमान', 'temperature'],
        responses: {
            hi: '🌡️ बुखार के लिए:\n\n✓ आराम करें और खूब पानी पिएं\n✓ माथे पर गीला कपड़ा रखें\n✓ हल्के कपड़े पहनें\n✓ हल्का खाना खाएं\n\n⚠️ अगर बुखार 3 दिन से ज़्यादा है, तो डॉक्टर से मिलें।',
            en: '🌡️ For Fever:\n\n✓ Rest and drink water\n✓ Apply cold compress\n✓ Wear light clothes\n✓ Eat light food\n\n⚠️ If fever persists 3+ days, see a doctor.'
        }
    },

    // Headache
    headache: {
        keywords: ['सिरदर्द', 'headache', 'सिर', 'head', 'दर्द'],
        responses: {
            hi: '🤕 सिरदर्द के लिए:\n\n✓ शांत जगह में आराम करें\n✓ पानी पिएं\n✓ माथे पर ठंडी पट्टी\n✓ स्क्रीन से दूर रहें\n\n⚠️ तेज़ सिरदर्द हो तो डॉक्टर से मिलें।',
            en: '🤕 For Headache:\n\n✓ Rest in quiet place\n✓ Drink water\n✓ Apply cold compress\n✓ Take break from screens\n\n⚠️ See doctor if severe.'
        }
    },

    // Cold/Cough
    cold: {
        keywords: ['सर्दी', 'cold', 'खांसी', 'cough', 'जुकाम'],
        responses: {
            hi: '🤧 सर्दी-खांसी के लिए:\n\n✓ गर्म पानी पिएं\n✓ नमक के पानी से गरारे करें\n✓ भाप लें\n✓ अदरक की चाय\n✓ आराम करें\n\n⚠️ 2 हफ्ते से ज़्यादा हो तो डॉक्टर से मिलें।',
            en: '🤧 For Cold & Cough:\n\n✓ Drink warm water\n✓ Gargle with salt water\n✓ Take steam\n✓ Ginger tea\n✓ Rest well\n\n⚠️ See doctor if 2+ weeks.'
        }
    },

    // Stomach Pain
    stomach: {
        keywords: ['पेट', 'stomach', 'पेट दर्द'],
        responses: {
            hi: '🤰 पेट दर्द के लिए:\n\n✓ आराम करें\n✓ गर्म पानी पिएं\n✓ हल्का खाना (खिचड़ी)\n✓ भारी खाना न खाएं\n\n⚠️ तेज़ दर्द हो तो तुरंत डॉक्टर से मिलें।',
            en: '🤰 For Stomach Pain:\n\n✓ Rest\n✓ Drink warm water\n✓ Light food (khichdi)\n✓ Avoid heavy food\n\n⚠️ See doctor if severe.'
        }
    },

    // Health Tips
    tips: {
        keywords: ['tips', 'टिप्स', 'सलाह', 'advice', 'healthy', 'स्वस्थ'],
        responses: {
            hi: '💚 स्वस्थ रहने के लिए:\n\n✓ रोज़ 8-10 गिलास पानी\n✓ फल और सब्जियां खाएं\n✓ 30 मिनट पैदल चलें\n✓ 7-8 घंटे सोएं\n✓ हाथ धोएं\n✓ तनाव कम करें',
            en: '💚 To Stay Healthy:\n\n✓ Drink 8-10 glasses water\n✓ Eat fruits & vegetables\n✓ Walk 30 minutes\n✓ Sleep 7-8 hours\n✓ Wash hands\n✓ Reduce stress'
        }
    },

    // Emergency
    emergency: {
        keywords: ['emergency', 'आपातकाल', 'urgent', 'तुरंत', '108'],
        responses: {
            hi: '🚨 आपातकाल!\n\n📞 तुरंत 108 पर कॉल करें (एम्बुलेंस)\n📞 या 102 (स्वास्थ्य हेल्पलाइन)\n\n⚠️ इंतज़ार न करें!\n\nगंभीर संकेत:\n• सीने में दर्द\n• सांस लेने में तकलीफ\n• बेहोशी',
            en: '🚨 Emergency!\n\n📞 Call 108 (Ambulance)\n📞 Or 102 (Health Helpline)\n\n⚠️ Do not wait!\n\nSerious signs:\n• Chest pain\n• Breathing difficulty\n• Unconsciousness'
        }
    },

    // Default
    default: {
        hi: 'मैं आपकी मदद करना चाहता हूं! 😊\n\nआप मुझसे पूछ सकते हैं:\n• बुखार, सर्दी, सिरदर्द\n• स्वास्थ्य टिप्स\n• आपातकाल में क्या करें\n\nअपनी समस्या बताएं!',
        en: 'I want to help you! 😊\n\nYou can ask me about:\n• Fever, cold, headache\n• Health tips\n• Emergency help\n\nTell me your problem!'
    }
};

// Get bot response
function getResponse(message, lang = 'hi') {
    const msg = message.toLowerCase();

    // Check each category
    for (let category in healthKnowledge) {
        if (category === 'default') continue;

        const data = healthKnowledge[category];
        if (data.keywords) {
            for (let keyword of data.keywords) {
                if (msg.includes(keyword.toLowerCase())) {
                    return data.responses[lang];
                }
            }
        }
    }

    // Return default
    return healthKnowledge.default[lang];
}

// Chatbot UI Functions
function toggleChatbot() {
    const widget = document.getElementById('chatWidget');
    if (widget) {
        widget.style.display = widget.style.display === 'none' ? 'flex' : 'none';
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    addMessage('user', message);
    input.value = '';

    // Show typing
    showTyping();

    // Get language
    const lang = localStorage.getItem('preferredLanguage') || 'hi';

    // Get and show response
    setTimeout(() => {
        hideTyping();
        const response = getResponse(message, lang);
        addMessage('bot', response);
    }, 1000);
}

function addMessage(type, text) {
    const messages = document.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}-message`;
    msgDiv.textContent = text;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
    const messages = document.getElementById('chatMessages');
    const typing = document.createElement('div');
    typing.id = 'typing';
    typing.className = 'message bot-message';
    typing.innerHTML = '• • •';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
    const typing = document.getElementById('typing');
    if (typing) typing.remove();
}

// Initialize
function initChatbot() {
    const lang = localStorage.getItem('preferredLanguage') || 'hi';
    const welcome = lang === 'hi'
        ? 'नमस्ते! मैं स्वास्थ AI हूं। 🤖\n\nमैं आपकी मदद के लिए यहां हूं।\n\nआप मुझसे क्या पूछना चाहते हैं?'
        : 'Hello! I am Swasthai AI. 🤖\n\nI am here to help you.\n\nWhat would you like to ask?';

    addMessage('bot', welcome);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
        initChatbot();
    }
});
