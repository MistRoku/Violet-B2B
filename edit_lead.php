<?php
session_start();
require 'config.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$userId = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare("UPDATE leads SET name = ?, email = ?, company = ? WHERE id = ? AND user_id = ?");
    $stmt->execute([$data['name'], $data['email'], $data['company'], $data['id'], $userId]);
    echo json_encode(['success' => true]);
}
?>
