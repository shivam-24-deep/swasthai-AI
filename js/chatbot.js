// AI Chatbot for Swasthai AI with Google Gemini AI Integration
// Intelligent health conversation assistant

// FREE GEMINI AI API KEY (No credit card needed!)
// Get your own free key at: https://makersuite.google.com/app/apikey
const GEMINI_API_KEY = 'AIzaSyAv6_ZwbO-t0Li9XweSqyHWayyUj62PSXQ'; // Your Gemini API key

// Gemini AI Configuration
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

// System prompt for health assistant
const SYSTEM_PROMPT = {
    hi: `तुम एक मददगार स्वास्थ्य सहायक हो। तुम्हारा नाम "स्वास्थ AI" है।

महत्वपूर्ण नियम:
1. हमेशा सरल हिंदी में जवाब दो
2. छोटे और आसान वाक्य इस्तेमाल करो
3. हमेशा याद दिलाओ कि तुम डॉक्टर नहीं हो
4. गंभीर समस्या में डॉक्टर से मिलने की सलाह दो
5. आपातकाल में 108 पर कॉल करने को कहो
6. केवल सामान्य स्वास्थ्य जानकारी दो
7. दवाई के नाम या खुराक न बताओ

जवाब में शामिल करो:
- घरेलू देखभाल के टिप्स
- डॉक्टर से कब मिलें
- चेतावनी संकेत`,

    en: `You are a helpful health assistant. Your name is "Swasthai AI".

Important rules:
1. Always respond in simple English
2. Use short and easy sentences
3. Always remind that you are not a doctor
4. Advise to see a doctor for serious problems
5. Tell to call 108 in emergency
6. Give only general health information
7. Don't suggest medicine names or dosages

Include in response:
- Home care tips
- When to see a doctor
- Warning signs`
};

