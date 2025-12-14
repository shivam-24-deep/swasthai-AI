// Firebase Authentication Module for Swasthai AI
// Handles user signup, login, logout, and profile management

// Get current user
function getCurrentUser() {
    return firebaseAuth.currentUser;
}

// Check if user is logged in
function isUserLoggedIn() {
    return getCurrentUser() !== null;
}

// Sign up with email and password
async function signUpWithEmail(email, password, displayName) {
    try {
        // Create user account
        const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Update display name
        await user.updateProfile({
            displayName: displayName
        });

        // Send email verification
        await user.sendEmailVerification();

        // Create user profile in Firestore
        await createUserProfile(user.uid, {
            displayName: displayName,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            emailVerified: false
        });

        console.log('✅ User signed up successfully!');
        return { success: true, user: user };

    } catch (error) {
        console.error('❌ Signup error:', error);
        return { success: false, error: error.message };
    }
}

// Login with email and password
async function loginWithEmail(email, password) {
    try {
        const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        console.log('✅ User logged in successfully!');
        return { success: true, user: user };

    } catch (error) {
        console.error('❌ Login error:', error);
        return { success: false, error: error.message };
    }
}

// Login with Google
async function loginWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebaseAuth.signInWithPopup(provider);
        const user = result.user;

        // Check if this is a new user
        if (result.additionalUserInfo.isNewUser) {
            // Create user profile
            await createUserProfile(user.uid, {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                emailVerified: true
            });
        }

        console.log('✅ User logged in with Google!');
        return { success: true, user: user };

    } catch (error) {
        console.error('❌ Google login error:', error);
        return { success: false, error: error.message };
    }
}

// Logout
async function logout() {
    try {
        await firebaseAuth.signOut();
        console.log('✅ User logged out successfully!');
        return { success: true };

    } catch (error) {
        console.error('❌ Logout error:', error);
        return { success: false, error: error.message };
    }
}

// Reset password
async function resetPassword(email) {
    try {
        await firebaseAuth.sendPasswordResetEmail(email);
        console.log('✅ Password reset email sent!');
        return { success: true };

    } catch (error) {
        console.error('❌ Password reset error:', error);
        return { success: false, error: error.message };
    }
}

// Create user profile in Firestore
async function createUserProfile(userId, profileData) {
    try {
        await firebaseDB.collection('users').doc(userId).set({
            ...profileData,
            healthData: {
                bloodGroup: '',
                allergies: [],
                chronicDiseases: [],
                medications: []
            },
            preferences: {
                language: 'hi',
                darkMode: false,
                notifications: true
            }
        });

        console.log('✅ User profile created!');
        return { success: true };

    } catch (error) {
        console.error('❌ Profile creation error:', error);
        return { success: false, error: error.message };
    }
}

// Get user profile
async function getUserProfile(userId) {
    try {
        const doc = await firebaseDB.collection('users').doc(userId).get();

        if (doc.exists) {
            return { success: true, data: doc.data() };
        } else {
            return { success: false, error: 'Profile not found' };
        }

    } catch (error) {
        console.error('❌ Get profile error:', error);
        return { success: false, error: error.message };
    }
}

// Update user profile
async function updateUserProfile(userId, updates) {
    try {
        await firebaseDB.collection('users').doc(userId).update(updates);
        console.log('✅ Profile updated!');
        return { success: true };

    } catch (error) {
        console.error('❌ Update profile error:', error);
        return { success: false, error: error.message };
    }
}

// Listen to auth state changes
firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
        console.log('👤 User is signed in:', user.email);

        // Update UI for logged-in user
        updateUIForLoggedInUser(user);

        // Load user preferences
        loadUserPreferences(user.uid);

    } else {
        console.log('👤 No user signed in');

        // Update UI for logged-out user
        updateUIForLoggedOutUser();
    }
});

// Update UI for logged-in user
function updateUIForLoggedInUser(user) {
    // Show user name in header
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = user.displayName || user.email;
    }

    // Show logout button, hide login button
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileBtn = document.getElementById('profileBtn');

    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'block';
    if (profileBtn) profileBtn.style.display = 'block';
}

// Update UI for logged-out user
function updateUIForLoggedOutUser() {
    // Hide user name
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = '';
    }

    // Show login button, hide logout button
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileBtn = document.getElementById('profileBtn');

    if (loginBtn) loginBtn.style.display = 'block';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (profileBtn) profileBtn.style.display = 'none';
}

// Load user preferences
async function loadUserPreferences(userId) {
    const result = await getUserProfile(userId);

    if (result.success && result.data.preferences) {
        const prefs = result.data.preferences;

        // Apply language preference
        if (prefs.language) {
            setLanguage(prefs.language);
        }

        // Apply dark mode preference
        if (prefs.darkMode) {
            document.body.classList.add('dark-mode');
            const toggle = document.getElementById('darkModeToggle');
            if (toggle) toggle.textContent = '☀️';
        }
    }
}

// Save user preferences
async function saveUserPreferences(userId, preferences) {
    return await updateUserProfile(userId, { preferences: preferences });
}
