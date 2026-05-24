<?php
// Enforce JSON headers for the API transmission
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// LIVE REMOTE SERVER PARAMS (From your ezyro dashboard)
$host     = getenv("DB_HOST") ?: "localhost"; 
$dbname   = getenv("DB_NAME") ?: "your_database_name"; 
$username = getenv("DB_USER") ?: "your_username"; 

// PUT YOUR ACTUAL HOSTING ACCOUNT PASSWORD BETWEEN THESE QUOTES:
$password = getenv("DB_PASS") ?: "your_password"; 

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