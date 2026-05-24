<?php
// Enforce strict JSON communication
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once '../js/db-config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $inputData = json_decode(file_get_contents("php://input"), true);

    // Sanitize and validate inputs
    $ward_name = trim(filter_var($inputData['ward_name'], FILTER_SANITIZE_STRING));
    $population = filter_var($inputData['population'], FILTER_VALIDATE_INT);

    if (!empty($ward_name) && $population > 0) {
        try {
            // Inject the new geographical zone into the database
            $stmt = $pdo->prepare("INSERT INTO village_wards (ward_name, population) VALUES (:name, :pop)");
            $stmt->execute([
                ':name' => $ward_name,
                ':pop'  => $population
            ]);

            echo json_encode(["status" => "success", "message" => "नवीन वॉर्ड यशस्वीरित्या डेटाबेसमध्ये जोडला गेला!"]);
        } catch (PDOException $e) {
            // Catch duplicate names (Error code 23000)
            if ($e->getCode() == 23000) {
                echo json_encode(["status" => "error", "message" => "हा वॉर्ड आधीच डेटाबेसमध्ये अस्तित्वात आहे!"]);
            } else {
                echo json_encode(["status" => "error", "message" => "SQL Failure: " . $e->getMessage()]);
            }
        }
    } else {
        echo json_encode(["status" => "error", "message" => "कृपया वॉर्डचे नाव आणि लोकसंख्या अचूक भरा."]);
    }
    exit();
}
?>