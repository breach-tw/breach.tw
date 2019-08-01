<?php

include 'src/common.php';
global $db;
$name='asdf';
$email='aa';
$hash='b';
$code='asdf';
$stmt = $db->prepare("INSERT INTO `subscribers`(`name`, `email`, `hash`, `email_verify_code`, `sub_ip`, `sub_time`) VALUES (:name, :email, :hash, :code, :ip, NOW())");
$stmt->execute([
        'name' => $name,
        'email' => $email,
        'hash' => $hash,
        'code' => $code,
        'ip' => get_ip()
]);
