# Clean chatbot setup - Simple & Professional

Write-Host "Setting up clean chatbot..."

# Widget HTML
$widget = @"

    <!-- Chatbot Widget -->
    <div id="chatWidget">
        <div id="chatHeader">
            <span class="lang-hi">स्वास्थ AI सहायक</span>
            <span class="lang-en" style="display: none;">Swasthai AI</span>
            <button onclick="toggleChatbot()">×</button>
        </div>
        <div id="chatMessages"></div>
        <div id="chatInput">
            <input type="text" id="chatInputField" placeholder="अपना सवाल लिखें..." />
            <button onclick="sendMessage()">📤</button>
        </div>
    </div>
    <button id="chatToggle" onclick="toggleChatbot()">💬</button>

"@

$files = 'index.html','tips.html','problems.html','nearby.html','emergency.html','ask.html','about.html','login.html'

# Add CSS link
foreach ($f in $files) {
    $content = Get-Content $f -Raw
    if ($content -notmatch 'chatbot.css') {
        $content = $content.Replace('</head>', "    <link rel=`"stylesheet`" href=`"css/chatbot.css`">`r`n</head>")
        Set-Content $f -Value $content -NoNewline
    }
}

# Add widget
foreach ($f in $files) {
    $content = Get-Content $f -Raw
    if ($content -notmatch 'chatWidget') {
        $content = $content.Replace('</body>', $widget + '</body>')
        Set-Content $f -Value $content -NoNewline
        Write-Host "✓ $f"
    }
}

Write-Host "`nCommitting..."
git add .
git commit -m "Added clean simple chatbot - no call button"
git push

Write-Host "`nDone! Clean chatbot added."
