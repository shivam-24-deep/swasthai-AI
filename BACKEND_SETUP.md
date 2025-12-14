# 🔥 Firebase Backend Setup Guide for Swasthai AI

## 📋 Overview
This guide will help you set up a complete Firebase backend for Swasthai AI with:
- ✅ User Authentication (Login/Signup)
- ✅ Cloud Firestore Database
- ✅ Real-time Data Sync
- ✅ Cloud Storage for Files
- ✅ Cloud Functions (Optional)

**Total Cost: FREE** (up to 50,000 users/month)

---

## 🚀 Step 1: Create Firebase Project

### 1.1 Go to Firebase Console
```
https://console.firebase.google.com/
```

### 1.2 Create New Project
1. Click **"Add project"**
2. Project name: `swasthai-ai` (or your choice)
3. Enable Google Analytics: **Yes** (recommended)
4. Click **"Create project"**

### 1.3 Wait for Setup
- Takes 30-60 seconds
- Click **"Continue"** when done

---

## 🔐 Step 2: Enable Authentication

### 2.1 Go to Authentication
1. In left sidebar, click **"Authentication"**
2. Click **"Get started"**

### 2.2 Enable Sign-in Methods
1. Click **"Sign-in method"** tab
2. Enable these methods:
   - ✅ **Email/Password** (Click → Enable → Save)
   - ✅ **Google** (Click → Enable → Save)
   - ✅ **Phone** (Optional - for OTP login)

---

## 💾 Step 3: Create Firestore Database

### 3.1 Go to Firestore
1. In left sidebar, click **"Firestore Database"**
2. Click **"Create database"**

### 3.2 Choose Mode
- Select: **"Start in test mode"** (for development)
- Click **"Next"**

### 3.3 Choose Location
- Select: **"asia-south1"** (Mumbai - closest to India)
- Click **"Enable"**

### 3.4 Wait for Setup
- Takes 1-2 minutes
- Database will be ready

---

## 📦 Step 4: Enable Cloud Storage

### 4.1 Go to Storage
1. In left sidebar, click **"Storage"**
2. Click **"Get started"**

### 4.2 Security Rules
- Select: **"Start in test mode"**
- Click **"Next"**

### 4.3 Choose Location
- Same as Firestore: **"asia-south1"**
- Click **"Done"**

---

## 🔑 Step 5: Get Firebase Config

### 5.1 Go to Project Settings
1. Click **⚙️ (gear icon)** → **"Project settings"**
2. Scroll down to **"Your apps"**
3. Click **"Web"** icon (</> symbol)

### 5.2 Register App
1. App nickname: `Swasthai AI Web`
2. ✅ Check **"Also set up Firebase Hosting"**
3. Click **"Register app"**

### 5.3 Copy Firebase Config
You'll see code like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "swasthai-ai.firebaseapp.com",
  projectId: "swasthai-ai",
  storageBucket: "swasthai-ai.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX"
};
```

**IMPORTANT:** Copy this config - you'll need it!

---

## 📝 Step 6: Update Firestore Security Rules

### 6.1 Go to Firestore Rules
1. Click **"Firestore Database"** → **"Rules"** tab

### 6.2 Replace Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles - only owner can read/write
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Health records - only owner can read/write
    match /healthRecords/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Medicine reminders - only owner can read/write
    match /reminders/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Chat history - only owner can read/write
    match /chatHistory/{userId}/messages/{messageId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Health tracker - only owner can read/write
    match /healthTracker/{userId}/entries/{entryId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public health tips - everyone can read
    match /healthTips/{tipId} {
      allow read: if true;
      allow write: if false; // Only admins via backend
    }
  }
}
```

### 6.3 Publish Rules
- Click **"Publish"**

---

## 🗄️ Step 7: Create Database Collections

### 7.1 Go to Firestore Data
1. Click **"Firestore Database"** → **"Data"** tab

### 7.2 Create Collections
Create these collections (click **"Start collection"**):

1. **users** - User profiles
2. **healthRecords** - Medical history
3. **reminders** - Medicine reminders
4. **chatHistory** - AI chat logs
5. **healthTracker** - Daily health data
6. **healthTips** - Health tips content

---

## 🎯 Step 8: Test Your Setup

### 8.1 Check Authentication
- Go to **Authentication** → Should show "0 users"

### 8.2 Check Firestore
- Go to **Firestore Database** → Should show empty collections

### 8.3 Check Storage
- Go to **Storage** → Should show empty bucket

---

## ✅ Setup Complete!

Your Firebase backend is ready! Now:

1. ✅ Copy your Firebase config from Step 5.3
2. ✅ Add it to `firebase-config.js` (I'll create this file)
3. ✅ Include Firebase SDK in your HTML
4. ✅ Start using authentication and database!

---

## 📊 Firebase FREE Tier Limits

```
✅ Authentication: Unlimited users
✅ Firestore: 
   - 50,000 reads/day
   - 20,000 writes/day
   - 1 GB storage
✅ Storage: 5 GB
✅ Hosting: 10 GB/month bandwidth
✅ Cloud Functions: 125K invocations/month
```

**Perfect for:**
- Development
- Testing
- Small to medium apps
- Up to 50,000 users/month

---

## 🚨 Important Notes

### Security
- ✅ Never commit Firebase config to public GitHub
- ✅ Use environment variables for sensitive data
- ✅ Enable App Check for production
- ✅ Update security rules before going live

### Best Practices
- ✅ Use subcollections for related data
- ✅ Index frequently queried fields
- ✅ Implement pagination for large datasets
- ✅ Use Cloud Functions for server-side logic
- ✅ Enable Firebase Analytics

---

## 📞 Need Help?

**Firebase Documentation:**
- https://firebase.google.com/docs

**Swasthai AI Support:**
- Check `firebase-auth.js` for authentication code
- Check `firebase-db.js` for database operations
- Check `DEPLOYMENT.md` for hosting guide

---

## 🎉 Next Steps

After setup:
1. ✅ Test user signup/login
2. ✅ Test data storage
3. ✅ Test real-time updates
4. ✅ Deploy to Firebase Hosting
5. ✅ Add custom domain (optional)

**Your backend is ready! Let's build amazing features!** 🚀
