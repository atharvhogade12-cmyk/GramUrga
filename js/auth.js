/**
 * GramUrja — RBAC Authentication System
 * localStorage-based mock auth with role-isolated dashboard views.
 */
const Auth = (() => {
  const STORAGE_KEY = 'gramurja_session';

  // Mock user database — replace with PHP/MySQL API calls in production
  const USERS = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'प्रशासक', dept: 'admin' },
    { id: 2, username: 'sarpanch', password: 'sarpanch123', role: 'sarpanch', name: 'सरपंच', dept: 'admin' },
    { id: 3, username: 'gramsevak', password: 'gram123', role: 'gramsevak', name: 'ग्रामसेवक', dept: 'admin' },
    { id: 4, username: 'water', password: 'water123', role: 'staff', name: 'जल विभाग', dept: 'water' },
    { id: 5, username: 'power', password: 'power123', role: 'staff', name: 'वीज विभाग', dept: 'power' },
    { id: 6, username: 'agri', password: 'agri123', role: 'staff', name: 'कृषी विभाग', dept: 'agriculture' },
    { id: 7, username: 'sanitation', password: 'clean123', role: 'staff', name: 'स्वच्छता विभाग', dept: 'sanitation' },
    { id: 8, username: 'transport', password: 'bus123', role: 'driver', name: 'बस चालक', dept: 'transport' },
    { id: 9, username: 'citizen', password: 'citizen123', role: 'citizen', name: 'नागरिक', dept: 'public' },
  ];

  // Role-based route access matrix
  const ACCESS = {
    admin:     ['*'], // all pages
    sarpanch:  ['dashboard','power','water','agriculture','sanitation','grievance','news','weather','analytics','crop-diagnosis','market-chat','bus-tracker'],
    gramsevak: ['dashboard','power','water','agriculture','sanitation','grievance','news','weather','crop-diagnosis','market-chat','bus-tracker'],
    staff:     ['dashboard','news','weather'], // + their dept page added dynamically
    driver:    ['dashboard','bus-tracker'],
    citizen:   ['dashboard','power','water','agriculture','sanitation','grievance','news','weather','crop-diagnosis','market-chat','bus-tracker'],
  };

  function login(username, password) {
    const user = USERS.find(u => u.username === username && u.password === password);
    if (!user) return { success: false, error: 'invalid_credentials' };
    const session = { id: user.id, username: user.username, role: user.role, name: user.name, dept: user.dept, loginTime: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return { success: true, user: session };
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    Router.navigate('landing');
  }

  function getSession() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch { return null; }
  }

  function isLoggedIn() { return !!getSession(); }

  function canAccess(page) {
    const session = getSession();
    const PUBLIC_PAGES = [
      'landing', 'login', 'dashboard', 'power', 'water', 'agriculture', 
      'sanitation', 'grievance', 'news', 'weather', 
      'crop-diagnosis', 'market-chat', 'bus-tracker', 'about'
    ];
    if (!session) return PUBLIC_PAGES.includes(page);
    const allowed = ACCESS[session.role] || [];
    if (allowed.includes('*')) return true;
    // Staff can access their department page
    if (session.role === 'staff' && page === session.dept) return true;
    return allowed.includes(page);
  }

  function getRole() { const s = getSession(); return s ? s.role : null; }
  function getDept() { const s = getSession(); return s ? s.dept : null; }
  function getName() { const s = getSession(); return s ? s.name : ''; }

  return { login, logout, getSession, isLoggedIn, canAccess, getRole, getDept, getName };
})();
