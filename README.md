# 🏥 Swasthai AI - Smart Health Awareness Website

**Real-world public health awareness platform for India**  
Simple, mobile-first, bilingual (Hindi/English) health information for everyone.

---

## 🌟 Features

### 1. **Language Selector** 🌐
- Toggle between Hindi and English
- Saves user preference
- Clean, no mix-up interface

### 2. **AI-Powered Chatbot** 🤖
- **FREE Google Gemini AI** integration
- Smart, natural conversations
- Bilingual support (Hindi + English)
- Fallback to local knowledge base
- Health tips, symptom guidance, emergency help

### 3. **Nearby Healthcare Services** 📍
- Location-based hospital finder
- Pharmacy, dental, health centers
- Google Maps integration
- Open/closed status
- Privacy protected

### 4. **6 Complete Pages**
- 🏠 **Home** - Quick access to all features
- 💚 **Daily Health Tips** - Healthy living guidance
- 🩺 **Common Problems** - Fever, cold, headache solutions
- 📍 **Nearby Services** - Find healthcare near you
- 💬 **Ask Swasthai** - Interactive health helper
- 🚨 **Emergency** - Critical help & numbers
- 📖 **About** - Mission & disclaimers

---

## 🚀 Quick Start

### Option 1: Use Without API Key (Works Immediately)
1. Open `index.html` in any browser
2. Click chatbot button (💬)
3. Start chatting!

### Option 2: Add FREE AI (Recommended)
1. Get free API key: https://makersuite.google.com/app/apikey
2. Open `js/chatbot.js`
3. Replace line 5 with your key:
   ```javascript
   const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
   ```
4. Refresh browser - AI is now active! 🎉

See `API_KEY_GUIDE.md` for detailed instructions.

---

## 📂 Project Structure

```
Swasth AI/
├── index.html              # Home page
├── tips.html               # Daily health tips
├── problems.html           # Common health problems
├── nearby.html             # Nearby healthcare services
├── ask.html                # Interactive helper
├── emergency.html          # Emergency help
├── about.html              # About & disclaimers
├── css/
│   └── style.css          # Complete styling
├── js/
│   ├── script.js          # Core functionality
│   ├── chatbot.js         # AI chatbot
│   └── nearby.js          # Location services
├── images/                 # Assets folder
├── API_KEY_GUIDE.md       # API setup guide
└── README.md              # This file
```

---

## 🎨 Design Principles

✅ **Mobile-First** - Perfect on all devices  
✅ **Big Fonts** - Easy to read (18px base)  
✅ **High Contrast** - Green/Blue theme  
✅ **Simple Language** - Easy for everyone  
✅ **Fast Loading** - No heavy dependencies  
✅ **Offline Ready** - Static HTML/CSS/JS  
✅ **Accessible** - Keyboard navigation, focus styles  

---

## 🤖 AI Chatbot Features

### With Gemini AI (FREE):
- 🧠 **Smart Understanding** - Natural language processing
- 💬 **Context Aware** - Remembers conversation
- 🌐 **Bilingual** - Perfect Hindi & English
- ⚡ **Fast** - 1-2 second responses
- 📚 **Knowledgeable** - Trained on health topics

### Fallback System:
- ✅ Works without API key
- ✅ Built-in responses for common questions
- ✅ Automatic fallback if API fails
- ✅ No errors shown to users

### Safety Features:
- ⚠️ Always reminds "Not a doctor"
- 🏥 Advises when to see doctor
- 🚨 Emergency guidance (108)
- 💊 No medicine recommendations
- 📋 Clear disclaimers

---

## 📍 Location Features

### Nearby Healthcare Services:
- 🏥 Hospitals (Government & Private)
- 💊 Pharmacies & Medical Stores
- 🦷 Dental Clinics
- 👨‍⚕️ Doctor Clinics
- 🏥 Health Centers (PHC, CHC)

### Privacy:
- ✅ Location NOT saved
- ✅ Used only for search
- ✅ Google Maps integration
- ✅ User consent required

---

## 🌐 Language Support

### Hindi (हिंदी):
- Complete translation
- Simple, easy words
- Cultural context

### English:
- Clear, simple language
- Easy for beginners
- Medical terms explained

**Toggle anytime** with language selector!

---

## 📱 Mobile Optimization

