# 🔍 GramUrja (ग्रामऊर्जा) — Full Codebase Audit & Architecture Plan

## 1. Current State Analysis

### Existing Files (8 standalone HTML pages)

| File | Purpose | Lines | Size |
|------|---------|-------|------|
| [landing page.html](file:///d:/projects/gramurga/landing%20page.html) | Main dashboard gateway — service tile grid | 217 | 16KB |
| [agriculture-hub.html](file:///d:/projects/gramurga/agriculture-hub.html) | Agri-Tech: market rates, cold storage, solar pump booking | 211 | 15KB |
| [e-choupal.html](file:///d:/projects/gramurga/e-choupal.html) | Grievance portal with tracking timeline | 200 | 14KB |
| [news-bulletin.html](file:///d:/projects/gramurga/news-bulletin.html) | Village news, govt notices, PDF downloads | 165 | 13KB |
| [power-grid.html](file:///d:/projects/gramurga/power-grid.html) | Electricity: solar generation, load shedding, billing | 214 | 15KB |
| [sanitation-hub.html](file:///d:/projects/gramurga/sanitation-hub.html) | Waste mgmt, fogging schedule, cleanup tracking | 205 | 15KB |
| [water-supply.html](file:///d:/projects/gramurga/water-supply.html) | Tank levels, TDS, distribution schedule, tanker booking | 212 | 15KB |
| [weather-detector.html](file:///d:/projects/gramurga/weather-detector.html) | Live weather, 3-day forecast, farmer advisories | 177 | 12KB |

### Tech Stack Used
- **Tailwind CSS v3** via CDN (`cdn.tailwindcss.com`)
- **Google Fonts**: Poppins
- **Lucide Icons** via unpkg CDN
- **Language**: Marathi (lang="mr") with bilingual labels
- **No JavaScript logic** — purely static HTML with `lucide.createIcons()` only
- **No routing system** — standalone pages with `href="index.html"` back-links (broken — no `index.html` exists)

---

## 2. Critical Issues Found

### 🔴 Severity: High

| # | Issue | Impact |
|---|-------|--------|
| 1 | **No `index.html` exists** — all back-links (`href="index.html"`) are broken | Navigation fails entirely |
| 2 | **Landing page filename has a space** (`landing page.html`) | Breaks URLs, causes 404s on many servers |
| 3 | **Zero JavaScript logic** — all forms are non-functional | No user interaction works |
| 4 | **No authentication or RBAC** | Anyone can access all pages |
| 5 | **No SPA routing** — each page reloads all assets independently | ~200KB re-downloaded per navigation |
| 6 | **No shared CSS/JS** — same Tailwind + styles duplicated 8 times | Maintenance nightmare, bloated payload |

### 🟡 Severity: Medium

| # | Issue | Impact |
|---|-------|--------|
| 7 | **No PWA manifest or service worker** | No offline capability |
| 8 | **No 404 page or error boundaries** | Broken UX on misnavigation |
| 9 | **No language switching system** | Locked to Marathi only |
| 10 | **No meta descriptions for SEO** | Poor search visibility |
| 11 | **Data is hardcoded** — all market rates, weather, etc. are static HTML | No live updates possible |
| 12 | **No loading states or skeleton screens** | Jarring content loads |

### 🟢 Severity: Low (Design)

| # | Issue | Impact |
|---|-------|--------|
| 13 | Each page has its own color-themed glass panel but **inconsistent hover effects** | Visual inconsistency |
| 14 | No dark/light mode toggle | Reduced accessibility |
| 15 | Missing `aria-*` attributes on interactive elements | WCAG compliance gaps |

---

## 3. Architecture Plan — New File Structure

```
d:\projects\gramurga\
├── index.html                    ← SPA shell (single entry point)
├── manifest.json                 ← PWA manifest
├── sw.js                         ← Service Worker for offline
├── css/
│   └── app.css                   ← Unified design system
├── js/
│   ├── app.js                    ← Core SPA router & state manager
│   ├── auth.js                   ← RBAC login system
│   ├── i18n.js                   ← Language engine
│   ├── analytics.js              ← Admin analytics dashboard
│   ├── crop-diagnosis.js         ← AI disease detection module
│   ├── market-chat.js            ← AI market valuation chat
│   └── bus-tracker.js            ← Leaflet.js GPS tracking
├── lang/
│   ├── mr.json                   ← Marathi translations
│   ├── hi.json                   ← Hindi translations
│   ├── en.json                   ← English translations
│   └── kn.json                   ← Kannada translations
├── pages/                        ← HTML template fragments
│   ├── landing.html              ← Geospatial gateway
│   ├── dashboard.html            ← Main service hub
│   ├── login.html                ← RBAC login
│   ├── admin-analytics.html      ← Admin command center
│   ├── agriculture-hub.html      ← Upgraded agri module
│   ├── crop-diagnosis.html       ← AI disease detection UI
│   ├── market-chat.html          ← AI market valuation chat
│   ├── bus-tracker.html          ← Live transit map
│   ├── e-choupal.html            ← Grievance portal
│   ├── news-bulletin.html        ← News & notices
│   ├── power-grid.html           ← Electricity management
│   ├── sanitation-hub.html       ← Sanitation & health
│   ├── water-supply.html         ← Water management
│   ├── weather-detector.html     ← Weather station
│   └── 404.html                  ← Custom error page
└── api/                          ← PHP backend (future)
    ├── auth.php                  ← Login/session API
    ├── grievance.php             ← Grievance CRUD
    └── config.php                ← DB connection
```

---

## 4. Directive Mapping

| Directive | Status | Key Deliverables |
|-----------|--------|-----------------|
| **1. Refactoring** | 🔧 Planned | Consolidate CSS/JS, SPA router, fix navigation, eliminate duplication |
| **2. Geospatial Gateway** | 🆕 New | Location-aware landing page with region selection + dynamic locale |
| **3. RBAC + Analytics** | 🆕 New | Login system with role-isolated dashboards + admin command center |
| **4. AI Crop Diagnosis** | 🆕 New | Image upload UI with webhook placeholder for AI bot |
| **5. AI Market Chat** | 🆕 New | Chat interface with webhook placeholder for price valuation |
| **6. Bus Tracker** | 🆕 New | Leaflet.js map + driver GPS feeder + public route display |
| **7. Ecosystem Cohesion** | 🔧 Planned | PWA, 404 page, loading skeletons, error boundaries, unified nav |
| **8. Omnilingual Core** | 🆕 New | JSON i18n matrices + Bhashini/Google TTS integration points |

---

## 5. Implementation Priority Order

1. **Foundation** → `index.html` SPA shell + `css/app.css` design system + `js/app.js` router
2. **Language System** → `js/i18n.js` + JSON lang files (all UI must be translatable)
3. **Geospatial Landing** → Region-aware gateway page
4. **Auth & RBAC** → Login + role-based route guards
5. **Existing Module Migration** → Port 6 existing pages to SPA fragments
6. **New Modules** → Crop diagnosis, Market chat, Bus tracker
7. **Analytics Dashboard** → Admin command center
8. **PWA & Polish** → Manifest, Service Worker, 404, skeletons, accessibility

> [!IMPORTANT]
> **This is a massive build.** I will implement this in phases. Each phase produces fully functional, testable code. I'll start with Phase 1 (Foundation + Language + Landing + Auth) which builds the skeleton everything else plugs into.

---

## 6. Decision Points Needed From You

1. **Tailwind version**: You're using CDN Tailwind v3. Should I keep CDN or switch to a build step (Vite)?
2. **Backend**: The RBAC system needs session storage. Should I build a **localStorage mock** for now, or do you have a PHP/MySQL server ready?
3. **Regions**: Which specific Maharashtra regions/districts should the geospatial gateway support?
4. **AI Webhooks**: Do you already have the webhook URLs for crop diagnosis and market chat, or should I build with placeholders first?
5. **Bus Routes**: Which specific rural routes should the bus tracker display? Any route data available?

---

*Awaiting your feedback before I begin Phase 1 implementation.*
