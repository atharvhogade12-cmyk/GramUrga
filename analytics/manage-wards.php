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
    <title>ग्रामऊर्जा // Ward Expansion</title>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-gradient: linear-gradient(135deg, #020617 0%, #0b1329 100%);
            --glass-bg: rgba(255, 255, 255, 0.03);
            --glass-border: rgba(255, 255, 255, 0.08);
            --brand-color: #3b82f6;
            --text-main: #f8fafc;
        }
        body { background: var(--bg-gradient); color: var(--text-main); font-family: 'Poppins', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 2rem; }
        .control-box { background: var(--glass-bg); border: 1px solid var(--glass-border); backdrop-filter: blur(20px); border-radius: 1.5rem; padding: 2.5rem; width: 100%; max-width: 450px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .input-group { margin-bottom: 1.5rem; }
        .input-group label { display: block; margin-bottom: 0.5rem; font-size: 0.875rem; color: #94a3b8; }
        .input-control { width: 100%; padding: 0.875rem; background: #0f172a; border: 1px solid var(--glass-border); color: white; border-radius: 0.5rem; outline: none; box-sizing: border-box; }
        .input-control:focus { border-color: var(--brand-color); }
        .btn { width: 100%; padding: 1rem; background: var(--brand-color); color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; transition: opacity 0.2s; }
        .btn:hover { opacity: 0.9; }
        .btn:disabled { background: #475569; cursor: not-allowed; }
    </style>
</head>
<body>

    <div class="control-box">
        <div style="text-align: center; margin-bottom: 2rem;">
            <i data-lucide="map-pin" style="color:var(--brand-color); width:40px; height:40px;"></i>
            <h2 style="margin:0.5rem 0 0 0; font-size:1.5rem;">नवीन वॉर्ड जोडा</h2>
            <p style="margin:0; font-size:0.875rem; color:#94a3b8;">Expand Village Database Infrastructure</p>
        </div>

        <form id="ward-form" onsubmit="submitNewWard(event)">
            <div class="input-group">
                <label>वॉर्डचे नाव (उदा. वॉर्ड क्र. ४ - शिवाजी नगर)</label>
                <input type="text" id="ward_name" class="input-control" required placeholder="Enter exact ward name">
            </div>
            <div class="input-group">
                <label>अंदाजित लोकसंख्या (Population Count)</label>
                <input type="number" id="population" class="input-control" required placeholder="e.g. 1500" min="1">
            </div>
            <button type="submit" id="submit-btn" class="btn">डेटाबेसमध्ये समाविष्ट करा</button>
        </form>

        <div style="text-align: center; margin-top: 1.5rem;">
            <a href="main-dashboard.php" style="color:#94a3b8; text-decoration:none; font-size:0.875rem;">← डॅशबोर्डवर परत जा</a>
        </div>
    </div>

    <script>
        lucide.createIcons();

        async function submitNewWard(event) {
            event.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.innerText = "प्रतीक्षा करा (Processing)...";
            submitBtn.disabled = true;

            const payload = {
                ward_name: document.getElementById('ward_name').value.trim(),
                population: document.getElementById('population').value
            };

            try {
                const response = await fetch('add-ward.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                
                if (result.status === "success") {
                    alert(result.message);
                    document.getElementById('ward-form').reset();
                } else {
                    alert("त्रुटी: " + result.message);
                }
            } catch (error) {
                console.error("Database Write Failed:", error);
                alert("सर्व्हरशी संपर्क होऊ शकला नाही.");
            } finally {
                submitBtn.innerText = "डेटाबेसमध्ये समाविष्ट करा";
                submitBtn.disabled = false;
            }
        }
    </script>
</body>
</html>
