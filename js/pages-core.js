/** GramUrja — Core Page Templates (Landing, Login, Dashboard, 404) */
const Pages = {
  landing() {
    return `
    <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;padding:1.5rem">
      <div class="glass-static" style="max-width:520px;width:100%;padding:2.5rem;border-radius:2rem;text-align:center">
        <div style="display:inline-flex;padding:1rem;background:var(--sky);border-radius:1.25rem;margin-bottom:1.5rem">
          <i data-lucide="zap" style="width:32px;height:32px;color:var(--bg-primary)"></i>
        </div>
        <h1 style="font-size:2rem;font-weight:700;margin-bottom:0.25rem" data-i18n="app_name">ग्रामऊर्जा</h1>
        <p style="color:var(--sky);font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;font-weight:600" data-i18n="app_tagline">आपलं गाव, आपली सेवा</p>
        <div style="margin:2rem 0;text-align:left">
          <label class="label" data-i18n="landing.select_region">प्रदेश निवडा</label>
          <select id="region-select" class="select-input" style="margin-bottom:1rem">
            <option value="kolhapur">कोल्हापूर (Kolhapur)</option>
            <option value="sangli">सांगली (Sangli)</option>
            <option value="satara">सातारा (Satara)</option>
            <option value="solapur">सोलापूर (Solapur)</option>
            <option value="pune">पुणे (Pune)</option>
            <option value="ratnagiri">रत्नागिरी (Ratnagiri)</option>
          </select>
          <button id="detect-loc-btn" class="btn btn-ghost btn-block" style="margin-bottom:1rem">
            <i data-lucide="map-pin" style="width:16px;height:16px"></i>
            <span data-i18n="landing.detect_location">माझे ठिकाण शोधा</span>
          </button>
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem;padding:1rem;background:rgba(2,6,23,0.4);border-radius:1rem;border:1px solid rgba(51,65,85,0.3);margin-bottom:1.5rem">
          <span class="pulse-dot"></span>
          <span style="font-size:0.8125rem;color:var(--text-secondary)" data-i18n="landing.system_status">सिस्टम चालू आहे</span>
          <span class="badge badge-success" style="margin-left:auto">99.8%</span>
        </div>
        <p style="font-size:0.8125rem;color:var(--text-secondary);margin-bottom:1.5rem;line-height:1.7" data-i18n="landing.sub_description">लाईट बिल, पाणी पुरवठा, शेतीचे शेड्युल आणि तक्रारी आता थेट मोबाईलवरून हाताळा.</p>
        <button class="btn btn-primary btn-block btn-lg" onclick="Router.navigate('login')" data-i18n="landing.enter_dashboard" style="font-size:0.9375rem">
          डॅशबोर्ड सुरू करा
        </button>
        <div style="margin-top:1.5rem;display:flex;justify-content:space-between;font-size:0.6875rem;color:var(--text-muted);font-family:monospace">
          <span data-i18n="common.version">आवृत्ती २.०.२६</span>
          <span data-i18n="common.location">कोल्हापूर, महाराष्ट्र</span>
        </div>
      </div>
    </div>`;
  },

  initLanding() {
    document.getElementById('detect-loc-btn')?.addEventListener('click', () => {
      const btn = document.getElementById('detect-loc-btn');
      btn.innerHTML = '<i data-lucide="loader" style="width:16px;height:16px;animation:spin 1s linear infinite"></i> <span>' + I18n.t('landing.detecting') + '</span>';
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          Toast.show('📍 ' + I18n.t('landing.detect_location') + ' ✓', 'success');
          btn.innerHTML = '<i data-lucide="check" style="width:16px;height:16px"></i> <span>✓ Located</span>';
          lucide.createIcons();
        }, () => {
          Toast.show(I18n.t('common.error'), 'error');
          btn.innerHTML = '<i data-lucide="map-pin" style="width:16px;height:16px"></i> <span>' + I18n.t('landing.detect_location') + '</span>';
          lucide.createIcons();
        });
      }
    });
  },

  login() {
    return `
    <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;padding:1.5rem">
      <div class="glass-static" style="max-width:440px;width:100%;padding:2.5rem;border-radius:2rem">
        <div style="text-align:center;margin-bottom:2rem">
          <div style="display:inline-flex;padding:0.875rem;background:rgba(14,165,233,0.1);border:1px solid rgba(14,165,233,0.2);border-radius:1.25rem;margin-bottom:1rem">
            <i data-lucide="shield-check" style="width:28px;height:28px;color:var(--sky)"></i>
          </div>
          <h2 style="font-size:1.5rem;font-weight:700" data-i18n="login.title">सुरक्षित लॉगिन</h2>
          <p style="font-size:0.75rem;color:var(--text-secondary)" data-i18n="login.subtitle">आपल्या विभागानुसार लॉगिन करा</p>
        </div>
        <form id="login-form" style="display:flex;flex-direction:column;gap:1rem">
          <div>
            <label class="label" data-i18n="login.username">वापरकर्ता नाव</label>
            <input id="login-user" class="input" type="text" placeholder="admin" required>
          </div>
          <div>
            <label class="label" data-i18n="login.password">पासवर्ड</label>
            <input id="login-pass" class="input" type="password" placeholder="••••••" required>
          </div>
          <div>
            <label class="label" data-i18n="login.department">विभाग निवडा</label>
            <select id="login-dept" class="select-input">
              <option value="admin">प्रशासन (Admin)</option>
              <option value="water">जल विभाग (Water)</option>
              <option value="power">वीज विभाग (Power)</option>
              <option value="agriculture">कृषी विभाग (Agriculture)</option>
              <option value="sanitation">स्वच्छता (Sanitation)</option>
              <option value="transport">वाहतूक (Transport)</option>
              <option value="public">नागरिक (Citizen)</option>
            </select>
          </div>
          <div id="login-error" style="display:none;padding:0.75rem;background:rgba(244,63,94,0.1);border:1px solid rgba(244,63,94,0.2);border-radius:0.75rem;color:var(--rose);font-size:0.8125rem"></div>
          <button type="submit" class="btn btn-primary btn-block btn-lg" data-i18n="login.submit">लॉगिन करा</button>
        </form>
        <button class="btn btn-ghost btn-block" style="margin-top:0.75rem" onclick="Router.navigate('landing')">
          <i data-lucide="arrow-left" style="width:16px;height:16px"></i> <span data-i18n="common.back">मागे</span>
        </button>
        <p style="text-align:center;font-size:0.625rem;color:var(--text-muted);margin-top:1.5rem">Demo: admin / admin123</p>
      </div>
    </div>`;
  },

  initLogin() {
    document.getElementById('login-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const user = document.getElementById('login-user').value;
      const pass = document.getElementById('login-pass').value;
      const result = Auth.login(user, pass);
      if (result.success) {
        Toast.show('✓ ' + I18n.t('login.title'), 'success');
        Router.navigate('dashboard');
      } else {
        const err = document.getElementById('login-error');
        err.style.display = 'block';
        err.textContent = I18n.t('login.error');
      }
    });
  },

  notFound() {
    return `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;padding:2rem">
      <div style="font-size:6rem;font-weight:800;background:linear-gradient(135deg,var(--sky),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent">404</div>
      <h2 style="font-size:1.25rem;margin:1rem 0 0.5rem">पृष्ठ सापडले नाही</h2>
      <p style="color:var(--text-secondary);font-size:0.875rem;margin-bottom:1.5rem">Page Not Found</p>
      <button class="btn btn-primary" onclick="Router.navigate('dashboard')">
        <i data-lucide="home" style="width:16px;height:16px"></i> Dashboard
      </button>
    </div>`;
  }
};
