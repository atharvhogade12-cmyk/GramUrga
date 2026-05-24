/**
 * GramUrja — i18n (Internationalization) Engine
 * Handles language switching, key-value translation, and TTS integration.
 * Robust fallback for offline file:// runs included.
 */
const I18n = (() => {
  let currentLang = localStorage.getItem('gramurja_lang') || 'mr';
  let translations = {};
  const listeners = [];

  async function loadLanguage(lang) {
    try {
      const isSubdirectory = window.location.pathname.includes('/pages/');
      const basePath = isSubdirectory ? '../' : '';

      let fetchedTranslations = null;
      try {
        const res = await fetch(`${basePath}lang/${lang}.json`);
        if (res.ok) {
          fetchedTranslations = await res.json();
        }
      } catch (err) {
        console.warn(`[i18n] Failed to fetch lang/${lang}.json from network, using local fallback.`, err);
      }

      if (fetchedTranslations) {
        translations = fetchedTranslations;
      } else {
        translations = INLINE_TRANSLATIONS[lang] || {};
      }

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

// INLINE STATIC COPIES OF LOCALIZATION FILES FOR SECURE LOCAL HOSTING
const INLINE_TRANSLATIONS = {
  "en": {
    "app_name": "GramUrja",
    "app_tagline": "Our Village, Our Service",
    "nav": {
      "home": "Home",
      "dashboard": "Dashboard",
      "power": "Power Grid",
      "water": "Water Supply",
      "agriculture": "Agriculture",
      "sanitation": "Sanitation",
      "grievance": "E-Choupal",
      "news": "News",
      "weather": "Weather",
      "crop_diagnosis": "Crop Diagnosis",
      "market_chat": "Market Chat",
      "bus_tracker": "Bus Tracker",
      "admin": "Admin",
      "analytics": "Analytics",
      "login": "Login",
      "admin_login": "Admin Login",
      "citizen_login": "Citizen Login",
      "logout": "Logout",
      "services": "Services",
      "ai_tools": "AI Tools",
      "transport": "Transport",
      "about": "About Us",
      "settings": "Settings"
    },
    "landing": {
      "title": "Select Your Region",
      "subtitle": "All government & public services of your village in one place",
      "detect_location": "Detect My Location",
      "detecting": "Detecting location...",
      "select_region": "Select Region",
      "enter_dashboard": "Enter Dashboard",
      "system_status": "System Online",
      "main_grid": "Main Village Grid",
      "excellent": "Excellent",
      "description": "All government and public utilities of your village, now in one place.",
      "sub_description": "Manage electricity bills, water supply, farm schedules and complaints directly from your mobile."
    },
    "dashboard": {
      "title": "Village Service Center",
      "subtitle": "Click any service below to view details or apply.",
      "notifications": "Notifications",
      "emergency": "Emergency (SOS)",
      "running": "Running",
      "safe": "Safe",
      "available": "Available",
      "active": "Active",
      "online": "Online",
      "view": "View",
      "suggest_new": "Suggest New Service",
      "suggest_desc": "Does the village need a new service?"
    },
    "power": {
      "title": "Power Grid Management",
      "subtitle": "Live Tracking & Billing",
      "status": "Village Power: Online",
      "solar_gen": "Total Solar Energy Generation",
      "village_usage": "Current Village Consumption",
      "load_shedding": "Load Shedding Schedule",
      "check_bill": "Check Your Electricity Bill",
      "consumer_id": "Enter Consumer Number",
      "search_bill": "Search Bill",
      "file_complaint": "File Power Complaint",
      "submit": "Submit Complaint"
    },
    "water": {
      "title": "Water Supply Management",
      "subtitle": "Storage & Distribution Log",
      "status": "Main Pipeline: Normal",
      "tank_level": "Main Tank Water Level",
      "tds": "Water Purity (TDS Level)",
      "schedule": "Water Distribution Schedule",
      "tax_check": "Check Annual Water Tax",
      "tanker_request": "Government Tanker Request"
    },
    "agriculture": {
      "title": "Agri-Tech Digital Center",
      "subtitle": "Farmer Empowerment & Digital Market",
      "status": "Agri Advisory: Available",
      "cold_storage": "Community Cold Storage Availability",
      "weather_advice": "Today's Weather & Pest Advisory",
      "market_rates": "Today's Local Market Rates",
      "pump_booking": "Solar Pump Slot Booking",
      "storage_reserve": "Cold Storage Space Reservation"
    },
    "crop_diagnosis": {
      "title": "Crop Disease Diagnosis (AI)",
      "subtitle": "Upload a photo of your crop, AI will diagnose it",
      "upload_label": "Upload Crop Photo",
      "drag_drop": "Drag photo here or click to upload",
      "supported": "JPG, PNG — Max 5MB",
      "analyze": "Start AI Analysis",
      "analyzing": "Analyzing...",
      "result": "Diagnosis Result",
      "no_image": "Please upload an image first"
    },
    "market_chat": {
      "title": "Market Price AI Advisor",
      "subtitle": "Know crop prices — chat directly with AI",
      "placeholder": "Type your question...",
      "send": "Send",
      "welcome": "Hello! I'm your market price advisor. Which crop's price would you like to know?"
    },
    "bus_tracker": {
      "title": "Bus Route Tracker",
      "subtitle": "Live tracking of rural bus routes",
      "driver_mode": "Driver Mode",
      "start_sharing": "Start Sharing Location",
      "stop_sharing": "Stop Sharing",
      "no_buses": "No buses currently online"
    },
    "login": {
      "title": "Secure Login",
      "subtitle": "Login according to your department",
      "username": "Username",
      "password": "Password",
      "department": "Select Department",
      "submit": "Login",
      "error": "Invalid credentials"
    },
    "news": {
      "official_announce": "OFFICIAL ANNOUNCEMENTS",
      "bulletin_title": "Gram Digital Newsletter",
      "download_docs": "Download Documents",
      "house_list": "🏠 House List 2026.pdf",
      "budget_report": "📋 Budget Report 2026.pdf",
      "important_alerts": "Important Notices",
      "no_news": "No news bulletins available.",
      "error_loading": "Error loading news data.",
      "cat_schemes": "Govt Scheme",
      "cat_power": "Power Dept",
      "cat_water": "Water Dept",
      "cat_agri": "Agriculture",
      "cat_general": "General Notice",
      "news_1_title": "\"Majhi Ladki Bahin\" Scheme Special Registration Camp Tomorrow!",
      "news_1_content": "Special registration camp for women with incomplete applications at Gram Panchayat office from 9 AM to 5 PM tomorrow. Bring Aadhaar, Bank passbook, and Ration card.",
      "news_2_title": "Power supply will be suspended tomorrow from 2 to 5 PM",
      "news_2_content": "Due to main transformer maintenance work, power supply will be shut down in Ward 3 and 4 tomorrow from 2 PM to 5 PM. Please cooperate."
    },
    "common": {
      "loading": "Loading...",
      "error": "Something went wrong",
      "retry": "Try Again",
      "back": "Back",
      "version": "Version 2.0.26",
      "location": "Kolhapur, Maharashtra",
      "secured": "All data secured (AES-256)",
      "footer": "Secure & Digital Village Management System"
    },
    "hero": {
      "title": "Smart Village Governance",
      "subtitle": "Empowering our village with clean energy, digital services, and transparency.",
      "badge": "System Online",
      "explore_btn": "Explore Services"
    },
    "about": {
      "title": "About GramUrja",
      "description": "GramUrja is an integrated digital platform designed to bring all essential government, municipal, and agricultural services directly to our village residents. By uniting smart grids, water management, state transport tracking, and artificial intelligence, we aim to build a sustainable, self-reliant digital community.",
      "team_title": "Village Leadership & Coordination",
      "sarpanch_name": "Shri. Marutirao Patil",
      "sarpanch_role": "Sarpanch (Village Head)",
      "gramsevak_name": "Shri. Chirag Solanki",
      "gramsevak_role": "Gram Sevak (Govt. Administrator)",
      "tech_name": "Capstone Group 13",
      "tech_role": "Project Developers (CSE AI & ML)",
      "call_btn": "Call Direct",
      "college_title": "D.Y. Patil College of Engineering & Technology, Kolhapur (DYPCET)",
      "college_desc": "D.Y. Patil College of Engineering & Technology, Kolhapur is an Autonomous Engineering Institute affiliated with Shivaji University, Kolhapur. NAAC Accredited with 'A' Grade and NBA Accredited departments, it stands as a pioneer in engineering excellence and innovation.",
      "college_subtitle": "Autonomous Institute • NAAC 'A' Grade • NBA Accredited",
      "dept_title": "Department of Computer Science & Engineering (AI & ML)",
      "mentor_title": "Guided By (Class Teacher)",
      "mentor_name": "Prof. P. S. Chavhan",
      "mentor_role": "Class Teacher (First Year CSE Department)",
      "developers_title": "Capstone Project Developers — Group 13",
      "project_desc": "GramUrja was designed and developed as a Capstone Project by the first-year Computer Science & Engineering (Artificial Intelligence and Machine Learning) students at DYPCET Kolhapur to digitize rural governance for improved village connectivity.",
      "back_landing": "Back to Home",
      "student_department": "First Year CSE (AI & ML)",
      "roll_no": "Roll No:"
    }
  },
  "mr": {
    "app_name": "ग्रामऊर्जा",
    "app_tagline": "आपलं गाव, आपली सेवा",
    "nav": {
      "home": "मुख्यपृष्ठ",
      "dashboard": "डॅशबोर्ड",
      "power": "ऊर्जा ग्रीड",
      "water": "जल वाहिनी",
      "agriculture": "कृषी उन्नती",
      "sanitation": "स्वच्छ ग्राम",
      "grievance": "ई-चौपाल",
      "news": "बातमीपत्र",
      "weather": "हवामान",
      "crop_diagnosis": "पीक निदान",
      "market_chat": "बाजारभाव चॅट",
      "bus_tracker": "बस ट्रॅकर",
      "admin": "प्रशासन",
      "analytics": "विश्लेषण",
      "login": "लॉगिन",
      "admin_login": "प्रशासन लॉगिन",
      "citizen_login": "नागरिक लॉगिन",
      "logout": "बाहेर पडा",
      "services": "सेवा",
      "ai_tools": "AI साधने",
      "transport": "वाहतूक",
      "about": "आमच्याबद्दल",
      "settings": "सेटिंग्ज"
    },
    "landing": {
      "title": "आपल्या प्रदेशाची निवड करा",
      "subtitle": "आपल्या गावातील सर्व सरकारी व सार्वजनिक सेवा एकाच ठिकाणी",
      "detect_location": "माझे ठिकाण शोधा",
      "detecting": "ठिकाण शोधत आहे...",
      "select_region": "प्रदेश निवडा",
      "enter_dashboard": "डॅशबोर्ड सुरू करा",
      "system_status": "सिस्टम चालू आहे",
      "main_grid": "मुख्य गाव ग्रीड",
      "excellent": "उत्कृष्ट",
      "description": "गावातील सर्व सरकारी आणि सार्वजनिक सुविधा आता एकाच ठिकाणी.",
      "sub_description": "ाईट बिल, पाणी पुरवठा, शेतीचे शेड्युल आणि तक्रारी आता थेट मोबाईलवरून हाताळा."
    },
    "dashboard": {
      "title": "ग्राम सेवा केंद्र",
      "subtitle": "खालीलपैकी कोणत्याही सेवेवर क्लिक करून तिची माहिती मिळवा.",
      "notifications": "सूचना",
      "emergency": "तातडीची मदत (SOS)",
      "running": "चालू आहे",
      "safe": "सुरक्षित",
      "available": "माहिती उपलब्ध",
      "active": "काम सुरू",
      "online": "ऑनलाईन",
      "view": "पहा",
      "suggest_new": "नवीन सुविधा सुचवा",
      "suggest_desc": "गावात अजून कोणत्या नवीन सेवेची गरज आहे?"
    },
    "power": {
      "title": "ऊर्जा ग्रीड व्यवस्थापन",
      "subtitle": "ाईव्ह ट्रॅकिंग आणि बिलिंग",
      "status": "गावची वीज: चालू आहे",
      "solar_gen": "एकूण सौर ऊर्जा निर्मिती",
      "village_usage": "गावातील सद्य वीज वापर",
      "load_shedding": "वीज कपात वेळापत्रक",
      "check_bill": "आपले लाईट बिल तपासा",
      "consumer_id": "ग्राहक नंबर टाका",
      "search_bill": "बिल शोधा",
      "file_complaint": "वीज तक्रार नोंदवा",
      "submit": "तक्रार सबमिट करा"
    },
    "water": {
      "title": "जल वाहिनी व्यवस्थापन",
      "subtitle": "पाणी साठा आणि वितरण लॉग",
      "status": "मुख्य जलवाहिनी: सुरळीत",
      "tank_level": "मुख्य पाण्याच्या टाकीची पातळी",
      "tds": "पाण्याची शुद्धता (TDS Level)",
      "schedule": "पाणी सोडण्याचे वेळापत्रक",
      "tax_check": "वार्षिक पाणी पट्टी तपासा",
      "tanker_request": "शासकीय टँकर मागणी अर्ज"
    },
    "agriculture": {
      "title": "कृषी उन्नती डिजिटल केंद्र",
      "subtitle": "शेतकरी सक्षमीकरण आणि डिजिटल बाजार",
      "status": "कृषी सेवा सल्ला: उपलब्ध",
      "cold_storage": "सामुदायिक कोल्ड स्टोरेज उपलब्ध जागा",
      "weather_advice": "आजचा हवामान व कीड सल्ला",
      "market_rates": "आजचे स्थानिक कृषी उत्पन्न बाजार भाव",
      "pump_booking": "सौर कृषी पंप वेळ बुकिंग",
      "storage_reserve": "कोल्ड स्टोरेज जागा आरक्षण"
    },
    "crop_diagnosis": {
      "title": "पीक रोग निदान (AI)",
      "subtitle": "तुमच्या पिकाचा फोटो अपलोड करा, AI निदान करेल",
      "upload_label": "पिकाचा फोटो अपलोड करा",
      "drag_drop": "फोटो ड्रॅग करा किंवा इथे क्लिक करा",
      "supported": "JPG, PNG — कमाल 5MB",
      "analyze": "AI विश्लेषण सुरू करा",
      "analyzing": "विश्लेषण सुरू आहे...",
      "result": "निदान निकाल",
      "no_image": "कृपया प्रथम एक फोटो अपलोड करा"
    },
    "market_chat": {
      "title": "बाजारभाव AI सल्लागार",
      "subtitle": "पिकांचे भाव जाणून घ्या — AI शी थेट बोला",
      "placeholder": "तुमचा प्रश्न टाइप करा...",
      "send": "पाठवा",
      "welcome": "नमस्कार! मी तुमचा बाजारभाव सल्लागार आहे. कोणत्या पिकाचा भाव जाणून घ्यायचा आहे?"
    },
    "bus_tracker": {
      "title": "बस मार्ग ट्रॅकर",
      "subtitle": "ग्रामीण बस मार्गांचे थेट (live) ट्रॅकिंग",
      "driver_mode": "ड्रायव्हर मोड",
      "start_sharing": "लोकेशन शेअर सुरू करा",
      "stop_sharing": "शेअरिंग बंद करा",
      "no_buses": "सध्या कोणतीही बस ऑनलाईन नाही"
    },
    "login": {
      "title": "सुरक्षित लॉगिन",
      "subtitle": "आपल्या विभागानुसार लॉगिन करा",
      "username": "वापरकर्ता नाव",
      "password": "पासवर्ड",
      "department": "विभाग निवडा",
      "submit": "लॉगिन करा",
      "error": "चुकीचे क्रेडेन्शियल्स"
    },
    "news": {
      "official_announce": "अधिकृत घोषणा",
      "bulletin_title": "ग्राम डिजिटल बातमीपत्र",
      "download_docs": "कागदपत्रे डाउनलोड",
      "house_list": "🏠 घरकुल यादी २०२६.pdf",
      "budget_report": "📋 बजेट अहवाल २०२६.pdf",
      "important_alerts": "महत्त्वायच्या सूचना",
      "no_news": "बातम्या उपलब्ध नाहीत.",
      "error_loading": "डेटा लोड करताना त्रुटी आली.",
      "cat_schemes": "शासकीय योजना",
      "cat_power": "वीज विभाग",
      "cat_water": "पाणी विभाग",
      "cat_agri": "कृषी विभाग",
      "cat_general": "सामान्य सूचना",
      "news_1_title": "\"माझी लाडकी बहीण\" योजना विशेष नोंदणी कॅम्प उद्यापासून!",
      "news_1_content": "अपूर्ण अर्ज असलेल्या महिलांसाठी ग्रामपंचायत कार्यालयात सकाळी ९ ते संध्या. ५ शिबिर. आधार, बँक पासबुक, रेशन कार्ड आणावे.",
      "news_2_title": "उद्या दुपारी २ ते ५ वीजपुरवठा खंडित राहील",
      "news_2_content": "मुख्य ट्रान्सफॉर्मर दुरुस्तीचे काम असल्याने प्रभाग क्र. ३ आणि ४ मध्ये वीजपुरवठा बंद राहील. नागरिकांनी सहकार्य करावे."
    },
    "common": {
      "loading": "लोड होत आहे...",
      "error": "काहीतरी चूक झाली",
      "retry": "पुन्हा प्रयत्न करा",
      "back": "मागे",
      "version": "आवृत्ती २.०.२६",
      "location": "कोल्हापूर, महाराष्ट्र",
      "secured": "सर्व डेटा सुरक्षित (AES-256) आहे",
      "footer": "सुरक्षित आणि डिजिटल ग्राम व्यवस्थापन प्रणाली"
    },
    "hero": {
      "title": "स्मार्ट ग्राम शासन प्रणाली",
      "subtitle": "आपल्या गावाला स्वच्छ ऊर्जा, डिजिटल सेवा आणि पारदर्शक कारभारासह सक्षम बनवणे.",
      "badge": "सिस्टम ऑनलाईन",
      "explore_btn": "सार्वजनिक सेवा पहा"
    },
    "about": {
      "title": "ग्रामऊर्जा बद्दल",
      "description": "ग्रामऊर्जा ही एकात्मिक डिजिटल प्रणाली आहे, ज्याद्वारे गावातील सर्व महत्त्वाच्या सरकारी, सार्वजनिक आणि कृषी सेवा थेट नागरिकांपर्यंत पोहोचवल्या जातात. सौर ऊर्जा ग्रीड, जल व्यवस्थापन, एस.टी. बस ट्रॅकिंग आणि कृत्रिम बुद्धिमत्ता (AI) च्या समन्वयाने शाश्वत, स्वयंपूर्ण आणि डिजिटल गाव निर्माण करणे हे आमचे ध्येय आहे.",
      "team_title": "गावातील नेतृत्व आणि समन्वय",
      "sarpanch_name": "श्री. मारुतीराव पाटील",
      "sarpanch_role": "सरपंच",
      "gramsevak_name": "श्री. चिराग सोलंकी",
      "gramsevak_role": "ग्रामसेवक",
      "tech_name": "कॅपस्टोन ग्रुप १३",
      "tech_role": "प्रकल्प विकासक (CSE AI & ML)",
      "call_btn": "थेट संपर्क साधा",
      "college_title": "डी.वाय. पाटील कॉलेज ऑफ इंजिनिअरिंग अँड टेक्नॉलॉजी, कोल्हापूर (DYPCET)",
      "college_desc": "डी.वाय. पाटील कॉलेज ऑफ इंजिनिअरिंग अँड टेक्नॉलॉजी, कोल्हापूर ही शिवाजी विद्यापीठ, कोल्हापूरशी संलग्न स्वायत्त अभियांत्रिकी संस्था आहे. नॅक 'अ' श्रेणी (NAAC 'A' Grade) आणि एनबीए (NBA) मान्यताप्राप्त विभागांसह ही संस्था अभियांत्रिकी क्षेत्रातील उत्कृष्ट शिक्षणासाठी आणि नाविन्यपूर्ण उपक्रमांसाठी अग्रेसर आहे.",
      "college_subtitle": "स्वायत्त संस्था • नॅक 'अ' श्रेणी • एनबीए मान्यताप्राप्त",
      "dept_title": "कॉम्प्युटर सायन्स अँड इंजिनिअरिंग विभाग (AI & ML)",
      "mentor_title": "मार्गदर्शक (वर्ग शिक्षक)",
      "mentor_name": "प्रा. पी. एस. चव्हाण",
      "mentor_role": "वर्ग शिक्षक (प्रथम वर्ष संगणक अभियांत्रिकी विभाग)",
      "developers_title": "कॅपस्टोन प्रकल्प विकासक — ग्रुप १३",
      "project_desc": "गावातील कारभार डिजिटल करून नागरिकांना अधिक जवळ जोडण्यासाठी DYPCET कोल्हापूरच्या प्रथम वर्ष कॉम्प्युटर सायन्स अँड इंजिनिअरिंग (AI & ML) मधील विद्यार्थ्यांनी कॅपस्टोन प्रोजेक्ट म्हणून 'ग्रामऊर्जा' विकसित केले आहे.",
      "back_landing": "मुख्य पृष्ठावर जा",
      "student_department": "प्रथम वर्ष संगणक अभियांत्रिकी (AI & ML)",
      "roll_no": "रोल नंबर:"
    }
  },
  "hi": {
    "app_name": "ग्रामऊर्जा",
    "app_tagline": "हमारा गाँव, हमारी सेवा",
    "nav": {
      "home": "मुखपृष्ठ",
      "dashboard": "डैशबोर्ड",
      "power": "ऊर्जा ग्रिड",
      "water": "जल आपूर्ति",
      "agriculture": "कृषि उन्नति",
      "sanitation": "स्वच्छता",
      "grievance": "ई-चौपाल",
      "news": "समाचार",
      "weather": "मौसम",
      "crop_diagnosis": "फसल निदान",
      "market_chat": "बाज़ार चैट",
      "bus_tracker": "बस ट्रैकर",
      "admin": "प्रशासन",
      "analytics": "विश्लेषण",
      "login": "लॉगिन",
      "admin_login": "प्रशासन लॉगिन",
      "citizen_login": "नागरिक लॉगिन",
      "logout": "लॉगआउट",
      "services": "सेवाएँ",
      "ai_tools": "AI उपकरण",
      "transport": "परिवहन",
      "about": "हमारे बारे में",
      "settings": "सेटिंग्स"
    },
    "landing": {
      "title": "अपना क्षेत्र चुनें",
      "subtitle": "आपके गाँव की सभी सरकारी और सार्वजनिक सेवाएँ एक ही जगह पर",
      "detect_location": "मेरा स्थान खोजें",
      "detecting": "स्थान खोज रहा है...",
      "select_region": "क्षेत्र चुनें",
      "enter_dashboard": "डैशबोर्ड शुरू करें",
      "system_status": "सिस्टम ऑनलाइन है",
      "main_grid": "मुख्य गाँव ग्रिड",
      "excellent": "उत्कृष्ट",
      "description": "गाँव की सभी सरकारी और सार्वजनिक सुविधाएँ अब एक ही स्थान पर।",
      "sub_description": "बिजली बिल, पानी, खेती और शिकायतें अब सीधे मोबाइल से करें।"
    },
    "dashboard": {
      "title": "ग्राम सेवा केंद्र",
      "subtitle": "किसी भी सेवा पर क्लिक करके जानकारी प्राप्त करें।",
      "notifications": "सूचनाएँ",
      "emergency": "आपातकालीन (SOS)",
      "running": "चालू है",
      "safe": "सुरक्षित",
      "available": "उपलब्ध",
      "active": "सक्रिय",
      "online": "ऑनलाइन",
      "view": "देखें",
      "suggest_new": "नई सेवा सुझाएँ",
      "suggest_desc": "क्या गाँव को किसी नई सेवा की ज़रूरत है?"
    },
    "news": {
      "official_announce": "आधिकारिक घोषणाएँ",
      "bulletin_title": "ग्राम डिजिटल समाचार पत्र",
      "download_docs": "दस्तावेज़ डाउनलोड",
      "house_list": "🏠 घरकुल (आवास) सूची २०२६.pdf",
      "budget_report": "📋 बजट रिपोर्ट २०२६.pdf",
      "important_alerts": "महत्वपूर्ण सूचनाएँ",
      "no_news": "कोई समाचार उपलब्ध नहीं है।",
      "error_loading": "डेटा लोड करने में त्रुटि हुई।",
      "cat_schemes": "सरकारी योजना",
      "cat_power": "बिजली विभाग",
      "cat_water": "जल विभाग",
      "cat_agri": "कृषि विभाग",
      "cat_general": "सामान्य सूचना",
      "news_1_title": "\"माझी लाडकी बहीण\" योजना विशेष पंजीकरण शिविर कल से!",
      "news_1_content": "अपूर्ण आवेदन वाली महिलाओं के लिए ग्राम पंचायत कार्यालय में कल सुबह 9 से शाम 5 बजे तक विशेष शिविर। आधार कार्ड, बैंक पासबुक और राशन कार्ड लाएं।",
      "news_2_title": "कल दोपहर 2 से 5 बजे तक बिजली आपूर्ति बाधित रहेगी",
      "news_2_content": "मुख्य ट्रांसफार्मर मरम्मत कार्य के कारण कल वार्ड 3 और 4 में बिजली बंद रहेगी। नागरिकों से सहयोग की अपील है।"
    },
    "common": {
      "loading": "लोड हो रहा है...",
      "error": "कुछ गलत हो गया",
      "retry": "पुनः प्रयास करें",
      "back": "वापस",
      "version": "संस्करण 2.0.26",
      "location": "कोल्हापुर, महाराष्ट्र",
      "secured": "सभी डेटा सुरक्षित (AES-256)",
      "footer": "सुरक्षित एवं डिजिटल ग्राम प्रबंधन प्रणाली"
    },
    "hero": {
      "title": "स्मार्ट ग्राम शासन प्रणाली",
      "subtitle": "अपने गाँव को स्वच्छ ऊर्जा, digital सेवाओं और पारदर्शी शासन के साथ सशक्त बनाना।",
      "badge": "सिस्टम ऑनलाइन है",
      "explore_btn": "सार्वजनिक सेवाएँ देखें"
    },
    "about": {
      "title": "ग्रामऊर्जा के बारे में",
      "description": "ग्रामऊर्जा एक एकीकृत डिजिटल प्लेटफॉर्म है, जिसे गाँव के निवासियों तक सभी आवश्यक सरकारी, नगर पालिका और कृषि सेवाएँ सीधे पहुँचाने के लिए डिज़ाइन किया गया है। स्मार्ट ग्रिड, जल प्रबंधन, राज्य परिवहन ट्रैकिंग और कृत्रिम बुद्धिमत्ता (AI) को एक साथ लाकर, हमारा उद्देश्य एक सतत, आत्मनिर्भर and डिजिटल गाँव का निर्माण करना है।",
      "team_title": "गाँव का नेतृत्व और समन्वय",
      "sarpanch_name": "श्री. मारुतीराव पाटील",
      "sarpanch_role": "सरपंच (गाँव प्रमुख)",
      "gramsevak_name": "श्री. चिराग सोलंकी",
      "gramsevak_role": "ग्रामसेवक (शासकीय प्रशासक)",
      "tech_name": "कैपस्टोन ग्रुप १३",
      "tech_role": "परियोजना विकासक (CSE AI & ML)",
      "call_btn": "सीधा संपर्क करें",
      "college_title": "डी.वाई. पाटिल कॉलेज ऑफ इंजीनियरिंग एंड टेक्नोलॉजी, कोल्हापुर (DYPCET)",
      "college_desc": "डी.वाई. पाटिल कॉलेज ऑफ इंजीनियरिंग एंड टेक्नोलॉजी, कोल्हापुर, शिवाजी विश्वविद्यालय, कोल्हापुर से संबद्ध एक स्वायत्त इंजीनियरिंग संस्थान है। नैक 'ए' ग्रेड (NAAC 'A' Grade) और एनबीए (NBA) से मान्यता प्राप्त विभागों के साथ, यह संस्थान इंजीनियरिंग शिक्षा में गुणवत्ता और नवाचार के लिए जाना जाता है।",
      "college_subtitle": "स्वायत्त संस्थान • नैक 'ए' ग्रेड • एनबीए मान्यता प्राप्त",
      "dept_title": "कंप्यूटर विज्ञान और इंजीनियरिंग विभाग (AI & ML)",
      "mentor_title": "मार्गदर्शक (वर्ग शिक्षक)",
      "mentor_name": "प्रा. पी. एस. चव्हाण",
      "mentor_role": "वर्ग शिक्षक (प्रथम वर्ष कंप्यूटर इंजीनियरिंग विभाग)",
      "developers_title": "कैपस्टोन परियोजना विकासक — ग्रुप १३",
      "project_desc": "गाँव के शासन को डिजिटल करके नागरिकों को अधिक निकटता से जोड़ने के लिए DYPCET कोल्हापुर के प्रथम वर्ष कंप्यूटर विज्ञान और इंजीनियरिंग (AI & ML) के छात्रों द्वारा कैपस्टोन प्रोजेक्ट के रूप में 'ग्रामऊर्जा' विकसित किया गया है।",
      "back_landing": "मुख्य पृष्ठ पर जाएं",
      "student_department": "प्रथम वर्ष कंप्यूटर इंजीनियरिंग (AI & ML)",
      "roll_no": "रोल नंबर:"
    }
  }
};