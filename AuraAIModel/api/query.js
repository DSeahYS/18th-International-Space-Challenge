// Vercel Serverless Function for AURA API queries
// This keeps API keys secure on the server side

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

    // Rate limiting check (basic implementation)
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const rateLimitKey = `rate_limit_${clientIP}`;

    // For production, implement proper rate limiting with Redis or similar
    // This is a basic in-memory implementation for demo purposes
    if (!global.rateLimitStore) {
      global.rateLimitStore = new Map();
    }

    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 10; // 10 requests per minute

    const userRequests = global.rateLimitStore.get(rateLimitKey) || [];
    const recentRequests = userRequests.filter(time => now - time < windowMs);

    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.'
      });
    }

    recentRequests.push(now);
    global.rateLimitStore.set(rateLimitKey, recentRequests);

    // Get API configuration from environment variables
    const TINKER_API_KEY = process.env.TINKER_API_KEY;
    const MODEL_PATH = process.env.MODEL_PATH || 'tinker://fdf4bc15-7e66-4e8a-8765-88ff45132852/sampler_weights/aura_lora_1762782826';

    if (!TINKER_API_KEY) {
      console.error('TINKER_API_KEY not configured');
      return res.status(500).json({
        error: 'Service configuration error'
      });
    }

    // For demo purposes, return a mock response
    // In production, you would make actual API calls to your Tinker service
    const mockResponse = generateMockResponse(query);

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Mock token usage for demo (in production, get from actual API)
    const mockUsage = {
      prompt_tokens: Math.floor(query.length / 4) + 10, // Rough estimate
      completion_tokens: Math.floor(mockResponse.length / 4),
      total_tokens: Math.floor((query.length + mockResponse.length) / 4) + 10
    };

    return res.status(200).json({
      procedure: mockResponse,
      usage: mockUsage,
      timestamp: new Date().toISOString(),
      query: query
    });

  } catch (error) {
    console.error('API Error:', error);

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

// Mock response generator for demo purposes
// Replace this with actual Tinker API calls in production
function generateMockResponse(query) {
  const queryLower = query.toLowerCase();

  // Emergency procedures
  if (queryLower.includes('suit pressure') || queryLower.includes('pressure loss')) {
    return `EMERGENCY SUIT PRESSURE PROTOCOL:

1. IMMEDIATE ACTIONS:
   - Freeze all movement immediately
   - Announce "MAYDAY, MAYDAY - Suit pressure emergency"
   - Check wrist readout for exact pressure value

2. CRITICAL THRESHOLDS:
   - Below 3.0 psi: TREAT AS CRITICAL EMERGENCY
   - Below 2.5 psi: ABORT EVA immediately
   - Below 2.0 psi: Life-threatening situation

3. EMERGENCY PROCEDURES:
   - Activate suit emergency oxygen system
   - Prepare for emergency airlock repressurization
   - Contact mission control with pressure readings
   - Move to nearest safe location if possible

4. POST-EMERGENCY ACTIONS:
   - Complete full suit integrity inspection
   - Document all pressure readings and timeline
   - Participate in mission debrief and analysis

SAFETY NOTE: Suit pressure loss is a critical emergency requiring immediate response.`;
  }

  // Airlock procedures
  if (queryLower.includes('airlock') || queryLower.includes('depressurization')) {
    return `AIRLOCK DEPRESSURIZATION CHECKLIST:

PRE-EVA AIRLOCK DEPRESSURIZATION SEQUENCE:

1. INNER HATCH VERIFICATION:
   - Close and dog inner hatch (3 full rotations clockwise)
   - Verify 4 green indicators on inner seal integrity
   - Confirm pressure equalization (readings match)

2. DEPRESSURIZATION INITIATION:
   - Announce "Depressurization sequence starting in T-minus 10"
   - Activate depressurization pump system
   - Monitor pressure drop to target EVA pressure (3.8 psi)

3. OUTER HATCH OPERATIONS:
   - Verify outer hatch indicators (all green status)
   - Equalize pressure with EVA environment
   - Prepare for controlled hatch opening

4. FINAL SAFETY CHECKS:
   - Confirm suit pressure stability (±0.1 psi)
   - Verify communications systems operational
   - Complete pre-EVA safety equipment checklist
   - Conduct final EVA readiness confirmation

SAFETY NOTE: Never open outer hatch until depressurization is complete and verified.`;
  }

  // Communication procedures
  if (queryLower.includes('communication') || queryLower.includes('comms') || queryLower.includes('radio')) {
    return `COMMUNICATION FAILURE PROTOCOLS:

PRIMARY COMMUNICATION LOSS RESPONSE:

1. IMMEDIATE ASSESSMENT (30 seconds):
   - Attempt primary channel reconnection
   - Switch to backup communication system
   - Verify antenna positioning and power status
   - Check suit-to-suit direct communication capability

2. EMERGENCY COMMUNICATION ACTIVATION:
   - Activate emergency beacon system if available
   - Use suit-to-suit direct communication protocols
   - Establish line-of-sight visual signaling procedures
   - Implement pre-established emergency communication protocols

3. MISSION CONTROL COORDINATION:
   - Use satellite relay systems if available
   - Maintain position for rescue operations
   - Implement emergency navigation procedures
   - Conserve power for critical systems

4. RECOVERY PROCEDURES:
   - Regular communication system diagnostics
   - Maintain emergency frequency monitoring
   - Document all communication anomalies
   - Participate in post-mission communication analysis

SAFETY NOTE: Communication loss requires immediate protocol activation to ensure astronaut safety.`;
  }

  // Default response for other queries
  return `AURA EVA ASSISTANT RESPONSE:

Query: "${query}"

While I don't have specific protocol information for this exact scenario, here are the general EVA safety guidelines that apply:

1. MAINTAIN CONSTANT SITUATIONAL AWARENESS of your environment and systems
2. MONITOR all suit and equipment systems continuously
3. COMMUNICATE regularly with mission control using established protocols
4. FOLLOW established safety procedures for all operations
5. REPORT any anomalies or unexpected conditions immediately

For specific procedures related to your query, please provide additional details about the EVA operation, equipment involved, or emergency situation. AURA AI is designed to provide accurate, context-specific guidance for space operations.

SAFETY REMINDER: Always prioritize safety and follow established NASA protocols during EVA operations.`;
}