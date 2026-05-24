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
    $id = isset($input['id']) ? (int)$input['id'] : 0;

    if (!$id) {
        echo json_encode(["status" => "error", "message" => "News bulletin ID is required."]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM news_bulletin WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode([
            "status" => "success",
            "message" => "News bulletin deleted successfully."
        ]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
