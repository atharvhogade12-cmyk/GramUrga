/** GramUrja — Crop Diagnosis Module */
const CropDiagnosis = (() => {
  /* ============================================================
     🔌 AI DIAGNOSTIC BOT WEBHOOK — INSERT YOUR URL BELOW
     ============================================================ */
  // <!-- INSERT BOT WEBHOOK URL HERE -->
  const WEBHOOK_URL = ""; // ← PASTE YOUR AI BOT WEBHOOK URL HERE
  /* ============================================================ */

  let selectedFile = null;

  function init() {
    const zone = document.getElementById('crop-drop-zone');
    const input = document.getElementById('crop-file-input');
    const btn = document.getElementById('crop-analyze-btn');
    if (!zone || !input) return;

    zone.addEventListener('click', () => input.click());
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor = 'var(--emerald)'; zone.style.background = 'rgba(16,185,129,0.05)'; });
    zone.addEventListener('dragleave', () => { zone.style.borderColor = 'rgba(16,185,129,0.3)'; zone.style.background = 'rgba(2,6,23,0.3)'; });
    zone.addEventListener('drop', e => { e.preventDefault(); zone.style.borderColor = 'rgba(16,185,129,0.3)'; if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]); });
    input.addEventListener('change', () => { if (input.files.length) handleFile(input.files[0]); });
    btn?.addEventListener('click', analyze);
  }

  function handleFile(file) {
    if (!file.type.startsWith('image/')) { Toast.show('कृपया इमेज फाईल निवडा', 'error'); return; }
    if (file.size > 5 * 1024 * 1024) { Toast.show('फाईल 5MB पेक्षा लहान असावी', 'error'); return; }
    selectedFile = file;
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById('crop-preview').style.display = 'block';
      document.getElementById('crop-preview-img').src = e.target.result;
      document.getElementById('crop-file-name').textContent = file.name;
    };
    reader.readAsDataURL(file);
  }

  async function analyze() {
    if (!selectedFile) { Toast.show(I18n.t('crop_diagnosis.no_image'), 'error'); return; }
    const result = document.getElementById('crop-result');
    const btn = document.getElementById('crop-analyze-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="skeleton" style="display:inline-block;width:20px;height:20px;border-radius:50%"></span> ' + I18n.t('crop_diagnosis.analyzing');
    result.innerHTML = '<div style="text-align:center;padding:2rem"><div class="skeleton" style="width:60px;height:60px;border-radius:50%;margin:0 auto 1rem"></div><div class="skeleton" style="height:16px;width:80%;margin:0 auto 0.5rem"></div><div class="skeleton" style="height:12px;width:60%;margin:0 auto"></div><p style="font-size:0.75rem;color:var(--text-muted);margin-top:1rem">AI विश्लेषण सुरू आहे...</p></div>';

    if (WEBHOOK_URL) {
      try {
        const base64 = await fileToBase64(selectedFile);
        const res = await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: base64, lang: I18n.getLang() }) });
        const data = await res.json();
        showResult(data);
      } catch (e) {
        result.innerHTML = '<p style="color:var(--rose);text-align:center">AI सेवा उपलब्ध नाही. कृपया नंतर प्रयत्न करा.</p>';
      }
    } else {
      // Demo response when no webhook configured
      setTimeout(() => {
        showResult({ disease: 'पानावरील करपा (Leaf Blight)', confidence: 0.87, severity: 'मध्यम (Moderate)', remedy: 'मॅन्कोझेब (Mancozeb) 2.5g/L पाण्यात मिसळून फवारणी करा. ७ दिवसांनी पुन्हा फवारणी आवश्यक.' });
      }, 2500);
    }
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="scan-search" style="width:18px;height:18px"></i> ' + I18n.t('crop_diagnosis.analyze');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function showResult(data) {
    const result = document.getElementById('crop-result');
    const conf = Math.round((data.confidence || 0.87) * 100);
    result.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:1rem">
        <div style="padding:1rem;background:rgba(244,63,94,0.08);border:1px solid rgba(244,63,94,0.2);border-radius:1rem">
          <span style="font-size:0.6875rem;color:var(--rose);font-weight:700;text-transform:uppercase;letter-spacing:0.05em">🔬 रोग ओळखला</span>
          <h3 style="font-size:1.125rem;font-weight:700;margin-top:0.25rem">${data.disease || 'Unknown'}</h3>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">
          <div style="padding:0.75rem;background:rgba(2,6,23,0.4);border-radius:0.75rem;border:1px solid rgba(51,65,85,0.3)">
            <span style="font-size:0.625rem;color:var(--text-muted)">विश्वास पातळी</span>
            <p style="font-weight:700;color:${conf > 80 ? 'var(--emerald)' : 'var(--amber)'}">${conf}%</p>
          </div>
          <div style="padding:0.75rem;background:rgba(2,6,23,0.4);border-radius:0.75rem;border:1px solid rgba(51,65,85,0.3)">
            <span style="font-size:0.625rem;color:var(--text-muted)">तीव्रता</span>
            <p style="font-weight:700;color:var(--amber)">${data.severity || 'N/A'}</p>
          </div>
        </div>
        <div style="padding:1rem;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:1rem">
          <span style="font-size:0.6875rem;color:var(--emerald);font-weight:700">💊 उपाय</span>
          <p style="font-size:0.8125rem;margin-top:0.25rem;line-height:1.7">${data.remedy || 'कृषी अधिकाऱ्यांशी संपर्क करा.'}</p>
        </div>
      </div>`;
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return { init };
})();

/** GramUrja — Market Chat Module */
const MarketChat = (() => {
  /* ============================================================
     🔌 AI MARKET VALUATION WEBHOOK — INSERT YOUR URL BELOW
     ============================================================ */
  // <!-- INSERT BOT WEBHOOK URL HERE -->
  const WEBHOOK_URL = ""; // ← PASTE YOUR AI BOT WEBHOOK URL HERE
  /* ============================================================ */

  function init() {
    const input = document.getElementById('chat-input');
    const btn = document.getElementById('chat-send-btn');
    if (!input || !btn) return;
    btn.addEventListener('click', () => sendMessage());
    input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
  }

  async function sendMessage() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    addBubble(msg, 'user');

    if (WEBHOOK_URL) {
      addTyping();
      try {
        const res = await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: msg, lang: I18n.getLang() }) });
        const data = await res.json();
        removeTyping();
        addBubble(data.reply || 'माहिती उपलब्ध नाही.', 'bot');
      } catch { removeTyping(); addBubble('AI सेवा उपलब्ध नाही.', 'bot'); }
    } else {
      addTyping();
      setTimeout(() => {
        removeTyping();
        const demo = getDemoResponse(msg);
        addBubble(demo, 'bot');
      }, 1200);
    }
  }

  function addBubble(text, type) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-bubble ' + type;
    div.textContent = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function addTyping() {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-bubble bot';
    div.id = 'typing-indicator';
    div.innerHTML = '<span class="skeleton" style="display:inline-block;width:40px;height:12px;border-radius:6px"></span>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function removeTyping() { document.getElementById('typing-indicator')?.remove(); }

  function getDemoResponse(msg) {
    const lower = msg.toLowerCase();
    if (lower.includes('कांदा') || lower.includes('onion')) return '🧅 कांदा: आजचा सरासरी भाव ₹२,४५०/क्विंटल (कोल्हापूर APMC). गेल्या आठवड्यापेक्षा ₹१०० वाढ. पुढील आठवड्यात स्थिर राहण्याची शक्यता.';
    if (lower.includes('सोयाबीन') || lower.includes('soybean')) return '🌾 सोयाबीन: ₹४,२००/क्विंटल (किमान) ते ₹४,४५०/क्विंटल (कमाल). बाजारात हलकी मंदी (-₹२०). विक्री ७-१० दिवस थांबवणे चांगले.';
    if (lower.includes('टोमॅटो') || lower.includes('tomato')) return '🍅 टोमॅटो: ₹८००-₹१,२००/क्विंटल. पावसाळ्यापूर्वी भाव वाढण्याची शक्यता. कोल्ड स्टोरेजमध्ये ठेवल्यास ₹२०० जास्त मिळू शकतात.';
    return '📊 कृपया पिकाचे नाव सांगा (उदा. कांदा, सोयाबीन, टोमॅटो, मका). मी तुम्हाला सध्याचा बाजारभाव, ट्रेंड आणि विक्री सल्ला देतो.';
  }

  return { init };
})();

/** GramUrja — Analytics Module */
const Analytics = (() => {
  function init() {
    // Simulate live stats
    animateCounter('stat-visits', 1247);
    animateCounter('stat-active', 38);
    animateCounter('stat-grievances', 12);
    renderStaffStatus();
    // Auto-refresh every 10s
    setInterval(() => {
      const v = document.getElementById('stat-active');
      if (v) v.textContent = (35 + Math.floor(Math.random() * 10)).toString();
    }, 10000);
  }

  function animateCounter(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    let current = 0;
    const step = Math.ceil(target / 30);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current.toString();
    }, 40);
  }

  function renderStaffStatus() {
    const list = document.getElementById('staff-status-list');
    if (!list) return;
    const staff = [
      { name: 'जल विभाग कर्मचारी', status: 'हजर', online: true },
      { name: 'वीज तंत्रज्ञ', status: 'फील्ड ड्युटी', online: true },
      { name: 'स्वच्छता कर्मचारी', status: 'पावसामुळे अनुपस्थित', online: false },
      { name: 'कृषी सल्लागार', status: 'उपलब्ध', online: true },
      { name: 'बस चालक (मार्ग १)', status: 'ऑनलाईन', online: true },
    ];
    list.innerHTML = staff.map(s => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:0.625rem;background:rgba(2,6,23,0.4);border-radius:0.75rem;border:1px solid rgba(51,65,85,0.3)">
        <div style="display:flex;align-items:center;gap:0.5rem">
          <span class="pulse-dot${s.online ? '' : ' danger'}" style="width:8px;height:8px"></span>
          <span style="font-size:0.8125rem;font-weight:500">${s.name}</span>
        </div>
        <span style="font-size:0.6875rem;color:${s.online ? 'var(--emerald)' : 'var(--rose)'}">${s.status}</span>
      </div>`).join('');
  }

  return { init };
})();
