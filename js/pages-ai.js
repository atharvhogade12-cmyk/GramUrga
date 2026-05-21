/** GramUrja — AI Module Pages (Crop Diagnosis, Market Chat) + Analytics */

Pages.cropDiagnosis = function() {
  return `
  <div style="margin-bottom:1.5rem">
    <div style="display:flex;align-items:center;gap:0.75rem;color:var(--emerald);font-size:0.6875rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.25rem"><i data-lucide="scan-search" style="width:14px;height:14px"></i> AI-Powered Phytological Diagnostics</div>
    <h1 style="font-size:1.5rem;font-weight:700" data-i18n="crop_diagnosis.title">पीक रोग निदान (AI)</h1>
    <p style="font-size:0.8125rem;color:var(--text-secondary)" data-i18n="crop_diagnosis.subtitle">तुमच्या पिकाचा फोटो अपलोड करा</p>
  </div>
  <div class="grid-2" style="align-items:start">
    <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
      <div id="crop-drop-zone" style="border:2px dashed rgba(16,185,129,0.3);border-radius:1.25rem;padding:3rem 1.5rem;text-align:center;cursor:pointer;transition:all 0.3s;background:rgba(2,6,23,0.3)">
        <i data-lucide="upload-cloud" style="width:48px;height:48px;color:var(--emerald);margin:0 auto 1rem;display:block"></i>
        <p style="font-weight:600;margin-bottom:0.25rem" data-i18n="crop_diagnosis.drag_drop">फोटो ड्रॅग करा किंवा क्लिक करा</p>
        <p style="font-size:0.6875rem;color:var(--text-muted)" data-i18n="crop_diagnosis.supported">JPG, PNG — कमाल 5MB</p>
        <input type="file" id="crop-file-input" accept="image/*" style="display:none">
      </div>
      <div id="crop-preview" style="display:none;margin-top:1rem;text-align:center">
        <img id="crop-preview-img" style="max-width:100%;max-height:300px;border-radius:1rem;border:1px solid var(--border-glass)">
        <p id="crop-file-name" style="font-size:0.75rem;color:var(--text-muted);margin-top:0.5rem"></p>
      </div>
      <button id="crop-analyze-btn" class="btn btn-primary btn-block btn-lg" style="margin-top:1rem;background:var(--emerald)" data-i18n="crop_diagnosis.analyze">
        AI विश्लेषण सुरू करा
      </button>
    </div>
    <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
      <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem" data-i18n="crop_diagnosis.result">निदान निकाल</h2>
      <div id="crop-result" style="min-height:200px;display:flex;align-items:center;justify-content:center">
        <p style="color:var(--text-muted);font-size:0.8125rem;text-align:center">
          <i data-lucide="microscope" style="width:40px;height:40px;display:block;margin:0 auto 0.75rem;opacity:0.3"></i>
          फोटो अपलोड केल्यावर AI निदान येथे दिसेल
        </p>
      </div>
      <!-- ============================================================
           🔌 AI BOT WEBHOOK INTEGRATION POINT
           ============================================================
           INSERT YOUR CUSTOM AI DIAGNOSTIC BOT WEBHOOK URL BELOW.
           The system will POST the image as base64 to this URL.
           Expected response: { "disease": "...", "confidence": 0.95, "remedy": "..." }
           
           <!-- INSERT BOT WEBHOOK URL HERE -->
           const CROP_AI_WEBHOOK = ""; // ← PASTE YOUR WEBHOOK URL HERE
           
           ============================================================ -->
    </div>
  </div>`;
};

