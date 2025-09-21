const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender + '-msg');
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
}

// Function to send the user's message to YOUR backend
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage('user', message);
    userInput.value = ''; // Clear the input field

    // Show a "thinking" message
    const thinkingMsg = addMessage('ai', 'Thinking...');

    try {
        // Send the request to YOUR backend server, not directly to DeepSeek
        const response = await fetch('https://your-backend-server.com/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }) // Send the user's message
        });

        const data = await response.json();

        // Remove the "Thinking..." message and add the real response
        chatBox.removeChild(chatBox.lastChild);
        if (data.reply) {
            addMessage('ai', data.reply);
        } else {
            throw new Error('No reply from AI');
        }

    } catch (error) {
        console.error('Error:', error);
        chatBox.removeChild(chatBox.lastChild);
        addMessage('ai', 'Sorry, there was an error connecting to the AI.');
    }
}

// Allow sending message with the Enter key
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});