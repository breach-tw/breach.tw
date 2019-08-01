<?php
require_once '../src/common.php';
$res = [];
if(is_sha1($_GET['hash'])){
    $res = search($_GET['hash']);
}else{
	$res['status'] = '1';
	$res['error'] = 'Field Error';
}

echo json_encode($res);
