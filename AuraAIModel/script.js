// AURA AI Website JavaScript
// Handles demo interactions, API calls, and UI functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize demo functionality
    initializeDemo();

    // Add smooth scrolling for navigation
    initializeSmoothScrolling();

    // Add scroll animations
    initializeScrollAnimations();
});

// Comparison Demo functionality
function initializeDemo() {
    const comparisonQuery = document.getElementById('comparison-query');
    const compareBtn = document.getElementById('compare-btn');

    compareBtn.addEventListener('click', async () => {
        const query = comparisonQuery.value.trim();

        if (!query) {
            showComparisonError('Please enter a question to compare both models.');
            return;
        }

        // Show loading state
        setComparisonLoadingState(true);

        // Clear previous results
        clearComparisonResults();

        const startTime = Date.now();

        try {
            // Make simultaneous API calls to all three models
            const [auraResult, ragResult, openrouterResult] = await Promise.allSettled([
                callAuraAPI(query),
                callRAGAPI(query),
                callOpenRouterAPI(query)
            ]);

            const totalTime = Date.now() - startTime;

            // Process AURA result
            if (auraResult.status === 'fulfilled') {
                updateAuraResponse(auraResult.value);
            } else {
                showAuraError('AURA API error: ' + auraResult.reason.message);
            }

            // Process RAG result
            if (ragResult.status === 'fulfilled') {
                updateRAGResponse(ragResult.value);
            } else {
                showRAGError('RAG API error: ' + ragResult.reason.message);
            }

            // Process OpenRouter result
            if (openrouterResult.status === 'fulfilled') {
                updateOpenRouterResponse(openrouterResult.value);
            } else {
                showOpenRouterError('OpenRouter API error: ' + openrouterResult.reason.message);
            }

            // Show comparison summary
            showComparisonSummary(auraResult, ragResult, openrouterResult, totalTime);

        } catch (error) {
            console.error('Comparison Error:', error);
            showComparisonError('Unable to complete comparison. Please try again later.');
        } finally {
            setComparisonLoadingState(false);
        }
    });

    // Allow Enter key to submit (Ctrl+Enter for multi-line)
    comparisonQuery.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            compareBtn.click();
        }
    });
}

// API call functions
async function callAuraAPI(query) {
    const startTime = Date.now();
    const response = await fetch('http://localhost:5000/api/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });

    if (!response.ok) {
        throw new Error('AURA API request failed');
    }

    const data = await response.json();
    const endTime = Date.now();

    return {
        text: data.procedure,
        usage: data.usage || { total_tokens: 0 },
        responseTime: endTime - startTime
    };
}

async function callRAGAPI(query) {
    const startTime = Date.now();
    const response = await fetch('http://localhost:5000/api/rag', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });

    if (!response.ok) {
        throw new Error('RAG API request failed');
    }

    const data = await response.json();
    const endTime = Date.now();

    return {
        text: data.answer,
        usage: data.usage || { context_tokens: 0 },
        responseTime: endTime - startTime
    };
}

