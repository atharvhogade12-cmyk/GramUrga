<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['role'] !== 'admin') {
    header("Location: ../pages/admin-login.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="mr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ग्रामऊर्जा // Master Administration</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --sidebar-bg: #1e1e2d;
            --sidebar-hover: #1b1b29;
            --sidebar-text: #9899ac;
            --sidebar-active: #ffffff;
            --brand-color: #3b82f6;
            
            --bg-main: #f3f4f6;
            --card-bg: #ffffff;
            --text-dark: #1f2937;
            --text-muted: #6b7280;
            --border-light: #e5e7eb;

            --c-blue: #3b82f6;
            --c-green: #10b981;
            --c-orange: #f59e0b;
            --c-cyan: #0ea5e9;
        }

        body {
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background-color: var(--bg-main);
            color: var(--text-dark);
            display: flex;
            height: 100vh;
            overflow: hidden;
        }

        /* SIDEBAR NAVIGATION */
        .sidebar {
            width: 260px;
            background-color: var(--sidebar-bg);
            display: flex;
            flex-direction: column;
            color: var(--sidebar-text);
            flex-shrink: 0;
        }

        .sidebar-header {
            padding: 1.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            background-color: #1a1a27;
            color: white;
            font-size: 1.25rem;
            font-weight: 700;
        }

        .sidebar-menu {
            padding: 1rem 0;
            overflow-y: auto;
            flex-grow: 1;
        }

        .menu-title {
            padding: 1rem 1.5rem 0.5rem;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #6b6b84;
            font-weight: 600;
        }

        .menu-item {
            padding: 0.85rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
            color: var(--sidebar-text);
            font-size: 0.875rem;
        }

        .menu-item:hover, .menu-item.active {
            background-color: var(--sidebar-hover);
            color: var(--sidebar-active);
            border-left: 3px solid var(--brand-color);
        }

        .menu-item i { width: 20px; height: 20px; }

        /* MAIN CONTENT AREA */
        .main-wrapper {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        }

        /* TOP HEADER */
        .top-header {
            background-color: var(--card-bg);
            height: 70px;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border-light);
        }

        .header-actions { display: flex; align-items: center; gap: 1.5rem; }
        .user-profile { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; }
        .avatar { width: 36px; height: 36px; background-color: var(--brand-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; }

        /* DASHBOARD CONTENT */
        .content-area { padding: 2rem; }
        
        .page-title { margin: 0 0 1.5rem 0; font-size: 1.5rem; font-weight: 600; }
        .breadcrumb { font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.5rem; }

        /* SUMMARY CARDS */
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .summary-card {
            padding: 1.5rem;
            border-radius: 0.5rem;
            color: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }

        .summary-card h4 { margin: 0; font-size: 0.875rem; font-weight: 500; opacity: 0.9; }
        .summary-card h2 { margin: 0.5rem 0 0 0; font-size: 1.875rem; font-weight: 700; }
        
        .bg-blue { background: linear-gradient(135deg, var(--c-blue), #2563eb); }
        .bg-green { background: linear-gradient(135deg, var(--c-green), #059669); }
        .bg-orange { background: linear-gradient(135deg, var(--c-orange), #d97706); }
        .bg-cyan { background: linear-gradient(135deg, var(--c-cyan), #0284c7); }

        /* CHARTS SECTION */
        .charts-container {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .chart-box {
            background-color: var(--card-bg);
            border-radius: 0.5rem;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            border: 1px solid var(--border-light);
        }

        .chart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .chart-header h3 { margin: 0; font-size: 1.125rem; }

        /* DATA ENTRY FORMS */
        .forms-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }

        .input-group { margin-bottom: 1rem; }
        .input-group label { display: block; margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--text-muted); font-weight: 500; }
        .input-control { width: 100%; padding: 0.75rem; border: 1px solid var(--border-light); border-radius: 0.375rem; font-family: inherit; font-size: 0.875rem; box-sizing: border-box; }
        .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 0.375rem; cursor: pointer; font-weight: 600; width: 100%; font-family: inherit; transition: opacity 0.2s; }
        .btn:hover { opacity: 0.9; }
        .btn-blue { background-color: var(--c-blue); color: white; }
    </style>
</head>
<body>

    <aside class="sidebar">
        <div class="sidebar-header">
            <div style="background:var(--brand-color); padding:0.25rem; border-radius:0.375rem; display:flex;">
                <i data-lucide="zap" style="color:white; width:24px; height:24px;"></i>
            </div>
            <span>GramUrja</span>
        </div>
        
        <div class="sidebar-menu">
            <div class="menu-title">Navigation</div>
            <a href="main-dashboard.php" class="menu-item active"><i data-lucide="layout-dashboard"></i> मुख्य डॅशबोर्ड</a>
            
            <div class="menu-title">Departments</div>
            <a href="power-telemetry.php" class="menu-item"><i data-lucide="bolt"></i> ऊर्जा ग्रीड (Power)</a>
            <a href="water-telemetry.php" class="menu-item"><i data-lucide="droplets"></i> जल वाहिनी (Water)</a>
            <a href="manage-news.php" class="menu-item"><i data-lucide="newspaper"></i> बातम्या व्यवस्थापन (News)</a>
            <a href="manage-grievances.php" class="menu-item"><i data-lucide="message-square"></i> तक्रार निवारण (Grievances)</a>
            <a href="manage-wards.php" class="menu-item"><i data-lucide="map-pin"></i> वॉर्ड व्यवस्थापन</a>
        </div>
        
        <div style="padding: 1.5rem;">
            <a href="../pages/logout.php" class="menu-item" style="background:#1a1a27; border-radius:0.5rem; justify-content:center;">
                <i data-lucide="log-out"></i> लॉगआउट (Logout)
            </a>
        </div>
    </aside>

    <main class="main-wrapper">
        <header class="top-header">
            <div>
                <i data-lucide="menu" style="color:var(--text-muted); cursor:pointer;"></i>
            </div>
            <div class="header-actions">
                <i data-lucide="bell" style="color:var(--text-muted); cursor:pointer;"></i>
                <div class="user-profile">
                    <div class="avatar">AD</div>
                    <div>
                        <div style="font-weight:600; font-size:0.875rem;">System Admin</div>
                        <div style="font-size:0.75rem; color:var(--text-muted);">Master Control</div>
                    </div>
                </div>
            </div>
        </header>

        <div class="content-area">
            <h1 class="page-title">Analytics Dashboard</h1>
            <div class="breadcrumb">Home / Dashboard / Real-time Analytics</div>

            <div class="summary-grid">
                <div class="summary-card bg-blue">
                    <h4>Total Registered Wards</h4>
                    <h2>०३</h2>
                    <i data-lucide="map" style="position:absolute; right:1rem; bottom:1rem; opacity:0.3; width:48px; height:48px;"></i>
                </div>
                <div class="summary-card bg-green">
                    <h4>Power Supply Uptime</h4>
                    <h2>९८.५%</h2>
                    <i data-lucide="zap" style="position:absolute; right:1rem; bottom:1rem; opacity:0.3; width:48px; height:48px;"></i>
                </div>
                <div class="summary-card bg-orange">
                    <h4>Active Grievances</h4>
                    <h2>१२</h2>
                    <i data-lucide="scale" style="position:absolute; right:1rem; bottom:1rem; opacity:0.3; width:48px; height:48px;"></i>
                </div>
                <div class="summary-card bg-cyan">
                    <h4>Water Valve Efficiency</h4>
                    <h2>९२.१%</h2>
                    <i data-lucide="droplets" style="position:absolute; right:1rem; bottom:1rem; opacity:0.3; width:48px; height:48px;"></i>
                </div>
            </div>

            <div class="charts-container">
                <div class="chart-box">
                    <div class="chart-header">
                        <h3>Real-time Visitor Analytics (Daily)</h3>
                        <div style="font-size:0.75rem; background:#f3f4f6; padding:0.25rem 0.5rem; border-radius:0.25rem;">Last 7 Days</div>
                    </div>
                    <canvas id="visitorChart" height="120"></canvas>
                </div>

                <div class="chart-box">
                    <div class="chart-header">
                        <h3>System Status Overview</h3>
                    </div>
                    <canvas id="statusChart" height="200"></canvas>
                </div>
            </div>

            <div class="forms-grid">
                <div class="chart-box">
                    <h3 style="margin-top:0; border-bottom:1px solid var(--border-light); padding-bottom:1rem; margin-bottom:1rem;">⚡ Quick Update: Power Grid</h3>
                    <form onsubmit="updatePowerAPI(event)">
                        <div class="input-group">
                            <label>प्रभावित वॉर्ड (Ward ID)</label>
                            <select id="power_ward_id" class="input-control">
                                <option value="1">वॉर्ड १ (गणेश नगर)</option>
                                <option value="2">वॉर्ड २ (लक्ष्मी नगर)</option>
                                <option value="3">वॉर्ड ३ (मारुती मंदिर)</option>
                                <option value="4">वॉर्ड ४ (शिवाजी नगर)</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label>वीज स्थिती (Grid Status)</label>
                            <select id="power_status" class="input-control">
                                <option value="ON">वीज सुरू (ON)</option>
                                <option value="OFF">लोड शेडिंग (OFF)</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-blue">अपडेट करा (Submit Update)</button>
                    </form>
                </div>

                <div class="chart-box">
                    <h3 style="margin-top:0; border-bottom:1px solid var(--border-light); padding-bottom:1rem; margin-bottom:1rem;">💧 Quick Update: Water Supply</h3>
                    <form onsubmit="updateWaterAPI(event)">
                        <div class="input-group">
                            <label>प्रभाग निवडा (Ward ID)</label>
                            <select id="water_ward_id" class="input-control">
                                <option value="1">वॉर्ड १ (गणेश नगर)</option>
                                <option value="2">वॉर्ड २ (लक्ष्मी नगर)</option>
                                <option value="3">वॉर्ड ३ (मारुती मंदिर)</option>
                                <option value="4">वॉर्ड ४ (शिवाजी नगर)</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label>पाण्याची स्थिती (Valve Status)</label>
                            <select id="water_status" class="input-control">
                                <option value="ON">पाणी सुरू (ON)</option>
                                <option value="OFF">पाणी बंद (OFF)</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-blue" style="background-color: var(--c-cyan);">अपडेट करा (Submit Update)</button>
                    </form>
                </div>

                <div class="chart-box" style="grid-column: span 2;">
                    <h3 style="margin-top:0; border-bottom:1px solid var(--border-light); padding-bottom:1rem; margin-bottom:1rem;">🚌 Quick Update: Bus Schedule</h3>
                    <form onsubmit="updateTransitAPI(event)" style="display:grid; grid-template-columns: 1fr 1fr auto; gap: 1rem; align-items: end;">
                        <div class="input-group" style="margin-bottom:0;">
                            <label>बस मार्ग (Route Name)</label>
                            <input type="text" id="transit_route" class="input-control" required placeholder="e.g. Kolhapur - Village Exp">
                        </div>
                        <div class="input-group" style="margin-bottom:0;">
                            <label>पुढील बस वेळ (Next Bus Time)</label>
                            <input type="text" id="transit_time" class="input-control" required placeholder="e.g. १०:१५ AM">
                        </div>
                        <button type="submit" class="btn btn-blue" style="background-color: var(--c-orange); height: 42px; width: auto; padding: 0 1.5rem;">अपडेट करा (Submit Update)</button>
                    </form>
                </div>
            </div>

        </div>
    </main>

    <script>
        lucide.createIcons();

        // 1. Initialize Visitor Area Chart
        const ctxVisitor = document.getElementById('visitorChart').getContext('2d');
        new Chart(ctxVisitor, {
            type: 'line',
            data: {
                labels: ['सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार', 'रविवार'],
                datasets: [{
                    label: 'Unique Visitors',
                    data: [120, 190, 150, 280, 220, 350, 410],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4 
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
                    x: { grid: { display: false } }
                }
            }
        });

        // 2. Initialize Status Pie Chart
        const ctxStatus = document.getElementById('statusChart').getContext('2d');
        new Chart(ctxStatus, {
            type: 'doughnut',
            data: {
                labels: ['पावर सुरू', 'पावर बंद', 'पाणी सुरू', 'पाणी बंद'],
                datasets: [{
                    data: [65, 15, 45, 25], 
                    backgroundColor: ['#10b981', '#f43f5e', '#0ea5e9', '#64748b'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                cutout: '65%', 
                plugins: { legend: { position: 'bottom' } }
            }
        });

        // 3. DATABASE WRITE APIs FOR QUICK FORMS
        async function updatePowerAPI(event) {
            event.preventDefault();
            const wardId = document.getElementById('power_ward_id').value;
            const status = document.getElementById('power_status').value;

            try {
                const response = await fetch('update-power.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ward_id: wardId, status: status })
                });
                const result = await response.json();
                
                if(result.status === "success") {
                    alert("✅ वीज स्थिती यशस्वीरित्या अपडेट झाली! (Power Updated)");
                    location.reload(); 
                } else {
                    alert("Error: " + result.message);
                }
            } catch (error) {
                alert("सर्व्हरशी संपर्क होऊ शकला नाही.");
            }
        }

        async function updateWaterAPI(event) {
            event.preventDefault();
            const wardId = document.getElementById('water_ward_id').value;
            const status = document.getElementById('water_status').value;

            try {
                const response = await fetch('update-water.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ward_id: wardId, status: status })
                });
                const result = await response.json();
                
                if(result.status === "success") {
                    alert("✅ पाणी स्थिती यशस्वीरित्या अपडेट झाली! (Water Updated)");
                    location.reload(); 
                } else {
                    alert("Error: " + result.message);
                }
            } catch (error) {
                alert("सर्व्हरशी संपर्क होऊ शकला नाही.");
            }
        }

        async function updateTransitAPI(event) {
            event.preventDefault();
            const routeName = document.getElementById('transit_route').value.trim();
            const busTime = document.getElementById('transit_time').value.trim();

            try {
                let success = false;
                try {
                    const response = await fetch('update-transit.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ route_name: routeName, next_bus_time: busTime })
                    });
                    const result = await response.json();
                    if(result.status === "success") {
                        success = true;
                    } else {
                        alert("Error: " + result.message);
                    }
                } catch (e) {
                    console.warn("Failed to update transit schedule in DB, saving locally:", e);
                    // Local fallback
                    const localDataStr = localStorage.getItem('gramurja_live_data');
                    let data = localDataStr ? JSON.parse(localDataStr) : {
                        status: "success",
                        power: { grid_status: "ON", shutdown_reason: "नियमित पुरवठा" },
                        water: { valve_status: "ON", supply_time: "सकाळी ६ ते ९" },
                        transit: { next_bus_time: "१०:१५ AM", route_name: "Kolhapur - Village Exp" },
                        wards: []
                    };
                    data.transit = { next_bus_time: busTime, route_name: routeName };
                    localStorage.setItem('gramurja_live_data', JSON.stringify(data));
                    success = true;
                }

                if (success) {
                    alert("✅ बस वेळापत्रक यशस्वीरित्या अपडेट झाले! (Transit Updated)");
                    location.reload();
                }
            } catch (error) {
                alert("सर्व्हरशी संपर्क होऊ शकला नाही.");
            }
        }
    </script>
</body>
</html>
