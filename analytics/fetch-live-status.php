<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once '../js/db-config.php';

try {
    // 1. Fetch Overall Latest Statuses (For the top 3 main cards)
    $powerStmt = $pdo->query("SELECT grid_status, shutdown_reason FROM power_telemetry ORDER BY last_updated DESC LIMIT 1");
    $powerData = $powerStmt->fetch(PDO::FETCH_ASSOC);

    $waterStmt = $pdo->query("SELECT valve_status, supply_time FROM water_telemetry ORDER BY last_updated DESC LIMIT 1");
    $waterData = $waterStmt->fetch(PDO::FETCH_ASSOC);

    $transitStmt = $pdo->query("SELECT next_bus_time, route_name FROM transit_telemetry WHERE track_id = 1 LIMIT 1");
    $transitData = $transitStmt->fetch(PDO::FETCH_ASSOC);

    // 2. NEW: Fetch dynamic Ward-by-Ward Status Array
    $wardsStmt = $pdo->query("
        SELECT w.ward_id, w.ward_name, 
               IFNULL(p.grid_status, 'ON') as power_status,
               IFNULL(w_t.valve_status, 'OFF') as water_status
        FROM village_wards w
        LEFT JOIN power_telemetry p ON w.ward_id = p.ward_id
        LEFT JOIN water_telemetry w_t ON w.ward_id = w_t.ward_id
        ORDER BY w.ward_id ASC
    ");
    $wardsData = $wardsStmt->fetchAll(PDO::FETCH_ASSOC);

    // 3. System Defaults
    $defaultPower   = ["grid_status" => "ON", "shutdown_reason" => "नियमित पुरवठा"];
    $defaultWater   = ["valve_status" => "OFF", "supply_time" => "वेळापत्रक उपलब्ध नाही"];
    $defaultTransit = ["next_bus_time" => "१०:१५ AM", "route_name" => "Kolhapur Express"];

    // 4. Dispatch Payload
    echo json_encode([
        "status"  => "success",
        "power"   => $powerData   ? $powerData   : $defaultPower,
        "water"   => $waterData   ? $waterData   : $defaultWater,
        "transit" => $transitData ? $transitData : $defaultTransit,
        "wards"   => $wardsData // This powers the dynamic UI
    ]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database breakdown: " . $e->getMessage()]);
}
?>