/** GramUrja — Core Page Templates (Landing, Login, Dashboard, 404) */

// Three-stage image resilience fallback handler
window.handleImageError = function(img, type) {
  if (!img.dataset.triedFallback) {
    img.dataset.triedFallback = "true";
    const fallbacks = {
      hero: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=800&q=80",
      about: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      college: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
      group: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      power: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80",
      water: "https://images.unsplash.com/photo-1548858850-e3be3733caec?auto=format&fit=crop&w=600&q=80",
      agriculture: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80",
      weather: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=600&q=80",
      bus: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
      sanitation: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80",
      grievance: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=600&q=80",
      news: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80",
      crop_diagnosis: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
      market_chat: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
    };
    if (fallbacks[type]) {
      img.src = fallbacks[type];
      return;
    }
  }
  
  // If the fallback image also fails, display the glassmorphic gradient placeholder
  img.style.display = 'none';
  const placeholder = img.nextElementSibling;
  if (placeholder) {
    placeholder.style.display = 'flex';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
};

const Pages = {
  landing() {
    return `
    <div class="landing-container">
        <header class="glass-nav">
            <div class="brand-box">
                <div class="brand-icon">
                    <i data-lucide="zap" style="width:24px;height:24px;stroke-width:2.5"></i>
                </div>
                <div>
                    <h1 style="font-size:1.35rem;font-weight:700;line-height:1.2;margin:0;" data-i18n="app_name">ग्रामऊर्जा</h1>
                    <p style="font-size:0.625rem;color:var(--sky);letter-spacing:0.12em;text-transform:uppercase;font-weight:600;margin:0;" data-i18n="app_tagline">आपलं गाव, आपली सेवा</p>
                </div>
            </div>

            <div class="lang-switcher" style="display:flex; gap:0.5rem;">
                <button class="btn btn-ghost lang-btn" data-lang="mr" onclick="I18n.loadLanguage('mr')">मराठी</button>
                <button class="btn btn-ghost lang-btn" data-lang="hi" onclick="I18n.loadLanguage('hi')">हिंदी</button>
                <button class="btn btn-ghost lang-btn" data-lang="en" onclick="I18n.loadLanguage('en')">EN</button>
            </div>

            <div style="display:flex; gap:0.75rem; align-items:center;">
                <a href="#/about" class="action-btn" style="background: rgba(14, 165, 233, 0.1); border-color: rgba(14, 165, 233, 0.25); color: var(--sky);">
                    <i data-lucide="info" style="width:16px;height:16px"></i>
                    <span data-i18n="nav.about">आमच्याबद्दल (About)</span>
                </a>
                <a href="#/login" class="action-btn" style="background: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.3); color: var(--emerald);">
                    <i data-lucide="user" style="width:16px;height:16px"></i>
                    <span data-i18n="nav.citizen_login">नागरिक लॉगिन</span>
                </a>
                <a href="pages/admin-login.html" class="action-btn">
                    <i data-lucide="shield-check" style="width:16px;height:16px"></i>
                    <span data-i18n="nav.admin_login">प्रशासन लॉगिन</span>
                </a>
            </div>
        </header>

        <!-- Premium Hero Section -->
        <section class="hero-section">
            <div class="hero-content">
                <div class="hero-badge">
                    <span class="pulse-dot"></span>
                    <span data-i18n="hero.badge">सिस्टम ऑनलाईन</span>
                </div>
                <h2 class="hero-title" data-i18n="hero.title">Smart Village Governance</h2>
                <p class="hero-desc" data-i18n="hero.subtitle">Empowering our village with clean energy, digital services, and transparency.</p>
                <div style="display:flex; gap:1rem; margin-top:0.5rem;">
                    <a href="#" class="btn btn-primary" onclick="document.getElementById('services-title-anchor').scrollIntoView({behavior:'smooth'}); return false;">
                        <i data-lucide="layout-grid" style="width:18px;height:18px"></i>
                        <span data-i18n="hero.explore_btn">Explore Services</span>
                    </a>
                </div>
            </div>
            <div class="hero-img-wrapper">
                <img src="images/bence-balla-schottner-JV-zjVX_m94-unsplash.jpg" class="hero-img" alt="GramUrja Smart Village" onerror="handleImageError(this, 'hero')">
                <div class="image-placeholder-gradient" style="display:none;">
                    <i data-lucide="home" style="width:48px;height:48px;color:var(--sky)"></i>
                </div>
            </div>
        </section>

        <section class="telemetry-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background: rgba(16, 185, 129, 0.15); color: var(--emerald);">
                    <i data-lucide="activity" style="width:28px; height:28px"></i>
                </div>
                <div>
                    <p style="margin:0 0 0.25rem 0; font-size:0.75rem; color:var(--text-muted);" data-i18n="metrics.power_status">एकूण ऊर्जा ग्रीड स्थिती</p>
                    <div id="public-power-status">
                        <h3 style="margin:0; font-size:1rem; font-weight:700; color:var(--text-muted);">डेटा लोड होत आहे...</h3>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon" style="background: rgba(14, 165, 233, 0.15); color: var(--sky);">
                    <i data-lucide="droplets" style="width:28px; height:28px"></i>
                </div>
                <div>
                    <p style="margin:0 0 0.25rem 0; font-size:0.75rem; color:var(--text-muted);" data-i18n="metrics.water_supply">एकूण जल वाहिनी स्थिती</p>
                    <div id="public-water-status">
                        <h3 style="margin:0; font-size:1rem; font-weight:700; color:var(--text-muted);">डेटा लोड होत आहे...</h3>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon" style="background: rgba(245, 158, 11, 0.15); color: var(--amber);">
                    <i data-lucide="bus" style="width:28px; height:28px"></i>
                </div>
                <div>
                    <p style="margin:0 0 0.25rem 0; font-size:0.75rem; color:var(--text-muted);" data-i18n="metrics.next_bus">पुढील बस वेळ</p>
                    <div id="public-transit-status">
                        <h3 style="margin:0; font-size:1rem; font-weight:700; color:var(--text-muted);">डेटा लोड होत आहे...</h3>
                    </div>
                </div>
            </div>
        </section>

        <!-- Dropdown added back for fallback since the splash screen is gone -->
        <div style="margin-bottom: 1.5rem; display: flex; gap: 1rem; align-items: center;">
            <select id="region-select" class="select-input" style="max-width: 250px;">
                <option value="kolhapur">कोल्हापूर (Kolhapur)</option>
                <option value="sangli">सांगली (Sangli)</option>
                <option value="satara">सातारा (Satara)</option>
                <option value="solapur">सोलापूर (Solapur)</option>
                <option value="pune">पुणे (Pune)</option>
                <option value="ratnagiri">रत्नागिरी (Ratnagiri)</option>
            </select>
            <button id="detect-loc-btn" class="btn btn-ghost">
                <i data-lucide="map-pin" style="width:16px;height:16px"></i>
                <span data-i18n="landing.detect_location">माझे ठिकाण शोधा</span>
            </button>
        </div>

        <h3 style="font-size: 1.1rem; color: #f8fafc; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
            <i data-lucide="map" style="color:var(--sky); width:20px;"></i> प्रभाग निहाय स्थिती (Ward Live Data)
        </h3>
        <div id="dynamic-wards-container" class="dynamic-wards-grid">
            <div style="color:var(--text-muted); font-size:0.875rem;">वॉर्ड डेटा सिंक्रोनाइझ होत आहे...</div>
        </div>

        <h2 id="services-title-anchor" class="services-section-title" style="scroll-margin-top: 2rem;">
            <i data-lucide="layout-grid" style="color:var(--sky)"></i>
            <span data-i18n="nav.services">सार्वजनिक सेवा आणि माहिती</span>
        </h2>

        <section class="services-grid">
            <div class="service-card" onclick="Router.navigate('power')">
                <div class="card-img-wrapper">
                    <img src="images/power.jfif" class="card-image" alt="Power Grid" onerror="handleImageError(this, 'power')">
                    <div class="image-placeholder-gradient" style="display:none;">
                        <i data-lucide="bolt" style="width:32px; height:32px; color:var(--amber)"></i>
                    </div>
                </div>
                <div class="service-header">
                    <i data-lucide="bolt" style="color:var(--amber); width:20px; height:20px"></i>
                    <span class="action-btn" data-i18n="actions.view">पहा <i data-lucide="arrow-up-right"></i></span>
                </div>
                <h3 style="margin:0 0 0.5rem 0;" data-i18n="nav.power">ऊर्जा ग्रीड</h3>
                <p style="margin:0; font-size:0.8125rem; color:var(--text-muted);" data-i18n="desc.power">गावातील वीज पुरवठा लोड शेड्युलिंग आणि थेट ट्रॅकिंग.</p>
            </div>

            <div class="service-card" onclick="Router.navigate('water')">
                <div class="card-img-wrapper">
                    <img src="images/water.jfif" class="card-image" alt="Water Supply" onerror="handleImageError(this, 'water')">
                    <div class="image-placeholder-gradient" style="display:none;">
                        <i data-lucide="droplet" style="width:32px; height:32px; color:var(--sky)"></i>
                    </div>
                </div>
                <div class="service-header">
                    <i data-lucide="droplet" style="color:var(--sky); width:20px; height:20px"></i>
                    <span class="action-btn" data-i18n="actions.view">पहा <i data-lucide="arrow-up-right"></i></span>
                </div>
                <h3 style="margin:0 0 0.5rem 0;" data-i18n="nav.water">जल वाहिनी</h3>
                <p style="margin:0; font-size:0.8125rem; color:var(--text-muted);" data-i18n="desc.water">पिण्याच्या पाण्याचे वितरण वेळापत्रक आणि साठा पातळी व्यवस्थापन.</p>
            </div>

            <div class="service-card" onclick="Router.navigate('agriculture')">
                <div class="card-img-wrapper">
                    <img src="images/ffarm.jfif" class="card-image" alt="Agriculture" onerror="handleImageError(this, 'agriculture')">
                    <div class="image-placeholder-gradient" style="display:none;">
                        <i data-lucide="sprout" style="width:32px; height:32px; color:var(--emerald)"></i>
                    </div>
                </div>
                <div class="service-header">
                    <i data-lucide="sprout" style="color:var(--emerald); width:20px; height:20px"></i>
                    <span class="action-btn" data-i18n="actions.view">पहा <i data-lucide="arrow-up-right"></i></span>
                </div>
                <h3 style="margin:0 0 0.5rem 0;" data-i18n="nav.agriculture">कृषी उन्नती (e-Choupal)</h3>
                <p style="margin:0; font-size:0.8125rem; color:var(--text-muted);" data-i18n="desc.agriculture">बाजारभाव, पीक सल्लागार आणि स्थानिक व्यापार मंच.</p>
            </div>

            <div class="service-card" onclick="Router.navigate('weather')">
                <div class="card-img-wrapper">
                    <img src="images/weather.jpg" class="card-image" alt="Weather" onerror="handleImageError(this, 'weather')">
                    <div class="image-placeholder-gradient" style="display:none;">
                        <i data-lucide="cloud-sun" style="width:32px; height:32px; color:#38bdf8"></i>
                    </div>
                </div>
                <div class="service-header">
                    <i data-lucide="cloud-sun" style="color:#38bdf8; width:20px; height:20px"></i>
                    <span class="action-btn" data-i18n="actions.view">पहा <i data-lucide="arrow-up-right"></i></span>
                </div>
                <h3 style="margin:0 0 0.5rem 0;" data-i18n="nav.weather">हवामान अंदाज</h3>
                <p style="margin:0; font-size:0.8125rem; color:var(--text-muted);" data-i18n="desc.weather">शेतकऱ्यांसाठी अचूक स्थानिक हवामान आणि धोक्याचे इशारे.</p>
            </div>

            <div class="service-card" onclick="Router.navigate('bus-tracker')">
                <div class="card-img-wrapper">
                    <img src="images/bus.png" class="card-image" alt="ST Bus Tracker" onerror="handleImageError(this, 'bus')">
                    <div class="image-placeholder-gradient" style="display:none;">
                        <i data-lucide="bus" style="width:32px; height:32px; color:#ec4899"></i>
                    </div>
                </div>
                <div class="service-header">
                    <i data-lucide="bus" style="color:#ec4899; width:20px; height:20px"></i>
                    <span class="action-btn" data-i18n="actions.view">पहा <i data-lucide="arrow-up-right"></i></span>
                </div>
                <h3 style="margin:0 0 0.5rem 0;" data-i18n="nav.bus_tracker">एस.टी. बस ट्रॅकर</h3>
                <p style="margin:0; font-size:0.8125rem; color:var(--text-muted);" data-i18n="desc.bus">कोल्हापूर आणि स्थानिक मार्गांवरील बसेसचे थेट लोकेशन ट्रॅकिंग.</p>
            </div>

            <div class="service-card" onclick="Router.navigate('sanitation')">
                <div class="card-img-wrapper">
                    <img src="images/wash-health-care-rev.png" class="card-image" alt="Sanitation" onerror="handleImageError(this, 'sanitation')">
                    <div class="image-placeholder-gradient" style="display:none;">
                        <i data-lucide="trash-2" style="width:32px; height:32px; color:#a855f7"></i>
                    </div>
                </div>
                <div class="service-header">
                    <i data-lucide="trash-2" style="color:#a855f7; width:20px; height:20px"></i>
                    <span class="action-btn" data-i18n="actions.view">पहा <i data-lucide="arrow-up-right"></i></span>
                </div>
                <h3 style="margin:0 0 0.5rem 0;" data-i18n="nav.sanitation">स्वच्छ ग्राम (Sanitation)</h3>
                <p style="margin:0; font-size:0.8125rem; color:var(--text-muted);" data-i18n="desc.sanitation">कचरा व्यवस्थापन, गटारींची स्वच्छता आणि सार्वजनिक आरोग्य.</p>
            </div>

            <div class="service-card" onclick="Router.navigate('grievance')">
                <div class="card-img-wrapper">
                    <img src="images/complain.jfif" class="card-image" alt="Grievance" onerror="handleImageError(this, 'grievance')">
                    <div class="image-placeholder-gradient" style="display:none;">
                        <i data-lucide="scale" style="width:32px; height:32px; color:#f43f5e"></i>
                    </div>
                </div>
                <div class="service-header">
                    <i data-lucide="scale" style="color:#f43f5e; width:20px; height:20px"></i>
                    <span class="action-btn" data-i18n="actions.view">पहा <i data-lucide="arrow-up-right"></i></span>
                </div>
                <h3 style="margin:0 0 0.5rem 0;" data-i18n="nav.grievance">ई-चौपाल (तक्रार केंद्र)</h3>
                <p style="margin:0; font-size:0.8125rem; color:var(--text-muted);" data-i18n="desc.grievance">थेट ग्रामपंचायत किंवा सरपंचांकडे ऑनलाईन तक्रार नोंदवा.</p>
            </div>

            <div class="service-card" onclick="Router.navigate('news')">
                <div class="card-img-wrapper">
                    <img src="images/news.jfif" class="card-image" alt="News" onerror="handleImageError(this, 'news')">
                    <div class="image-placeholder-gradient" style="display:none;">
                        <i data-lucide="newspaper" style="width:32px; height:32px; color:#6366f1"></i>
                    </div>
                </div>
                <div class="service-header">
                    <i data-lucide="newspaper" style="color:#6366f1; width:20px; height:20px"></i>
                    <span class="action-btn" data-i18n="actions.view">पहा <i data-lucide="arrow-up-right"></i></span>
                </div>
                <h3 style="margin:0 0 0.5rem 0;" data-i18n="nav.news">बातमीपत्र (सूचना)</h3>
                <p style="margin:0; font-size:0.8125rem; color:var(--text-muted);" data-i18n="desc.news">ग्रामपंचायत सूचना, शासकीय योजना आणि बातम्या.</p>
            </div>
        </section>

        <h2 class="services-section-title" style="margin-top: 3.5rem;">
            <i data-lucide="sparkles" style="color:var(--sky)"></i>
            <span data-i18n="nav.ai_tools">कृत्रिम बुद्धिमत्ता (AI) साधने</span>
        </h2>

        <section class="services-grid" style="grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); margin-bottom: 2rem;">
            <div class="service-card" onclick="window.open('https://agent.jotform.com/019e4d7db8dc7808831f6bba09342b53eaf5', '_blank')" style="border-color: rgba(16, 185, 129, 0.25);">
                <div class="card-img-wrapper">
                    <img src="images/ffarm.jfif" class="card-image" alt="AI Crop Diagnosis" onerror="handleImageError(this, 'crop_diagnosis')">
                    <div class="image-placeholder-gradient" style="display:none;">
                        <i data-lucide="scan-search" style="width:32px; height:32px; color:var(--emerald)"></i>
                    </div>
                </div>
                <div class="service-header">
                    <div style="padding: 0.35rem; background: rgba(16, 185, 129, 0.15); border-radius: 0.5rem; display: flex;">
                        <i data-lucide="scan-search" style="color:var(--emerald); width:20px; height:20px"></i>
                    </div>
                    <span class="action-btn" style="color: var(--emerald); border-color: rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.05);">
                        एजंत उघडा <i data-lucide="external-link" style="width:14px; height:14px;"></i>
                    </span>
                </div>
                <h3 style="margin:0 0 0.5rem 0;" data-i18n="nav.crop_diagnosis">एआय पीक निदान (Crop Diagnosis)</h3>
                <p style="margin:0; font-size:0.8125rem; color:var(--text-muted);" data-i18n="desc.crop_diagnosis">पिकाच्या रोगाचे फोटो काढा. आमचे प्रगत एआय एजंट (AI Agent) रोगाचे त्वरित विश्लेषण करून योग्य उपाय सुचवेल.</p>
            </div>

            <div class="service-card" onclick="window.open('https://www.jotform.com/agent/019e5a478e717795ac7b3a32001fb56cbcbc', '_blank')" style="border-color: rgba(14, 165, 233, 0.25);">
                <div class="card-img-wrapper">
                    <img src="images/ffarm.jfif" class="card-image" alt="AI Market Chat" onerror="handleImageError(this, 'market_chat')">
                    <div class="image-placeholder-gradient" style="display:none;">
                        <i data-lucide="message-square-text" style="width:32px; height:32px; color:var(--sky)"></i>
                    </div>
                </div>
                <div class="service-header">
                    <div style="padding: 0.35rem; background: rgba(14, 165, 233, 0.15); border-radius: 0.5rem; display: flex;">
                        <i data-lucide="message-square-text" style="color:var(--sky); width:20px; height:20px"></i>
                    </div>
                    <span class="action-btn">चॅट सुरू करा <i data-lucide="message-square" style="width:14px; height:14px;"></i></span>
                </div>
                <h3 style="margin:0 0 0.5rem 0;" data-i18n="nav.market_chat">बाजारभाव एआय चॅट (Market Chat)</h3>
                <p style="margin:0; font-size:0.8125rem; color:var(--text-muted);" data-i18n="desc.market_chat">कोल्हापूर आणि महाराष्ट्रातील बाजार समित्यांचे थेट दर जाणून घेण्यासाठी आणि भविष्यातील किमतींच्या अंदासाठी संवाद साधा.</p>
            </div>
        </section>

        <!-- Clean landing footer with link to full About Us page -->
        <footer style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; font-size: 0.8rem; color: var(--text-muted);">
            <p style="margin-bottom: 0.5rem;" data-i18n="common.footer">Secure & Digital Village Management System</p>
            <p>
                <a href="#/about" style="color: var(--sky); text-decoration: none; font-weight: 600;" data-i18n="nav.about">आमच्याबद्दल (About Us)</a>
            </p>
        </footer>
    </div>`;
  },

  initLanding() {
    const regionSelect = document.getElementById('region-select');
    if (regionSelect) {
      const savedRegion = localStorage.getItem('gramurja_region');
      if (savedRegion) regionSelect.value = savedRegion;
      
      regionSelect.addEventListener('change', (e) => {
        localStorage.setItem('gramurja_region', e.target.value);
        if (typeof Toast !== 'undefined') Toast.show('प्रदेश अपडेट झाला', 'success');
      });
    }

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
          if (regionSelect) {
             localStorage.setItem('gramurja_region', regionSelect.value);
          }
        });
      }
    });

    function renderLiveVillageData(data) {
        const powerUI = document.getElementById('public-power-status');
        if (powerUI && data.power) {
            powerUI.innerHTML = data.power.grid_status === 'ON' 
                ? `<h3 style="margin:0; font-size:1.25rem; font-weight:700; color: #f8fafc;">सुरू आहे <span style="font-size:0.75rem; color:var(--emerald); background: rgba(16,185,129,0.15); padding: 2px 6px; border-radius: 10px;">(ON)</span></h3><p style="margin:0; font-size:0.7rem; color:var(--text-muted); margin-top:0.25rem;">${data.power.shutdown_reason}</p>`
                : `<h3 style="margin:0; font-size:1.25rem; font-weight:700; color: #f43f5e;">लोड शेडिंग <span style="font-size:0.75rem; color:#f43f5e; background: rgba(244,63,94,0.15); padding: 2px 6px; border-radius: 10px;">(OFF)</span></h3><p style="margin:0; font-size:0.7rem; color:var(--text-muted); margin-top:0.25rem;">कारण: ${data.power.shutdown_reason}</p>`;
        }

        const waterUI = document.getElementById('public-water-status');
        if (waterUI && data.water) {
            waterUI.innerHTML = data.water.valve_status === 'ON'
                ? `<h3 style="margin:0; font-size:1.25rem; font-weight:700; color: #f8fafc;">पाणी सुरू <span style="font-size:0.75rem; color:var(--sky); background: rgba(14,165,233,0.15); padding: 2px 6px; border-radius: 10px;">(ON)</span></h3><p style="margin:0; font-size:0.7rem; color:var(--text-muted); margin-top:0.25rem;">${data.water.supply_time}</p>`
                : `<h3 style="margin:0; font-size:1.25rem; font-weight:700; color: #94a3b8;">पाणी बंद <span style="font-size:0.75rem; color:var(--text-muted); background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 10px;">(OFF)</span></h3><p style="margin:0; font-size:0.7rem; color:var(--text-muted); margin-top:0.25rem;">वेळापत्रक: ${data.water.supply_time}</p>`;
        }

        const transitUI = document.getElementById('public-transit-status');
        if (transitUI && data.transit) {
            transitUI.innerHTML = `<h3 style="margin:0; font-size:1.25rem; font-weight:700; color: #f8fafc;">${data.transit.next_bus_time}<span style="font-size:0.65rem; color:var(--amber); display:block; margin-top:0.15rem; font-weight:500;">${data.transit.route_name}</span></h3>`;
        }

        const wardsContainer = document.getElementById('dynamic-wards-container');
        if (wardsContainer && data.wards && data.wards.length > 0) {
            let htmlPayload = '';
            data.wards.forEach(ward => {
                const powerColor = ward.power_status === 'ON' ? 'var(--emerald)' : '#f43f5e';
                const waterColor = ward.water_status === 'ON' ? 'var(--sky)' : '#94a3b8';
                htmlPayload += `
                <div class="ward-badge">
                    <h4 style="margin:0 0 0.75rem 0; font-size:0.875rem; color:#f8fafc;">${ward.ward_name}</h4>
                    <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-muted);">
                        <span style="display:flex; align-items:center; gap:0.3rem;">
                            <div style="width:8px; height:8px; border-radius:50%; background:${powerColor}; box-shadow: 0 0 5px ${powerColor};"></div> 
                            वीज: <b>${ward.power_status}</b>
                        </span>
                        <span style="display:flex; align-items:center; gap:0.3rem;">
                            <div style="width:8px; height:8px; border-radius:50%; background:${waterColor}; box-shadow: 0 0 5px ${waterColor};"></div> 
                            पाणी: <b>${ward.water_status}</b>
                        </span>
                    </div>
                </div>
                `;
            });
            wardsContainer.innerHTML = htmlPayload;
        }
    }

    async function loadLiveVillageData() {
        try {
            const response = await fetch('analytics/fetch-live-status.php');
            if (!response.ok) throw new Error("Network response was not ok");
            
            const data = await response.json();
            
            if (data.status === "success") {
                localStorage.setItem('gramurja_live_data', JSON.stringify(data));
                renderLiveVillageData(data);
            } else {
                throw new Error("API returned error status");
            }
        } catch (error) {
            console.error("[GramUrja Dashboard Sync Error]:", error);
            const offlineData = localStorage.getItem('gramurja_live_data');
            if (offlineData) {
                renderLiveVillageData(JSON.parse(offlineData));
            } else {
                const fallbackHTML = `<h3 style="margin:0; font-size:1rem; font-weight:700; color:var(--rose);">डेटा उपलब्ध नाही (Offline)</h3>`;
                
                const powerUI = document.getElementById('public-power-status');
                if (powerUI) powerUI.innerHTML = fallbackHTML;

                const waterUI = document.getElementById('public-water-status');
                if (waterUI) waterUI.innerHTML = fallbackHTML;

                const transitUI = document.getElementById('public-transit-status');
                if (transitUI) transitUI.innerHTML = fallbackHTML;
                
                const wardsContainer = document.getElementById('dynamic-wards-container');
                if (wardsContainer) wardsContainer.innerHTML = '<div style="color:var(--rose); font-size:0.875rem;">ऑफलाइन: वॉर्ड डेटा लोड होऊ शकला नाही.</div>';
            }
        }
    }
    
    loadLiveVillageData();
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
      </div>
    </div>`;
  },

  initLogin() {
    document.getElementById('login-form')?.addEventListener('submit', async e => {
      e.preventDefault();
      const user = document.getElementById('login-user').value;
      const pass = document.getElementById('login-pass').value;

      // Try database authentication first
      try {
        const response = await fetch('pages/login-api.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user, password: pass })
        });
        if (response.ok) {
          const apiResult = await response.json();
          if (apiResult.status === 'success') {
            Toast.show('✓ ' + I18n.t('login.title'), 'success');
            // Redirect to analytics page (relative path from root)
            window.location.href = apiResult.redirect.replace('../', '');
            return;
          }
        }
      } catch (err) {
        console.warn('Real database authentication check failed, using mock auth:', err);
      }

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

  about() {
    return `
    <div class="landing-container">
        <header class="glass-nav">
            <div class="brand-box">
                <div class="brand-icon">
                    <i data-lucide="zap" style="width:24px;height:24px;stroke-width:2.5"></i>
                </div>
                <div>
                    <h1 style="font-size:1.35rem;font-weight:700;line-height:1.2;margin:0;" data-i18n="app_name">ग्रामऊर्जा</h1>
                    <p style="font-size:0.625rem;color:var(--sky);letter-spacing:0.12em;text-transform:uppercase;font-weight:600;margin:0;" data-i18n="app_tagline">आपलं गाव, आपली सेवा</p>
                </div>
            </div>

            <div class="lang-switcher" style="display:flex; gap:0.5rem;">
                <button class="btn btn-ghost lang-btn" data-lang="mr" onclick="I18n.loadLanguage('mr')">मराठी</button>
                <button class="btn btn-ghost lang-btn" data-lang="hi" onclick="I18n.loadLanguage('hi')">हिंदी</button>
                <button class="btn btn-ghost lang-btn" data-lang="en" onclick="I18n.loadLanguage('en')">EN</button>
            </div>

            <div>
                <button class="action-btn" onclick="Router.navigate('landing')" style="background: rgba(255, 255, 255, 0.05); border-color: var(--glass-border); color: var(--text-main); font-weight: 500;">
                    <i data-lucide="arrow-left" style="width:16px;height:16px"></i>
                    <span data-i18n="about.back_landing">मुख्य पृष्ठावर जा</span>
                </button>
            </div>
        </header>

        <!-- About Hero Banner -->
        <div class="about-header-banner">
            <div style="display:flex; justify-content:center; align-items:center; gap:0.75rem; color:var(--sky); font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.12em; margin-bottom:0.75rem;">
                <i data-lucide="info" style="width:16px; height:16px"></i>
                <span data-i18n="nav.about">आमच्याबद्दल</span>
            </div>
            <h2 class="hero-title" style="font-size:2.25rem; margin-bottom:0.5rem;" data-i18n="about.title">About GramUrja</h2>
            <p class="hero-desc" style="max-width:800px; margin:0 auto;" data-i18n="about.description">GramUrja is an integrated digital platform designed to bring all essential government, municipal, and agricultural services directly to our village residents.</p>
        </div>

        <!-- College Section -->
        <section class="card-static" style="padding:2.5rem; border-radius:1.5rem; margin-bottom:2rem;">
            <div class="college-section">
                <div>
                    <h3 class="about-title" data-i18n="about.college_title">D.Y. Patil College of Engineering & Technology, Kolhapur</h3>
                    <div class="college-badges">
                        <span class="college-badge-item">Autonomous</span>
                        <span class="college-badge-item">NAAC Grade 'A'</span>
                        <span class="college-badge-item">NBA Accredited</span>
                    </div>
                    <p class="about-text" data-i18n="about.college_desc">
                        D.Y. Patil College of Engineering & Technology, Kolhapur is an Autonomous Engineering Institute affiliated with Shivaji University, Kolhapur. NAAC Accredited with 'A' Grade and NBA Accredited departments, it stands as a pioneer in engineering excellence and innovation.
                    </p>
                    <div style="margin-top:1rem; font-size:0.8rem; color:var(--text-muted); display:flex; align-items:center; gap:0.5rem;">
                        <i data-lucide="map-pin" style="width:14px; height:14px; color:var(--sky)"></i>
                        Kasaba Bawada, Kolhapur – 416006, Maharashtra
                    </div>
                </div>
                <div class="about-img-wrapper" style="border-radius:1rem;">
                    <img src="images/sven-V7WkmXntA8M-unsplash.jpg" class="about-img" alt="DYPCET Campus" onerror="handleImageError(this, 'college')">
                    <div class="image-placeholder-gradient" style="display:none;">
                        <i data-lucide="image" style="width:48px;height:48px;color:var(--sky)"></i>
                    </div>
                </div>
            </div>
        </section>

        <!-- Mentor Section -->
        <section class="mentor-section">
            <h3 style="font-size:1.25rem; font-weight:700; text-align:center; color:var(--sky);" data-i18n="about.mentor_title">Guided By (Class Teacher)</h3>
            <div class="mentor-container">
                <div class="mentor-card">
                    <div class="mentor-icon-box">
                        <i data-lucide="award" style="width:32px; height:32px"></i>
                    </div>
                    <div style="text-align:left;">
                        <h4 style="font-size:1.15rem; font-weight:700; margin:0 0 0.25rem 0;" data-i18n="about.mentor_name">Prof. P. S. Chavhan</h4>
                        <p style="font-size:0.8rem; color:var(--amber); font-weight:600; margin:0;" data-i18n="about.mentor_role">Class Teacher (First Year CSE Department)</p>
                        <p style="font-size:0.75rem; color:var(--text-secondary); margin:0.5rem 0 0 0;" data-i18n="about.student_department">First Year CSE (AI & ML)</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Developer Students Section -->
        <section class="students-section">
            <div style="text-align:center; max-width:800px; margin:0 auto 1.5rem;">
                <h3 style="font-size:1.35rem; font-weight:700; color:var(--sky);" data-i18n="about.developers_title">Capstone Project Developers — Group 13</h3>
                <p style="font-size:0.825rem; color:var(--text-secondary); margin-top:0.5rem;" data-i18n="about.project_desc">
                    GramUrja was designed and developed as a Capstone Project by the first-year Computer Science & Engineering (Artificial Intelligence and Machine Learning) students at DYPCET Kolhapur.
                </p>
            </div>
            
            <div class="students-grid">
                <!-- Atharv Hogade -->
                <div class="student-card">
                    <div class="student-header">
                        <div class="student-avatar">AH</div>
                        <div>
                            <h4 style="font-size:0.95rem; font-weight:700; margin:0;">Atharv Hogade</h4>
                            <p style="font-size:0.7rem; color:var(--text-secondary); margin:2px 0 0 0;" data-i18n="about.student_department">First Year CSE (AI & ML)</p>
                        </div>
                    </div>
                    <div class="student-details">
                        <span>CAPSTONE GROUP 13</span>
                        <span class="student-roll"><span data-i18n="about.roll_no">Roll No:</span> 26</span>
                    </div>
                </div>

                <!-- Vitthal Patil -->
                <div class="student-card">
                    <div class="student-header">
                        <div class="student-avatar">VP</div>
                        <div>
                            <h4 style="font-size:0.95rem; font-weight:700; margin:0;">Vitthal Patil</h4>
                            <p style="font-size:0.7rem; color:var(--text-secondary); margin:2px 0 0 0;" data-i18n="about.student_department">First Year CSE (AI & ML)</p>
                        </div>
                    </div>
                    <div class="student-details">
                        <span>CAPSTONE GROUP 13</span>
                        <span class="student-roll"><span data-i18n="about.roll_no">Roll No:</span> 132</span>
                    </div>
                </div>

                <!-- Shubham Lohar -->
                <div class="student-card">
                    <div class="student-header">
                        <div class="student-avatar">SL</div>
                        <div>
                            <h4 style="font-size:0.95rem; font-weight:700; margin:0;">Shubham Lohar</h4>
                            <p style="font-size:0.7rem; color:var(--text-secondary); margin:2px 0 0 0;" data-i18n="about.student_department">First Year CSE (AI & ML)</p>
                        </div>
                    </div>
                    <div class="student-details">
                        <span>CAPSTONE GROUP 13</span>
                        <span class="student-roll"><span data-i18n="about.roll_no">Roll No:</span> 17</span>
                    </div>
                </div>

                <!-- Gopal Piwal -->
                <div class="student-card">
                    <div class="student-header">
                        <div class="student-avatar">GP</div>
                        <div>
                            <h4 style="font-size:0.95rem; font-weight:700; margin:0;">Gopal Piwal</h4>
                            <p style="font-size:0.7rem; color:var(--text-secondary); margin:2px 0 0 0;" data-i18n="about.student_department">First Year CSE (AI & ML)</p>
                        </div>
                    </div>
                    <div class="student-details">
                        <span>CAPSTONE GROUP 13</span>
                        <span class="student-roll"><span data-i18n="about.roll_no">Roll No:</span> 99</span>
                    </div>
                </div>

                <!-- Yogesh Mali -->
                <div class="student-card">
                    <div class="student-header">
                        <div class="student-avatar">YM</div>
                        <div>
                            <h4 style="font-size:0.95rem; font-weight:700; margin:0;">Yogesh Mali</h4>
                            <p style="font-size:0.7rem; color:var(--text-secondary); margin:2px 0 0 0;" data-i18n="about.student_department">First Year CSE (AI & ML)</p>
                        </div>
                    </div>
                    <div class="student-details">
                        <span>CAPSTONE GROUP 13</span>
                        <span class="student-roll"><span data-i18n="about.roll_no">Roll No:</span> 92</span>
                    </div>
                </div>

                <!-- Sharad Tasagaon -->
                <div class="student-card">
                    <div class="student-header">
                        <div class="student-avatar">ST</div>
                        <div>
                            <h4 style="font-size:0.95rem; font-weight:700; margin:0;">Sharad Tasagaon</h4>
                            <p style="font-size:0.7rem; color:var(--text-secondary); margin:2px 0 0 0;" data-i18n="about.student_department">First Year CSE (AI & ML)</p>
                        </div>
                    </div>
                    <div class="student-details">
                        <span>CAPSTONE GROUP 13</span>
                        <span class="student-roll"><span data-i18n="about.roll_no">Roll No:</span> 118</span>
                    </div>
                </div>

                <!-- Sumit Salokhe -->
                <div class="student-card">
                    <div class="student-header">
                        <div class="student-avatar">SS</div>
                        <div>
                            <h4 style="font-size:0.95rem; font-weight:700; margin:0;">Sumit Salokhe</h4>
                            <p style="font-size:0.7rem; color:var(--text-secondary); margin:2px 0 0 0;" data-i18n="about.student_department">First Year CSE (AI & ML)</p>
                        </div>
                    </div>
                    <div class="student-details">
                        <span>CAPSTONE GROUP 13</span>
                        <span class="student-roll"><span data-i18n="about.roll_no">Roll No:</span> 91</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Administration Team Section -->
        <section class="about-section" style="margin-top:2rem;">
            <div style="text-align:center; margin-bottom:1.5rem;">
                <h3 style="font-size:1.25rem; font-weight:700; color:var(--sky);" data-i18n="about.team_title">Village Leadership & Coordination</h3>
            </div>
            
            <div class="team-grid">
                <div class="team-card">
                    <div class="team-avatar-wrapper">
                        <i data-lucide="user" style="width:24px; height:24px"></i>
                    </div>
                    <div>
                        <h4 class="team-name" data-i18n="about.sarpanch_name">person name</h4>
                        <div class="team-role" data-i18n="about.sarpanch_role">Sarpanch (Village Head)</div>
                        <a href="tel:+919876543210" class="team-contact">
                            <i data-lucide="phone" style="width:12px; height:12px"></i> <span data-i18n="about.call_btn">Call Direct</span>
                        </a>
                    </div>
                </div>
                
                <div class="team-card">
                    <div class="team-avatar-wrapper">
                        <i data-lucide="shield-check" style="width:24px; height:24px"></i>
                    </div>
                    <div>
                        <h4 class="team-name" data-i18n="about.gramsevak_name">person name</h4>
                        <div class="team-role" data-i18n="about.gramsevak_role">Gram Sevak</div>
                        <a href="tel:+919876543211" class="team-contact">
                            <i data-lucide="phone" style="width:12px; height:12px"></i> <span data-i18n="about.call_btn">Call Direct</span>
                        </a>
                    </div>
                </div>
                
                <div class="team-card">
                    <div class="team-avatar-wrapper">
                        <i data-lucide="cpu" style="width:24px; height:24px"></i>
                    </div>
                    <div>
                        <h4 class="team-name" data-i18n="about.tech_name">Capstone Group 13</h4>
                        <div class="team-role" data-i18n="about.tech_role">Project Developers (CSE AI & ML)</div>
                        <a href="mailto:support@gramurja.gov.in" class="team-contact">
                            <i data-lucide="mail" style="width:12px; height:12px"></i> support@gramurja.gov.in
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>`;
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
