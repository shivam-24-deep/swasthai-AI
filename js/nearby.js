// Nearby Healthcare Services - JavaScript
// Location-based search functionality

let userLocation = null;

// Get user's current location
function getLocation() {
    const statusDiv = document.getElementById('locationStatus');
    const currentLang = localStorage.getItem('preferredLanguage') || 'hi';

    if (!navigator.geolocation) {
        statusDiv.innerHTML = currentLang === 'hi'
            ? '<span style="color: #dc3545;">❌ आपका ब्राउज़र लोकेशन सपोर्ट नहीं करता</span>'
            : '<span style="color: #dc3545;">❌ Your browser does not support location</span>';
        return;
    }

    statusDiv.innerHTML = currentLang === 'hi'
        ? '<span style="color: #007bff;">⏳ लोकेशन खोज रहे हैं...</span>'
        : '<span style="color: #007bff;">⏳ Finding location...</span>';

    navigator.geolocation.getCurrentPosition(
        // Success
        function (position) {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            statusDiv.innerHTML = currentLang === 'hi'
                ? '<span style="color: #28a745;">✓ लोकेशन मिल गई! अब सेवा चुनें।</span>'
                : '<span style="color: #28a745;">✓ Location found! Now choose a service.</span>';

            console.log('Location:', userLocation);
        },
        // Error
        function (error) {
            let errorMsg = '';
            if (currentLang === 'hi') {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMsg = '❌ आपने लोकेशन की अनुमति नहीं दी। कृपया ब्राउज़र सेटिंग्स में अनुमति दें।';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMsg = '❌ लोकेशन उपलब्ध नहीं है।';
                        break;
                    case error.TIMEOUT:
                        errorMsg = '❌ समय समाप्त हो गया। फिर से कोशिश करें।';
                        break;
                    default:
                        errorMsg = '❌ कुछ गलत हो गया। फिर से कोशिश करें।';
                }
            } else {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMsg = '❌ Location permission denied. Please allow in browser settings.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMsg = '❌ Location information unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMsg = '❌ Request timed out. Please try again.';
                        break;
                    default:
                        errorMsg = '❌ Something went wrong. Please try again.';
                }
            }
            statusDiv.innerHTML = '<span style="color: #dc3545;">' + errorMsg + '</span>';
        },
        // Options
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// Search for nearby places
function searchNearby(type) {
    const currentLang = localStorage.getItem('preferredLanguage') || 'hi';

    if (!userLocation) {
        alert(currentLang === 'hi'
            ? 'कृपया पहले अपनी लोकेशन शेयर करें!'
            : 'Please share your location first!');
        return;
    }

    // Show results section
    document.getElementById('resultsSection').style.display = 'block';
    const resultsDiv = document.getElementById('results');

    resultsDiv.innerHTML = currentLang === 'hi'
        ? '<div class="card"><p style="text-align: center;">⏳ खोज रहे हैं...</p></div>'
        : '<div class="card"><p style="text-align: center;">⏳ Searching...</p></div>';

    // Scroll to results
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });

    // Use Google Maps API to search nearby places
    // Note: In production, you would need a Google Maps API key
    searchGoogleMaps(type, userLocation);
}

