// AURA AI System - Interactive JavaScript

class AuraAISystem {
    constructor() {
        this.apiBase = 'http://localhost:5001';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadModelComparison();
    }

    setupEventListeners() {
        // Query input and actions
        const queryInput = document.getElementById('queryInput');
        const submitBtn = document.getElementById('submitBtn');
        const clearBtn = document.getElementById('clearBtn');
        
        submitBtn.addEventListener('click', () => this.testAllModels());
        clearBtn.addEventListener('click', () => this.clearQuery());
        
        // Enter key support for query input
        queryInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.testAllModels();
            }
        });

        // Individual model testing buttons
        document.getElementById('auraBtn').addEventListener('click', () => this.testAuraModel());
        document.getElementById('baseBtn').addEventListener('click', () => this.testBaseModel());
        document.getElementById('ragBtn').addEventListener('click', () => this.testRagModel());

        // Example question buttons
        document.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const query = e.target.dataset.query;
                queryInput.value = query;
                queryInput.focus();
            });
        });
    }

    async testAllModels() {
        const query = document.getElementById('queryInput').value.trim();
        if (!query) {
            this.showError('Please enter a query');
            return;
        }

        this.showLoading(true);
        this.clearResults();

        try {
            // Test all three models in parallel
            const [auraResult, baseResult, ragResult] = await Promise.allSettled([
                this.callAPI('/api/query', { query }),
                this.callAPI('/api/openrouter', { query }),
                this.callAPI('/api/openrouter-rag', { query })
            ]);

            // Display results
            this.displayResult('aura', auraResult, 'AURA Fine-tuned');
            this.displayResult('base', baseResult, 'OpenRouter Base');
            this.displayResult('rag', ragResult, 'RAG Enhanced');

        } catch (error) {
            this.showError('Error testing models: ' + error.message);
        } finally {
            this.showLoading(false);
        }
    }

    async testAuraModel() {
        await this.testSingleModel('/api/query', 'aura', 'AURA Fine-tuned');
    }

    async testBaseModel() {
        await this.testSingleModel('/api/openrouter', 'base', 'OpenRouter Base');
    }

    async testRagModel() {
        await this.testSingleModel('/api/openrouter-rag', 'rag', 'RAG Enhanced');
    }

    async testSingleModel(endpoint, modelType, modelName) {
        const query = document.getElementById('queryInput').value.trim();
        if (!query) {
            this.showError('Please enter a query');
            return;
        }

        this.showLoading(true);
        this.clearResult(modelType);

        try {
            const result = await this.callAPI(endpoint, { query });
            this.displayResult(modelType, { status: 'fulfilled', value: result }, modelName);
        } catch (error) {
            this.displayResult(modelType, { status: 'rejected', reason: error }, modelName);
        } finally {
            this.showLoading(false);
        }
    }

    async callAPI(endpoint, data) {
        const startTime = Date.now();
        const response = await fetch(this.apiBase + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        const endTime = Date.now();
        result.responseTime = endTime - startTime;

        return result;
    }

    displayResult(modelType, result, modelName) {
        const contentElement = document.getElementById(`${modelType}Content`);
        const contextTokensElement = document.getElementById(`${modelType}ContextTokens`);
        const outputTokensElement = document.getElementById(`${modelType}OutputTokens`);
        const timeElement = document.getElementById(`${modelType}Time`);

        if (result.status === 'fulfilled') {
            const data = result.value;
            const responseText = data.procedure || data.answer || 'No response received';
            const tokenUsage = data.token_usage || data.usage || {};
            const contextTokens = tokenUsage.context_tokens || tokenUsage.prompt_tokens || 'N/A';
            const outputTokens = tokenUsage.output_tokens || tokenUsage.completion_tokens || 'N/A';
            const responseTime = data.responseTime || 'N/A';

            // Update metrics
            contextTokensElement.textContent = `${contextTokens} ctx`;
            outputTokensElement.textContent = `${outputTokens} out`;
            timeElement.textContent = `${responseTime}ms`;

            // Display response
            contentElement.innerHTML = `
                <div class="result-text">${this.formatResponse(responseText)}</div>
                <div class="response-metadata">
                    <small>Model: ${modelName}</small>
                    ${data.context_used ? '<small class="rag-indicator">🔍 RAG Enhanced</small>' : ''}
                </div>
            `;

            // Add success animation
            contentElement.parentElement.style.borderColor = '#08CB00';
            contentElement.parentElement.style.boxShadow = '0 0 20px rgba(8, 203, 0, 0.3)';

        } else {
            // Error case
            contentElement.innerHTML = `
                <div class="error-message">
                    <strong>Error:</strong> ${result.reason?.message || 'Unknown error'}
                </div>
            `;
            contentElement.parentElement.style.borderColor = '#ff4444';
        }

        // Remove animation after delay
        setTimeout(() => {
            contentElement.parentElement.style.boxShadow = '';
        }, 2000);
    }

    formatResponse(text) {
        // Convert line breaks to <br> and format for better readability
        return text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    }

    clearResults() {
        this.clearResult('aura');
        this.clearResult('base');
        this.clearResult('rag');
    }

    clearResult(modelType) {
        const contentElement = document.getElementById(`${modelType}Content`);
        const contextTokensElement = document.getElementById(`${modelType}ContextTokens`);
        const outputTokensElement = document.getElementById(`${modelType}OutputTokens`);
        const timeElement = document.getElementById(`${modelType}Time`);

        contentElement.innerHTML = '<p class="placeholder">Ready for query...</p>';
        contextTokensElement.textContent = '- ctx';
        outputTokensElement.textContent = '- out';
        timeElement.textContent = '- ms';

        // Reset styling
        contentElement.parentElement.style.borderColor = '#253900';
        contentElement.parentElement.style.boxShadow = '';
    }

    clearQuery() {
        document.getElementById('queryInput').value = '';
        document.getElementById('queryInput').focus();
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        overlay.style.display = show ? 'flex' : 'none';
    }

    showError(message) {
        // Create temporary error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <strong>Error:</strong> ${message}
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add error styles
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 2000;
            max-width: 400px;
            box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3);
        `;
        
        errorDiv.querySelector('button').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            float: right;
            margin-left: 10px;
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 5000);
    }

    async loadModelComparison() {
        try {
            const response = await fetch(this.apiBase + '/api/models-comparison');
            const data = await response.json();
            this.updateMetrics(data);
        } catch (error) {
            console.warn('Could not load model comparison:', error);
        }
    }

    updateMetrics(data) {
        // Update specialization bars
        const specs = {
            aura: data.performance_metrics.aura_model.specialization === 'Very High' ? 95 : 75,
            base: data.performance_metrics.openrouter_base.specialization === 'Low' ? 30 : 50,
            rag: data.performance_metrics.openrouter_rag.specialization === 'High' ? 80 : 60
        };

        // Update accuracy display
        const accuracies = {
            aura: data.performance_metrics.aura_model.response_accuracy.replace('%+', '%'),
            base: data.performance_metrics.openrouter_base.response_accuracy,
            rag: data.performance_metrics.openrouter_rag.response_accuracy
        };

        // Update progress bars with animation
        setTimeout(() => {
            document.querySelector('.aura-spec').style.width = specs.aura + '%';
            document.querySelector('.base-spec').style.width = specs.base + '%';
            document.querySelector('.rag-spec').style.width = specs.rag + '%';

            document.querySelector('.accuracy-item:first-child .accuracy-value').textContent = accuracies.aura;
            document.querySelector('.accuracy-item:nth-child(2) .accuracy-value').textContent = accuracies.base;
            document.querySelector('.accuracy-item:last-child .accuracy-value').textContent = accuracies.rag;
        }, 500);
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            totalQueries: 0,
            successfulQueries: 0,
            averageResponseTime: 0,
            tokenUsage: []
        };
        this.startTime = Date.now();
    }

    recordQuery(responseTime, tokenCount, success = true) {
        this.metrics.totalQueries++;
        if (success) {
            this.metrics.successfulQueries++;
            this.metrics.tokenUsage.push(tokenCount);
        }
        
        this.metrics.averageResponseTime = 
            (this.metrics.averageResponseTime + responseTime) / 2;
    }

    getStats() {
        return {
            ...this.metrics,
            successRate: (this.metrics.successfulQueries / this.metrics.totalQueries) * 100 || 0,
            uptime: Math.floor((Date.now() - this.startTime) / 1000)
        };
    }
}

// Initialize the system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.auraSystem = new AuraAISystem();
    window.performanceMonitor = new PerformanceMonitor();
});

// Real-time system updates
setInterval(() => {
    const uptime = Math.floor((Date.now() - window.performanceMonitor.startTime) / 1000);
    const minutes = Math.floor(uptime / 60);
    const seconds = uptime % 60;
    
    // Update status text with uptime
    const statusText = document.querySelector('.status-text');
    if (statusText) {
        statusText.textContent = `System Online (${minutes}:${seconds.toString().padStart(2, '0')})`;
    }
}, 1000);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+Enter: Test all models
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        window.auraSystem.testAllModels();
    }
    
    // Escape: Clear query
    if (e.key === 'Escape') {
        e.preventDefault();
        window.auraSystem.clearQuery();
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuraAISystem, PerformanceMonitor };
}