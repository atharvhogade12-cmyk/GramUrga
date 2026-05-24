/** GramUrja — Bus Tracker Module (Leaflet.js + HTML5 Geolocation) */
const BusTracker = (() => {
  let map = null;
  let driverMarker = null;
  let watchId = null;
  let sharing = false;
  const busMarkers = {};

  function init() {
    // Show driver panel if user is a driver
    if (Auth.getRole() === 'driver' || Auth.getRole() === 'admin') {
      const panel = document.getElementById('driver-panel');
      if (panel) panel.style.display = 'block';
    }

    // Driver toggle
    document.getElementById('driver-toggle-btn')?.addEventListener('click', toggleSharing);

    // Poll until Leaflet is defined
    function checkAndInit() {
      if (typeof L !== 'undefined') {
        initMap();
        simulateBuses();
      } else {
        const container = document.getElementById('bus-map');
        if (container) {
          container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);font-size:0.875rem">Leaflet.js loading...</div>';
        }
        setTimeout(checkAndInit, 500);
      }
    }

    checkAndInit();
  }

  function initMap() {
    const container = document.getElementById('bus-map');
    if (!container || typeof L === 'undefined') {
      if (container) container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);font-size:0.875rem">Leaflet.js loading...</div>';
      return;
    }

    map = L.map('bus-map', { zoomControl: false }).setView([16.705, 74.243], 13);
    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OSM & CARTO',
      maxZoom: 19
    }).addTo(map);
  }

  function toggleSharing() {
    if (sharing) stopSharing();
    else startSharing();
  }

  function startSharing() {
    if (!navigator.geolocation) { Toast.show('GPS not supported', 'error'); return; }
    const btn = document.getElementById('driver-toggle-btn');
    const coords = document.getElementById('driver-coords');
    sharing = true;
    btn.textContent = I18n.t('bus_tracker.stop_sharing');
    btn.style.background = 'var(--rose)';
    if (coords) coords.style.display = 'block';

    watchId = navigator.geolocation.watchPosition(pos => {
      const { latitude, longitude } = pos.coords;
      document.getElementById('d-lat').textContent = latitude.toFixed(6);
      document.getElementById('d-lng').textContent = longitude.toFixed(6);

      if (map) {
        if (!driverMarker) {
          const icon = L.divIcon({ className: '', html: '<div style="width:20px;height:20px;background:var(--emerald);border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(16,185,129,0.5)"></div>', iconSize: [20, 20], iconAnchor: [10, 10] });
          driverMarker = L.marker([latitude, longitude], { icon }).addTo(map);
          map.setView([latitude, longitude], 15);
        } else {
          driverMarker.setLatLng([latitude, longitude]);
        }
      }
    }, err => {
      Toast.show('GPS error: ' + err.message, 'error');
    }, { enableHighAccuracy: true, maximumAge: 3000 });
  }

  function stopSharing() {
    sharing = false;
    if (watchId) navigator.geolocation.clearWatch(watchId);
    const btn = document.getElementById('driver-toggle-btn');
    btn.textContent = I18n.t('bus_tracker.start_sharing');
    btn.style.background = 'var(--emerald)';
    document.getElementById('driver-coords').style.display = 'none';
    if (driverMarker && map) { map.removeLayer(driverMarker); driverMarker = null; }
  }

  function simulateBuses() {
    if (!map) return;
    const routes = [
      { id: 'bus1', name: 'मार्ग १: गाव → तालुका', lat: 16.708, lng: 74.240, color: '#10b981' },
      { id: 'bus2', name: 'मार्ग २: गाव → जिल्हा', lat: 16.700, lng: 74.250, color: '#3b82f6' },
    ];

    const list = document.getElementById('bus-list');
    list.innerHTML = routes.map(r => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:0.625rem;background:rgba(2,6,23,0.4);border-radius:0.75rem;border:1px solid rgba(51,65,85,0.3)">
        <div style="display:flex;align-items:center;gap:0.5rem">
          <span class="pulse-dot" style="width:8px;height:8px"></span>
          <span style="font-size:0.75rem;font-weight:500">${r.name}</span>
        </div>
        <span class="badge badge-success">Live</span>
      </div>`).join('');

    routes.forEach(r => {
      const icon = L.divIcon({ className: '', html: `<div style="background:${r.color};color:white;padding:4px 8px;border-radius:8px;font-size:10px;font-weight:700;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.3)">🚌 ${r.name.split(':')[0]}</div>`, iconSize: [80, 24], iconAnchor: [40, 12] });
      busMarkers[r.id] = L.marker([r.lat, r.lng], { icon }).addTo(map);
    });

    // Simulate movement
    setInterval(() => {
      routes.forEach(r => {
        r.lat += (Math.random() - 0.5) * 0.001;
        r.lng += (Math.random() - 0.5) * 0.001;
        if (busMarkers[r.id]) busMarkers[r.id].setLatLng([r.lat, r.lng]);
      });
    }, 3000);
  }

  return { init };
})();
