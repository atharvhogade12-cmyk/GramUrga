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
    
    $category = $input['category'] ?? '';
    $title = $input['title'] ?? '';
    $content = $input['content'] ?? '';
    $isUrgent = isset($input['is_urgent']) ? (int)$input['is_urgent'] : 0;

    if (!$category || !$title || !$content) {
        echo json_encode(["status" => "error", "message" => "All fields (category, title, content) are required."]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO news_bulletin (category, title, content, is_urgent) VALUES (?, ?, ?, ?)");
        $stmt->execute([$category, $title, $content, $isUrgent]);
        
        $newId = $pdo->lastInsertId();

        echo json_encode([
            "status" => "success",
            "id" => $newId,
            "message" => "News bulletin added successfully."
        ]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
