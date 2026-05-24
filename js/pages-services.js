/** GramUrja — Dashboard + Service Pages (Power, Water, Agriculture) */

Pages.dashboard = function() {
  const tiles = [
    { page:'power', icon:'bolt', title:'ऊर्जा ग्रीड (वीज सेवा)', desc:'सौर ऊर्जेची स्थिती, लोडशेडिंग वेळापत्रक आणि लाईट बिल तपासा.', color:'amber', status:'चालू आहे' },
    { page:'water', icon:'droplet', title:'जल वाहिनी (पाणी पुरवठा)', desc:'पाण्याची शुद्धता, टाकीची पातळी आणि पाणी येण्याची वेळ तपासा.', color:'blue', status:'सुरक्षित' },
    { page:'agriculture', icon:'sprout', title:'कृषी उन्नती (शेती सल्ला)', desc:'सौर पंप बुकिंग, कोल्ड स्टोरेज आणि बाजारातील पिकांचे भाव.', color:'emerald', status:'माहिती उपलब्ध' },
    { page:'sanitation', icon:'trash-2', title:'स्वच्छ ग्राम (स्वच्छता)', desc:'कचरा व्यवस्थापन, गटारींची स्वच्छता आणि सार्वजनिक आरोग्य.', color:'purple', status:'काम सुरू' },
    { page:'grievance', icon:'scale', title:'ई-चौपाल (तक्रार केंद्र)', desc:'थेट ग्रामपंचायत किंवा सरपंचांकडे ऑनलाईन तक्रार नोंदवा.', color:'rose', status:'ऑनलाईन' },
    { page:'news', icon:'newspaper', title:'बातमीपत्र (सूचना)', desc:'ग्रामपंचायत सूचना, शासकीय योजना आणि बातम्या.', color:'indigo', status:'अपडेटेड' },
  ];
  const colors = { amber:'245,158,11', blue:'59,130,246', emerald:'16,185,129', purple:'168,85,247', rose:'244,63,94', indigo:'99,102,241' };
  let html = `
  <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1.5rem">
    <div>
      <h2 style="font-size:1.5rem;font-weight:700" data-i18n="dashboard.title">ग्राम सेवा केंद्र</h2>
      <p style="font-size:0.75rem;color:var(--text-secondary)" data-i18n="dashboard.subtitle">खालीलपैकी कोणत्याही सेवेवर क्लिक करा.</p>
    </div>
    <div style="display:flex;gap:0.5rem">
      <button class="btn btn-ghost" style="padding:0.625rem" title="Notifications"><i data-lucide="bell" style="width:18px;height:18px"></i></button>
      <button class="btn btn-ghost" style="padding:0.625rem 1rem;color:var(--amber)" title="SOS"><i data-lucide="alert-triangle" style="width:18px;height:18px"></i> <span style="font-size:0.75rem" data-i18n="dashboard.emergency">SOS</span></button>
    </div>
  </div>
  <div class="grid-3">`;
  tiles.forEach(t => {
    const c = colors[t.color];
    html += `
    <div class="card" style="cursor:pointer;display:flex;flex-direction:column;justify-content:space-between" onclick="Router.navigate('${t.page}')">
      <div>
        <div style="width:48px;height:48px;border-radius:1rem;background:rgba(${c},0.1);border:1px solid rgba(${c},0.2);display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;color:rgba(${c},1)">
          <i data-lucide="${t.icon}" style="width:24px;height:24px"></i>
        </div>
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:0.5rem">${t.title}</h3>
        <p style="font-size:0.8125rem;color:var(--text-secondary);line-height:1.6">${t.desc}</p>
      </div>
      <div style="margin-top:1.25rem;padding-top:0.75rem;border-top:1px solid rgba(51,65,85,0.3);display:flex;justify-content:space-between;align-items:center;font-size:0.75rem">
        <span class="badge badge-success">${t.status}</span>
        <span style="color:rgba(${c},1);display:flex;align-items:center;gap:4px">पहा <i data-lucide="chevron-right" style="width:12px;height:12px"></i></span>
      </div>
    </div>`;
  });
  html += `
    <div class="card" style="cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border-style:dashed" onclick="window.open('https://agent.jotform.com/019e4d7db8dc7808831f6bba09342b53eaf5', '_blank')">
      <div style="width:48px;height:48px;border-radius:50%;background:rgba(14,165,233,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:0.75rem;color:var(--sky)">
        <i data-lucide="scan-search" style="width:24px;height:24px"></i>
      </div>
      <h3 style="font-size:0.875rem;font-weight:700">🌿 पीक रोग निदान (AI)</h3>
      <p style="font-size:0.6875rem;color:var(--text-muted);margin-top:0.25rem">फोटो अपलोड करा, AI निदान करेल</p>
    </div>
    <div class="card" style="cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border-style:dashed" onclick="window.open('https://www.jotform.com/agent/019e5a478e717795ac7b3a32001fb56cbcbc', '_blank')">
      <div style="width:48px;height:48px;border-radius:50%;background:rgba(16,185,129,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:0.75rem;color:var(--emerald)">
        <i data-lucide="message-square-text" style="width:24px;height:24px"></i>
      </div>
      <h3 style="font-size:0.875rem;font-weight:700">💰 बाजारभाव AI चॅट</h3>
      <p style="font-size:0.6875rem;color:var(--text-muted);margin-top:0.25rem">पिकांचे भाव AI शी विचारा</p>
    </div>
    <div class="card" style="cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border-style:dashed" onclick="Router.navigate('bus-tracker')">
      <div style="width:48px;height:48px;border-radius:50%;background:rgba(168,85,247,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:0.75rem;color:var(--purple)">
        <i data-lucide="bus" style="width:24px;height:24px"></i>
      </div>
      <h3 style="font-size:0.875rem;font-weight:700">🚌 बस ट्रॅकर (Live)</h3>
      <p style="font-size:0.6875rem;color:var(--text-muted);margin-top:0.25rem">ग्रामीण बसचे थेट ठिकाण पहा</p>
    </div>
  </div>`;
  return html;
};

