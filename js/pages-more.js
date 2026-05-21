/** GramUrja — Remaining Service Pages (Sanitation, Grievance, News, Weather) */

Pages.sanitation = function() {
  return `
  <div style="margin-bottom:1.5rem">
    <div style="display:flex;align-items:center;gap:0.75rem;color:var(--purple);font-size:0.6875rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.25rem"><i data-lucide="sparkles" style="width:14px;height:14px"></i> सुंदर गाव, सुदृढ नागरिक</div>
    <h1 style="font-size:1.5rem;font-weight:700">स्वच्छ ग्राम व्यवस्थापन</h1>
  </div>
  <div class="grid-2" style="margin-bottom:1.5rem">
    <div class="card-static" style="border-top:3px solid var(--purple);padding:1.5rem;border-radius:1.5rem">
      <p style="font-size:0.75rem;color:var(--text-secondary)">कचरा गोळा स्थिती</p>
      <h3 style="font-size:1.5rem;font-weight:700;margin:0.25rem 0 0.75rem">७५% क्षेत्र पूर्ण</h3>
      <div class="progress"><div class="progress-bar" style="width:75%;background:var(--purple)"></div></div>
    </div>
    <div class="card-static" style="border-top:3px solid var(--fuchsia,#d946ef);padding:1.5rem;border-radius:1.5rem">
      <p style="font-size:0.75rem;color:var(--text-secondary)">डास फवारणी</p>
      <h3 style="font-size:1.125rem;font-weight:700;color:#d946ef;margin:0.25rem 0 0.5rem">पुढील मोहीम: परवा</h3>
      <p style="font-size:0.75rem;color:var(--text-secondary)">२४ मे रोजी संपूर्ण गावात धूर फवारणी.</p>
    </div>
  </div>
  <div class="card-static" style="padding:1.5rem;border-radius:1.5rem;margin-bottom:1.5rem">
    <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem"><i data-lucide="clipboard-list" style="width:18px;height:18px;color:var(--purple)"></i> सफाई वेळापत्रक</h2>
    <div class="table-wrap"><table class="data-table"><thead><tr><th>परिसर</th><th>काम</th><th>शेवटची सफाई</th><th>स्थिती</th></tr></thead><tbody>
      <tr><td style="color:white;font-weight:500">मुख्य बाजारपेठ</td><td>झाडलोट</td><td>आज सकाळी ७:००</td><td><span class="badge badge-success">स्वच्छ ✓</span></td></tr>
      <tr><td style="color:white;font-weight:500">कुंभार गल्ली गटार</td><td>गटार उपसणे</td><td>काल संध्याकाळी</td><td><span class="badge badge-success">पूर्ण</span></td></tr>
      <tr><td style="color:white;font-weight:500">दवाखाना परिसर</td><td>कचरा कुंडी</td><td>२ दिवसांपूर्वी</td><td><span class="badge badge-warning">आज होणार</span></td></tr>
    </tbody></table></div>
  </div>
  <div class="grid-2">
    <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
      <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem"><i data-lucide="trash-2" style="width:18px;height:18px;color:var(--purple)"></i> साफसफाई विनंती</h2>
      <select class="select-input" style="margin-bottom:0.75rem"><option>गटार तुंबली</option><option>कचरा कुंडी भरली</option><option>शौचालय स्वच्छता</option></select>
      <input class="input" placeholder="ठिकाणाचे नाव" style="margin-bottom:0.75rem">
      <button class="btn btn-block" style="background:var(--purple);color:var(--bg-primary)">कर्मचारी पाठवा</button>
    </div>
    <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
      <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem"><i data-lucide="heart-pulse" style="width:18px;height:18px;color:#d946ef"></i> फवारणी मागणी</h2>
      <input class="input" placeholder="वॉर्ड / गल्ली" style="margin-bottom:0.75rem">
      <button class="btn btn-block btn-ghost" style="border-color:rgba(168,85,247,0.3);color:var(--purple)">मागणी नोंदवा</button>
    </div>
  </div>`;
};

