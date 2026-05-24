<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once '../js/db-config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. BECOME BILINGUAL: Support both Dashboard JSON and Sidebar Forms
    $inputData = json_decode(file_get_contents("php://input"), true);
    
    $raw_ward = isset($inputData['ward_id']) ? $inputData['ward_id'] : (isset($_POST['ward_id']) ? $_POST['ward_id'] : null);
    $raw_status = isset($inputData['status']) ? $inputData['status'] : (isset($_POST['status']) ? $_POST['status'] : null);

    // 2. Validate
    $ward_id = filter_var($raw_ward, FILTER_VALIDATE_INT);
    $status = filter_var($raw_status, FILTER_SANITIZE_STRING);
    
    // Auto-assign schedule status
    $supply_time = ($status === 'ON') ? 'प्रशासकीय अपडेट (सुरू)' : 'पुढील सूचना मिळेपर्यंत बंद';

    if ($ward_id && $status) {
        try {
            // 3. BULLETPROOF SQL: Check existence first
            $checkStmt = $pdo->prepare("SELECT ward_id FROM water_telemetry WHERE ward_id = :id");
            $checkStmt->execute([':id' => $ward_id]);
            
            if ($checkStmt->rowCount() > 0) {
                // Update
                $stmt = $pdo->prepare("UPDATE water_telemetry SET valve_status = :status, supply_time = :time, last_updated = CURRENT_TIMESTAMP WHERE ward_id = :id");
            } else {
                // Insert
                $stmt = $pdo->prepare("INSERT INTO water_telemetry (ward_id, valve_status, supply_time) VALUES (:id, :status, :time)");
            }
            
            $stmt->execute([
                ':id' => $ward_id,
                ':status' => $status,
                ':time' => $supply_time
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