// Search using Google Maps
function searchGoogleMaps(type, location) {
    const currentLang = localStorage.getItem('preferredLanguage') || 'hi';

    // Map service types to Google Maps search terms
    const searchTerms = {
        'hospital': 'hospital',
        'pharmacy': 'pharmacy',
        'dentist': 'dentist',
        'doctor': 'doctor',
        'health': 'health center'
    };

    const searchTerm = searchTerms[type] || type;

    // Create Google Maps search URL
    const mapsUrl = `https://www.google.com/maps/search/${searchTerm}/@${location.lat},${location.lng},15z`;

    // Since we can't use Google Maps API without a key, 
    // we'll show a helpful message and link to Google Maps
    const resultsDiv = document.getElementById('results');

    const typeNames = {
        'hospital': { hi: 'अस्पताल', en: 'Hospitals' },
        'pharmacy': { hi: 'दवाखाना', en: 'Pharmacies' },
        'dentist': { hi: 'डेंटल क्लिनिक', en: 'Dental Clinics' },
        'doctor': { hi: 'डॉक्टर क्लिनिक', en: 'Doctor Clinics' },
        'health': { hi: 'स्वास्थ्य केंद्र', en: 'Health Centers' }
    };

    const typeName = typeNames[type][currentLang];

    resultsDiv.innerHTML = `
        <div class="card" style="border-left-color: #007bff;">
            <span class="card-icon">📍</span>
            <h3 class="${currentLang === 'hi' ? 'lang-hi' : 'lang-en'}">
                ${currentLang === 'hi' ? 'नज़दीकी ' + typeName : 'Nearby ' + typeName}
            </h3>
            <p class="${currentLang === 'hi' ? 'lang-hi' : 'lang-en'}">
                ${currentLang === 'hi'
            ? 'Google Maps पर नज़दीकी ' + typeName + ' देखने के लिए नीचे क्लिक करें।'
            : 'Click below to see nearby ' + typeName + ' on Google Maps.'}
            </p>
            <a href="${mapsUrl}" target="_blank" class="btn btn-large" style="margin-top: 1rem; display: inline-block;">
                <span class="${currentLang === 'hi' ? 'lang-hi' : 'lang-en'}">
                    ${currentLang === 'hi' ? '🗺️ Google Maps पर देखें' : '🗺️ View on Google Maps'}
                </span>
            </a>
        </div>

        <div class="info-box" style="margin-top: 2rem;">
            <h4 class="${currentLang === 'hi' ? 'lang-hi' : 'lang-en'}">
                ${currentLang === 'hi' ? '💡 टिप्स' : '💡 Tips'}
            </h4>
            <ul style="list-style: none; padding: 0;" class="${currentLang === 'hi' ? 'lang-hi' : 'lang-en'}">
                ${currentLang === 'hi' ? `
                    <li style="padding: 0.4rem 0;">✓ Google Maps पर आप खुला/बंद स्टेटस देख सकते हैं</li>
                    <li style="padding: 0.4rem 0;">✓ रेटिंग और रिव्यू पढ़ें</li>
                    <li style="padding: 0.4rem 0;">✓ फोन नंबर पर कॉल करके पुष्टि करें</li>
                    <li style="padding: 0.4rem 0;">✓ दिशा-निर्देश पाने के लिए 'Directions' पर क्लिक करें</li>
                    <li style="padding: 0.4rem 0;">✓ खुलने का समय चेक करें</li>
                ` : `
                    <li style="padding: 0.4rem 0;">✓ You can see open/closed status on Google Maps</li>
                    <li style="padding: 0.4rem 0;">✓ Read ratings and reviews</li>
                    <li style="padding: 0.4rem 0;">✓ Call the phone number to confirm</li>
                    <li style="padding: 0.4rem 0;">✓ Click 'Directions' to get navigation</li>
                    <li style="padding: 0.4rem 0;">✓ Check opening hours</li>
                `}
            </ul>
        </div>

        <div class="card" style="border-left-color: #28a745; margin-top: 2rem;">
            <span class="card-icon">📞</span>
            <h3 class="${currentLang === 'hi' ? 'lang-hi' : 'lang-en'}">
                ${currentLang === 'hi' ? 'जाने से पहले कॉल करें' : 'Call Before Visiting'}
            </h3>
            <p class="${currentLang === 'hi' ? 'lang-hi' : 'lang-en'}">
                ${currentLang === 'hi'
            ? 'जाने से पहले फोन करके पुष्टि करें कि वो खुला है और आपकी ज़रूरत की सेवा उपलब्ध है।'
            : 'Call before visiting to confirm they are open and have the service you need.'}
            </p>
        </div>
    `;
}

// Auto-detect location on page load (optional)
window.addEventListener('load', function () {
    // Uncomment below to auto-detect location on page load
    // getLocation();
});
