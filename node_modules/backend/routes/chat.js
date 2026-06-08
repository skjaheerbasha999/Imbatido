const express = require('express');
const router = express.Router();

// Mock response database for development mode (when no API key is provided)
const mockResponseMap = {
  'heart attack': "Med-Sync Medical AI: Emergency Heart Attack (Myocardial Infarction) Guidance 🫀\n\n🚨 CALL 911 IMMEDIATELY if you or someone else has symptoms!\n\nSymptoms:\n• Crushing chest pain or pressure spreading to arm, jaw, neck\n• Shortness of breath\n• Profuse sweating and nausea\n\nFirst Aid:\n1. Keep the person calm and seated.\n2. Have them chew an Aspirin (325mg) if they are not allergic.\n3. Be ready to perform CPR if they lose consciousness.",
  
  'stroke': "Med-Sync Medical AI: Stroke Warning Signs (F.A.S.T.) 🧠\n\n🚨 Call 911 IMMEDIATELY! Time is brain.\n\nF - Face Drooping (One side of the face is numb or drooping)\nA - Arm Weakness (One arm drifts downward when raised)\nS - Speech Difficulty (Slurred or strange speech)\nT - Time to call 911 (Act quickly!)",
  
  'first aid': "Med-Sync Medical AI: First Aid CPR Instructions 🚨\n\n1. Check responsiveness and breathing.\n2. Call 911 immediately.\n3. Compress chest hard and fast at center (100-120 beats/min, 2 inches deep).\n4. Push to the rhythm of 'Stayin' Alive'.",
  
  'secure': "Med-Sync Security Safeguards 🔒\n\nYes, Med-Sync utilizes industry-standard safeguards:\n• End-to-end data encryption in transit and at rest\n• Secure database storage with password hashing\n• HIPAA-ready protocols protecting medical records\n• Role-based permissions preventing unauthorized access.",
  
  'features': "Med-Sync Healthcare Features list 📱\n\n• Smart reminders for pill timing and refills\n• Real-time notifications for caregivers on missed doses\n• Patient wellness tracking and progress streaks\n• Integrated doctor review dashboards.",
  
  'hello': "Hello! I am your Med-Sync health assistant. How can I help you navigate your dashboard or check your metrics today? 👋",
  
  'hi': "Hello! I am your Med-Sync health assistant. How can I help you navigate your dashboard or check your metrics today? 👋"
};

const getMockResponse = (message) => {
  const lowerMsg = message.toLowerCase().trim();
  for (const [key, response] of Object.entries(mockResponseMap)) {
    if (lowerMsg.includes(key)) {
      return `🤖 [Med-Sync Dev AI Mode]\n\n${response}`;
    }
  }
  return `🤖 [Med-Sync Dev AI Mode]\n\nI received your message: "${message}".\n\nTo unlock unrestricted live responses from Gemini, please configure a valid Google Gemini API Key in your backend \`.env\` file under the variable name \`AI_API_KEY\`.`;
};

// Cached GoogleGenAI client instance
let aiClient = null;

async function getAIClient() {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return null;
  }
  if (!aiClient) {
    // Dynamically import the ES Module @google/genai inside CommonJS environment
    const { GoogleGenAI } = await import('@google/genai');
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = await getAIClient();
    
    // If no client could be created (no custom key), fallback to local mock mode
    if (!ai) {
      const mockReply = getMockResponse(message);
      return res.json({ reply: mockReply });
    }

    // Call the official Google Gen AI SDK to generate content
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
    });

    const replyText = aiResponse.text || 'No response generated.';
    return res.json({ reply: replyText });

  } catch (err) {
    console.error('✗ Error in /api/chat using SDK:', err);
    
    const apiKey = process.env.AI_API_KEY;
    const hasCustomKey = apiKey && apiKey !== 'your_gemini_api_key_here';

    if (hasCustomKey) {
      let errorMessage = err.message || 'Unknown SDK error';
      return res.json({
        reply: `⚠️ [Gemini SDK Error]\n\nThe server attempted to connect to Gemini using the official SDK and your configured API key, but encountered an error:\n\n• **Details**: ${errorMessage}\n\nPlease check your \`AI_API_KEY\` in your backend \`.env\` file.`
      });
    }

    // Dev mode fallback on other errors
    try {
      const mockReply = getMockResponse(req.body.message);
      return res.json({ reply: mockReply });
    } catch (e) {
      return res.status(500).json({ error: 'Internal server error processing chat' });
    }
  }
});

module.exports = router;
