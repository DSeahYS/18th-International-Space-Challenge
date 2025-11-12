# AURA AI - EVA Procedure Assistant Website

A professional web interface for the AURA AI EVA Procedure Assistant, featuring secure API integration and modern web design.

## 🚀 Features

- **Professional Space-Themed UI**: Modern design with NASA-inspired aesthetics
- **Secure API Integration**: Vercel serverless functions keep API keys protected
- **Interactive Demo**: Real-time EVA procedure guidance
- **Responsive Design**: Works on all devices
- **Fast Performance**: Optimized for quick response times

## 🛡️ Security & API Integration

### How API Keys Are Protected

**🔐 Secure Architecture:**
- API keys are stored as Vercel environment variables (never in client code)
- Serverless functions handle all API calls server-side
- Client-side code only receives responses, never credentials
- Rate limiting prevents abuse
- CORS properly configured

**🌐 Deployment Security:**
- Vercel environment variables are encrypted and secure
- No API keys exposed in GitHub repository
- Automatic HTTPS encryption
- DDoS protection via Vercel infrastructure

## 📋 Prerequisites

- Node.js 18+
- Vercel CLI (optional, for local testing)
- GitHub account

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/DSeahYS/AURA-AI-Website.git
cd AURA-AI-Website
npm install
```

### 2. Local Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

### 3. Vercel Deployment

#### Connect to GitHub
1. Push this code to your GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository

#### Configure Environment Variables
In your Vercel project settings, add these environment variables:

```
TINKER_API_KEY=your_tinker_api_key_here
MODEL_PATH=tinker://your_model_path_here
```

**Important:** Never commit API keys to GitHub. Always use Vercel environment variables.

#### Deploy
Vercel will automatically deploy your website. The URL will be something like:
`https://aura-ai-website.vercel.app`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TINKER_API_KEY` | Your Tinker API key | Yes |
| `MODEL_PATH` | Path to your trained AURA model | Yes |

### API Endpoints

- `POST /api/query` - Get EVA procedure guidance
  - Body: `{"query": "your EVA question"}`
  - Response: `{"procedure": "detailed response", "timestamp": "ISO date"}`

## 🏗️ Project Structure

```
AuraAIWebsite/
├── index.html          # Main website
├── styles.css          # Styling
├── script.js           # Client-side JavaScript
├── api/
│   └── query.js        # Vercel serverless function
├── vercel.json         # Vercel configuration
├── package.json        # Dependencies
└── README.md          # This file
```

## 🔒 Security Best Practices

### API Key Protection
- ✅ Store keys in Vercel environment variables only
- ✅ Never commit keys to Git repository
- ✅ Use different keys for development/production
- ✅ Rotate keys regularly

### Rate Limiting
- ✅ 10 requests per minute per IP
- ✅ Automatic blocking of abuse
- ✅ Request logging for monitoring

### CORS Configuration
- ✅ Properly configured for security
- ✅ Allows necessary origins only
- ✅ Prevents unauthorized access

## 🧪 Testing

### Local Testing
```bash
npm run dev
```

Visit `http://localhost:3000` to see the comparison interface.

### API Testing
```bash
# Test AURA API
curl -X POST http://localhost:5000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Emergency: suit pressure below 3.0 psi"}'

# Test OpenRouter API
curl -X POST http://localhost:5000/api/openrouter \
  -H "Content-Type: application/json" \
  -d '{"query": "What are emergency procedures?"}'
```

## 🧪 **AI Model Comparison Demo**

**The Problem: A Life-Critical, Real-Time System**

Your AURA paper defines a system that must do three things:
- **Be Sovereign**: Work with zero connection to Earth due to communication latency
- **Be Instantaneous**: Part of a "sense-decide-act loop" under 100 milliseconds
- **Be a "Symbiote"**: An "active, intelligent partner" fusing live biometric/suit data

### **Three AI Models Compared:**

| Feature | Vanilla LLM (Tourist) | RAG (Librarian) | Fine-Tuned (Partner) |
|---------|----------------------|-----------------|---------------------|
| **Domain Knowledge** | ❌ None | ✅ Has the book | ✅ Is the book |
| **Inference Speed** | Fast | ❌ Slow (Must search) | ✅ Instant (Reflex) |
| **Context Window** | ✅ Free | ❌ Clogged (Full of PDF) | ✅ Free (Ready for sensor data) |
| **Role** | Ignorant | Passive Tool | Active Symbiote |

**🎯 AURA AI (Fine-tuned)** - Your crewmate who has memorized the EVA manual
**📚 Vanilla RAG** - Librarian who must search the manual each time
**🤖 Base Llama Model** - Tourist with no local knowledge

### **Real-Time Metrics:**
- Response time in milliseconds
- Context token usage (input tokens)
- Full response text (scrollable after 5 lines)
- Performance comparison summary

## 📚 Usage Examples

### Emergency Procedures
- "Emergency: suit pressure below 3.0 psi"
- "Communication failure - what do I do?"
- "Airlock malfunction during EVA"

### Operational Procedures
- "Pre-EVA suit check checklist"
- "Tool handling procedures"
- "Sample collection protocols"

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For issues or questions:
- Create an issue on GitHub
- Check the troubleshooting section below

## 🔧 Troubleshooting

### Common Issues

**API Key Not Working:**
- Verify environment variables are set in Vercel
- Check that keys are not expired
- Ensure correct key format

**Website Not Loading:**
- Check Vercel deployment status
- Verify build configuration
- Check browser console for errors

**Slow Responses:**
- This is normal for AI model inference
- Responses typically take 2-5 seconds
- Check your internet connection

## 🎯 Future Enhancements

- [ ] Voice input for hands-free operation
- [ ] Multi-language support
- [ ] Advanced procedure search
- [ ] Integration with astronaut training systems
- [ ] Real-time collaboration features

---

**Built with ❤️ for space exploration safety**