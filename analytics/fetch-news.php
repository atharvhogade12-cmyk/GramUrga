<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once '../js/db-config.php';

try {
    $stmt = $pdo->query("SELECT id, category, title, content, DATE_FORMAT(created_at, '%d %b, %H:%i') as formatted_date, is_urgent FROM news_bulletin ORDER BY created_at DESC LIMIT 20");
    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $news
    ]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
