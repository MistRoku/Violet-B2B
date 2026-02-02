<?php
session_start();
require 'config.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare("UPDATE businesses SET name = ?, industry = ?, email = ?, phone = ? WHERE id = ?");
    $stmt->execute([$data['name'], $data['industry'], $data['email'], $data['phone'], $data['id']]);
    echo json_encode(['success' => true]);
}
?>
