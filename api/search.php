<?php
require_once '../src/common.php';
$res = [];

$res['status'] = 0;
if(!is_sha1($_GET['hash'])){
	$res['status'] = '1';
	$res['error'] = '輸入格式錯誤';
}

$captcha = recaptcha_verify($_GET['token']);
if(!$captcha->success){
    $res['status'] = '1';
    $res['error'] = 'reCAPTCHA 未通過';
}

if($res['status'] != '1'){
    $res = search($_GET['hash']);
}

echo json_encode($res);