async function callOpenRouterAPI(query) {
    const startTime = Date.now();
    const response = await fetch('http://localhost:5000/api/openrouter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });

    if (!response.ok) {
        throw new Error('OpenRouter API request failed');
    }

    const data = await response.json();
    const endTime = Date.now();

    return {
        text: data.answer,
        usage: data.usage || { total_tokens: 0 },
        responseTime: endTime - startTime
    };
}

// UI state management
function setLoadingState(isLoading) {
    const submitBtn = document.getElementById('demo-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    if (isLoading) {
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
    } else {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

function updateResponse(response, responseTime) {
    const responseDisplay = document.getElementById('response-display');
    const responseTiming = document.getElementById('response-timing');

    responseDisplay.innerHTML = `<div class="response-content">${response.replace(/\n/g, '<br>')}</div>`;
    responseTiming.textContent = `${responseTime} ms`;
}

function showError(message) {
    const responseDisplay = document.getElementById('response-display');
    responseDisplay.innerHTML = `<div class="error-message">${message}</div>`;
}

// Example query setter
function setExampleQuery(query) {
    document.getElementById('demo-query').value = query;
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Utility functions
function scrollToDemo() {
    document.getElementById('demo').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToAbout() {
    document.getElementById('about').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Performance monitoring (for demo purposes)
function trackPerformance() {
    if ('performance' in window && 'getEntriesByType' in performance) {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const loadTime = navigation.loadEventEnd - navigation.fetchStart;

            console.log(`Page load time: ${loadTime.toFixed(2)} ms`);
        });
    }
}

// Comparison UI functions
function setComparisonLoadingState(isLoading) {
    const compareBtn = document.getElementById('compare-btn');
    const btnText = compareBtn.querySelector('.btn-text');
    const btnLoading = compareBtn.querySelector('.btn-loading');

    if (isLoading) {
        compareBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
    } else {
        compareBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

function clearComparisonResults() {
    document.getElementById('aura-response').innerHTML = '<div class="response-placeholder"><div class="placeholder-icon">🚀</div><p>AURA AI response will appear here</p><small>Specialized for EVA procedures</small></div>';
    document.getElementById('rag-response').innerHTML = '<div class="response-placeholder"><div class="placeholder-icon">📖</div><p>RAG response will appear here</p><small>Retrieval-augmented generation</small></div>';
    document.getElementById('openrouter-response').innerHTML = '<div class="response-placeholder"><div class="placeholder-icon">🧠</div><p>OpenRouter response will appear here</p><small>General purpose AI model</small></div>';
    document.getElementById('aura-timing').textContent = '-- ms';
    document.getElementById('aura-tokens').textContent = '--';
    document.getElementById('rag-timing').textContent = '-- ms';
    document.getElementById('rag-tokens').textContent = '--';
    document.getElementById('openrouter-timing').textContent = '-- ms';
    document.getElementById('openrouter-tokens').textContent = '--';
    document.getElementById('comparison-summary').style.display = 'none';
}

function updateAuraResponse(result) {
    const responseDiv = document.getElementById('aura-response');
    const timingSpan = document.getElementById('aura-timing');
    const tokensSpan = document.getElementById('aura-tokens');

    responseDiv.innerHTML = `<div class="response-content">${result.text.replace(/\n/g, '<br>')}</div>`;
    timingSpan.textContent = `${result.responseTime} ms`;
    tokensSpan.textContent = result.usage.total_tokens;
}

function updateRAGResponse(result) {
    const responseDiv = document.getElementById('rag-response');
    const timingSpan = document.getElementById('rag-timing');
    const tokensSpan = document.getElementById('rag-tokens');

    responseDiv.innerHTML = `<div class="response-content">${result.text.replace(/\n/g, '<br>')}</div>`;
    timingSpan.textContent = `${result.responseTime} ms`;
    tokensSpan.textContent = result.usage.context_tokens;
}

function updateOpenRouterResponse(result) {
    const responseDiv = document.getElementById('openrouter-response');
    const timingSpan = document.getElementById('openrouter-timing');
    const tokensSpan = document.getElementById('openrouter-tokens');

    responseDiv.innerHTML = `<div class="response-content">${result.text.replace(/\n/g, '<br>')}</div>`;
    timingSpan.textContent = `${result.responseTime} ms`;
    tokensSpan.textContent = result.usage.prompt_tokens || result.usage.total_tokens;
}

function showAuraError(message) {
    const responseDiv = document.getElementById('aura-response');
    responseDiv.innerHTML = `<div class="error-message">${message}</div>`;
    document.getElementById('aura-timing').textContent = '-- ms';
    document.getElementById('aura-tokens').textContent = '--';
}

function showRAGError(message) {
    const responseDiv = document.getElementById('rag-response');
    responseDiv.innerHTML = `<div class="error-message">${message}</div>`;
    document.getElementById('rag-timing').textContent = '-- ms';
    document.getElementById('rag-tokens').textContent = '--';
}

function showOpenRouterError(message) {
    const responseDiv = document.getElementById('openrouter-response');
    responseDiv.innerHTML = `<div class="error-message">${message}</div>`;
    document.getElementById('openrouter-timing').textContent = '-- ms';
    document.getElementById('openrouter-tokens').textContent = '--';
}

function showComparisonError(message) {
    clearComparisonResults();
    const summaryDiv = document.getElementById('comparison-summary');
    summaryDiv.style.display = 'block';
    summaryDiv.innerHTML = `<h3>❌ Error</h3><p>${message}</p>`;
}

function showComparisonSummary(auraResult, ragResult, openrouterResult, totalTime) {
    const summaryDiv = document.getElementById('comparison-summary');
    const fasterModel = document.getElementById('faster-model');
    const timeDifference = document.getElementById('time-difference');
    const tokenComparison = document.getElementById('token-comparison');

    if (auraResult.status === 'fulfilled' && ragResult.status === 'fulfilled' && openrouterResult.status === 'fulfilled') {
        const auraTime = auraResult.value.responseTime;
        const ragTime = ragResult.value.responseTime;
        const orTime = openrouterResult.value.responseTime;

        const auraTokens = auraResult.value.usage.total_tokens || 0;
        const ragTokens = ragResult.value.usage.context_tokens || 0;
        const orTokens = openrouterResult.value.usage.prompt_tokens || openrouterResult.value.usage.total_tokens || 0;

        // Find fastest model
        const times = [
            { name: 'AURA AI', time: auraTime },
            { name: 'RAG', time: ragTime },
            { name: 'OpenRouter', time: orTime }
        ];
        const fastest = times.reduce((prev, current) => (prev.time < current.time) ? prev : current);

        fasterModel.textContent = `${fastest.name} (fastest)`;
        timeDifference.textContent = `${fastest.time} ms average response time`;

        // Token efficiency comparison
        tokenComparison.textContent = `Context tokens - AURA: ${auraTokens}, RAG: ${ragTokens}, OpenRouter: ${orTokens}`;

        summaryDiv.style.display = 'block';
    }
}

// Example query setter for comparison
function setComparisonQuery(query) {
    document.getElementById('comparison-query').value = query;
}

// Initialize performance tracking
trackPerformance();