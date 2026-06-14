<?php
// Enforce JSON headers for the API transmission
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// LIVE REMOTE SERVER PARAMS (From your ezyro dashboard)
$host     = getenv("DB_HOST") ?: "sql312.ezyro.com"; 
$dbname   = getenv("DB_NAME") ?: "ezyro_41983904_gramurga"; 
$username = getenv("DB_USER") ?: "ezyro_41983904"; 

// Set DB_PASS as an environment variable on your server (never hardcode this).
// On ezyro/cPanel: use the "Environment Variables" panel or .htaccess SetEnv.
$password = getenv("DB_PASS") ?: "";

try {
    // Establish the connection pipeline to MySQL
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    
    // Force PDO to throw exceptions on errors so they don't fail silently
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
} catch (PDOException $e) {
    // If the connection fails, spit out the exact error
    echo json_encode(["status" => "error", "message" => "Database link failure: " . $e->getMessage()]);
    exit();
}
?>