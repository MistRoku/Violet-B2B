<?php
session_start();
require 'config.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$userId = $_SESSION['user_id'];
$role = $_SESSION['role'];

$leadsStmt = $pdo->prepare("SELECT COUNT(*) FROM leads WHERE user_id = ?");
$leadsStmt->execute([$userId]);
$leadsCount = $leadsStmt->fetchColumn();

$contactsStmt = $pdo->prepare("SELECT COUNT(*) FROM contacts WHERE user_id = ?");
$contactsStmt->execute([$userId]);
$contactsCount = $contactsStmt->fetchColumn();

$businessesCount = $pdo->query("SELECT COUNT(*) FROM businesses")->fetchColumn();
$usersCount = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();

echo json_encode([
    'leads' => $leadsCount,
    'contacts' => $contactsCount,
    'businesses' => $businessesCount,
    'users' => $usersCount,
    'role' => $role
]);
?>
