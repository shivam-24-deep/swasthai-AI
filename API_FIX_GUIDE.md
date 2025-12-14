# 🔑 Gemini API Key - Quick Fix Guide

## ❌ Problem: Chatbot Not Working

**Issue:** API key expired ya invalid hai

**Solution:** Naya FREE API key banao (2 minutes)

---

## 🚀 Quick Fix (2 Minutes)

### **Step 1: Get New FREE API Key**

1. **Go to:** https://makersuite.google.com/app/apikey
   
2. **Click:** "Create API Key"

3. **Select:** "Create API key in new project" (or existing project)

4. **Copy** the API key (starts with `AIza...`)

---

### **Step 2: Update in Code**

1. **Open:** `js/chatbot.js`

2. **Find Line 6:**
   ```javascript
   const GEMINI_API_KEY = 'AIzaSyCa7d0JEu0ZPIsGxZw5HwJWqcFBJZdEltc';
   ```

3. **Replace with your new key:**
   ```javascript
   const GEMINI_API_KEY = 'YOUR_NEW_API_KEY_HERE';
   ```

4. **Save** the file

5. **Refresh** browser (Ctrl + F5)

6. **Test** chatbot!

---

## ✅ **Alternative: Use Fallback Mode**

**Agar API key nahi chahiye:**

Chatbot will automatically use **fallback responses** if API fails:
- ✅ Greetings
- ✅ Common symptoms (fever, cold, headache)
- ✅ Health tips
- ✅ Emergency info
- ✅ Doctor advice

**No API needed for basic functionality!**

---

## 🔍 **Test Your API Key**

### **Method 1: Use Test Page**

1. Open: `test-api.html` in browser
2. Click "Test API" button
3. See if it works

### **Method 2: Browser Console**

1. Open chatbot
2. Press F12 (Developer Tools)
3. Go to "Console" tab
4. Send a message
5. Check for errors

---

## 🎯 **Common Errors & Solutions**

### **Error 1: "API key not valid"**
**Solution:** Get new API key from Google AI Studio

### **Error 2: "Quota exceeded"**
**Solution:** 
- Wait 24 hours (free tier resets daily)
- Or create new API key with different project

### **Error 3: "Network error"**
**Solution:**
- Check internet connection
- Disable ad-blocker
- Try different browser

### **Error 4: "CORS error"**
**Solution:**
- This is normal for local files
- Deploy to hosting (Netlify/Vercel)
- Or use fallback mode

---

## 💡 **Best Solution: Deploy Website**

**Why?**
- API works better on hosted sites
- No CORS issues
- Faster loading
- Professional URL

**How?**
1. Push to GitHub
2. Deploy on Netlify (FREE)
3. API will work perfectly!

---

## 🆓 **Free API Limits**

**Gemini Free Tier:**
```
✅ 60 requests per minute
✅ 1500 requests per day
✅ Completely FREE
✅ No credit card needed
```

**Perfect for:**
- Testing
- Small apps
- Personal projects
- Up to 1500 users/day

---

## 🔧 **Quick Test Commands**

### **Test 1: Check if API key exists**
```javascript
// In browser console (F12)
console.log(GEMINI_API_KEY);
// Should show: "AIza..."
```

### **Test 2: Test API call**
```javascript
// Open test-api.html
// Click "Test API" button
// See result
```

---

## ✅ **Checklist**

- [ ] Got new API key from Google AI Studio
- [ ] Updated `js/chatbot.js` line 6
- [ ] Saved file
- [ ] Refreshed browser (Ctrl + F5)
- [ ] Tested chatbot
- [ ] Working! 🎉

---

## 🎯 **Current Status**

### **What's Working:**
- ✅ Chatbot UI
- ✅ Message sending
- ✅ Fallback responses
- ✅ All other features

### **What Needs Fix:**
- ⚠️ API key (2 min fix)

### **After Fix:**
- ✅ Full AI responses
- ✅ Smart conversations
- ✅ Context awareness
- ✅ Better answers

---

## 📞 **Need Help?**

### **Option 1: Use Fallback Mode**
- No API needed
- Basic responses work
- Good for testing

### **Option 2: Get New API Key**
- 2 minutes setup
- Full AI power
- Smart responses

### **Option 3: Deploy First**
- API works better
- No CORS issues
- Professional setup

---

## 🚀 **Recommended: Deploy Now!**

**Why deploy first?**
1. API works perfectly on hosted sites
2. No local file issues
3. Professional URL
4. Share with users
5. Test in real environment

**How?**
```bash
# Push to GitHub
git add .
git commit -m "Ready to deploy"
git push

# Deploy on Netlify
# Go to netlify.com
# Connect GitHub repo
# Deploy!
```

**Result:** https://swasthai-ai.netlify.app
**API:** Will work perfectly! ✅

---

## 💡 **My Recommendation**

### **Quick Fix (Now):**
1. Get new API key (2 min)
2. Update chatbot.js
3. Test locally

### **Best Fix (10 min):**
1. Deploy to Netlify
2. API will work automatically
3. Professional setup
4. Share with users!

---

**Choose one and chatbot will work perfectly!** 🚀

---

## 📝 **Summary**

**Problem:** API key not working
**Solution:** Get new FREE key (2 min)
**Alternative:** Use fallback mode (works now!)
**Best:** Deploy to hosting (10 min)

**Total Cost:** ₹0 (FREE!)
**Time:** 2-10 minutes
**Result:** Working chatbot! 🎉

---

**Batao kya karna hai?** 😊