const chatbotKnowledge = {
    // Greetings
    greetings: {
        hi: ['नमस्ते', 'हेलो', 'हाय', 'हाई', 'प्रणाम', 'सुप्रभात', 'शुभ दिन'],
        en: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening'],
        responses: {
            hi: 'नमस्ते! मैं स्वास्थ AI हूं। 🤖\n\nमैं Google Gemini AI से powered हूं और आपकी स्वास्थ्य से जुड़ी बातों में मदद कर सकता हूं।\n\nआप मुझसे क्या पूछना चाहते हैं?',
            en: 'Hello! I am Swasthai AI. 🤖\n\nI am powered by Google Gemini AI and can help you with health-related questions.\n\nWhat would you like to ask?'
        }
    },

    // Symptoms (Fallback responses if API fails)
    symptoms: {
        fever: {
            keywords: ['बुखार', 'fever', 'तापमान', 'temperature', 'गर्मी'],
            response: {
                hi: '🌡️ बुखार के लिए:\n\n✓ आराम करें और खूब पानी पिएं\n✓ माथे पर गीला कपड़ा रखें\n✓ हल्के कपड़े पहनें\n✓ हल्का खाना खाएं\n\n⚠️ अगर बुखार 3 दिन से ज़्यादा है या बहुत तेज़ है, तो तुरंत डॉक्टर से मिलें।',
                en: '🌡️ For Fever:\n\n✓ Rest and drink plenty of water\n✓ Apply cold compress on forehead\n✓ Wear light clothes\n✓ Eat light food\n\n⚠️ If fever persists for more than 3 days or is very high, see a doctor immediately.'
            }
        },
        cold: {
            keywords: ['सर्दी', 'cold', 'खांसी', 'cough', 'जुकाम', 'नाक', 'nose'],
            response: {
                hi: '🤧 सर्दी-खांसी के लिए:\n\n✓ गर्म पानी पिएं\n✓ नमक के पानी से गरारे करें\n✓ भाप लें\n✓ अदरक की चाय पिएं\n✓ आराम करें\n\n⚠️ अगर 2 हफ्ते से ज़्यादा खांसी है या सांस लेने में तकलीफ है, तो डॉक्टर से मिलें।',
                en: '🤧 For Cold & Cough:\n\n✓ Drink warm water\n✓ Gargle with salt water\n✓ Take steam\n✓ Drink ginger tea\n✓ Rest well\n\n⚠️ If cough persists for more than 2 weeks or you have breathing difficulty, see a doctor.'
            }
        },
        headache: {
            keywords: ['सिरदर्द', 'headache', 'सिर', 'head', 'दर्द'],
            response: {
                hi: '🤕 सिरदर्द के लिए:\n\n✓ शांत, अंधेरे कमरे में आराम करें\n✓ पानी पिएं\n✓ माथे पर ठंडी पट्टी लगाएं\n✓ सिर की हल्की मालिश करें\n✓ स्क्रीन से दूर रहें\n\n⚠️ अगर अचानक तेज़ सिरदर्द हो या उल्टी के साथ हो, तो तुरंत डॉक्टर से मिलें।',
                en: '🤕 For Headache:\n\n✓ Rest in quiet, dark room\n✓ Drink water\n✓ Apply cold compress\n✓ Massage head gently\n✓ Take break from screens\n\n⚠️ If sudden severe headache or with vomiting, see doctor immediately.'
            }
        },
        stomach: {
            keywords: ['पेट', 'stomach', 'दर्द', 'pain', 'पेट दर्द'],
            response: {
                hi: '🤰 पेट दर्द के लिए:\n\n✓ आराम करें और लेट जाएं\n✓ गर्म पानी पिएं\n✓ हल्का खाना खाएं (खिचड़ी)\n✓ भारी खाना न खाएं\n✓ पेट पर गर्म पट्टी लगाएं\n\n⚠️ अगर तेज़ दर्द है या 24 घंटे से ज़्यादा है, तो तुरंत डॉक्टर से मिलें।',
                en: '🤰 For Stomach Pain:\n\n✓ Rest and lie down\n✓ Drink warm water\n✓ Eat light food (khichdi)\n✓ Avoid heavy food\n✓ Apply warm compress\n\n⚠️ If severe pain or more than 24 hours, see doctor immediately.'
            }
        }
    },

    // Health Tips
    healthTips: {
        keywords: ['टिप्स', 'tips', 'सलाह', 'advice', 'स्वस्थ', 'healthy', 'कैसे'],
        response: {
            hi: '💚 स्वस्थ रहने के लिए:\n\n✓ रोज़ 8-10 गिलास पानी पिएं\n✓ फल और सब्जियां खाएं\n✓ 30 मिनट पैदल चलें\n✓ 7-8 घंटे सोएं\n✓ हाथ धोएं\n✓ तनाव कम करें\n\nऔर टिप्स के लिए "Health Tips" पेज देखें!',
            en: '💚 To Stay Healthy:\n\n✓ Drink 8-10 glasses of water daily\n✓ Eat fruits and vegetables\n✓ Walk for 30 minutes\n✓ Sleep 7-8 hours\n✓ Wash hands\n✓ Reduce stress\n\nSee "Health Tips" page for more!'
        }
    },

    // Emergency
    emergency: {
        keywords: ['आपातकाल', 'emergency', 'गंभीर', 'serious', 'तुरंत', 'urgent', '108'],
        response: {
            hi: '🚨 आपातकाल!\n\nअगर यह गंभीर है, तो:\n\n📞 तुरंत 108 पर कॉल करें (एम्बुलेंस)\n📞 या 102 पर कॉल करें (स्वास्थ्य हेल्पलाइन)\n\n⚠️ इंतज़ार न करें!\n\nगंभीर संकेत:\n• सीने में दर्द\n• सांस लेने में तकलीफ\n• बेहोशी\n• तेज़ खून बहना',
            en: '🚨 Emergency!\n\nIf this is serious:\n\n📞 Call 108 immediately (Ambulance)\n📞 Or call 102 (Health Helpline)\n\n⚠️ Do not wait!\n\nSerious signs:\n• Chest pain\n• Breathing difficulty\n• Unconsciousness\n• Heavy bleeding'
        }
    },

    // Doctor consultation
    doctor: {
        keywords: ['डॉक्टर', 'doctor', 'अस्पताल', 'hospital', 'इलाज', 'treatment'],
        response: {
            hi: '🏥 डॉक्टर से मिलें अगर:\n\n✓ समस्या 2-3 दिन में ठीक नहीं हो रही\n✓ दर्द बढ़ रहा है\n✓ नए लक्षण दिख रहे हैं\n✓ आप चिंतित हैं\n\n📍 नज़दीकी अस्पताल खोजने के लिए "Nearby Services" पेज देखें।',
            en: '🏥 See a Doctor if:\n\n✓ Problem not improving in 2-3 days\n✓ Pain is increasing\n✓ New symptoms appearing\n✓ You are worried\n\n📍 Check "Nearby Services" page to find hospitals near you.'
        }
    },

    // Default response
    default: {
        hi: 'मैं आपकी मदद करना चाहता हूं! 😊\n\nआप मुझसे पूछ सकते हैं:\n• बुखार, सर्दी, सिरदर्द के बारे में\n• स्वस्थ रहने के टिप्स\n• नज़दीकी अस्पताल कैसे खोजें\n• आपातकाल में क्या करें\n\nया फिर मुझे अपनी समस्या बताएं!',
        en: 'I want to help you! 😊\n\nYou can ask me about:\n• Fever, cold, headache\n• Health tips\n• How to find nearby hospitals\n• What to do in emergency\n\nOr tell me your problem!'
    }
};

// Initialize chatbot
let chatHistory = [];

