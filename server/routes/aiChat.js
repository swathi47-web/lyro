import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat endpoint
router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create a system prompt for pet adoption context
    const systemPrompt = `You are a helpful assistant for a pet adoption platform. You help users with:
    - Information about pet adoption process
    - Tips on pet care and training
    - Breed information and characteristics
    - General pet-related questions
    
    Be friendly, helpful, and encouraging. Keep responses concise and relevant to pets and adoption.`;

    // Generate response using Gemini
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I will help users with pet adoption and pet-related questions.' }],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    res.json({
      success: true,
      message: responseText,
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({
      error: 'Failed to process message',
      details: error.message,
    });
  }
});

export default router;
