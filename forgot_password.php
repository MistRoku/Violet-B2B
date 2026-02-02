<?php
require 'config.php';
require 'send_notification.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $token = bin2hex(random_bytes(32));
        $stmt = $pdo->prepare("UPDATE users SET reset_token = ? WHERE id = ?");
        $stmt->execute([$token, $user['id']]);
        sendEmail($email, 'Password Reset', "Reset link: http://localhost/violetcrm/reset_password.php?token=$token");
        echo json_encode(['success' => true, 'message' => 'Reset email sent']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Email not found']);
    }
}
?>
