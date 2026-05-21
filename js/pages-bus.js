/** GramUrja — Bus Tracker Page */
Pages.busTracker = function() {
  return `
  <div style="margin-bottom:1.5rem">
    <div style="display:flex;align-items:center;gap:0.75rem;color:var(--purple);font-size:0.6875rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.25rem"><i data-lucide="bus" style="width:14px;height:14px"></i> Live Transit Telemetry</div>
    <h1 style="font-size:1.5rem;font-weight:700" data-i18n="bus_tracker.title">बस मार्ग ट्रॅकर</h1>
  </div>
  <div style="display:grid;grid-template-columns:1fr 320px;gap:1.5rem;align-items:start">
    <div class="card-static" style="padding:0;border-radius:1.5rem;overflow:hidden">
      <div id="bus-map" style="height:480px;background:var(--bg-primary)"></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:1.5rem">
      <div class="card-static" style="padding:1.5rem;border-radius:1.5rem">
        <h2 style="font-size:1rem;font-weight:700;margin-bottom:1rem"><i data-lucide="radio" style="width:16px;height:16px;color:var(--emerald)"></i> ऑनलाईन बसेस</h2>
        <div id="bus-list" style="display:flex;flex-direction:column;gap:0.5rem">
          <p style="font-size:0.8125rem;color:var(--text-muted);text-align:center;padding:1rem" data-i18n="bus_tracker.no_buses">सध्या कोणतीही बस ऑनलाईन नाही</p>
        </div>
      </div>
      <div id="driver-panel" class="card-static" style="padding:1.5rem;border-radius:1.5rem;display:none">
        <h2 style="font-size:1rem;font-weight:700;margin-bottom:0.5rem;color:var(--amber)"><i data-lucide="steering-wheel" style="width:16px;height:16px"></i> <span data-i18n="bus_tracker.driver_mode">ड्रायव्हर मोड</span></h2>
        <p style="font-size:0.6875rem;color:var(--text-muted);margin-bottom:1rem">GPS coordinates shared in real-time</p>
        <select id="driver-route" class="select-input" style="margin-bottom:0.75rem">
          <option value="route1">मार्ग १: गाव → तालुका (via शाळा)</option>
          <option value="route2">मार्ग २: गाव → जिल्हा (via बाजार)</option>
          <option value="route3">मार्ग ३: गाव → रेल्वे स्टेशन</option>
        </select>
        <button id="driver-toggle-btn" class="btn btn-primary btn-block" style="background:var(--emerald)" data-i18n="bus_tracker.start_sharing">
          लोकेशन शेअर सुरू करा
        </button>
        <div id="driver-coords" style="display:none;margin-top:0.75rem;padding:0.75rem;background:rgba(2,6,23,0.4);border-radius:0.75rem;font-family:monospace;font-size:0.6875rem;color:var(--text-muted)">
          Lat: <span id="d-lat">—</span> | Lng: <span id="d-lng">—</span>
        </div>
      </div>
    </div>
  </div>`;
};
