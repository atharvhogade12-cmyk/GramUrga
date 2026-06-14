# ग्रामऊर्जा · GramUrja 🏡⚡

> **Digital Village Governance Platform** — a Progressive Web App (PWA) that brings every gram-panchayat service to a single screen, in Marathi, Hindi and English.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PHP](https://img.shields.io/badge/PHP-8.x-777BB4?logo=php)](https://php.net)
[![PWA Ready](https://img.shields.io/badge/PWA-ready-5A0FC8?logo=pwa)](https://web.dev/progressive-web-apps/)

---

## 📋 Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Admin Roles](#admin-roles)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## About

**GramUrja** (ग्रामऊर्जा) is an open-source digital governance portal built for Indian villages. It provides real-time telemetry for water supply, electricity, bus transit, weather, agriculture, and civic grievances — all served in the local language through a glassmorphic, mobile-first PWA.

---

## ✨ Features

| Module | Description |
|--------|-------------|
| 🌊 **Water Supply** | Live valve status & supply schedule per ward |
| ⚡ **Power Grid** | Real-time grid ON/OFF & shutdown reason per ward |
| 🚌 **Bus Tracker** | Next-bus countdown with live map (Leaflet.js) |
| 📰 **News Bulletin** | Admin-managed urgent & regular announcements |
| 📣 **E-Choupal** | Citizen grievance submission & tracking |
| 🌦️ **Weather Detector** | Hyperlocal weather alerts |
| 🌾 **Agriculture Hub** | Crop tips, market prices, government schemes |
| 🛒 **Market Chat** | Commodity price chat |
| 🤖 **AI Assistant** | Gemini-powered village helpdesk (pages-ai.js) |
| 🔐 **Admin Dashboard** | Role-based analytics & telemetry management |
| 🌐 **i18n** | Marathi · Hindi · English (lang/) |
| 📱 **PWA** | Installable, offline-capable (sw.js + manifest.json) |

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML5 / CSS3 / JavaScript (ES6+)
- **Icons:** [Lucide](https://lucide.dev/)
- **Maps:** [Leaflet.js](https://leafletjs.com/)
- **Fonts:** Google Fonts — Poppins
- **Backend:** PHP 8.x (PDO / MySQL)
- **Database:** MySQL / MariaDB
- **Hosting:** ezyro free PHP hosting (or any LAMP/LEMP stack)

---

## 📁 Project Structure

```
GramUrga/
├── index.html              # App shell (SPA entry point)
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── css/
│   └── app.css             # Global design system
├── js/
│   ├── app.js              # App bootstrap & router
│   ├── auth.js             # Session / auth helpers
│   ├── i18n.js             # Translations engine
│   ├── modules.js          # Feature modules
│   ├── pages-core.js       # Core page renderers
│   ├── pages-services.js   # Service pages
│   ├── pages-more.js       # Secondary pages
│   ├── pages-ai.js         # AI assistant page
│   ├── pages-bus.js        # Bus tracker page
│   ├── bus-tracker.js      # Bus tracker logic
│   └── db-config.php       # DB connection (reads ENV vars)
├── analytics/
│   ├── main-dashboard.php  # Admin main dashboard
│   ├── manage-grievances.php
│   ├── manage-news.php
│   ├── manage-wards.php
│   ├── power-telemetry.php
│   ├── water-telemetry.php
│   ├── database_setup.php  # One-time DB initialiser
│   └── ...                 # API endpoint scripts
├── pages/
│   ├── admin-login.html
│   ├── login-api.php       # Auth API
│   └── *.html              # Feature pages
├── lang/
│   ├── en.json
│   ├── hi.json
│   └── mr.json
├── images/                 # App icons & feature images
├── .env.example            # ← copy to .env and fill secrets
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- PHP ≥ 8.0 with PDO & PDO_MySQL enabled
- MySQL / MariaDB ≥ 5.7
- Any web server (Apache / Nginx / XAMPP / WAMP)

### Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/GramUrga.git
cd GramUrga

# 2. Set up environment variables
cp .env.example .env
# Edit .env and fill in your DB credentials

# 3. Point your web server document root to  GramUrga/
#    (or drop the folder inside htdocs / www)

# 4. Run the one-time database initialiser (once only!)
#    Open in browser: http://localhost/GramUrga/analytics/database_setup.php
#    Then DELETE or restrict access to this file.

# 5. Open the app
#    http://localhost/GramUrga/
```

---

## 🔐 Environment Variables

Copy `.env.example` → `.env` and configure:

| Variable | Description |
|----------|-------------|
| `DB_HOST` | MySQL host (e.g. `sql312.ezyro.com`) |
| `DB_NAME` | Database name |
| `DB_USER` | Database username |
| `DB_PASS` | Database password (**never commit this**) |
| `ADMIN_DEFAULT_PASS` | Seed password for `database_setup.php` (change after first run) |

> **On shared hosting (ezyro / cPanel):** set these in the control panel's *Environment Variables* section, or use `.htaccess`:
> ```apache
> SetEnv DB_PASS your_password_here
> ```

---

## 🗄️ Database Setup

`analytics/database_setup.php` creates all required tables and seeds default admin users:

| Username | Role |
|----------|------|
| `gp_head` | `admin` |
| `water_admin` | `water_head` |
| `power_admin` | `power_head` |
| `news_admin` | `news_head` |
| `weather_admin` | `weather_head` |

> ⚠️ **After running `database_setup.php` for the first time, change all passwords immediately from the admin dashboard and restrict/delete the setup file.**

---

## 👤 Admin Roles

| Role | Access |
|------|--------|
| `admin` | Full dashboard — grievances, news, wards, stats |
| `water_head` | Water telemetry management |
| `power_head` | Power grid telemetry management |
| `news_head` | News bulletin management |
| `weather_head` | Weather page |
| `transit_head` | Bus tracker management |

Admin login: `/pages/admin-login.html`

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

Please make sure **no real credentials appear in your commits**.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with ❤️ for rural India · ग्रामीण भारतासाठी ❤️ सह बनवले</p>
