/**
 * GramUrja — i18n (Internationalization) Engine
 * Handles language switching, key-value translation, and TTS integration.
 */
const I18n = (() => {
  let currentLang = localStorage.getItem('gramurja_lang') || 'mr';
  let translations = {};
  const listeners = [];

  async function loadLanguage(lang) {
    try {
      const res = await fetch(`lang/${lang}.json`);
      if (!res.ok) throw new Error(`Language file not found: ${lang}`);
      translations = await res.json();
      currentLang = lang;
      localStorage.setItem('gramurja_lang', lang);
      document.documentElement.lang = lang === 'mr' ? 'mr' : lang === 'hi' ? 'hi' : 'en';
      applyTranslations();
      listeners.forEach(fn => fn(lang));
    } catch (e) {
      console.error('[i18n] Failed to load language:', e);
    }
  }

  function t(key) {
    const keys = key.split('.');
    let val = translations;
    for (const k of keys) {
      if (val && typeof val === 'object') val = val[k];
      else return key;
    }
    return val || key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = t(key);
      if (translated !== key) el.textContent = translated;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translated = t(key);
      if (translated !== key) el.placeholder = translated;
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const translated = t(key);
      if (translated !== key) el.title = translated;
    });
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
  }

  function onChange(fn) { listeners.push(fn); }
  function getLang() { return currentLang; }
  function getTranslations() { return translations; }

  return { loadLanguage, t, applyTranslations, onChange, getLang, getTranslations };
})();

/**
 * TTS (Text-to-Speech) Manager
 * Uses Web Speech API with fallback placeholder for Bhashini/Google TTS
 */
const TTS = (() => {
  let speaking = false;

  function speak(text) {
    if (!text) return;
    stop();
    /* ============================================================
       BHASHINI / GOOGLE CLOUD TTS INTEGRATION POINT
       ============================================================
       To use Bhashini API or Google Cloud TTS instead of browser TTS:
       1. Replace the speechSynthesis logic below with an API call.
       2. Example endpoint: POST https://dhruva-api.bhashini.gov.in/services/inference/pipeline
       3. Or Google: POST https://texttospeech.googleapis.com/v1/text:synthesize
       ============================================================ */
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      const lang = I18n.getLang();
      utter.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
      utter.rate = 0.9;
      utter.onstart = () => { speaking = true; updateFab(); };
      utter.onend = () => { speaking = false; updateFab(); };
      utter.onerror = () => { speaking = false; updateFab(); };
      speechSynthesis.speak(utter);
    }
  }

  function readPage() {
    const main = document.getElementById('page-content');
    if (!main) return;
    const text = main.innerText.substring(0, 2000);
    speak(text);
  }

  function stop() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    speaking = false;
    updateFab();
  }

  function toggle() { speaking ? stop() : readPage(); }
  function isSpeaking() { return speaking; }

  function updateFab() {
    const fab = document.getElementById('tts-fab');
    if (fab) fab.classList.toggle('speaking', speaking);
  }

  return { speak, readPage, stop, toggle, isSpeaking };
})();
