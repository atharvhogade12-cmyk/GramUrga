// GramUrja — Service Worker for offline caching
const CACHE_NAME = 'gramurja-v2';
const ASSETS = [
  '/', '/index.html', '/css/app.css',
  '/js/i18n.js', '/js/auth.js', '/js/app.js',
  '/js/pages-core.js', '/js/pages-services.js', '/js/pages-more.js',
  '/js/pages-ai.js', '/js/pages-bus.js', '/js/modules.js', '/js/bus-tracker.js',
  '/lang/mr.json', '/lang/en.json', '/lang/hi.json',
  '/images/bence-balla-schottner-JV-zjVX_m94-unsplash.jpg',
  '/images/bus.png', '/images/complain.jfif', '/images/ffarm.jfif',
  '/images/news.jfif', '/images/power.jfif', '/images/sven-V7WkmXntA8M-unsplash.jpg',
  '/images/wash-health-care-rev.png', '/images/water.jfif', '/images/weather.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/index.html')))
  );
});
