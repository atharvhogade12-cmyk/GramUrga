<?php
session_start();
// Connect to your live database
require_once '../js/db-config.php';

// Accept incoming JSON data from the frontend
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input = json_decode(file_get_contents("php://input"), true);
    
    $user = trim($input['username']);
    $pass = $input['password'];

    if (empty($user) || empty($pass)) {
        echo json_encode(["status" => "error", "message" => "कृपया सर्व माहिती भरा."]);
        exit();
    }

    try {
        // Securely fetch the profile matching the username
        $stmt = $pdo->prepare("SELECT password_hash, assigned_role FROM administrative_profiles WHERE username = :user LIMIT 1");
        $stmt->execute([':user' => $user]);
        $profile = $stmt->fetch();

        // Verify the password against the secure BCRYPT hash in the database
        if ($profile && password_verify($pass, $profile['password_hash'])) {
            
            // Set session variables
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['username'] = $user;
            $_SESSION['role'] = $profile['assigned_role'];
            
            // Dynamic Role Routing Engine
            $targetRoute = "";
            switch ($profile['assigned_role']) {
                case 'admin':
                    $targetRoute = "../analytics/main-dashboard.php";
                    break;
                case 'power_head':
                    $targetRoute = "../analytics/power-telemetry.php";
                    break;
                case 'water_head':
                    $targetRoute = "../analytics/water-telemetry.php";
                    break;
                case 'news_head':
                    $targetRoute = "../analytics/manage-news.php";
                    break;
                case 'weather_head':
                    $targetRoute = "../pages/weather-detector.html";
                    break;
                case 'transit_head':
                    $targetRoute = "../analytics/bus-tracker.html"; // Adjust to your actual file
                    break;
                default:
                    $targetRoute = "../index.html";
            }

            echo json_encode([
                "status" => "success", 
                "message" => "लॉगिन यशस्वी!", 
                "redirect" => $targetRoute
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "अवैध वापरकर्तानाव किंवा पासवर्ड!"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "सर्व्हर त्रुटी: " . $e->getMessage()]);
    }
    exit();
}
?>