function initChatbot() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    // Add welcome message
    const currentLang = localStorage.getItem('preferredLanguage') || 'hi';
    const welcomeMsg = currentLang === 'hi'
        ? 'नमस्ते! मैं स्वास्थ AI हूं। 🤖\n\nमैं Google Gemini AI से powered हूं और आपकी स्वास्थ्य से जुड़ी बातों में मदद कर सकता हूं।\n\nआप मुझसे क्या पूछना चाहते हैं?'
        : 'Hello! I am Swasthai AI. 🤖\n\nI am powered by Google Gemini AI and can help you with health-related questions.\n\nWhat would you like to ask?';

    addMessage('bot', welcomeMsg);
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    addMessage('user', message);
    input.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Get AI response (always)
    getBotResponse(message);
}

function addMessage(type, text) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}-message`;

    if (type === 'bot') {
        messageDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">${text.replace(/\n/g, '<br>')}</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">${text.replace(/\n/g, '<br>')}</div>
            <div class="message-avatar">👤</div>
        `;
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Save to history
    chatHistory.push({ type, text, timestamp: new Date() });
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

function getBotResponse(userMessage) {
    const currentLang = localStorage.getItem('preferredLanguage') || 'hi';

    // Check if API key is configured
    if (GEMINI_API_KEY && GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
        // Try AI response (works after deployment)
        getAIResponse(userMessage, currentLang);
    } else {
        // Use smart fallback responses (works locally without API)
        const fallbackResponse = getFallbackResponse(userMessage, currentLang);

        // Show fallback response
        setTimeout(() => {
            hideTypingIndicator();
            addMessage('bot', fallbackResponse);
        }, 1000);
    }
}

// Get response from Gemini AI
async function getAIResponse(userMessage, lang) {
    try {
        // Prepare the prompt
        const systemPrompt = SYSTEM_PROMPT[lang];
        const fullPrompt = `${systemPrompt}\n\nउपयोगकर्ता का सवाल: ${userMessage}\n\nजवाब (${lang === 'hi' ? 'हिंदी' : 'English'} में):`;

        // Call Gemini AI API
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: fullPrompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500,
                }
            })
        });

        if (!response.ok) {
            console.error('API Error:', response.status, response.statusText);
            throw new Error('API request failed');
        }

        const data = await response.json();

        // Hide typing indicator
        hideTypingIndicator();

        // Extract AI response
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const aiResponse = data.candidates[0].content.parts[0].text;

            // Add disclaimer
            const disclaimer = lang === 'hi'
                ? '\n\n⚠️ याद रखें: मैं डॉक्टर नहीं हूं। गंभीर समस्या में डॉक्टर से मिलें।'
                : '\n\n⚠️ Remember: I am not a doctor. See a doctor for serious problems.';

            addMessage('bot', aiResponse + disclaimer);
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('AI Error:', error);
        // Hide typing indicator
        hideTypingIndicator();
        // Fallback to local knowledge base
        const fallbackResponse = getFallbackResponse(userMessage, lang);
        addMessage('bot', fallbackResponse);
    }
}

// Fallback response using local knowledge base
function getFallbackResponse(userMessage, lang) {
    const lowerMessage = userMessage.toLowerCase();

    // Check for emergency
    if (chatbotKnowledge.emergency.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return chatbotKnowledge.emergency.response[lang];
    }

    // Check for symptoms
    for (const [symptom, data] of Object.entries(chatbotKnowledge.symptoms)) {
        if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return data.response[lang];
        }
    }

    // Check for health tips
    if (chatbotKnowledge.healthTips.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return chatbotKnowledge.healthTips.response[lang];
    }

    // Check for doctor
    if (chatbotKnowledge.doctor.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return chatbotKnowledge.doctor.response[lang];
    }

    // Default response
    return chatbotKnowledge.default[lang];
}

// Handle Enter key
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Toggle chatbot
function toggleChatbot() {
    const chatbot = document.getElementById('chatbotWidget');
    const isOpen = chatbot.style.display === 'flex';

    if (isOpen) {
        chatbot.style.display = 'none';
    } else {
        chatbot.style.display = 'flex';
        // Initialize if first time
        if (chatHistory.length === 0) {
            initChatbot();
        }
    }
}

// Close chatbot
function closeChatbot() {
    document.getElementById('chatbotWidget').style.display = 'none';
}

// Clear chat
function clearChat() {
    const currentLang = localStorage.getItem('preferredLanguage') || 'hi';
    const confirmMsg = currentLang === 'hi'
        ? 'क्या आप चैट साफ करना चाहते हैं?'
        : 'Do you want to clear the chat?';

    if (confirm(confirmMsg)) {
        document.getElementById('chatMessages').innerHTML = '';
        chatHistory = [];
        initChatbot();
    }
}

// Quick responses
function sendQuickResponse(message) {
    document.getElementById('chatInput').value = message;
    sendMessage();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Auto-open chatbot on first visit (optional)
    // toggleChatbot();
});
