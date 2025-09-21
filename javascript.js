// File: server.js (on your backend)
const express = require('express');
const cors = require('cors');
const axios = require('axios'); // You need to install these packages: npm install express cors axios

const app = express();
app.use(cors());
app.use(express.json());

// Your SECRET API Key from DeepSeek - set this as an environment variable, do not hardcode it in production.
const DEEPSEEK_API_KEY = 'your_deepseek_api_key_here'; // TODO: Replace with your key
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'; // Check DeepSeek's docs for the correct endpoint

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: "deepseek-chat", // Check the correct model name on DeepSeek's platform
        messages: [{ role: "user", content: userMessage }],
        max_tokens: 2048
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Send the AI's reply back to your frontend
    res.json({ reply: response.data.choices[0].message.content });

  } catch (error) {
    console.error('Backend Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));