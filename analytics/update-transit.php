<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Establish connection tracking
require_once '../js/db-config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $inputData = json_decode(file_get_contents("php://input"), true);

    $bus_time   = filter_var($inputData['next_bus_time'], FILTER_SANITIZE_STRING);
    $route_name = filter_var($inputData['route_name'], FILTER_SANITIZE_STRING);

    if (!empty($bus_time) && !empty($route_name)) {
        try {
            // Always update the core tracker row (track_id = 1) for the main landing view
            $stmt = $pdo->prepare("INSERT INTO transit_telemetry (track_id, next_bus_time, route_name) 
                                   VALUES (1, :bus_time, :route_name) 
                                   ON DUPLICATE KEY UPDATE next_bus_time = :bus_time, route_name = :route_name");
            
            $stmt->execute([
                ':bus_time'   => $bus_time,
                ':route_name' => $route_name
            ]);

            echo json_encode(["status" => "success", "message" => "बस वेळापत्रक यशस्वीरित्या अपडेट झाले!"]);
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => "SQL Failure: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "कृपया सर्व रकाने अचूक भरा."]);
    }
    exit();
}
?>