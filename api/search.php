<?php
require_once '../src/common.php';
$res = [];

$res['status'] = 0;
if(!is_sha1($_GET['hash'])){
	$res['status'] = '1';
	$res['error'] = '輸入格式錯誤';
}

if($_GET['mode'] == 'recaptcha'){
    $captcha = recaptcha_verify($_GET['token']);
    if(!$captcha->success){
        $res['status'] = '1';
        $res['error'] = 'reCAPTCHA 未通過';
    }
}else if($_GET['mode'] == 'pow'){
    if (substr(sha1($_GET['hash'] . $_GET['nonce']), 0, POW_DIFF) != str_repeat('a', POW_DIFF)){
        $res['status'] = '1';
        $res['error'] = 'Nonce 錯誤：Nonce 必須滿足 sha1(request_hash + nonce) 的前 ' . POW_DIFF . ' 位等於 ' . str_repeat('a', POW_DIFF); 
    }
}else{
    $res['status'] = '1';
    $res['error'] = '驗證模式錯誤';
}

if($res['status'] != '1'){
    $res = search($_GET['hash']);
}

header('Content-Type: application/json');
echo json_encode($res);
