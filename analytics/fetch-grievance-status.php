<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once '../js/db-config.php';

$trackingId = $_GET['tracking_id'] ?? '';

if (!$trackingId) {
    echo json_encode(["status" => "error", "message" => "Tracking ID required."]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT tracking_id, department, status, DATE_FORMAT(updated_at, '%d %b %Y') as last_updated FROM grievances WHERE tracking_id = ?");
    $stmt->execute([$trackingId]);
    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($data) {
        echo json_encode([
            "status" => "success",
            "data" => $data
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "No grievance found with this ID."]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