Pages.marketChat = function() {
  return `
  <div style="margin-bottom:1.5rem">
    <div style="display:flex;align-items:center;gap:0.75rem;color:var(--sky);font-size:0.6875rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.25rem"><i data-lucide="message-square-text" style="width:14px;height:14px"></i> AI-Powered Market Nexus</div>
    <h1 style="font-size:1.5rem;font-weight:700" data-i18n="market_chat.title">बाजारभाव AI सल्लागार</h1>
  </div>
  <div class="card-static" style="border-radius:1.5rem;overflow:hidden">
    <div class="chat-container">
      <div class="chat-messages" id="chat-messages">
        <div class="chat-bubble bot">
          <span data-i18n="market_chat.welcome">नमस्कार! मी तुमचा बाजारभाव सल्लागार आहे. कोणत्या पिकाचा भाव जाणून घ्यायचा?</span>
        </div>
      </div>
      <div class="chat-input-wrap">
        <input id="chat-input" class="input" style="flex:1;border-radius:0.75rem" placeholder="तुमचा प्रश्न टाइप करा..." data-i18n-placeholder="market_chat.placeholder">
        <button id="chat-send-btn" class="btn btn-primary" style="border-radius:0.75rem;padding:0.75rem 1.25rem">
          <i data-lucide="send" style="width:18px;height:18px"></i>
        </button>
      </div>
    </div>
    <!-- ============================================================
         🔌 AI MARKET VALUATION WEBHOOK INTEGRATION POINT
         ============================================================
         INSERT YOUR CUSTOM AI MARKET BOT WEBHOOK URL BELOW.
         The system will POST { "query": "user_message", "lang": "mr" }
         Expected response: { "reply": "...", "data": {...} }
         
         <!-- INSERT BOT WEBHOOK URL HERE -->
         const MARKET_AI_WEBHOOK = ""; // ← PASTE YOUR WEBHOOK URL HERE
         
         ============================================================ -->
  </div>`;
};

Pages.analytics = function() {
  return `
  <div style="margin-bottom:1.5rem">
    <div style="display:flex;align-items:center;gap:0.75rem;color:var(--sky);font-size:0.6875rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.25rem"><i data-lucide="bar-chart-3" style="width:14px;height:14px"></i> Admin Command Center</div>
    <h1 style="font-size:1.5rem;font-weight:700">विश्लेषण डॅशबोर्ड (Analytics)</h1>
  </div>
  <div class="grid-3" style="margin-bottom:1.5rem">
    <div class="card-static" style="padding:1.5rem;border-radius:1.5rem;border-top:3px solid var(--sky)">
      <p style="font-size:0.75rem;color:var(--text-secondary)">आजचे एकूण भेटी</p>
      <h3 style="font-size:1.875rem;font-weight:700;margin-top:0.25rem" id="stat-visits">—</h3>
      <p style="font-size:0.6875rem;color:var(--emerald);margin-top:0.5rem">↑ १२% वाढ</p>
    </div>
    <div class="card-static" style="padding:1.5rem;border-radius:1.5rem;border-top:3px solid var(--emerald)">
      <p style="font-size:0.75rem;color:var(--text-secondary)">सक्रिय वापरकर्ते</p>
      <h3 style="font-size:1.875rem;font-weight:700;margin-top:0.25rem" id="stat-active">—</h3>
      <p style="font-size:0.6875rem;color:var(--text-muted);margin-top:0.5rem">Real-time</p>
    </div>
    <div class="card-static" style="padding:1.5rem;border-radius:1.5rem;border-top:3px solid var(--amber)">
      <p style="font-size:0.75rem;color:var(--text-secondary)">प्रलंबित तक्रारी</p>
      <h3 style="font-size:1.875rem;font-weight:700;margin-top:0.25rem" id="stat-grievances">—</h3>
      <p style="font-size:0.6875rem;color:var(--rose);margin-top:0.5rem">↓ ३ निवारित आज</p>
    </div>
  </div>
  <div class="grid-2" style="align-items:start">
    <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
      <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem">कर्मचारी स्थिती (Staff Status)</h2>
      <div id="staff-status-list" style="display:flex;flex-direction:column;gap:0.5rem"></div>
    </div>
    <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
      <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem">विभागवार तक्रारी</h2>
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <div><div style="display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:0.25rem"><span>वीज विभाग</span><span>४२</span></div><div class="progress"><div class="progress-bar" style="width:70%;background:var(--amber)"></div></div></div>
        <div><div style="display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:0.25rem"><span>पाणी विभाग</span><span>२८</span></div><div class="progress"><div class="progress-bar" style="width:47%;background:var(--blue)"></div></div></div>
        <div><div style="display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:0.25rem"><span>स्वच्छता</span><span>१५</span></div><div class="progress"><div class="progress-bar" style="width:25%;background:var(--purple)"></div></div></div>
        <div><div style="display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:0.25rem"><span>रस्ते/इतर</span><span>९</span></div><div class="progress"><div class="progress-bar" style="width:15%;background:var(--rose)"></div></div></div>
      </div>
    </div>
  </div>`;
};
