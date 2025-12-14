// Firebase Configuration for Swasthai AI
// Replace these values with your actual Firebase config from Firebase Console

const firebaseConfig = {
    // TODO: Replace with your Firebase project config
    // Get this from: Firebase Console → Project Settings → Your apps → Web app
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
let app, auth, db, storage;

try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    storage = firebase.storage();

    console.log('✅ Firebase initialized successfully!');

    // Configure Firestore settings
    db.settings({
        cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
    });

    // Enable offline persistence
    db.enablePersistence()
        .catch((err) => {
            if (err.code == 'failed-precondition') {
                console.warn('⚠️ Multiple tabs open, persistence can only be enabled in one tab at a time.');
            } else if (err.code == 'unimplemented') {
                console.warn('⚠️ The current browser does not support persistence.');
            }
        });

} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}

// Export for use in other files
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDB = db;
window.firebaseStorage = storage;
