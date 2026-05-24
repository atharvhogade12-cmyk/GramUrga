/**
 * GramUrja — Core SPA Router & Application Controller (Hardened Version)
 */
const Router = (() => {
  const routes = {};
  let currentPage = null;

  function register(name, loadFn) { routes[name] = loadFn; }

  function navigate(page) {
    try {
      // Safe check: Only verify auth if the Auth object successfully loaded
      if (typeof Auth !== 'undefined' && !Auth.canAccess(page)) {
        if (!Auth.isLoggedIn()) { page = 'landing'; }
        else { Toast.show(typeof I18n !== 'undefined' ? I18n.t('common.error') : 'Access Denied', 'error'); return; }
      }
      window.location.hash = '#/' + page;
    } catch (e) {
      console.error('[Router] Auth check bypassed due to error:', e);
      window.location.hash = '#/' + page;
    }
  }

  async function handleRoute() {
    const hash = window.location.hash.replace('#/', '') || 'landing';
    const page = hash.split('?')[0];
    
    try {
      if (typeof Auth !== 'undefined' && !Auth.canAccess(page)) {
        if (!Auth.isLoggedIn()) { window.location.hash = '#/landing'; return; }
        else { window.location.hash = '#/dashboard'; return; }
      }
    } catch (e) {
      console.warn('[Router] Auth validation skipped.', e);
    }

    currentPage = page;
    updateNav(page);
    
    const container = document.getElementById('page-content');
    if (!container) {
        console.error('[Router] Critical Error: #page-content container missing from index.html');
        return;
    }

    // Show skeleton loader
    container.innerHTML = '<div style="padding:2rem; max-width: 1200px; margin: 0 auto;"><div class="skeleton" style="background: rgba(255,255,255,0.05); border-radius: 8px; height:40px; width:60%; margin-bottom:1rem"></div><div class="skeleton" style="background: rgba(255,255,255,0.05); border-radius: 12px; height:200px; margin-bottom:1rem"></div><div class="skeleton" style="background: rgba(255,255,255,0.05); border-radius: 12px; height:200px"></div></div>';
    container.className = 'page-enter';

    try {
      if (routes[page]) {
        await routes[page](container);
      } else {
        container.innerHTML = (typeof Pages !== 'undefined' && Pages.notFound) ? Pages.notFound() : '<div style="padding: 2rem; text-align: center;"><h2>404 - Page Not Found</h2></div>';
      }
      
      if (typeof I18n !== 'undefined' && I18n.applyTranslations) I18n.applyTranslations();
      if (typeof lucide !== 'undefined') lucide.createIcons();
    } catch (e) {
      console.error('[Router] Page load error:', e);
      // Fixed the infinite loop error here. It no longer forces a redirect.
      const errorMsg = typeof I18n !== 'undefined' ? I18n.t('common.error') : 'Something went wrong loading this module.';
      const backText = typeof I18n !== 'undefined' ? I18n.t('common.back') : 'Go Back';
      container.innerHTML = `<div style="padding:4rem 2rem;text-align:center; max-width: 600px; margin: 0 auto;">
          <h2 style="color:#f43f5e; margin-bottom: 1rem;">${errorMsg}</h2>
          <p style="color:#94a3b8; font-family: monospace; margin-bottom: 2rem;">Error: ${e.message}</p>
          <button class="action-btn" style="background: #0ea5e9; color: #fff; padding: 0.75rem 1.5rem; border: none; border-radius: 0.5rem; cursor: pointer;" onclick="window.history.back()">${backText}</button>
      </div>`;
    }
  }

  function updateNav(page) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === page);
    });
    
    const sidebar = document.getElementById('sidebar');
    const loginPages = ['landing', 'login'];
    if (sidebar) sidebar.classList.toggle('collapsed', loginPages.includes(page));
    
    const main = document.querySelector('.main-content');
    if (main) main.style.marginLeft = loginPages.includes(page) ? '0' : '';
    
    document.querySelectorAll('[data-role-min]').forEach(el => {
      const minRole = el.dataset.roleMin;
      const role = typeof Auth !== 'undefined' ? Auth.getRole() : 'guest';
      if (minRole === 'admin' && role !== 'admin' && role !== 'sarpanch') el.style.display = 'none';
      else el.style.display = '';
    });
  }

  function getCurrent() { return currentPage; }

  window.addEventListener('hashchange', handleRoute);

  return { register, navigate, handleRoute, getCurrent };
})();

