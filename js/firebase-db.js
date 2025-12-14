// Firebase Database Operations for Swasthai AI
// Handles all Firestore database operations

// ==================== HEALTH TRACKER ====================

// Save daily health data
async function saveHealthData(userId, date, data) {
    try {
        await firebaseDB
            .collection('healthTracker')
            .doc(userId)
            .collection('entries')
            .doc(date)
            .set({
                date: date,
                waterIntake: data.waterIntake || 0,
                steps: data.steps || 0,
                sleep: data.sleep || 0,
                weight: data.weight || 0,
                bloodPressure: data.bloodPressure || '',
                bloodSugar: data.bloodSugar || 0,
                notes: data.notes || '',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

        console.log('✅ Health data saved!');
        return { success: true };

    } catch (error) {
        console.error('❌ Save health data error:', error);
        return { success: false, error: error.message };
    }
}

// Get health data for a date
async function getHealthData(userId, date) {
    try {
        const doc = await firebaseDB
            .collection('healthTracker')
            .doc(userId)
            .collection('entries')
            .doc(date)
            .get();

        if (doc.exists) {
            return { success: true, data: doc.data() };
        } else {
            return { success: true, data: null };
        }

    } catch (error) {
        console.error('❌ Get health data error:', error);
        return { success: false, error: error.message };
    }
}

// Get health data for date range
async function getHealthDataRange(userId, startDate, endDate) {
    try {
        const snapshot = await firebaseDB
            .collection('healthTracker')
            .doc(userId)
            .collection('entries')
            .where('date', '>=', startDate)
            .where('date', '<=', endDate)
            .orderBy('date', 'desc')
            .get();

        const data = [];
        snapshot.forEach(doc => {
            data.push(doc.data());
        });

        return { success: true, data: data };

    } catch (error) {
        console.error('❌ Get health data range error:', error);
        return { success: false, error: error.message };
    }
}

// ==================== MEDICINE REMINDERS ====================

// Add medicine reminder
async function addMedicineReminder(userId, reminder) {
    try {
        const docRef = await firebaseDB
            .collection('reminders')
            .doc(userId)
            .collection('medicines')
            .add({
                medicineName: reminder.medicineName,
                dosage: reminder.dosage,
                time: reminder.time,
                frequency: reminder.frequency,
                startDate: reminder.startDate,
                endDate: reminder.endDate || null,
                notes: reminder.notes || '',
                enabled: true,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

        console.log('✅ Medicine reminder added!');
        return { success: true, id: docRef.id };

    } catch (error) {
        console.error('❌ Add reminder error:', error);
        return { success: false, error: error.message };
    }
}

// Get all medicine reminders
async function getMedicineReminders(userId) {
    try {
        const snapshot = await firebaseDB
            .collection('reminders')
            .doc(userId)
            .collection('medicines')
            .where('enabled', '==', true)
            .orderBy('time', 'asc')
            .get();

        const reminders = [];
        snapshot.forEach(doc => {
            reminders.push({ id: doc.id, ...doc.data() });
        });

        return { success: true, data: reminders };

    } catch (error) {
        console.error('❌ Get reminders error:', error);
        return { success: false, error: error.message };
    }
}

// Update medicine reminder
async function updateMedicineReminder(userId, reminderId, updates) {
    try {
        await firebaseDB
            .collection('reminders')
            .doc(userId)
            .collection('medicines')
            .doc(reminderId)
            .update(updates);

        console.log('✅ Reminder updated!');
        return { success: true };

    } catch (error) {
        console.error('❌ Update reminder error:', error);
        return { success: false, error: error.message };
    }
}

// Delete medicine reminder
async function deleteMedicineReminder(userId, reminderId) {
    try {
        await firebaseDB
            .collection('reminders')
            .doc(userId)
            .collection('medicines')
            .doc(reminderId)
            .delete();

        console.log('✅ Reminder deleted!');
        return { success: true };

    } catch (error) {
        console.error('❌ Delete reminder error:', error);
        return { success: false, error: error.message };
    }
}

// ==================== CHAT HISTORY ====================

// Save chat message
async function saveChatMessage(userId, message) {
    try {
        await firebaseDB
            .collection('chatHistory')
            .doc(userId)
            .collection('messages')
            .add({
                role: message.role, // 'user' or 'bot'
                message: message.message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

        return { success: true };

    } catch (error) {
        console.error('❌ Save chat message error:', error);
        return { success: false, error: error.message };
    }
}

// Get chat history
async function getChatHistory(userId, limit = 50) {
    try {
        const snapshot = await firebaseDB
            .collection('chatHistory')
            .doc(userId)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .limit(limit)
            .get();

        const messages = [];
        snapshot.forEach(doc => {
            messages.push(doc.data());
        });

        // Reverse to show oldest first
        messages.reverse();

        return { success: true, data: messages };

    } catch (error) {
        console.error('❌ Get chat history error:', error);
        return { success: false, error: error.message };
    }
}

// Clear chat history
async function clearChatHistory(userId) {
    try {
        const snapshot = await firebaseDB
            .collection('chatHistory')
            .doc(userId)
            .collection('messages')
            .get();

        const batch = firebaseDB.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();

        console.log('✅ Chat history cleared!');
        return { success: true };

    } catch (error) {
        console.error('❌ Clear chat history error:', error);
        return { success: false, error: error.message };
    }
}

// ==================== HEALTH RECORDS ====================

// Save health record
async function saveHealthRecord(userId, record) {
    try {
        const docRef = await firebaseDB
            .collection('healthRecords')
            .doc(userId)
            .collection('records')
            .add({
                type: record.type, // 'prescription', 'lab_report', 'vaccination', etc.
                title: record.title,
                date: record.date,
                doctor: record.doctor || '',
                hospital: record.hospital || '',
                notes: record.notes || '',
                fileUrl: record.fileUrl || null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

        console.log('✅ Health record saved!');
        return { success: true, id: docRef.id };

    } catch (error) {
        console.error('❌ Save health record error:', error);
        return { success: false, error: error.message };
    }
}

// Get all health records
async function getHealthRecords(userId, type = null) {
    try {
        let query = firebaseDB
            .collection('healthRecords')
            .doc(userId)
            .collection('records')
            .orderBy('date', 'desc');

        if (type) {
            query = query.where('type', '==', type);
        }

        const snapshot = await query.get();

        const records = [];
        snapshot.forEach(doc => {
            records.push({ id: doc.id, ...doc.data() });
        });

        return { success: true, data: records };

    } catch (error) {
        console.error('❌ Get health records error:', error);
        return { success: false, error: error.message };
    }
}

// Delete health record
async function deleteHealthRecord(userId, recordId) {
    try {
        await firebaseDB
            .collection('healthRecords')
            .doc(userId)
            .collection('records')
            .doc(recordId)
            .delete();

        console.log('✅ Health record deleted!');
        return { success: true };

    } catch (error) {
        console.error('❌ Delete health record error:', error);
        return { success: false, error: error.message };
    }
}

// ==================== FILE UPLOAD ====================

// Upload file to Firebase Storage
async function uploadFile(userId, file, folder = 'documents') {
    try {
        const fileName = `${Date.now()}_${file.name}`;
        const storageRef = firebaseStorage.ref(`${folder}/${userId}/${fileName}`);

        // Upload file
        const snapshot = await storageRef.put(file);

        // Get download URL
        const downloadURL = await snapshot.ref.getDownloadURL();

        console.log('✅ File uploaded!');
        return { success: true, url: downloadURL };

    } catch (error) {
        console.error('❌ File upload error:', error);
        return { success: false, error: error.message };
    }
}

// ==================== REAL-TIME LISTENERS ====================

// Listen to health data changes
function listenToHealthData(userId, date, callback) {
    return firebaseDB
        .collection('healthTracker')
        .doc(userId)
        .collection('entries')
        .doc(date)
        .onSnapshot((doc) => {
            if (doc.exists) {
                callback(doc.data());
            } else {
                callback(null);
            }
        });
}

// Listen to medicine reminders
function listenToReminders(userId, callback) {
    return firebaseDB
        .collection('reminders')
        .doc(userId)
        .collection('medicines')
        .where('enabled', '==', true)
        .orderBy('time', 'asc')
        .onSnapshot((snapshot) => {
            const reminders = [];
            snapshot.forEach(doc => {
                reminders.push({ id: doc.id, ...doc.data() });
            });
            callback(reminders);
        });
}

// Listen to chat messages
function listenToChatMessages(userId, callback) {
    return firebaseDB
        .collection('chatHistory')
        .doc(userId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
            const messages = [];
            snapshot.forEach(doc => {
                messages.push(doc.data());
            });
            callback(messages);
        });
}
