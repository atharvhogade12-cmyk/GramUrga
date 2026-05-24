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

    initAdminForms();
  }

  function initAdminForms() {
    const powerForm = document.getElementById('admin-power-form');
    if (powerForm) {
      powerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {
          ward_id: document.getElementById('admin-power-ward').value,
          status: document.getElementById('admin-power-status').value
        };
        await postUpdate('analytics/update-power.php', payload, 'admin-power-btn');
      });
    }

    const waterForm = document.getElementById('admin-water-form');
    if (waterForm) {
      waterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {
          ward_id: document.getElementById('admin-water-ward').value,
          status: document.getElementById('admin-water-status').value
        };
        await postUpdate('analytics/update-water.php', payload, 'admin-water-btn');
      });
    }

    const transitForm = document.getElementById('admin-transit-form');
    if (transitForm) {
      transitForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {
          track_id: 1,
          next_bus_time: document.getElementById('admin-transit-time').value
        };
        await postUpdate('analytics/update-transit.php', payload, 'admin-transit-btn');
      });
    }
  }

  async function postUpdate(url, payload, btnId) {
    const btn = document.getElementById(btnId);
    const originalText = btn.innerHTML;
    btn.innerHTML = 'अपडेट होत आहे...';
    btn.disabled = true;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.status === 'success') {
        Toast.show('डेटा यशस्वीरित्या अपडेट झाला!', 'success');
      } else {
        Toast.show('त्रुटी: ' + json.message, 'error');
      }
    } catch (e) {
      Toast.show('नेटवर्क त्रुटी', 'error');
    }
    
    btn.innerHTML = originalText;
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