- ✅ Responsive design
- ✅ Touch-friendly buttons
- ✅ Fast loading
- ✅ Works on 2G/3G
- ✅ Small file sizes
- ✅ No heavy images

---

## 🔒 Safety & Disclaimers

### Medical Disclaimer:
- ⚠️ **NOT a doctor or medical professional**
- ⚠️ **Does NOT replace medical advice**
- ⚠️ **General information only**
- ⚠️ **Always see a doctor for health problems**
- ⚠️ **In emergency, call 108 immediately**

### Privacy:
- ✅ No data collection
- ✅ No cookies
- ✅ No tracking
- ✅ Location not saved
- ✅ Chat not stored

---

## 🛠️ Technical Stack

**Frontend:**
- HTML5 (Semantic markup)
- CSS3 (Variables, Flexbox, Grid)
- Vanilla JavaScript (No frameworks!)

**APIs:**
- Google Gemini AI (FREE)
- Geolocation API
- Google Maps

**No Backend Required!**

---

## 📊 Free Tier Limits

### Gemini AI:
- ✅ **1,500 requests/day** - FREE
- ✅ **60 requests/minute**
- ✅ **No credit card needed**
- ✅ **No expiration**

### Geolocation:
- ✅ Browser built-in
- ✅ Unlimited
- ✅ FREE

### Google Maps:
- ✅ View-only links
- ✅ No API key needed
- ✅ FREE

---

## 🎯 Target Audience

- 👴 **Elders** - Big fonts, simple interface
- 📱 **First-time smartphone users** - Easy navigation
- 🌾 **Rural users** - Works on slow internet
- 🏙️ **Urban users** - Quick access to info
- 👨‍👩‍👧‍👦 **Families** - Health tips for everyone

---

## 🚀 Deployment

### Local:
1. Open `index.html` in browser
2. Done! ✅

### Web Hosting:
1. Upload all files to any web host
2. No server-side code needed
3. Works on GitHub Pages, Netlify, Vercel, etc.

### GitHub Pages (FREE):
1. Create GitHub repository
2. Upload files
3. Enable GitHub Pages
4. Your site is live! 🎉

---

## 📞 Emergency Numbers (India)

- 🚑 **108** - Ambulance
- 🏥 **102** - Health Helpline
- 🚓 **100** - Police
- 🆘 **1091** - Women Helpline
- 🧠 **9152987821** - Mental Health
- 👶 **1098** - Child Helpline

---

## 🤝 Contributing

This is a public health awareness project!

**Ideas for improvement:**
- More health topics
- Regional language support
- Voice input/output
- Symptom checker
- Medicine reminder
- Health tracking

---

## 📄 License

**Free to use for public health awareness!**

Please keep:
- Medical disclaimers
- Emergency numbers
- Attribution to Swasthai AI

---

## 🙏 Credits

**Built with:**
- ❤️ Love for public health
- 🤖 Google Gemini AI
- 🗺️ Google Maps
- 🎨 Modern web technologies

**For:**
- 🇮🇳 People of India
- 🌍 Public health awareness
- 💚 Healthier communities

---

## 📧 Support

**Having issues?**
1. Check `API_KEY_GUIDE.md`
2. Open browser console (F12)
3. Check internet connection
4. Try fallback mode (without API key)

**Chatbot not working?**
- It works without API key too!
- Fallback responses are built-in
- Check console for errors

---

## 🌟 Version

**Swasthai AI v2.0**
- ✅ Language Selector
- ✅ AI Chatbot (Gemini)
- ✅ Nearby Services
- ✅ 6 Complete Pages
- ✅ Mobile Optimized
- ✅ Bilingual Support

---

## 💡 Future Ideas

- [ ] Voice assistant
- [ ] More languages (Tamil, Telugu, etc.)
- [ ] Offline mode (PWA)
- [ ] Health tracking
- [ ] Medicine database
- [ ] Video tutorials
- [ ] Community forum

---

**Made with 💚 for a healthier India**

**Swasthai AI** - सबके लिए स्वास्थ्य सहायता

---

## 🔗 Quick Links

- **API Key Guide:** `API_KEY_GUIDE.md`
- **Gemini AI:** https://makersuite.google.com/
- **Google Maps:** https://maps.google.com/
- **Emergency:** Call 108

---

**Remember: This is NOT a replacement for professional medical advice!**
**Always consult a qualified doctor for health problems.**

🏥 **Stay Healthy, Stay Safe!** 🏥
