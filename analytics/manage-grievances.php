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
    <title>ग्रामऊर्जा // तक्रार निवारण आणि विश्लेषण (Grievance Control)</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --sidebar-bg: #1e1e2d; --sidebar-hover: #1b1b29; --sidebar-text: #9899ac;
            --brand-color: #3b82f6; --bg-main: #f3f4f6; --card-bg: #ffffff;
            --text-dark: #1f2937; --text-muted: #6b7280; --border-light: #e5e7eb;
            --indigo: #6366f1; --emerald: #10b981; --rose: #f43f5e; --amber: #f59e0b;
        }
        body { margin: 0; font-family: 'Poppins', sans-serif; background-color: var(--bg-main); color: var(--text-dark); display: flex; height: 100vh; overflow: hidden; }
        
        /* Layout */
        .sidebar { width: 260px; background-color: var(--sidebar-bg); display: flex; flex-direction: column; color: var(--sidebar-text); flex-shrink: 0; }
        .sidebar-header { padding: 1.5rem; display: flex; align-items: center; gap: 1rem; background-color: #1a1a27; color: white; font-size: 1.25rem; font-weight: 700; }
        .sidebar-menu { padding: 1rem 0; overflow-y: auto; flex-grow: 1; }
        .menu-item { padding: 0.85rem 1.5rem; display: flex; align-items: center; gap: 1rem; cursor: pointer; text-decoration: none; color: var(--sidebar-text); font-size: 0.875rem; }
        .menu-item:hover, .menu-item.active { background-color: var(--sidebar-hover); color: white; border-left: 3px solid var(--brand-color); }
        .main-wrapper { flex-grow: 1; display: flex; flex-direction: column; overflow-y: auto; padding: 2rem; }
        
        /* Cards */
        .charts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
        .chart-box { background-color: var(--card-bg); border-radius: 0.5rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid var(--border-light); }
        .chart-header { margin-bottom: 1rem; font-size: 1rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; }
        
        .list-card { background-color: var(--card-bg); border-radius: 0.5rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid var(--border-light); margin-bottom: 2rem; }
        .list-title { margin: 0 0 1.5rem 0; font-size: 1.125rem; display: flex; align-items: center; gap: 0.5rem; border-bottom: 1px solid var(--border-light); padding-bottom: 1rem; }
        
        /* Table */
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 1rem; text-align: left; border-bottom: 1px solid var(--border-light); font-size: 0.875rem; }
        th { color: var(--text-muted); font-weight: 600; }
        
        .status-badge { padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.75rem; font-weight: 600; display: inline-block; }
        .badge-pending { background: rgba(244, 63, 94, 0.15); color: var(--rose); }
        .badge-progress { background: rgba(245, 158, 11, 0.15); color: var(--amber); }
        .badge-resolved { background: rgba(16, 185, 129, 0.15); color: var(--emerald); }
        
        .select-control { padding: 0.375rem 0.5rem; border: 1px solid var(--border-light); border-radius: 0.375rem; font-family: inherit; font-size: 0.8125rem; outline: none; background-color: #fff; cursor: pointer; }
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
            <a href="main-dashboard.php" class="menu-item"><i data-lucide="layout-dashboard"></i> मुख्य डॅशबोर्ड</a>
            <a href="power-telemetry.php" class="menu-item"><i data-lucide="bolt"></i> ऊर्जा ग्रीड (Power)</a>
            <a href="water-telemetry.php" class="menu-item"><i data-lucide="droplets"></i> जल वाहिनी (Water)</a>
            <a href="manage-news.php" class="menu-item"><i data-lucide="newspaper"></i> बातम्या व्यवस्थापन (News)</a>
            <a href="manage-grievances.php" class="menu-item active"><i data-lucide="message-square"></i> तक्रार निवारण (Grievances)</a>
            <a href="manage-wards.php" class="menu-item"><i data-lucide="map-pin"></i> वॉर्ड व्यवस्थापन</a>
        </div>
        <div style="padding: 1.5rem;">
            <a href="../pages/logout.php" class="menu-item" style="background:#1a1a27; border-radius:0.5rem; justify-content:center;">
                <i data-lucide="log-out"></i> लॉगआउट (Logout)
            </a>
        </div>
    </aside>

    <main class="main-wrapper">
        <h1 style="margin-top:0;"><i data-lucide="message-square" style="color:var(--brand-color); vertical-align:middle; margin-right:0.5rem;"></i> तक्रार निवारण आणि विश्लेषण (Grievance Center)</h1>
        <p style="color:var(--text-muted); margin-bottom:2rem;">नागरिकांच्या तक्रारींचे विभागनिहाय विश्लेषण करा व त्यांची सद्यस्थिती बदला.</p>

        <!-- Charts Row -->
        <div class="charts-grid">
            <div class="chart-box">
                <div class="chart-header"><i data-lucide="pie-chart" style="color:var(--indigo);"></i> तक्रार स्थिती विश्लेषण (Status Breakdown)</div>
                <canvas id="grievanceStatusChart" height="120"></canvas>
            </div>
            <div class="chart-box">
                <div class="chart-header"><i data-lucide="bar-chart-3" style="color:var(--amber);"></i> विभागनिहाय विभागणी (By Department)</div>
                <canvas id="grievanceDeptChart" height="120"></canvas>
            </div>
        </div>

        <!-- Table Row -->
        <div class="list-card">
            <h3 class="list-title"><i data-lucide="table" style="color:var(--brand-color);"></i> तक्रारींचे रेकॉर्ड्स (Grievance Records)</h3>
            <div style="overflow-x:auto;">
                <table>
                    <thead>
                        <tr>
                            <th>टॅकिंग आयडी (ID)</th>
                            <th>नागरिकाचे नाव (Name)</th>
                            <th>मोबाईल (Mobile)</th>
                            <th>विभाग (Department)</th>
                            <th>वॉर्ड (Ward)</th>
                            <th>तक्रार (Grievance)</th>
                            <th>स्थिती (Status)</th>
                            <th>बदला (Action)</th>
                        </tr>
                    </thead>
                    <tbody id="grievances-table-body">
                        <tr><td colspan="8" style="text-align:center;">तक्रारी लोड होत आहेत...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>

    <script>
        lucide.createIcons();

        const DEFAULT_GRIEVANCES = [
            {
                tracking_id: 'GRV-2026-9481',
                full_name: 'रामचंद्र पाटील',
                mobile: '9876543210',
                department: 'power',
                ward: 'प्रभाग क्र. ३ (पश्चिम गल्ली)',
                description: 'गेल्या २ दिवसांपासून आमच्या प्रभागात विजेचा दाब अत्यंत कमी आहे, त्यामुळे घरगुती उपकरणे चालत नाहीत.',
                status: 'Pending',
                created_at: new Date(Date.now() - 86400000).toISOString(),
                formatted_date: '२३ मे २०२६'
            },
            {
                tracking_id: 'GRV-2026-1049',
                full_name: 'श्रीमती सुजाता शिंदे',
                mobile: '9123456789',
                department: 'water',
                ward: 'प्रभाग क्र. १ (मुख्य बाजारपेठ)',
                description: 'जलवाहिनीला गळती लागली असून पिण्याचे पाणी वाया जात आहे. कृपया त्वरित दुरुस्ती व्हावी.',
                status: 'Resolved',
                created_at: new Date(Date.now() - 172800000).toISOString(),
                formatted_date: '२२ मे २०२६'
            }
        ];

        let statusChartInstance = null;
        let deptChartInstance = null;

        // 1. DYNAMICALLY LOAD ALL GRIEVANCES
        async function fetchGrievanceData() {
            try {
                let grievancesList = [];
                try {
                    const response = await fetch('fetch-all-grievances.php');
                    const data = await response.json();
                    if (data.status === "success") {
                        grievancesList = data.data;
                    } else {
                        throw new Error(data.message);
                    }
                } catch (err) {
                    console.warn("Failed to fetch grievances from DB, loading from localStorage:", err);
                    let localGrv = localStorage.getItem('gramurja_grievances');
                    if (!localGrv) {
                        localStorage.setItem('gramurja_grievances', JSON.stringify(DEFAULT_GRIEVANCES));
                        grievancesList = DEFAULT_GRIEVANCES;
                    } else {
                        grievancesList = JSON.parse(localGrv);
                    }
                }

                const tableBody = document.getElementById('grievances-table-body');
                if (grievancesList.length === 0) {
                    tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:var(--text-muted);">कोणतीही तक्रार नोंदवलेली नाही.</td></tr>`;
                    updateCharts(grievancesList);
                    return;
                }

                let html = '';
                grievancesList.forEach(g => {
                    let statusClass = 'badge-pending';
                    let statusText = 'प्रलंबित (Pending)';
                    if (g.status.toLowerCase() === 'resolved') {
                        statusClass = 'badge-resolved';
                        statusText = 'निवारण (Resolved)';
                    } else if (g.status.toLowerCase() === 'in progress' || g.status.toLowerCase() === 'progress') {
                        statusClass = 'badge-progress';
                        statusText = 'प्रक्रिया सुरू (Progress)';
                    }

                    // Format department name readable
                    let deptDisplay = g.department;
                    if (g.department === 'power') deptDisplay = '⚡ वीज विभाग';
                    else if (g.department === 'water') deptDisplay = '💧 पाणी विभाग';
                    else if (g.department === 'sanitation') deptDisplay = '🧹 स्वच्छता विभाग';
                    else if (g.department === 'agriculture') deptDisplay = '🌾 कृषी विभाग';

                    html += `
                        <tr>
                            <td style="font-family:monospace;font-weight:600;color:var(--brand-color);">${g.tracking_id}</td>
                            <td style="font-weight:500;">${g.full_name}</td>
                            <td>${g.mobile}</td>
                            <td>${deptDisplay}</td>
                            <td>${g.ward}</td>
                            <td style="max-width: 200px; font-size:0.8rem; line-height:1.4;" title="${g.description}">${g.description}</td>
                            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                            <td>
                                <select onchange="updateGrievanceStatus('${g.tracking_id}', this.value)" class="select-control">
                                    <option value="Pending" ${g.status === 'Pending' ? 'selected' : ''}>प्रलंबित (Pending)</option>
                                    <option value="In Progress" ${g.status === 'In Progress' || g.status === 'Progress' ? 'selected' : ''}>प्रक्रिया सुरू (Progress)</option>
                                    <option value="Resolved" ${g.status === 'Resolved' ? 'selected' : ''}>निवारण (Resolved)</option>
                                </select>
                            </td>
                        </tr>
                    `;
                });

                tableBody.innerHTML = html;
                updateCharts(grievancesList);
            } catch (error) {
                console.error("Grievances rendering failed:", error);
            }
        }

        // 2. STATUS UPDATE CONTROLLER
        async function updateGrievanceStatus(trackingId, newStatus) {
            try {
                let success = false;
                try {
                    const response = await fetch('update-grievance-status.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ tracking_id: trackingId, status: newStatus })
                    });
                    const result = await response.json();
                    if (result.status === "success") {
                        success = true;
                    } else {
                        alert("त्रुटी: " + result.message);
                    }
                } catch (e) {
                    console.warn("Failed to write status to DB, updating locally:", e);
                    let localGrv = JSON.parse(localStorage.getItem('gramurja_grievances') || '[]');
                    const found = localGrv.find(item => item.tracking_id === trackingId);
                    if (found) {
                        found.status = newStatus;
                        found.updated_at = new Date().toISOString();
                        found.last_updated = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                        localStorage.setItem('gramurja_grievances', JSON.stringify(localGrv));
                        success = true;
                    }
                }

                if (success) {
                    fetchGrievanceData(); // Reload
                }
            } catch (error) {
                alert("सर्व्हरशी संपर्क होऊ शकला नाही.");
            }
        }

        // 3. ANALYTICAL CHARTS CONTROLLER
        function updateCharts(grievances) {
            // Count Status
            let pendingCount = 0;
            let progressCount = 0;
            let resolvedCount = 0;

            // Count Depts
            let powerCount = 0;
            let waterCount = 0;
            let sanitationCount = 0;
            let agriCount = 0;

            grievances.forEach(g => {
                const s = g.status.toLowerCase();
                if (s === 'pending') pendingCount++;
                else if (s === 'resolved') resolvedCount++;
                else progressCount++;

                const d = g.department.toLowerCase();
                if (d.includes('power') || d === 'power') powerCount++;
                else if (d.includes('water') || d === 'water') waterCount++;
                else if (d.includes('sanitation') || d === 'sanitation') sanitationCount++;
                else agriCount++;
            });

            // Status Pie Chart
            const ctxStatus = document.getElementById('grievanceStatusChart').getContext('2d');
            if (statusChartInstance) statusChartInstance.destroy();
            statusChartInstance = new Chart(ctxStatus, {
                type: 'doughnut',
                data: {
                    labels: ['प्रलंबित (Pending)', 'प्रक्रिया सुरू (Progress)', 'निवारण (Resolved)'],
                    datasets: [{
                        data: [pendingCount, progressCount, resolvedCount],
                        backgroundColor: ['#f43f5e', '#f59e0b', '#10b981'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    cutout: '60%',
                    plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Poppins' } } } }
                }
            });

            // Department Bar Chart
            const ctxDept = document.getElementById('grievanceDeptChart').getContext('2d');
            if (deptChartInstance) deptChartInstance.destroy();
            deptChartInstance = new Chart(ctxDept, {
                type: 'bar',
                data: {
                    labels: ['वीज (Power)', 'पाणी (Water)', 'स्वच्छता', 'कृषी'],
                    datasets: [{
                        label: 'तक्रारींची संख्या',
                        data: [powerCount, waterCount, sanitationCount, agriCount],
                        backgroundColor: ['#3b82f6', '#0ea5e9', '#6366f1', '#10b981'],
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, ticks: { stepSize: 1 } }
                    }
                }
            });
        }

        // Boot
        document.addEventListener("DOMContentLoaded", fetchGrievanceData);
    </script>
</body>
</html>
