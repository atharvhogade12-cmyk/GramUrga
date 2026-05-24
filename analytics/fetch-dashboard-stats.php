<?php
// ENFORCE ERROR REPORTING (Delete this after fixing the bug)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
// ... rest of the code ...
// Enforce JSON headers for the API transmission
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once '../js/db-config.php';

try {
    // 1. Calculate Power Grid Distribution
    $powerStmt = $pdo->query("SELECT grid_status, COUNT(*) as count FROM power_telemetry GROUP BY grid_status");
    $powerCounts = ['ON' => 0, 'OFF' => 0];
    while($row = $powerStmt->fetch(PDO::FETCH_ASSOC)) {
        $powerCounts[$row['grid_status']] = (int)$row['count'];
    }

    // 2. Calculate Water Valve Distribution
    $waterStmt = $pdo->query("SELECT valve_status, COUNT(*) as count FROM water_telemetry GROUP BY valve_status");
    $waterCounts = ['ON' => 0, 'OFF' => 0];
    while($row = $waterStmt->fetch(PDO::FETCH_ASSOC)) {
        $waterCounts[$row['valve_status']] = (int)$row['count'];
    }

    // 3. Fetch Active Outage Alerts
    $alertStmt = $pdo->query("SELECT w.ward_name, p.shutdown_reason FROM power_telemetry p JOIN village_wards w ON p.ward_id = w.ward_id WHERE p.grid_status = 'OFF' LIMIT 3");
    $alerts = $alertStmt->fetchAll(PDO::FETCH_ASSOC);

    // Package the aggregated data into a JSON response
    echo json_encode([
        "status" => "success",
        "charts" => [
            "power" => [$powerCounts['ON'], $powerCounts['OFF']], // Array: [Total ON, Total OFF]
            "water" => [$waterCounts['ON'], $waterCounts['OFF']]
        ],
        "alerts" => $alerts
    ]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Analytics DB breakdown: " . $e->getMessage()]);
}
?>