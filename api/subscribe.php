<?php
require_once '../src/common.php';
$res = [];

$res['status'] = 0;
if(!is_sha1($_GET['hash'])){
	$res['status'] = '1';
	$res['error'] = '雜湊值格式錯誤';
}

if(!filter_var($_GET['email'], FILTER_VALIDATE_EMAIL)){
	$res['status'] = '1';
	$res['error'] = 'E-mail 格式錯誤';
}

$captcha = recaptcha_verify($_GET['token']);
if(!$captcha->success){
    $res['status'] = '1';
    $res['error'] = 'reCAPTCHA 未通過';
}

if($res['status'] != '1'){
    $res = subscribe($_GET['name'], $_GET['email'], $_GET['hash']);
}

header('Content-Type: application/json');
echo json_encode($res);