Pages.grievance = function() {
  return `
  <div style="margin-bottom:1.5rem">
    <div style="display:flex;align-items:center;gap:0.75rem;color:var(--rose);font-size:0.6875rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.25rem"><i data-lucide="scale" style="width:14px;height:14px"></i> पारदर्शक कारभार</div>
    <h1 style="font-size:1.5rem;font-weight:700">ई-चौपाल डिजिटल न्याय कक्ष</h1>
  </div>
  <div class="grid-2" style="align-items:start">
    <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
      <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:0.5rem"><i data-lucide="pen-tool" style="width:18px;height:18px;color:var(--rose)"></i> नवीन तक्रार नोंदवा</h2>
      <p style="font-size:0.6875rem;color:var(--text-secondary);margin-bottom:1rem">७२ तासांत निवारण</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:0.75rem">
        <div><label class="label">पूर्ण नाव</label><input class="input" placeholder="नामदेव पाटील"></div>
        <div><label class="label">मोबाईल</label><input class="input" type="tel" placeholder="९८XXXXXXXX"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:0.75rem">
        <div><label class="label">विभाग</label><select class="select-input"><option>वीज समस्या</option><option>पाणी</option><option>स्वच्छता</option><option>रस्ते</option></select></div>
        <div><label class="label">वॉर्ड</label><input class="input" placeholder="वॉर्ड नं. २"></div>
      </div>
      <label class="label">सविस्तर वर्णन</label>
      <textarea class="textarea-input" rows="3" placeholder="समस्येबद्दल माहिती..." style="margin-bottom:0.75rem;resize:none;width:100%;background:rgba(2,6,23,0.6);border:1px solid rgba(51,65,85,0.5);border-radius:1rem;padding:0.875rem;color:var(--text-primary);font-family:var(--font);font-size:0.875rem;outline:none"></textarea>
      <button class="btn btn-block" style="background:var(--rose);color:white">तक्रार नोंदवा</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:1.5rem">
      <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
        <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem"><i data-lucide="search" style="width:18px;height:18px;color:var(--rose)"></i> स्थिती तपासा</h2>
        <input class="input" placeholder="GRV-2026-089" style="margin-bottom:0.75rem;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase">
        <button class="btn btn-block btn-ghost" style="border-color:rgba(244,63,94,0.3);color:var(--rose)">काम कुठपर्यंत? पहा</button>
        <div style="margin-top:1rem;padding-top:1rem;border-top:1px solid rgba(51,65,85,0.3)">
          <div style="display:flex;gap:0.75rem;margin-bottom:0.75rem"><div style="width:14px;height:14px;border-radius:50%;background:var(--emerald);flex-shrink:0;margin-top:2px"></div><div><span style="font-size:0.6875rem;color:var(--text-muted);font-family:monospace">२१ मे</span><p style="font-size:0.75rem;font-weight:500">तक्रार नोंदवली ✓</p></div></div>
          <div style="display:flex;gap:0.75rem"><div style="width:14px;height:14px;border-radius:50%;background:var(--amber);flex-shrink:0;margin-top:2px;animation:pulse 2s infinite"></div><div><span style="font-size:0.6875rem;color:var(--text-muted)">प्रक्रिया सुरू</span><p style="font-size:0.75rem;color:var(--amber);font-weight:500">फाईल सरपंचांकडे</p></div></div>
        </div>
      </div>
      <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
        <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:1rem"><i data-lucide="phone-call" style="width:18px;height:18px;color:var(--rose)"></i> संपर्क</h2>
        <div style="padding:0.625rem;background:rgba(2,6,23,0.4);border-radius:0.75rem;border:1px solid rgba(51,65,85,0.3);display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem"><div><span style="font-size:0.6875rem;color:var(--text-muted)">सरपंच</span><br><span style="font-size:0.8125rem;font-weight:600">श्री. मारुतीराव पाटील</span></div><a href="tel:1234567890" class="btn btn-ghost" style="padding:0.5rem"><i data-lucide="phone" style="width:14px;height:14px"></i></a></div>
        <div style="padding:0.625rem;background:rgba(2,6,23,0.4);border-radius:0.75rem;border:1px solid rgba(51,65,85,0.3);display:flex;justify-content:space-between;align-items:center"><div><span style="font-size:0.6875rem;color:var(--text-muted)">ग्रामसेवक</span><br><span style="font-size:0.8125rem;font-weight:600">श्री. चिराग सोलंकी</span></div><a href="tel:1234567890" class="btn btn-ghost" style="padding:0.5rem"><i data-lucide="phone" style="width:14px;height:14px"></i></a></div>
      </div>
    </div>
  </div>`;
};