Pages.power = function() {
  return `
  <div style="margin-bottom:1.5rem">
    <div style="display:flex;align-items:center;gap:0.75rem;color:var(--amber);font-size:0.6875rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.25rem">
      <i data-lucide="bolt" style="width:14px;height:14px"></i> लाईव्ह ट्रॅकिंग आणि बिलिंग
    </div>
    <h1 style="font-size:1.5rem;font-weight:700">ऊर्जा ग्रीड व्यवस्थापन (Power Hub)</h1>
  </div>
  <div class="grid-2" style="margin-bottom:1.5rem">
    <div class="card-static" style="border-top:3px solid var(--amber);padding:1.5rem;border-radius:1.5rem">
      <p style="font-size:0.75rem;color:var(--text-secondary)">एकूण सौर ऊर्जा निर्मिती</p>
      <h3 style="font-size:1.875rem;font-weight:700;margin-top:0.25rem">४८.५ kW</h3>
      <p style="font-size:0.75rem;color:var(--emerald);margin-top:0.5rem">↑ कालपेक्षा १२% जास्त</p>
    </div>
    <div class="card-static" style="border-top:3px solid var(--sky);padding:1.5rem;border-radius:1.5rem">
      <p style="font-size:0.75rem;color:var(--text-secondary)">गावातील सद्य वीज वापर</p>
      <h3 style="font-size:1.875rem;font-weight:700;margin-top:0.25rem">३२.१ kW</h3>
      <p style="font-size:0.75rem;color:var(--text-muted);margin-top:0.5rem">शिल्लक बॅटरी बँक मध्ये साठवली जात आहे</p>
    </div>
  </div>
  <div class="card-static" style="padding:1.5rem;border-radius:1.5rem;margin-bottom:1.5rem">
    <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem"><i data-lucide="calendar" style="width:18px;height:18px;color:var(--amber)"></i> वीज कपात वेळापत्रक</h2>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>गावातील भाग</th><th>वार</th><th>वेळ</th><th>स्थिती</th></tr></thead>
      <tbody>
        <tr><td style="color:white;font-weight:500">पूर्व गल्ली</td><td>सोमवार</td><td style="font-family:monospace">01:00 - 03:00 PM</td><td><span class="badge badge-warning">नियोजित</span></td></tr>
        <tr><td style="color:white;font-weight:500">पश्चिम गल्ली</td><td>बुधवार</td><td style="font-family:monospace">10:00 AM - 12:00 PM</td><td><span class="badge" style="background:rgba(51,65,85,0.4);color:var(--text-secondary);border-color:transparent">कपात नाही</span></td></tr>
        <tr><td style="color:white;font-weight:500">शेती पंप फीडर</td><td>दररोज</td><td style="font-family:monospace">11:00 PM - 06:00 AM</td><td><span class="badge badge-success">रात्रीचा पुरवठा</span></td></tr>
      </tbody>
    </table></div>
  </div>
  <div class="grid-2">
    <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
      <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem"><i data-lucide="credit-card" style="width:18px;height:18px;color:var(--sky)"></i> लाईट बिल तपासा</h2>
      <input class="input" type="text" placeholder="ग्राहक नंबर टाका" style="margin-bottom:0.75rem;font-family:monospace">
      <button class="btn btn-primary btn-block"><i data-lucide="search" style="width:16px;height:16px"></i> बिल शोधा</button>
    </div>
    <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
      <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem"><i data-lucide="alert-circle" style="width:18px;height:18px;color:var(--rose)"></i> वीज तक्रार</h2>
      <select class="select-input" style="margin-bottom:0.75rem"><option>तक्रारीचा प्रकार निवडा</option><option>वीज बंद</option><option>मीटर खराब</option><option>वायर ढिली</option></select>
      <textarea class="textarea-input" rows="2" placeholder="सविस्तर माहिती..." style="margin-bottom:0.75rem;resize:none"></textarea>
      <button class="btn btn-block" style="background:rgba(244,63,94,0.1);color:var(--rose);border:1px solid rgba(244,63,94,0.3)">तक्रार सबमिट करा</button>
    </div>
  </div>`;
};

