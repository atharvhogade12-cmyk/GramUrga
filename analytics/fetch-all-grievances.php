<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(["status" => "error", "message" => "Unauthorized access."]);
    exit();
}

require_once '../js/db-config.php';

try {
    $stmt = $pdo->query("SELECT tracking_id, full_name, mobile, department, ward, description, status, DATE_FORMAT(created_at, '%d %b %Y') as formatted_date, DATE_FORMAT(updated_at, '%d %b %Y') as last_updated FROM grievances ORDER BY created_at DESC");
    $grievances = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $grievances
    ]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
