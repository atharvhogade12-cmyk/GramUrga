<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || ($_SESSION['role'] !== 'admin' && $_SESSION['role'] !== 'news_head')) {
    header("Location: ../pages/admin-login.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="mr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ग्रामऊर्जा // बातम्या व्यवस्थापन (News Control)</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        :root {
            --sidebar-bg: #1e1e2d; --sidebar-hover: #1b1b29; --sidebar-text: #9899ac;
            --brand-color: #3b82f6; --bg-main: #f3f4f6; --card-bg: #ffffff;
            --text-dark: #1f2937; --text-muted: #6b7280; --border-light: #e5e7eb;
            --indigo: #6366f1; --emerald: #10b981; --rose: #f43f5e;
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
        .badge-urgent { background: rgba(244, 63, 94, 0.15); color: var(--rose); }
        .badge-normal { background: rgba(99, 102, 241, 0.15); color: var(--indigo); }
        
        /* Form */
        .input-group { margin-bottom: 1rem; }
        .input-group label { display: block; margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--text-muted); font-weight: 500; }
        .input-control { width: 100%; padding: 0.75rem; border: 1px solid var(--border-light); border-radius: 0.375rem; font-family: inherit; box-sizing: border-box; }
        .checkbox-group { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
        .checkbox-group label { font-size: 0.875rem; color: var(--text-dark); cursor: pointer; }
        
        .btn { width: 100%; padding: 0.75rem; background-color: var(--brand-color); color: white; border: none; border-radius: 0.375rem; font-weight: 600; cursor: pointer; transition: opacity 0.2s;}
        .btn:hover { opacity: 0.9; }
        .btn-danger { background-color: var(--rose); padding: 0.375rem 0.75rem; border-radius: 0.25rem; font-size: 0.75rem; color: white; text-decoration: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.25rem; width: auto; }
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
            <a href="manage-news.php" class="menu-item active"><i data-lucide="newspaper"></i> बातम्या व्यवस्थापन (News)</a>
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
        <h1 style="margin-top:0;"><i data-lucide="newspaper" style="color:var(--brand-color); vertical-align:middle; margin-right:0.5rem;"></i> बातम्या आणि घोषणा नियंत्रण (News Management)</h1>
        <p style="color:var(--text-muted); margin-bottom:2rem;">गावातील अधिकृत बातमीपत्र, योजना आणि महत्त्वाच्या सूचनांचे व्यवस्थापन करा.</p>

        <div class="grid-container">
            <div class="card">
                <h3 class="card-title"><i data-lucide="list" style="color:var(--indigo);"></i> घोषणांची यादी (Active Announcements)</h3>
                <div style="overflow-x:auto;">
                    <table>
                        <thead>
                            <tr>
                                <th>वर्गवारी (Category)</th>
                                <th>शीर्षक (Title)</th>
                                <th>तारीख (Date)</th>
                                <th>क्रिया (Action)</th>
                            </tr>
                        </thead>
                        <tbody id="news-table-body">
                            <tr><td colspan="4" style="text-align:center;">डेटा लोड होत आहे...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card">
                <h3 class="card-title"><i data-lucide="plus-circle" style="color:var(--emerald);"></i> नवीन घोषणा जोडा</h3>
                <form onsubmit="submitNews(event)">
                    <div class="input-group">
                        <label>वर्गवारी (Category)</label>
                        <select id="news_category" class="input-control" required>
                            <option value="शासकीय योजना">शासकीय योजना (Govt Schemes)</option>
                            <option value="वीज विभाग">वीज विभाग (Power Dept)</option>
                            <option value="पाणी विभाग">पाणी विभाग (Water Dept)</option>
                            <option value="कृषी विभाग">कृषी विभाग (Agriculture)</option>
                            <option value="सामान्य सूचना">सामान्य सूचना (General Notice)</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label>शीर्षक (Title)</label>
                        <input type="text" id="news_title" class="input-control" required placeholder="घोषणेचे शीर्षक प्रविष्ट करा">
                    </div>
                    <div class="input-group">
                        <label>तपशील (Content)</label>
                        <textarea id="news_content" class="input-control" rows="5" required placeholder="घोषणेचा संपूर्ण तपशील प्रविष्ट करा"></textarea>
                    </div>
                    <div class="checkbox-group">
                        <input type="checkbox" id="news_urgent" value="1">
                        <label for="news_urgent"><b>तातडीची सूचना का? (Is Urgent Alert ⚠️)</b></label>
                    </div>
                    <button type="submit" class="btn">घोषणा प्रसिद्ध करा (Publish)</button>
                </form>
            </div>
        </div>
    </main>

    <script>
        lucide.createIcons();

        const DEFAULT_NEWS = [
            {
                id: 1,
                category: 'शासकीय योजना',
                title: '"माझी लाडकी बहीण" योजना विशेष नोंदणी कॅम्प उद्यापासून!',
                content: 'अपूर्ण अर्ज असलेल्या महिलांसाठी ग्रामपंचायत कार्यालयात सकाळी ९ ते संध्या. ५ शिबिर. आधार, बँक पासबुक, रेशन कार्ड आणावे.',
                is_urgent: 1,
                created_at: new Date().toISOString()
            },
            {
                id: 2,
                category: 'वीज विभाग',
                title: 'उद्या दुपारी २ ते ५ वीजपुरवठा खंडित राहील',
                content: 'मुख्य ट्रान्सफॉर्मर दुरुस्तीचे काम असल्याने प्रभाग क्र. ३ आणि ४ मध्ये वीजपुरवठा बंद राहील. नागरिकांनी सहकार्य करावे.',
                is_urgent: 0,
                created_at: new Date().toISOString()
            }
        ];

        // 1. DYNAMICALLY LOAD THE NEWS BULLETINS
        async function fetchNewsData() {
            try {
                let newsList = [];
                try {
                    const response = await fetch('fetch-news.php');
                    const data = await response.json();
                    if (data.status === "success") {
                        newsList = data.data;
                    } else {
                        throw new Error(data.message);
                    }
                } catch (err) {
                    console.warn("Failed to fetch news from DB, loading from localStorage:", err);
                    let localNews = localStorage.getItem('gramurja_news');
                    if (!localNews) {
                        localStorage.setItem('gramurja_news', JSON.stringify(DEFAULT_NEWS));
                        newsList = DEFAULT_NEWS;
                    } else {
                        newsList = JSON.parse(localNews);
                    }
                }

                const tableBody = document.getElementById('news-table-body');
                if (newsList.length === 0) {
                    tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">कोणतीही बातमी उपलब्ध नाही.</td></tr>`;
                    return;
                }

                let html = '';
                newsList.forEach(news => {
                    const badgeClass = (news.is_urgent == 1 || news.is_urgent === true || news.is_urgent === "1") ? 'badge-urgent' : 'badge-normal';
                    const badgeText = (news.is_urgent == 1 || news.is_urgent === true || news.is_urgent === "1") ? 'महत्त्वाची ⚠️' : 'सामान्य';
                    const dateStr = news.formatted_date || new Date(news.created_at).toLocaleDateString('mr-IN', { day: 'numeric', month: 'short' });

                    html += `
                        <tr>
                            <td><span class="status-badge ${badgeClass}">${news.category} (${badgeText})</span></td>
                            <td style="font-weight:600; max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${news.title}</td>
                            <td>${dateStr}</td>
                            <td>
                                <button onclick="deleteNewsItem(${news.id})" class="btn-danger">
                                    <i data-lucide="trash-2" style="width:12px;height:12px;"></i> काढा (Delete)
                                </button>
                            </td>
                        </tr>
                    `;
                });
                tableBody.innerHTML = html;
                lucide.createIcons();
            } catch (error) {
                console.error("Failed to render news table:", error);
            }
        }

        // 2. PUBLISH/ADD NEWS BULLETIN
        async function submitNews(event) {
            event.preventDefault();
            
            const category = document.getElementById('news_category').value;
            const title = document.getElementById('news_title').value.trim();
            const content = document.getElementById('news_content').value.trim();
            const isUrgent = document.getElementById('news_urgent').checked ? 1 : 0;

            const payload = {
                category: category,
                title: title,
                content: content,
                is_urgent: isUrgent
            };

            try {
                let success = false;
                try {
                    const response = await fetch('add-news.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    const result = await response.json();
                    if (result.status === "success") {
                        success = true;
                    } else {
                        alert("त्रुटी: " + result.message);
                    }
                } catch (e) {
                    console.warn("Failed to write news to DB, inserting in localStorage:", e);
                    // Local Storage Insert
                    let localNews = JSON.parse(localStorage.getItem('gramurja_news') || '[]');
                    const nextId = localNews.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
                    const newNews = {
                        id: nextId,
                        category: payload.category,
                        title: payload.title,
                        content: payload.content,
                        is_urgent: payload.is_urgent,
                        created_at: new Date().toISOString()
                    };
                    localNews.unshift(newNews);
                    localStorage.setItem('gramurja_news', JSON.stringify(localNews));
                    success = true;
                }

                if (success) {
                    alert("✅ घोषणा यशस्वीरित्या प्रसिद्ध झाली!");
                    document.getElementById('news_title').value = '';
                    document.getElementById('news_content').value = '';
                    document.getElementById('news_urgent').checked = false;
                    fetchNewsData();
                }
            } catch (error) {
                alert("सर्व्हरशी संपर्क होऊ शकला नाही.");
            }
        }

        // 3. DELETE NEWS BULLETIN
        async function deleteNewsItem(id) {
            if (!confirm("घोषणा काढून टाकायची आहे का? (Are you sure?)")) return;

            try {
                let success = false;
                try {
                    const response = await fetch('delete-news.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: id })
                    });
                    const result = await response.json();
                    if (result.status === "success") {
                        success = true;
                    } else {
                        alert("त्रुटी: " + result.message);
                    }
                } catch (e) {
                    console.warn("Failed to delete news from DB, deleting from localStorage:", e);
                    // Local Storage Delete
                    let localNews = JSON.parse(localStorage.getItem('gramurja_news') || '[]');
                    localNews = localNews.filter(item => item.id !== id);
                    localStorage.setItem('gramurja_news', JSON.stringify(localNews));
                    success = true;
                }

                if (success) {
                    alert("✅ घोषणा यशस्वीरित्या काढली गेली!");
                    fetchNewsData();
                }
            } catch (error) {
                alert("सर्व्हरशी संपर्क होऊ शकला नाही.");
            }
        }

        // Boot
        document.addEventListener("DOMContentLoaded", fetchNewsData);
    </script>
</body>
</html>