Pages.water = function() {
  return `
  <div style="margin-bottom:1.5rem">
    <div style="display:flex;align-items:center;gap:0.75rem;color:var(--blue);font-size:0.6875rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.25rem">
      <i data-lucide="droplet" style="width:14px;height:14px"></i> पाणी साठा आणि वितरण लॉग
    </div>
    <h1 style="font-size:1.5rem;font-weight:700">जल वाहिनी व्यवस्थापन (Water Hub)</h1>
  </div>
  <div class="grid-2" style="margin-bottom:1.5rem">
    <div class="card-static" style="border-top:3px solid var(--blue);padding:1.5rem;border-radius:1.5rem">
      <p style="font-size:0.75rem;color:var(--text-secondary)">मुख्य टाकीची पातळी</p>
      <h3 style="font-size:1.875rem;font-weight:700;margin:0.25rem 0 0.75rem">८२% भरली</h3>
      <div class="progress"><div class="progress-bar" style="width:82%;background:var(--blue)"></div></div>
      <p style="font-size:0.75rem;color:var(--text-muted);margin-top:0.5rem">एकूण: ५०,००० लीटर</p>
    </div>
    <div class="card-static" style="border-top:3px solid var(--emerald);padding:1.5rem;border-radius:1.5rem">
      <p style="font-size:0.75rem;color:var(--text-secondary)">पाण्याची शुद्धता (TDS)</p>
      <h3 style="font-size:1.875rem;font-weight:700;color:var(--emerald);margin:0.25rem 0 0.75rem">145 PPM</h3>
      <span class="badge badge-success">✓ पिण्यासाठी सुरक्षित</span>
    </div>
  </div>
  <div class="card-static" style="padding:1.5rem;border-radius:1.5rem;margin-bottom:1.5rem">
    <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem"><i data-lucide="clock" style="width:18px;height:18px;color:var(--blue)"></i> पाणी वेळापत्रक</h2>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>विभाग</th><th>वेळ</th><th>कालावधी</th><th>स्थिती</th></tr></thead>
      <tbody>
        <tr><td style="color:white;font-weight:500">उत्तर व मध्य भाग</td><td style="font-family:monospace">सकाळी ०६:०० - ०७:३०</td><td>१.५ तास</td><td><span class="badge" style="background:rgba(51,65,85,0.4);color:var(--text-secondary);border-color:transparent">पूर्ण</span></td></tr>
        <tr><td style="color:white;font-weight:500">दक्षिण भाग</td><td style="font-family:monospace">सकाळी ०७:४५ - ०९:१५</td><td>१.५ तास</td><td><span class="badge badge-info" style="animation:pulse 2s infinite">पाणी सुरू</span></td></tr>
        <tr><td style="color:white;font-weight:500">नवीन वसाहत</td><td style="font-family:monospace">संध्या. ०५:०० - ०६:३०</td><td>१.५ तास</td><td><span class="badge badge-warning">नियोजित</span></td></tr>
      </tbody>
    </table></div>
  </div>
  <div class="grid-2">
    <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
      <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem"><i data-lucide="receipt" style="width:18px;height:18px;color:var(--blue)"></i> पाणी पट्टी</h2>
      <input class="input" placeholder="घर नंबर (H-104)" style="margin-bottom:0.75rem">
      <button class="btn btn-primary btn-block"><i data-lucide="search" style="width:16px;height:16px"></i> शोधा</button>
    </div>
    <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
      <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem"><i data-lucide="truck" style="width:18px;height:18px;color:var(--amber)"></i> टँकर मागणी</h2>
      <select class="select-input" style="margin-bottom:0.75rem"><option>कारण निवडा</option><option>लग्नकार्य</option><option>विहीर कोरडी</option><option>पाईपलाईन खराब</option></select>
      <input class="input" type="date" style="margin-bottom:0.75rem">
      <button class="btn btn-block btn-ghost">मागणी नोंदवा</button>
    </div>
  </div>`;
};