/** Toast Notification System */
const Toast = (() => {
  function show(msg, type = 'success', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = 'padding: 1rem; margin-bottom: 0.5rem; border-radius: 0.5rem; color: #fff; background: ' + (type === 'error' ? '#f43f5e' : '#10b981');
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => { 
        toast.style.opacity = '0'; 
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300); 
    }, duration);
  }
  return { show };
})();

/** Safe Module Executor */
// This prevents the router from crashing if a specific department file is missing
const safeExecute = (moduleName, fn) => {
    try {
        if (typeof fn === 'function') fn();
    } catch (e) {
        console.error(`[Module Error] Failed to initialize ${moduleName}:`, e);
    }
};

/** Initialize Application */
document.addEventListener('DOMContentLoaded', async () => {
  
  // Safe I18n load
  if (typeof I18n !== 'undefined' && I18n.loadLanguage) {
      await I18n.loadLanguage(I18n.getLang());
  }

  // Register all pages with Graceful Fallbacks
  Router.register('landing', c => { 
      c.innerHTML = typeof Pages !== 'undefined' ? Pages.landing() : '<h1>Pages Module Missing</h1>'; 
      safeExecute('Landing', () => Pages.initLanding()); 
  });
  
  Router.register('login', c => { 
      c.innerHTML = typeof Pages !== 'undefined' ? Pages.login() : '<h1>Pages Module Missing</h1>'; 
      safeExecute('Login', () => Pages.initLogin()); 
  });
  
  Router.register('dashboard', c => { c.innerHTML = Pages.dashboard(); });
  Router.register('power', c => { c.innerHTML = Pages.power(); });
  Router.register('water', c => { c.innerHTML = Pages.water(); });
  Router.register('agriculture', c => { c.innerHTML = Pages.agriculture(); });
  Router.register('sanitation', c => { c.innerHTML = Pages.sanitation(); });
  
  Router.register('grievance', c => { 
      c.innerHTML = Pages.grievance(); 
      safeExecute('Grievance', () => GrievanceModule.init()); 
  });
  
  Router.register('news', c => { 
      c.innerHTML = Pages.news(); 
      safeExecute('News', () => NewsModule.init()); 
  });
  
  Router.register('weather', c => { c.innerHTML = Pages.weather(); });
  
  Router.register('crop-diagnosis', c => { 
      c.innerHTML = Pages.cropDiagnosis(); 
      safeExecute('CropDiagnosis', () => CropDiagnosis.init()); 
  });
  
  Router.register('market-chat', c => { 
      c.innerHTML = Pages.marketChat(); 
      safeExecute('MarketChat', () => MarketChat.init()); 
  });
  
  Router.register('bus-tracker', c => { 
      c.innerHTML = Pages.busTracker(); 
      safeExecute('BusTracker', () => BusTracker.init()); 
  });
  
  Router.register('about', c => {
      c.innerHTML = typeof Pages.about !== 'undefined' ? Pages.about() : '<h1>About Module Missing</h1>';
      if (typeof lucide !== 'undefined') lucide.createIcons();
  });
  
  Router.register('analytics', c => { 
      c.innerHTML = typeof Pages.analytics !== 'undefined' ? Pages.analytics() : '<h1>Analytics Module Missing</h1>'; 
      safeExecute('Analytics', () => Analytics.init()); 
  });

  // UI Event Listeners with Safe Checks
  document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.toggle('open');
    document.getElementById('sidebar-overlay')?.classList.toggle('active');
  });
  
  document.getElementById('sidebar-overlay')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebar-overlay')?.classList.remove('active');
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (typeof I18n !== 'undefined') I18n.loadLanguage(btn.dataset.lang);
    });
  });

  document.getElementById('tts-fab')?.addEventListener('click', () => {
      if (typeof TTS !== 'undefined') TTS.toggle();
  });

  // Boot the initial route
  Router.handleRoute();
});