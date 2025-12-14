# 🔑 How to Get FREE Gemini AI API Key

## Step 1: Visit Google AI Studio
Go to: https://makersuite.google.com/app/apikey

## Step 2: Sign in with Google Account
- Use any Gmail account
- No credit card required!
- Completely FREE

## Step 3: Create API Key
1. Click "Create API Key"
2. Select "Create API key in new project" (or use existing project)
3. Copy your API key

## Step 4: Add to Chatbot
1. Open `js/chatbot.js`
2. Find line 5:
   ```javascript
   const GEMINI_API_KEY = 'AIzaSyDGW8VQYqVZqVZqVZqVZqVZqVZqVZqVZqV';
   ```
3. Replace with your actual API key:
   ```javascript
   const GEMINI_API_KEY = 'YOUR_ACTUAL_API_KEY_HERE';
   ```

## Free Tier Limits
✅ **1,500 requests per day** - FREE
✅ **60 requests per minute**
✅ **No credit card needed**
✅ **No expiration**

## Features with Gemini AI
- 🤖 **Smarter responses** - Natural conversation
- 🧠 **Better understanding** - Understands complex questions
- 🌐 **Bilingual** - Perfect Hindi and English
- 💡 **Context aware** - Remembers conversation flow
- ⚡ **Fast** - Responds in 1-2 seconds

## Fallback System
If API fails or limit reached:
- ✅ Automatically uses local knowledge base
- ✅ Still provides helpful responses
- ✅ No error shown to user

## Security Note
⚠️ **Important:**
- Keep your API key private
- Don't share it publicly
- Don't commit to GitHub with real key
- For production, use environment variables

## Testing
After adding your key:
1. Open `index.html` in browser
2. Click chatbot button (💬)
3. Ask: "मुझे बुखार है क्या करूं?"
4. You should get AI-powered response!

## Troubleshooting
**If chatbot doesn't work:**
1. Check browser console (F12) for errors
2. Verify API key is correct
3. Check internet connection
4. Make sure you haven't exceeded daily limit

**Fallback will work even without API key!**
The chatbot has built-in responses for common questions.

---

## Alternative: Use Without API Key
The chatbot works perfectly fine without API key using local knowledge base!
Just keep the dummy key and it will use fallback responses.

**Powered by Google Gemini AI** 🚀
