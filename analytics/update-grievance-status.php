<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(["status" => "error", "message" => "Unauthorized access."]);
    exit();
}

require_once '../js/db-config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);
    
    $trackingId = $input['tracking_id'] ?? '';
    $status = $input['status'] ?? '';

    if (!$trackingId || !$status) {
        echo json_encode(["status" => "error", "message" => "Tracking ID and status are required."]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("UPDATE grievances SET status = ? WHERE tracking_id = ?");
        $stmt->execute([$status, $trackingId]);

        echo json_encode([
            "status" => "success",
            "message" => "Grievance status updated successfully."
        ]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