/** GramUrja — News Module (Dynamic) */
const NewsModule = (() => {
  let isListenerRegistered = false;

  const DEFAULT_NEWS = [
    {
      id: 1,
      category: 'शासकीय योजना',
      title: '"माझी लाडकी बहीण" योजना विशेष नोंदणी कॅम्प उद्यापासून!',
      content: 'अपूर्ण अर्ज असलेल्या महिलांसाठी ग्रामपंचायत कार्यालयात सकाळी ९ ते संध्या. ५ शिबिर. आधार, बँक पासबुक, रेशन कार्ड आणावे.',
      is_urgent: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      category: 'वीज विभाग',
      title: 'उद्या दुपारी २ ते ५ वीजपुरवठा खंडित राहील',
      content: 'मुख्य ट्रान्सफॉर्मर दुरुस्तीचे काम असल्याने प्रभाग क्र. ३ आणि ४ मध्ये वीजपुरवठा बंद राहील. नागरिकांनी सहकार्य करावे.',
      is_urgent: 0,
      created_at: new Date().toISOString()
    }
  ];

  function getCategoryTranslation(category) {
    if (typeof I18n === 'undefined') return category;
    const cat = category.toLowerCase().trim();
    if (cat.includes('योजना') || cat.includes('scheme')) return I18n.t('news.cat_schemes');
    if (cat.includes('वीज') || cat.includes('power')) return I18n.t('news.cat_power');
    if (cat.includes('पाणी') || cat.includes('water')) return I18n.t('news.cat_water');
    if (cat.includes('कृषी') || cat.includes('agri')) return I18n.t('news.cat_agri');
    if (cat.includes('सामान्य') || cat.includes('general')) return I18n.t('news.cat_general');
    return category;
  }

  function getNewsTitle(news) {
    if (typeof I18n === 'undefined') return news.title;
    const key = `news.news_${news.id}_title`;
    const tVal = I18n.t(key);
    return (tVal !== key) ? tVal : news.title;
  }

  function getNewsContent(news) {
    if (typeof I18n === 'undefined') return news.content;
    const key = `news.news_${news.id}_content`;
    const tVal = I18n.t(key);
    return (tVal !== key) ? tVal : news.content;
  }

  function formatDate(dateStr) {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const day = d.getDate();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[d.getMonth()];
      const hours = String(d.getHours()).padStart(2, '0');
      const mins = String(d.getMinutes()).padStart(2, '0');
      return `${day} ${month}, ${hours}:${mins}`;
    } catch (e) {
      return dateStr;
    }
  }

  async function init() {
    const container = document.getElementById('news-container');
    if (!container) return;

    if (!isListenerRegistered && typeof I18n !== 'undefined') {
      I18n.onChange(() => {
        if (typeof Router !== 'undefined' && Router.getCurrent() === 'news') {
          init();
        }
      });
      isListenerRegistered = true;
    }

    try {
      let newsList = [];
      try {
        const res = await fetch('analytics/fetch-news.php');
        const json = await res.json();
        if (json.status === 'success') {
          newsList = json.data;
        } else {
          throw new Error(json.message);
        }
      } catch (e) {
        console.warn("Failed to fetch news from database, checking localStorage:", e);
        const localNews = localStorage.getItem('gramurja_news');
        if (!localNews) {
          localStorage.setItem('gramurja_news', JSON.stringify(DEFAULT_NEWS));
          newsList = DEFAULT_NEWS;
        } else {
          newsList = JSON.parse(localNews);
        }
      }

      if (newsList.length > 0) {
        let leftCol = '<div style="display:flex;flex-direction:column;gap:1.5rem">';
        let rightCol = '<div style="display:flex;flex-direction:column;gap:1.5rem">';
        
        let urgentAlertsHtml = '';
        let staticDocsHtml = `
        <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
          <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:0.75rem"><i data-lucide="download-cloud" style="width:18px;height:18px;color:var(--indigo)"></i> <span data-i18n="news.download_docs">${typeof I18n !== 'undefined' ? I18n.t('news.download_docs') : 'कागदपत्रे डाउनलोड'}</span></h2>
          <div style="padding:0.625rem;background:rgba(2,6,23,0.4);border-radius:0.75rem;border:1px solid rgba(51,65,85,0.3);display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;font-size:0.75rem"><span data-i18n="news.house_list">${typeof I18n !== 'undefined' ? I18n.t('news.house_list') : '🏠 घरकुल यादी २०२६.pdf'}</span><button class="btn btn-ghost" style="padding:0.375rem"><i data-lucide="download" style="width:14px;height:14px"></i></button></div>
          <div style="padding:0.625rem;background:rgba(2,6,23,0.4);border-radius:0.75rem;border:1px solid rgba(51,65,85,0.3);display:flex;justify-content:space-between;align-items:center;font-size:0.75rem"><span data-i18n="news.budget_report">${typeof I18n !== 'undefined' ? I18n.t('news.budget_report') : '📋 बजेट अहवाल २०२६.pdf'}</span><button class="btn btn-ghost" style="padding:0.375rem"><i data-lucide="download" style="width:14px;height:14px"></i></button></div>
        </div>`;

        newsList.forEach((news, index) => {
          const category = getCategoryTranslation(news.category);
          const title = getNewsTitle(news);
          const content = getNewsContent(news);
          const dateStr = news.formatted_date || formatDate(news.created_at);

          if (news.is_urgent == 1 || news.is_urgent === true || news.is_urgent === "1") {
            urgentAlertsHtml += `<div style="padding:0.875rem;background:rgba(2,6,23,0.5);border:1px solid rgba(244,63,94,0.15);border-radius:0.75rem;margin-bottom:0.75rem"><span style="font-size:0.5625rem;font-family:monospace;color:var(--rose);text-transform:uppercase;letter-spacing:0.1em">⚠️ ${category}</span><p style="font-size:0.75rem;margin-top:0.25rem;font-weight:500">${title}</p></div>`;
          } else {
            const color = index % 2 === 0 ? 'var(--indigo)' : 'var(--emerald)';
            const html = `
            <div class="card-static" style="padding:1.5rem;border-radius:1.5rem;border-left:3px solid ${color}">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;font-size:0.75rem"><span class="badge badge-info" style="background: ${color}20; color: ${color}; border-color: ${color}40;">${category}</span><span style="color:var(--text-muted);font-family:monospace"><i data-lucide="clock" style="width:12px;height:12px"></i> ${dateStr}</span></div>
              <h3 style="font-size:1.125rem;font-weight:700;margin-bottom:0.5rem;cursor:pointer">${title}</h3>
              <p style="font-size:0.8125rem;color:var(--text-secondary);line-height:1.7">${content}</p>
            </div>`;
            leftCol += html;
          }
        });

        if (urgentAlertsHtml) {
          rightCol += `
          <div class="card-static" style="padding:1.5rem;border-radius:1.5rem;background:linear-gradient(135deg,rgba(244,63,94,0.05),transparent)">
            <h2 style="font-size:1.125rem;font-weight:700;color:var(--rose);margin-bottom:0.75rem"><i data-lucide="alert-octagon" style="width:18px;height:18px"></i> <span data-i18n="news.important_alerts">${typeof I18n !== 'undefined' ? I18n.t('news.important_alerts') : 'महत्त्वाच्या सूचना'}</span></h2>
            ${urgentAlertsHtml}
          </div>`;
        }
        
        rightCol += staticDocsHtml;
        leftCol += '</div>';
        rightCol += '</div>';

        container.innerHTML = leftCol + rightCol;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      } else {
        container.innerHTML = `<div style="grid-column: span 2; text-align: center; padding: 3rem; color: var(--text-muted);" data-i18n="news.no_news">${typeof I18n !== 'undefined' ? I18n.t('news.no_news') : 'बातम्या उपलब्ध नाहीत.'}</div>`;
      }
    } catch (e) {
      container.innerHTML = `<div style="grid-column: span 2; text-align: center; padding: 3rem; color: var(--rose);" data-i18n="news.error_loading">${typeof I18n !== 'undefined' ? I18n.t('news.error_loading') : 'डेटा लोड करताना त्रुटी आली.'}</div>`;
    }
  }
  return { init };
})();

