from flask import Flask, request, send_from_directory
from flask_cors import CORS
import time
import random
import logging
import os

# Configure logging with AURA Live-TX theme
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [🌌 AURA Live-TX] %(levelname)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

app = Flask(__name__)
CORS(app)  # Enable CORS for demo purposes

# Mock translation data - English to selected languages
MOCK_TRANSLATIONS = {
    'es': {
        'Hello, world!': '¡Hola, mundo!',
        'How are you?': '¿Cómo estás?',
        'Thank you.': 'Gracias.',
        'This is a test.': 'Esto es una prueba.',
        'Welcome to the future.': 'Bienvenido al futuro.'
    },
    'fr': {
        'Hello, world!': 'Bonjour, le monde !',
        'How are you?': 'Comment allez-vous ?',
        'Thank you.': 'Merci.',
        'This is a test.': 'Ceci est un test.',
        'Welcome to the future.': 'Bienvenue dans le futur.'
    },
    'de': {
        'Hello, world!': 'Hallo, Welt!',
        'How are you?': 'Wie geht es dir?',
        'Thank you.': 'Danke.',
        'This is a test.': 'Das ist ein Test.',
        'Welcome to the future.': 'Willkommen in der Zukunft.'
    },
    'ja': {
        'Hello, world!': 'こんにちは、世界！',
        'How are you?': 'お元気ですか？',
        'Thank you.': 'ありがとう。',
        'This is a test.': 'これはテストです。',
        'Welcome to the future.': '未来へようこそ。'
    },
    'zh': {
        'Hello, world!': '你好，世界！',
        'How are you?': '你怎么样？',
        'Thank you.': '谢谢。',
        'This is a test.': '这是一个测试。',
        'Welcome to the future.': '欢迎来到未来。'
    },
    'ru': {
        # Full demo sentences
        'Houston, we have a problem with the coffee machine!': 'Хьюстон, у нас проблема с кофемашиной!',
        'Roger that, astronaut. What\'s the status?': 'Принято, астронавт. Какой статус?',
        'The aliens stole my sandwich again.': 'Инопланетяне снова украли мой сэндвич.',
        'Copy, we\'ll send backup... and more sandwiches.': 'Принято, мы отправим подкрепление... и больше сэндвичей.',
        # Individual words and phrases
        'Roger': 'Роджер',
        'that': 'то',
        'astronaut': 'астронавт',
        'What\'s': 'Что',
        'the': '',
        'status': 'статус',
        'Houston': 'Хьюстон',
        'we': 'мы',
        'have': 'есть',
        'a': '',
        'problem': 'проблема',
        'with': 'с',
        'coffee': 'кофе',
        'machine': 'машиной',
        'aliens': 'инопланетяне',
        'stole': 'украли',
        'my': 'мой',
        'sandwich': 'сэндвич',
        'again': 'снова',
        'Copy': 'Принято',
        'we\'ll': 'мы',
        'send': 'отправим',
        'backup': 'подкрепление',
        'and': 'и',
        'more': 'больше',
        'sandwiches': 'сэндвичи',
        # Words with punctuation
        'Houston,': 'Хьюстон,',
        'machine!': 'машиной!',
        'that,': 'то,',
        'astronaut.': 'астронавт.',
        'again.': 'снова.',
        'Copy,': 'Принято,',
        'backup...': 'подкрепление...',
        'sandwiches.': 'сэндвичи.',
        'The': '',
        # Punctuation
        '!': '!',
        ',': ',',
        '.': '.',
        '?': '?',
        '...': '...'
    }
}

@app.route('/')
def serve_index():
    """Serve the main demo page"""
    logging.info("🚀 Serving index.html from the orbital station")
    return send_from_directory(os.path.dirname(__file__), 'index.html')

@app.route('/styles.css')
def serve_styles():
    """Serve the CSS file"""
    return send_from_directory(os.path.dirname(__file__), 'styles.css')

@app.route('/script.js')
def serve_script():
    """Serve the JavaScript file"""
    return send_from_directory(os.path.dirname(__file__), 'script.js')

@app.route('/translate', methods=['POST'])
def translate():
    """Mock translation endpoint with futuristic processing simulation"""
    try:
        data = request.get_json()
        if not data:
            logging.warning("⚠️  No data received in translation request")
            return {'error': 'No data provided', 'status': 'Mission aborted'}, 400

        text = data.get('text', '').strip()
        target_lang = data.get('target_lang', '').strip()

        if not text:
            logging.warning("⚠️  Empty text received for translation")
            return {'error': 'Text is required', 'status': 'Mission parameters incomplete'}, 400

        if not target_lang:
            logging.warning("⚠️  No target language specified")
            return {'error': 'Target language is required', 'status': 'Destination coordinates missing'}, 400

        logging.info(f"🌌 Initiating hyperspace translation protocol: EN → {target_lang.upper()}")
        logging.info(f"📡 Source text: '{text}'")

        # Simulate AI processing delay (0.1-0.3 seconds)
        processing_time = random.uniform(0.1, 0.3)
        logging.info(f"⚡ Quantum processors engaging... Estimated time: {processing_time:.1f}s")
        time.sleep(processing_time)

        # Get mock translation
        lang_translations = MOCK_TRANSLATIONS.get(target_lang, {})
        translated_text = lang_translations.get(text, text)  # Fallback to original text if no translation

        logging.info(f"✅ Translation complete! Output: '{translated_text}'")
        logging.info(f"⏱️  Processing time: {processing_time:.2f} seconds")

        return {
            'translated_text': translated_text,
            'status': 'Hyperspace translation protocol executed successfully',
            'processing_time': f"{processing_time:.2f} seconds",
            'cosmic_signature': 'Powered by Quantum Translation Matrix v2.0',
            'target_language': target_lang,
            'confidence_score': round(random.uniform(0.85, 0.99), 2)
        }

    except Exception as e:
        logging.error(f"💥 Translation matrix failure: {str(e)}")
        return {
            'error': 'Translation failed',
            'status': 'Emergency protocol activated',
            'cosmic_signature': 'Error logged in quantum database'
        }, 500

if __name__ == '__main__':
    logging.info("🌟 Flask server initializing in demo mode")
    logging.info("🚀 Ready for interstellar communication")
    app.run(debug=True, host='0.0.0.0', port=5000)