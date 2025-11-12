// AURA vs OpenRouter Comparison - Frontend JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Setup AURA section
    setupSection('aura', async (query) => {
        return await callAPI(query);
    });

    // Setup OpenRouter section
    setupSection('openrouter', async (query) => {
        return await callOpenRouter(query);
    });

    // Add Compare Both button
    const compareBtn = document.createElement('button');
    compareBtn.textContent = 'Compare Both Models';
    compareBtn.className = 'compare-btn';
    document.querySelector('header .header-content').appendChild(compareBtn);

    // Add comparison results div
    const comparisonDiv = document.createElement('div');
    comparisonDiv.id = 'comparison-results';
    comparisonDiv.innerHTML = '<h3>Timing Comparison</h3><p id="comparison-text">Use "Compare Both Models" to see timing comparison.</p>';
    document.querySelector('main').appendChild(comparisonDiv);

    // Compare Both event listener
    compareBtn.addEventListener('click', async () => {
        const query = document.getElementById('aura-query-input').value.trim();
        if (!query) {
            alert('Please enter a query in the AURA section.');
            return;
        }
        // Set OpenRouter input to same query
        document.getElementById('openrouter-query-input').value = query;

        // Submit to both simultaneously
        const auraPromise = handleSubmit(
            document.getElementById('aura-query-input'),
            document.getElementById('aura-submit-btn'),
            document.getElementById('aura-response-display'),
            document.getElementById('aura-timing'),
            async (q) => await callAPI(q)
        );
        const orPromise = handleSubmit(
            document.getElementById('openrouter-query-input'),
            document.getElementById('openrouter-submit-btn'),
            document.getElementById('openrouter-response-display'),
            document.getElementById('openrouter-timing'),
            async (q) => await callOpenRouter(q)
        );

        const [auraTime, orTime] = await Promise.all([auraPromise, orPromise]);

        // Update comparison
        const comparisonText = document.getElementById('comparison-text');
        if (auraTime !== null && orTime !== null) {
            if (auraTime < orTime) {
                comparisonText.textContent = `AURA was faster by ${orTime - auraTime} ms`;
            } else if (orTime < auraTime) {
                comparisonText.textContent = `OpenRouter was faster by ${auraTime - orTime} ms`;
            } else {
                comparisonText.textContent = 'Both models took the same time';
            }
        } else {
            comparisonText.textContent = 'Comparison unavailable due to errors';
        }
    });

    function setupSection(prefix, apiCall) {
        const queryInput = document.getElementById(prefix + '-query-input');
        const submitBtn = document.getElementById(prefix + '-submit-btn');
        const responseDisplay = document.getElementById(prefix + '-response-display');
        const timingSpan = document.getElementById(prefix + '-timing');

        // Submit button event listener
        submitBtn.addEventListener('click', async () => {
            await handleSubmit(queryInput, submitBtn, responseDisplay, timingSpan, apiCall);
        });

        // Allow Enter key to submit (Ctrl+Enter for multi-line)
        queryInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                submitBtn.click();
            }
        });
    }

    async function handleSubmit(queryInput, submitBtn, responseDisplay, timingSpan, apiCall) {
        const query = queryInput.value.trim();

        if (!query) {
            showError(responseDisplay, 'Please enter a query before submitting.');
            return null;
        }

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';

        // Clear previous response
        responseDisplay.innerHTML = '<p class="loading">Processing your query...</p>';

        const startTime = Date.now();
        let timeTaken = null;

        try {
            const response = await apiCall(query);
            const endTime = Date.now();
            timeTaken = endTime - startTime;
            timingSpan.textContent = timeTaken + ' ms';

            // Display the response
            displayResponse(responseDisplay, response);

        } catch (error) {
            showError(responseDisplay, 'An error occurred while processing your query. Please try again.');
            console.error('API Error:', error);
            timingSpan.textContent = '-- ms';
            timeTaken = null;
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Query';
        }

        return timeTaken;
    }

    async function callAPI(query) {
        const response = await fetch('http://localhost:5000/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.procedure;
    }

    async function callOpenRouter(query) {
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
        return data.answer;
    }

    function displayResponse(display, response) {
        // Format and display the response
        const formattedResponse = response.replace(/\n/g, '<br>');
        display.innerHTML = `<div class="response-content">${formattedResponse}</div>`;
    }

    function showError(display, message) {
        display.innerHTML = `<div class="error">${message}</div>`;
    }
});