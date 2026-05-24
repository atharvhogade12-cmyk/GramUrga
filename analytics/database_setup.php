<?php
require_once '../js/db-config.php';

try {
    $sql = "
    CREATE TABLE IF NOT EXISTS news_bulletin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        is_urgent BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS grievances (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tracking_id VARCHAR(50) UNIQUE NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        mobile VARCHAR(15) NOT NULL,
        department VARCHAR(100) NOT NULL,
        ward VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS village_wards (
        ward_id INT AUTO_INCREMENT PRIMARY KEY,
        ward_name VARCHAR(100) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS power_telemetry (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ward_id INT UNIQUE NOT NULL,
        grid_status ENUM('ON', 'OFF') DEFAULT 'ON',
        shutdown_reason VARCHAR(255) DEFAULT 'नियमित पुरवठा',
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (ward_id) REFERENCES village_wards(ward_id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS water_telemetry (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ward_id INT UNIQUE NOT NULL,
        valve_status ENUM('ON', 'OFF') DEFAULT 'OFF',
        supply_time VARCHAR(255) DEFAULT 'पुढील सूचना मिळेपर्यंत बंद',
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (ward_id) REFERENCES village_wards(ward_id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS transit_telemetry (
        track_id INT AUTO_INCREMENT PRIMARY KEY,
        route_name VARCHAR(100) NOT NULL,
        next_bus_time VARCHAR(50) NOT NULL,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    INSERT INTO news_bulletin (category, title, content, is_urgent) VALUES
    ('शासकीय योजना', '\"माझी लाडकी बहीण\" योजना विशेष नोंदणी कॅम्प उद्यापासून!', 'अपूर्ण अर्ज असलेल्या महिलांसाठी ग्रामपंचायत कार्यालयात सकाळी ९ ते संध्या. ५ शिबिर. आधार, बँक पासबुक, रेशन कार्ड आणावे.', 1),
    ('वीज विभाग', 'उद्या दुपारी २ ते ५ वीजपुरवठा खंडित राहील', 'मुख्य ट्रान्सफॉर्मर दुरुस्तीचे काम असल्याने प्रभाग क्र. ३ आणि ४ मध्ये वीजपुरवठा बंद राहील. नागरिकांनी सहकार्य करावे.', 0);

    INSERT IGNORE INTO village_wards (ward_id, ward_name) VALUES
    (1, 'प्रभाग क्र. १ (मुख्य बाजारपेठ)'),
    (2, 'प्रभाग क्र. २ (शाळा परिसर)'),
    (3, 'प्रभाग क्र. ३ (पश्चिम गल्ली)');

    INSERT IGNORE INTO transit_telemetry (track_id, route_name, next_bus_time) VALUES
    (1, 'Kolhapur - Village Exp', '१०:१५ AM');
    ";

    $pdo->exec($sql);
    echo "<h3>Database tables created successfully!</h3>";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
