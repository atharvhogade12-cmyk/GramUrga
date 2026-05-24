<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || ($_SESSION['role'] !== 'admin' && $_SESSION['role'] !== 'power_head')) {
    header("Location: ../pages/admin-login.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="mr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ग्रामऊर्जा // Power Grid Control</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        :root {
            --sidebar-bg: #1e1e2d; --sidebar-hover: #1b1b29; --sidebar-text: #9899ac;
            --brand-color: #3b82f6; --bg-main: #f3f4f6; --card-bg: #ffffff;
            --text-dark: #1f2937; --text-muted: #6b7280; --border-light: #e5e7eb;
            --emerald: #10b981; --rose: #f43f5e;
        }
        body { margin: 0; font-family: 'Poppins', sans-serif; background-color: var(--bg-main); color: var(--text-dark); display: flex; height: 100vh; overflow: hidden; }
        
        /* Layout */
        .sidebar { width: 260px; background-color: var(--sidebar-bg); display: flex; flex-direction: column; color: var(--sidebar-text); flex-shrink: 0; }
        .sidebar-header { padding: 1.5rem; display: flex; align-items: center; gap: 1rem; background-color: #1a1a27; color: white; font-size: 1.25rem; font-weight: 700; }
        .sidebar-menu { padding: 1rem 0; overflow-y: auto; flex-grow: 1; }
        .menu-item { padding: 0.85rem 1.5rem; display: flex; align-items: center; gap: 1rem; cursor: pointer; text-decoration: none; color: var(--sidebar-text); font-size: 0.875rem; }
        .menu-item:hover, .menu-item.active { background-color: var(--sidebar-hover); color: white; border-left: 3px solid var(--brand-color); }
        .main-wrapper { flex-grow: 1; display: flex; flex-direction: column; overflow-y: auto; padding: 2rem; }
        
        /* Cards & Forms */
        .grid-container { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
        .card { background-color: var(--card-bg); border-radius: 0.5rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid var(--border-light); }
        .card-title { margin: 0 0 1.5rem 0; font-size: 1.125rem; display: flex; align-items: center; gap: 0.5rem; border-bottom: 1px solid var(--border-light); padding-bottom: 1rem; }
        
        /* Table */
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 1rem; text-align: left; border-bottom: 1px solid var(--border-light); font-size: 0.875rem; }
        th { color: var(--text-muted); font-weight: 600; }
        .status-badge { padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.75rem; font-weight: 600; }
        .badge-on { background: rgba(16, 185, 129, 0.15); color: var(--emerald); }
        .badge-off { background: rgba(244, 63, 94, 0.15); color: var(--rose); }
        
        /* Form */
        .input-group { margin-bottom: 1rem; }
        .input-group label { display: block; margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--text-muted); font-weight: 500; }
        .input-control { width: 100%; padding: 0.75rem; border: 1px solid var(--border-light); border-radius: 0.375rem; font-family: inherit; box-sizing: border-box; }
        .btn { width: 100%; padding: 0.75rem; background-color: var(--brand-color); color: white; border: none; border-radius: 0.375rem; font-weight: 600; cursor: pointer; }
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
            <?php if ($_SESSION['role'] === 'admin'): ?>
            <a href="main-dashboard.php" class="menu-item"><i data-lucide="layout-dashboard"></i> मुख्य डॅशबोर्ड</a>
            <?php endif; ?>
            <a href="power-telemetry.php" class="menu-item active"><i data-lucide="bolt"></i> ऊर्जा ग्रीड (Power)</a>
            <?php if ($_SESSION['role'] === 'admin' || $_SESSION['role'] === 'water_head'): ?>
            <a href="water-telemetry.php" class="menu-item"><i data-lucide="droplets"></i> जल वाहिनी (Water)</a>
            <?php endif; ?>
            <?php if ($_SESSION['role'] === 'admin'): ?>
            <a href="manage-news.php" class="menu-item"><i data-lucide="newspaper"></i> बातम्या व्यवस्थापन (News)</a>
            <a href="manage-grievances.php" class="menu-item"><i data-lucide="message-square"></i> तक्रार निवारण (Grievances)</a>
            <a href="manage-wards.php" class="menu-item"><i data-lucide="map-pin"></i> वॉर्ड व्यवस्थापन</a>
            <?php endif; ?>
        </div>
        <div style="padding: 1.5rem;">
            <a href="../pages/logout.php" class="menu-item" style="background:#1a1a27; border-radius:0.5rem; justify-content:center;">
                <i data-lucide="log-out"></i> लॉगआउट (Logout)
            </a>
        </div>
    </aside>

    <main class="main-wrapper">
        <h1 style="margin-top:0;">⚡ ऊर्जा ग्रीड नियंत्रण (Power Grid Control)</h1>
        <p style="color:var(--text-muted); margin-bottom:2rem;">Manage real-time electrical distribution across all registered wards.</p>

        <div class="grid-container">
            <div class="card">
                <h3 class="card-title"><i data-lucide="activity" style="color:var(--emerald);"></i> थेट स्थिती (Live Status)</h3>
                <table>
                    <thead>
                        <tr>
                            <th>वॉर्ड (Ward)</th>
                            <th>स्थिती (Status)</th>
                        </tr>
                    </thead>
                    <tbody id="power-table-body">
                        <tr><td colspan="2" style="text-align:center;">डेटा लोड होत आहे...</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="card">
                <h3 class="card-title"><i data-lucide="edit-3" style="color:var(--brand-color);"></i> ग्रीड अपडेट करा</h3>
                <form onsubmit="updatePowerAPI(event)">
                    <div class="input-group">
                        <label>प्रभावित वॉर्ड (Ward ID)</label>
                        <select id="power_ward_id" class="input-control" required>
                            <option value="">लोड होत आहे...</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label>वीज स्थिती (Grid Status)</label>
                        <select id="power_status" class="input-control" required>
                            <option value="ON">वीज सुरू (ON)</option>
                            <option value="OFF">लोड शेडिंग (OFF)</option>
                        </select>
                    </div>
                    <button type="submit" class="btn">अपडेट करा (Submit Update)</button>
                </form>
            </div>
        </div>
    </main>

    <script>
        lucide.createIcons();

        // 1. DYNAMICALLY LOAD THE TABLE AND DROPDOWN
        async function fetchPowerData() {
            try {
                // Fetch the master data array
                const response = await fetch('fetch-live-status.php');
                const data = await response.json();

                if (data.status === "success" && data.wards) {
                    const tableBody = document.getElementById('power-table-body');
                    const wardDropdown = document.getElementById('power_ward_id');
                    
                    let tableHTML = '';
                    let dropdownHTML = '';

                    // Loop through the database records
                    data.wards.forEach(ward => {
                        // Build Table Rows
                        const badgeClass = ward.power_status === 'ON' ? 'badge-on' : 'badge-off';
                        tableHTML += `
                            <tr>
                                <td style="font-weight:500;">${ward.ward_name}</td>
                                <td><span class="status-badge ${badgeClass}">${ward.power_status}</span></td>
                            </tr>
                        `;

                        // Build Dropdown Options Automatically
                        dropdownHTML += `<option value="${ward.ward_id}">${ward.ward_name}</option>`;
                    });

                    tableBody.innerHTML = tableHTML;
                    wardDropdown.innerHTML = dropdownHTML;
                }
            } catch (error) {
                console.error("Failed to load power telemetry:", error);
            }
        }

        // 2. FORM SUBMISSION API
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
                    alert("✅ वीज स्थिती यशस्वीरित्या अपडेट झाली!");
                    fetchPowerData(); // Reload the table instantly without refreshing the page
                } else {
                    alert("Error: " + result.message);
                }
            } catch (error) {
                alert("सर्व्हरशी संपर्क होऊ शकला नाही.");
            }
        }

        // Boot up the engine when the page loads
        document.addEventListener("DOMContentLoaded", fetchPowerData);
    </script>
</body>
</html>