Pages.news = function() {
  return `
  <div style="margin-bottom:1.5rem">
    <div style="display:flex;align-items:center;gap:0.75rem;color:var(--indigo);font-size:0.6875rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.25rem"><i data-lucide="megaphone" style="width:14px;height:14px"></i> अधिकृत घोषणा</div>
    <h1 style="font-size:1.5rem;font-weight:700">ग्राम डिजिटल बातमीपत्र</h1>
  </div>
  <div class="grid-2" style="align-items:start">
    <div style="display:flex;flex-direction:column;gap:1.5rem">
      <div class="card-static" style="padding:1.5rem;border-radius:1.5rem;border-left:3px solid var(--indigo)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;font-size:0.75rem"><span class="badge badge-info">शासकीय योजना</span><span style="color:var(--text-muted);font-family:monospace"><i data-lucide="clock" style="width:12px;height:12px"></i> आज, १०:००</span></div>
        <h3 style="font-size:1.125rem;font-weight:700;margin-bottom:0.5rem;cursor:pointer">'माझी लाडकी बहीण' योजना विशेष नोंदणी कॅम्प उद्यापासून!</h3>
        <p style="font-size:0.8125rem;color:var(--text-secondary);line-height:1.7">अपूर्ण अर्ज असलेल्या महिलांसाठी ग्रामपंचायत कार्यालयात सकाळी ९ ते संध्या. ५ शिबिर. आधार, बँक पासबुक, रेशन कार्ड आणावे.</p>
      </div>
      <div class="card-static" style="padding:1.5rem;border-radius:1.5rem;border-left:3px solid var(--emerald)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;font-size:0.75rem"><span class="badge badge-success">सार्वजनिक आरोग्य</span><span style="color:var(--text-muted);font-family:monospace">काल, ४:३०</span></div>
        <h3 style="font-size:1.125rem;font-weight:700;margin-bottom:0.5rem">मोफत पोलिओ लसीकरण मोहीम रविवारी!</h3>
        <p style="font-size:0.8125rem;color:var(--text-secondary);line-height:1.7">जिल्हा परिषद शाळा व दवाखान्यात ० ते ५ वर्षे बालकांसाठी मोफत लसीकरण.</p>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:1.5rem">
      <div class="card-static" style="padding:1.5rem;border-radius:1.5rem;background:linear-gradient(135deg,rgba(244,63,94,0.05),transparent)">
        <h2 style="font-size:1.125rem;font-weight:700;color:var(--rose);margin-bottom:0.75rem"><i data-lucide="alert-octagon" style="width:18px;height:18px"></i> महत्त्वाच्या सूचना</h2>
        <div style="padding:0.875rem;background:rgba(2,6,23,0.5);border:1px solid rgba(244,63,94,0.15);border-radius:0.75rem;margin-bottom:0.75rem"><span style="font-size:0.5625rem;font-family:monospace;color:var(--rose);text-transform:uppercase;letter-spacing:0.1em">⚠️ वीज कपात</span><p style="font-size:0.75rem;margin-top:0.25rem;font-weight:500">बुधवार सकाळी ८ ते दुपारी २ वीज बंद.</p></div>
        <div style="padding:0.875rem;background:rgba(2,6,23,0.5);border:1px solid rgba(51,65,85,0.3);border-radius:0.75rem"><span style="font-size:0.5625rem;font-family:monospace;color:var(--amber);text-transform:uppercase;letter-spacing:0.1em">📅 ग्रामसभा</span><p style="font-size:0.75rem;margin-top:0.25rem;font-weight:500">२६ तारखेला सकाळी ११:०० वा. हनुमान मंदिर.</p></div>
      </div>
      <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
        <h2 style="font-size:1.125rem;font-weight:700;margin-bottom:0.75rem"><i data-lucide="download-cloud" style="width:18px;height:18px;color:var(--indigo)"></i> कागदपत्रे डाउनलोड</h2>
        <div style="padding:0.625rem;background:rgba(2,6,23,0.4);border-radius:0.75rem;border:1px solid rgba(51,65,85,0.3);display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;font-size:0.75rem"><span>🏠 घरकुल यादी २०२६.pdf</span><button class="btn btn-ghost" style="padding:0.375rem"><i data-lucide="download" style="width:14px;height:14px"></i></button></div>
        <div style="padding:0.625rem;background:rgba(2,6,23,0.4);border-radius:0.75rem;border:1px solid rgba(51,65,85,0.3);display:flex;justify-content:space-between;align-items:center;font-size:0.75rem"><span>📋 बजेट अहवाल २०२६.pdf</span><button class="btn btn-ghost" style="padding:0.375rem"><i data-lucide="download" style="width:14px;height:14px"></i></button></div>
      </div>
    </div>
  </div>`;
};

