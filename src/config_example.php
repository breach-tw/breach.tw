<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'breachtw');
define('DB_USER', 'breachtw');
define('DB_PASS', 'breachtw');
define('DB_TIMEZONE', 'Asia/Taipei');

define('SMTP_HOST', 'smtp-relay.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'account');
define('SMTP_PASS', 'password');
define('SMTP_SEME', 'tls');
define('SMTP_EMAIL', 'mailer@breach.tw');
define('SMTP_NICK', '台灣抓漏小天使');

define('EMAIL_VERIFICATION_SUBJECT', '台灣抓漏小天使 E-mail 驗證');
define('EMAIL_VERIFICATION_CONTENT', 'Hi, §name§<br><br>以下為您的驗證網址：<br><a href="https://breach.tw/verify.php?code=§code§">https://breach.tw/verify.php?code=§code§</a><br><br>感謝您的使用');

$connection_string = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', DB_HOST, DB_NAME);
$db = new PDO($connection_string, DB_USER, DB_PASS);
