/**
 * GramUrja — Core SPA Router & Application Controller
 */
const Router = (() => {
  const routes = {};
  let currentPage = null;

  function register(name, loadFn) { routes[name] = loadFn; }

  function navigate(page) {
    if (!Auth.canAccess(page)) {
      if (!Auth.isLoggedIn()) { page = 'landing'; }
      else { Toast.show(I18n.t('common.error'), 'error'); return; }
    }
    window.location.hash = '#/' + page;
  }

  async function handleRoute() {
    const hash = window.location.hash.replace('#/', '') || 'landing';
    const page = hash.split('?')[0];
    if (!Auth.canAccess(page)) {
      if (!Auth.isLoggedIn()) { window.location.hash = '#/landing'; return; }
      else { window.location.hash = '#/dashboard'; return; }
    }
    currentPage = page;
    updateNav(page);
    const container = document.getElementById('page-content');
    if (!container) return;
    // Show skeleton
    container.innerHTML = '<div style="padding:2rem"><div class="skeleton" style="height:40px;width:60%;margin-bottom:1rem"></div><div class="skeleton" style="height:200px;margin-bottom:1rem"></div><div class="skeleton" style="height:200px"></div></div>';
    container.className = 'page-enter';
    try {
      if (routes[page]) {
        await routes[page](container);
      } else {
        container.innerHTML = Pages.notFound();
      }
      I18n.applyTranslations();
      if (typeof lucide !== 'undefined') lucide.createIcons();
    } catch (e) {
      console.error('[Router] Page load error:', e);
      container.innerHTML = `<div style="padding:2rem;text-align:center"><h2 style="color:var(--rose)">${I18n.t('common.error')}</h2><button class="btn btn-ghost" onclick="Router.navigate('dashboard')">${I18n.t('common.back')}</button></div>`;
    }
  }

  function updateNav(page) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === page);
    });
    // Update sidebar visibility based on auth
    const sidebar = document.getElementById('sidebar');
    const loginPages = ['landing', 'login'];
    if (sidebar) sidebar.classList.toggle('collapsed', loginPages.includes(page));
    const main = document.querySelector('.main-content');
    if (main) main.style.marginLeft = loginPages.includes(page) ? '0' : '';
    // Show/hide admin-only nav items
    document.querySelectorAll('[data-role-min]').forEach(el => {
      const minRole = el.dataset.roleMin;
      const role = Auth.getRole();
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
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, duration);
  }
  return { show };
})();

/** Initialize Application */
document.addEventListener('DOMContentLoaded', async () => {
  // Load language
  await I18n.loadLanguage(I18n.getLang());

  // Register all pages
  Router.register('landing', c => { c.innerHTML = Pages.landing(); Pages.initLanding(); });
  Router.register('login', c => { c.innerHTML = Pages.login(); Pages.initLogin(); });
  Router.register('dashboard', c => { c.innerHTML = Pages.dashboard(); });
  Router.register('power', c => { c.innerHTML = Pages.power(); });
  Router.register('water', c => { c.innerHTML = Pages.water(); });
  Router.register('agriculture', c => { c.innerHTML = Pages.agriculture(); });
  Router.register('sanitation', c => { c.innerHTML = Pages.sanitation(); });
  Router.register('grievance', c => { c.innerHTML = Pages.grievance(); });
  Router.register('news', c => { c.innerHTML = Pages.news(); });
  Router.register('weather', c => { c.innerHTML = Pages.weather(); });
  Router.register('crop-diagnosis', c => { c.innerHTML = Pages.cropDiagnosis(); CropDiagnosis.init(); });
  Router.register('market-chat', c => { c.innerHTML = Pages.marketChat(); MarketChat.init(); });
  Router.register('bus-tracker', c => { c.innerHTML = Pages.busTracker(); BusTracker.init(); });
  Router.register('analytics', c => { c.innerHTML = Pages.analytics(); Analytics.init(); });

  // Sidebar toggle
  document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.toggle('open');
    document.getElementById('sidebar-overlay')?.classList.toggle('active');
  });
  document.getElementById('sidebar-overlay')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebar-overlay')?.classList.remove('active');
  });

  // Language switcher
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => I18n.loadLanguage(btn.dataset.lang));
  });

  // TTS button
  document.getElementById('tts-fab')?.addEventListener('click', () => TTS.toggle());

  // Initial route
  Router.handleRoute();
});
