<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once '../js/db-config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);
    
    $fullName = $input['full_name'] ?? '';
    $mobile = $input['mobile'] ?? '';
    $department = $input['department'] ?? '';
    $ward = $input['ward'] ?? '';
    $description = $input['description'] ?? '';

    if (!$fullName || !$mobile || !$department || !$ward || !$description) {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit;
    }

    $trackingId = "GRV-" . date("Y") . "-" . rand(1000, 9999);

    try {
        $stmt = $pdo->prepare("INSERT INTO grievances (tracking_id, full_name, mobile, department, ward, description, status) VALUES (?, ?, ?, ?, ?, ?, 'Pending')");
        $stmt->execute([$trackingId, $fullName, $mobile, $department, $ward, $description]);

        echo json_encode([
            "status" => "success",
            "tracking_id" => $trackingId,
            "message" => "तक्रार यशस्वीरित्या नोंदवली गेली."
        ]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
