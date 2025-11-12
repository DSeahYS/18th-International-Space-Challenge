// Vercel Serverless Function for RAG (Retrieval-Augmented Generation)
// Uses local data files for context retrieval

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query } = req.body;

    // Validate input
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({
        error: 'Missing or invalid query parameter'
      });
    }

    // Rate limiting check
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const rateLimitKey = `rate_limit_rag_${clientIP}`;

    if (!global.rateLimitStore) {
      global.rateLimitStore = new Map();
    }

    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 5; // 5 requests per minute for RAG (simpler)

    const userRequests = global.rateLimitStore.get(rateLimitKey) || [];
    const recentRequests = userRequests.filter(time => now - time < windowMs);

    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.'
      });
    }

    recentRequests.push(now);
    global.rateLimitStore.set(rateLimitKey, recentRequests);

    // Get OpenRouter API key for the LLM part of RAG
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    if (!OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY not configured');
      return res.status(500).json({
        error: 'OpenRouter API key not configured'
      });
    }

    // Simple RAG implementation - retrieve relevant context from local data
    const context = await retrieveContext(query);
    const contextTokens = Math.floor(context.length / 4); // Rough token estimate

    // Generate response using OpenRouter with retrieved context
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.VERCEL_URL || 'http://localhost:3000',
        'X-Title': 'AURA RAG Demo'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct',
        messages: [
          {
            role: 'system',
            content: `You are an EVA procedure assistant. Use the following context to provide accurate, helpful responses about space operations and EVA procedures. If the context doesn't contain relevant information, say so clearly.

Context:
${context}`
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.3, // Lower temperature for more factual responses
        max_tokens: 300
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter RAG API error:', response.status, errorData);
      return res.status(response.status).json({
        error: 'RAG API error',
        details: errorData
      });
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || 'No response generated';
    const generationTokens = data.usage?.completion_tokens || 0;

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json({
      answer: answer,
      usage: {
        context_tokens: contextTokens,
        generation_tokens: generationTokens,
        total_tokens: contextTokens + generationTokens
      },
      context_length: context.length,
      timestamp: new Date().toISOString(),
      query: query
    });

  } catch (error) {
    console.error('RAG API Error:', error);

    // Add CORS headers even for errors
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(500).json({
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
}

// Simple context retrieval from local data files
async function retrieveContext(query) {
  try {
    // In a real implementation, you'd have a proper vector database
    // For demo purposes, we'll do simple keyword matching on local files

    const fs = require('fs').promises;
    const path = require('path');

    // Try to read local data files
    const dataDir = path.join(process.cwd(), 'data');
    let context = '';

    try {
      // Read FullProcedures.md if it exists
      const fullProceduresPath = path.join(dataDir, 'FullProcedures.md');
      const fullProcedures = await fs.readFile(fullProceduresPath, 'utf8');
      context += fullProcedures.substring(0, 2000); // Limit context size
    } catch (e) {
      console.log('FullProcedures.md not found, using fallback context');
      context = getFallbackContext(query);
    }

    // Simple relevance filtering based on keywords
    const queryLower = query.toLowerCase();
    const relevantSections = [];

    if (queryLower.includes('pressure') || queryLower.includes('psi')) {
      relevantSections.push('EMERGENCY SUIT PRESSURE PROTOCOL: Monitor pressure gauges continuously. Critical threshold: below 3.0 psi requires immediate action.');
    }

    if (queryLower.includes('airlock') || queryLower.includes('depressurization')) {
      relevantSections.push('AIRLOCK DEPRESSURIZATION: Close inner hatch with 3 rotations. Verify pressure equalization before opening outer hatch.');
    }

    if (queryLower.includes('communication') || queryLower.includes('comms')) {
      relevantSections.push('COMMUNICATION PROTOCOLS: Primary channel first, then backup. Emergency beacon activation for complete loss.');
    }

    if (relevantSections.length > 0) {
      context = relevantSections.join('\n\n') + '\n\n' + context.substring(0, 1000);
    }

    return context || getFallbackContext(query);

  } catch (error) {
    console.error('Context retrieval error:', error);
    return getFallbackContext(query);
  }
}

function getFallbackContext(query) {
  return `EVA OPERATIONS GENERAL GUIDELINES:

1. SAFETY FIRST: Always prioritize astronaut safety and mission success
2. COMMUNICATION: Maintain constant contact with mission control
3. PRESSURE MONITORING: Continuously monitor suit pressure systems
4. EMERGENCY PROTOCOLS: Know abort procedures for all mission phases
5. TEAM COORDINATION: Work as a team for complex operations

For specific procedures related to "${query}", consult mission control or refer to detailed EVA checklists.`;
}