/** GramUrja — Grievance Module (Dynamic) */
const GrievanceModule = (() => {
  function init() {
    const form = document.getElementById('grievance-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('grv-submit-btn');
        btn.innerHTML = 'प्रक्रिया सुरू आहे...';
        btn.disabled = true;

        const payload = {
          full_name: document.getElementById('grv-name').value,
          mobile: document.getElementById('grv-mobile').value,
          department: document.getElementById('grv-dept').value,
          ward: document.getElementById('grv-ward').value,
          description: document.getElementById('grv-desc').value
        };

        let isSuccess = false;
        let trackingId = '';
        try {
          const res = await fetch('analytics/submit-grievance.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const json = await res.json();
          if (json.status === 'success') {
            isSuccess = true;
            trackingId = json.tracking_id;
          } else {
            Toast.show('त्रुटी: ' + json.message, 'error');
          }
        } catch (e) {
          console.warn("Failed to submit grievance to PHP backend, saving locally:", e);
          trackingId = 'GRV-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
          const grievances = JSON.parse(localStorage.getItem('gramurja_grievances') || '[]');
          const newGrievance = {
            tracking_id: trackingId,
            full_name: payload.full_name,
            mobile: payload.mobile,
            department: payload.department,
            ward: payload.ward,
            description: payload.description,
            status: 'Pending',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            last_updated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
          };
          grievances.unshift(newGrievance);
          localStorage.setItem('gramurja_grievances', JSON.stringify(grievances));
          isSuccess = true;
        }

        if (isSuccess) {
          Toast.show('तक्रार नोंदवली! Tracking ID: ' + trackingId, 'success');
          form.reset();
          document.getElementById('grv-track-id').value = trackingId;
          checkStatus(trackingId);
        }

        btn.innerHTML = 'तक्रार नोंदवा';
        btn.disabled = false;
      });
    }

    const trackBtn = document.getElementById('grv-track-btn');
    if (trackBtn) {
      trackBtn.addEventListener('click', () => {
        const id = document.getElementById('grv-track-id').value.trim();
        if (id) checkStatus(id);
        else Toast.show('Tracking ID प्रविष्ट करा', 'error');
      });
    }
  }

  async function checkStatus(id) {
    const resDiv = document.getElementById('grv-track-result');
    if (!resDiv) return;
    resDiv.style.display = 'block';
    resDiv.innerHTML = '<div class="skeleton" style="height:20px;width:100%;border-radius:4px"></div>';
    
    try {
      const res = await fetch('analytics/fetch-grievance-status.php?tracking_id=' + encodeURIComponent(id));
      const json = await res.json();

      if (json.status === 'success') {
        renderGrievanceStatus(json.data);
      } else {
        throw new Error(json.message);
      }
    } catch (e) {
      console.warn("Failed to check status from backend, checking localStorage:", e);
      const grievances = JSON.parse(localStorage.getItem('gramurja_grievances') || '[]');
      const found = grievances.find(g => g.tracking_id === id);
      if (found) {
        renderGrievanceStatus({
          tracking_id: found.tracking_id,
          department: found.department,
          status: found.status,
          last_updated: found.last_updated || new Date(found.updated_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        });
      } else {
        resDiv.innerHTML = `<div style="color:var(--rose);font-size:0.75rem">तक्रार सापडली नाही. (Not Found)</div>`;
      }
    }
  }

  function renderGrievanceStatus(data) {
    const resDiv = document.getElementById('grv-track-result');
    if (!resDiv) return;
    let iconColor = 'var(--amber)';
    let statusText = 'प्रक्रिया सुरू';
    if (data.status.toLowerCase() === 'resolved') { iconColor = 'var(--emerald)'; statusText = 'पूर्ण ✓'; }
    if (data.status.toLowerCase() === 'pending') { iconColor = 'var(--rose)'; statusText = 'प्रलंबित'; }

    resDiv.innerHTML = `
      <div style="display:flex;gap:0.75rem;margin-bottom:0.75rem">
        <div style="width:14px;height:14px;border-radius:50%;background:${iconColor};flex-shrink:0;margin-top:2px"></div>
        <div>
          <span style="font-size:0.6875rem;color:var(--text-muted);font-family:monospace">${data.last_updated}</span>
          <p style="font-size:0.75rem;font-weight:500;color:${iconColor}">${statusText}</p>
          <p style="font-size:0.6875rem;color:var(--text-secondary);margin-top:0.25rem">विभाग: ${data.department}</p>
        </div>
      </div>
    `;
  }

  return { init };
})();

