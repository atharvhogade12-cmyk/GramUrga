<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once '../js/db-config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. BECOME BILINGUAL: Check for JSON payload first, fallback to standard $_POST if empty
    $inputData = json_decode(file_get_contents("php://input"), true);
    
    $raw_ward = isset($inputData['ward_id']) ? $inputData['ward_id'] : (isset($_POST['ward_id']) ? $_POST['ward_id'] : null);
    $raw_status = isset($inputData['status']) ? $inputData['status'] : (isset($_POST['status']) ? $_POST['status'] : null);

    // 2. Validate extracted data
    $ward_id = filter_var($raw_ward, FILTER_VALIDATE_INT);
    $status = filter_var($raw_status, FILTER_SANITIZE_STRING);
    
    // Auto-assign reason
    $reason = ($status === 'ON') ? 'नियमित पुरवठा' : 'प्रशासकीय नियंत्रण (Admin Update)';

    if ($ward_id && $status) {
        try {
            // 3. BULLETPROOF SQL: Manually check if ward exists to avoid index collision
            $checkStmt = $pdo->prepare("SELECT ward_id FROM power_telemetry WHERE ward_id = :id");
            $checkStmt->execute([':id' => $ward_id]);
            
            if ($checkStmt->rowCount() > 0) {
                // If it exists, forcefully update it
                $stmt = $pdo->prepare("UPDATE power_telemetry SET grid_status = :status, shutdown_reason = :reason, last_updated = CURRENT_TIMESTAMP WHERE ward_id = :id");
            } else {
                // If it does not exist, insert it fresh
                $stmt = $pdo->prepare("INSERT INTO power_telemetry (ward_id, grid_status, shutdown_reason) VALUES (:id, :status, :reason)");
            }
            
            $stmt->execute([
                ':id' => $ward_id,
                ':status' => $status,
                ':reason' => $reason
            ]);

            echo json_encode(["status" => "success", "message" => "Updated"]);
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => "SQL Failure: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid parameters"]);
    }
    exit();
}
?>