// Mock data arrays - Astronaut conversations
const englishSentences = [
    "Houston, we have a problem with the coffee machine!",
    "Roger that, astronaut. What's the status?",
    "The aliens stole my sandwich again.",
    "Copy, we'll send backup... and more sandwiches."
];


// DOM elements
const recordBtn = document.getElementById('record-btn');
const soundWaveCanvas = document.getElementById('sound-wave');
const timerDiv = document.getElementById('timer');
const languageSelect = document.getElementById('language-select');
const englishTranscript = document.querySelector('#english-transcript .transcript-content');
const dynamicTranscript = document.querySelector('#dynamic-transcript .transcript-content');
const dynamicLanguage = document.getElementById('dynamic-language');
const logsContent = document.getElementById('logs-content');

// State management
let isRecording = false;
let timerInterval;
let animationId;
let currentSentenceIndex = 0;

// Event listeners
recordBtn.addEventListener('click', toggleRecording);
languageSelect.addEventListener('change', updateLanguage);

// Initialize language
updateLanguage();

function updateLanguage() {
    const lang = languageSelect.value;
    dynamicLanguage.textContent = languageSelect.options[languageSelect.selectedIndex].text;
}

function toggleRecording() {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
}

function startRecording() {
    isRecording = true;
    recordBtn.textContent = 'Stop';
    startTimer();
    startSoundWave();
    startTranscription();
}

function stopRecording() {
    isRecording = false;
    recordBtn.textContent = 'Record';
    stopTimer();
    stopSoundWave();
    // Clear transcripts
    englishTranscript.textContent = '';
    dynamicTranscript.textContent = '';
    logsContent.innerHTML = '';
}

function startTimer() {
    let seconds = 0;
    timerInterval = setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        timerDiv.textContent = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerDiv.textContent = '00:00:00';
}

function startSoundWave() {
    const ctx = soundWaveCanvas.getContext('2d');
    const width = soundWaveCanvas.width;
    const height = soundWaveCanvas.height;
    let phase = 0;

    function animate() {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = '#007bff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < width; x += 2) {
            const y = height / 2 + Math.sin((x / width) * 8 * Math.PI + phase) * (height / 4) * Math.sin(phase / 10);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        phase += 0.2;
        if (isRecording) {
            animationId = requestAnimationFrame(animate);
        }
    }
    animate();
}

function stopSoundWave() {
    cancelAnimationFrame(animationId);
    const ctx = soundWaveCanvas.getContext('2d');
    ctx.clearRect(0, 0, soundWaveCanvas.width, soundWaveCanvas.height);
}

function startTranscription() {
    const lang = languageSelect.value;
    const englishWords = englishSentences[currentSentenceIndex].split(' ');

    englishTranscript.textContent = '';
    dynamicTranscript.textContent = '';

    let wordIndex = 0;
    const wordDelay = 600; // ms between words
    const transDelay = 1500; // delay before starting translation

    function displayEnglishWord() {
        if (wordIndex < englishWords.length && isRecording) {
            typeWord(englishTranscript, englishWords[wordIndex], () => {
                wordIndex++;
                setTimeout(displayEnglishWord, wordDelay);
            });
        } else if (wordIndex >= englishWords.length) {
            // Start translation after delay
            setTimeout(() => {
                let transIndex = 0;
                function displayTransWord() {
                    if (transIndex < englishWords.length && isRecording) {
                        translateWord(englishWords[transIndex], lang).then(translated => {
                            if (isRecording) {
                                typeWord(dynamicTranscript, translated, () => {
                                    transIndex++;
                                    setTimeout(displayTransWord, wordDelay);
                                });
                            }
                        }).catch(error => {
                            console.error('Translation error for word:', englishWords[transIndex], error);
                            if (isRecording) {
                                // On error, type the original word
                                typeWord(dynamicTranscript, englishWords[transIndex], () => {
                                    transIndex++;
                                    setTimeout(displayTransWord, wordDelay);
                                });
                            }
                        });
                    }
                }
                displayTransWord();
            }, transDelay);
        }
    }

    displayEnglishWord();

    // Cycle to next sentence for next recording
    currentSentenceIndex = (currentSentenceIndex + 1) % englishSentences.length;
}

function typeWord(container, word, callback) {
    let charIndex = 0;
    const typeInterval = setInterval(() => {
        if (!isRecording) {
            clearInterval(typeInterval);
            return;
        }
        container.textContent += word[charIndex];
        charIndex++;
        if (charIndex >= word.length) {
            clearInterval(typeInterval);
            container.textContent += ' '; // add space
            callback();
        }
    }, 50); // speed of typing
}

function logTranslation(word, lang, status) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `<div>${timestamp} - "${word}" -> ${lang}: ${status}</div>`;
    logsContent.innerHTML += logEntry;
    logsContent.scrollTop = logsContent.scrollHeight;
}

function translateWord(text, targetLang) {
    return fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text,
            target_lang: targetLang
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        const translated = data.translated_text || text;
        return translated;
    })
    .then(translated => {
        logTranslation(text, targetLang, 'Success');
        return translated;
    })
    .catch(error => {
        logTranslation(text, targetLang, 'Error: ' + error.message);
        throw error;
    });
}