Pages.agriculture = function() {
  return `
  <div style="margin-bottom:1.5rem">
    <div style="display:flex;align-items:center;gap:0.75rem;color:var(--emerald);font-size:0.6875rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.25rem">
      <i data-lucide="sprout" style="width:14px;height:14px"></i> शेतकरी सक्षमीकरण
    </div>
    <h1 style="font-size:1.5rem;font-weight:700">कृषी उन्नती डिजिटल केंद्र</h1>
  </div>
  <div class="grid-2" style="margin-bottom:1.5rem">
    <div class="card-static" style="border-top:3px solid var(--emerald);padding:1.5rem;border-radius:1.5rem">
      <p style="font-size:0.75rem;color:var(--text-secondary)">कोल्ड स्टोरेज उपलब्ध जागा</p>
      <h3 style="font-size:1.875rem;font-weight:700;margin:0.25rem 0 0.75rem">४५% रिकामी</h3>
      <div class="progress"><div class="progress-bar" style="width:55%;background:var(--emerald)"></div></div>
      <p style="font-size:0.75rem;color:var(--text-muted);margin-top:0.5rem">शिल्लक: २२ MT</p>
    </div>
    <div class="card-static" style="border-top:3px solid var(--amber);padding:1.5rem;border-radius:1.5rem">
      <p style="font-size:0.75rem;color:var(--text-secondary)">आजचा हवामान सल्ला</p>
      <h3 style="font-size:1.125rem;font-weight:700;color:var(--amber);margin:0.25rem 0 0.5rem">हलक्या पावसाची शक्यता</h3>
      <p style="font-size:0.75rem;color:var(--text-secondary)">कीटकनाशकांची फवारणी टाळावी.</p>
    </div>
  </div>
  <div class="card-static" style="padding:1.5rem;border-radius:1.5rem;margin-bottom:1.5rem">
    <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem"><i data-lucide="trending-up" style="width:18px;height:18px;color:var(--emerald)"></i> आजचे बाजार भाव</h2>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>पीक</th><th>किमान</th><th>कमाल</th><th>दिशा</th></tr></thead>
      <tbody>
        <tr><td style="color:white;font-weight:500">🌽 मका</td><td style="font-family:monospace">₹१,८५०/क्विं.</td><td style="font-family:monospace;color:white;font-weight:500">₹२,२००/क्विं.</td><td style="color:var(--emerald)">↑ तेजी (+₹५०)</td></tr>
        <tr><td style="color:white;font-weight:500">🌾 सोयाबीन</td><td style="font-family:monospace">₹३,९००/क्विं.</td><td style="font-family:monospace;color:white;font-weight:500">₹४,४५०/क्विं.</td><td style="color:var(--rose)">↓ मंदी (-₹२०)</td></tr>
        <tr><td style="color:white;font-weight:500">🧅 कांदा</td><td style="font-family:monospace">₹२,१००/क्विं.</td><td style="font-family:monospace;color:white;font-weight:500">₹२,८००/क्विं.</td><td style="color:var(--text-muted)">— स्थिर</td></tr>
      </tbody>
    </table></div>
  </div>
  <div class="grid-2">
    <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
      <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem"><i data-lucide="sun" style="width:18px;height:18px;color:var(--amber)"></i> सौर पंप बुकिंग</h2>
      <select class="select-input" style="margin-bottom:0.75rem"><option>मुख्य विहीर पंप १ (५ HP)</option><option>ओढा पंप २ (७.५ HP)</option><option>चेक डॅम पंप ३</option></select>
      <input class="input" type="datetime-local" style="margin-bottom:0.75rem">
      <button class="btn btn-primary btn-block" style="background:var(--emerald)">पंप स्लॉट बुक करा</button>
    </div>
    <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
      <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem"><i data-lucide="box" style="width:18px;height:18px;color:var(--cyan)"></i> कोल्ड स्टोरेज आरक्षण</h2>
      <input class="input" placeholder="पिकाचे नाव (उदा. टोमॅटो)" style="margin-bottom:0.75rem">
      <input class="input" type="number" placeholder="वजन (क्विंटल)" style="margin-bottom:0.75rem">
      <button class="btn btn-block btn-ghost" style="border-color:rgba(16,185,129,0.3);color:var(--emerald)">जागा आरक्षित करा</button>
    </div>
  </div>`;
};