Pages.weather = function() {
  return `
  <div style="margin-bottom:1.5rem">
    <div style="display:flex;align-items:center;gap:0.75rem;color:var(--cyan);font-size:0.6875rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.25rem"><i data-lucide="cloud-sun" style="width:14px;height:14px"></i> उपग्रह डेटा</div>
    <h1 style="font-size:1.5rem;font-weight:700">प्रादेशिक हवामान केंद्र</h1>
  </div>
  <div class="grid-2" style="margin-bottom:1.5rem;align-items:start">
    <div class="card-static" style="padding:2rem;border-radius:1.5rem;border-left:3px solid var(--cyan);display:flex;justify-content:space-between;align-items:center">
      <div><span style="font-size:0.6875rem;font-weight:700;color:var(--cyan);text-transform:uppercase;letter-spacing:0.1em">सध्याचे हवामान</span><h2 style="font-size:3rem;font-weight:700;font-family:monospace;margin:0.25rem 0">३४°C</h2><p style="font-size:0.875rem;color:var(--text-secondary)">आंशिक ढगाळ</p><p style="font-size:0.6875rem;color:var(--text-muted);margin-top:0.25rem">अपडेट: ५ मिनिटांपूर्वी</p></div>
      <div style="color:var(--cyan);background:rgba(6,182,212,0.1);padding:1.5rem;border-radius:1.5rem;border:1px solid rgba(6,182,212,0.2)"><i data-lucide="cloud-lightning" style="width:48px;height:48px;stroke-width:1.5"></i></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:1.5rem">
      <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
        <h2 style="font-size:1rem;font-weight:700;margin-bottom:0.75rem"><i data-lucide="calendar-days" style="width:16px;height:16px;color:var(--cyan)"></i> ३ दिवसांचा अंदाज</h2>
        <div style="display:flex;flex-direction:column;gap:0.5rem">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:0.625rem;background:rgba(2,6,23,0.4);border-radius:0.75rem;border:1px solid rgba(51,65,85,0.3)"><div><span style="font-size:0.75rem;font-weight:500">उद्या</span><br><span style="font-size:0.5625rem;color:var(--text-muted)">मुसळधार पाऊस</span></div><div style="display:flex;align-items:center;gap:0.75rem"><i data-lucide="cloud-drizzle" style="width:18px;height:18px;color:var(--blue)"></i><span style="font-family:monospace;font-size:0.75rem;font-weight:600">२८°/३२°</span></div></div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:0.625rem;background:rgba(2,6,23,0.4);border-radius:0.75rem;border:1px solid rgba(51,65,85,0.3)"><div><span style="font-size:0.75rem;font-weight:500">शनिवार</span><br><span style="font-size:0.5625rem;color:var(--text-muted)">गाजवीज</span></div><div style="display:flex;align-items:center;gap:0.75rem"><i data-lucide="cloud-lightning" style="width:18px;height:18px;color:var(--amber)"></i><span style="font-family:monospace;font-size:0.75rem;font-weight:600">२६°/३०°</span></div></div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:0.625rem;background:rgba(2,6,23,0.4);border-radius:0.75rem;border:1px solid rgba(51,65,85,0.3)"><div><span style="font-size:0.75rem;font-weight:500">रविवार</span><br><span style="font-size:0.5625rem;color:var(--text-muted)">स्वच्छ सूर्यप्रकाश</span></div><div style="display:flex;align-items:center;gap:0.75rem"><i data-lucide="sun" style="width:18px;height:18px;color:#facc15"></i><span style="font-family:monospace;font-size:0.75rem;font-weight:600">३०°/३५°</span></div></div>
        </div>
      </div>
      <div class="card-static" style="padding:1.5rem;border-radius:1.5rem;background:linear-gradient(135deg,rgba(244,63,94,0.05),transparent)">
        <h2 style="font-size:0.875rem;font-weight:700;color:var(--rose);margin-bottom:0.5rem"><i data-lucide="shield-alert" style="width:16px;height:16px"></i> शेतकऱ्यांसाठी इशारा</h2>
        <p style="font-size:0.75rem;line-height:1.7;font-weight:500">शनिवारी वादळी वाऱ्यासह पावसाचा इशारा. काढणीचे पीक सुरक्षित ठेवा.</p>
      </div>
    </div>
  </div>
  <div class="grid-3">
    <div class="card-static" style="border-top:3px solid var(--blue);padding:1.5rem;border-radius:1.5rem"><p style="font-size:0.75rem;color:var(--text-secondary)">पावसाची शक्यता</p><h3 style="font-size:1.875rem;font-weight:700;font-family:monospace;margin:0.25rem 0">६५%</h3><p style="font-size:0.6875rem;color:var(--text-muted)">संध्याकाळी हलक्या सरी</p></div>
    <div class="card-static" style="border-top:3px solid var(--cyan);padding:1.5rem;border-radius:1.5rem"><p style="font-size:0.75rem;color:var(--text-secondary)">दमटपणा</p><h3 style="font-size:1.875rem;font-weight:700;font-family:monospace;margin:0.25rem 0">७२%</h3><p style="font-size:0.6875rem;color:var(--text-muted)">उकाडा जाणवेल</p></div>
    <div class="card-static" style="border-top:3px solid var(--amber);padding:1.5rem;border-radius:1.5rem"><p style="font-size:0.75rem;color:var(--text-secondary)">वाऱ्याचा वेग</p><h3 style="font-size:1.875rem;font-weight:700;font-family:monospace;margin:0.25rem 0">१८ km/h</h3><p style="font-size:0.6875rem;color:var(--text-muted)">पश्चिम → पूर्व</p></div>
  </div>`;
};
