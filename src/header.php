<?php
require 'config.php';
?>
<!DOCTYPE HTML>
<html>
<head>
<title><?=isset($title) ? $title.' | ':''?>台灣抓漏小天使</title>
<meta charset="utf-8">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="/styles/index.css">
<link rel="icon" href="/images/logo.svg">
<link rel="icon" href="/images/logo.png">
<script src="https://cdn.jsdelivr.net/gh/emn178/js-sha1/build/sha1.min.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<?php include 'src/og.php'; ?>
</head>
<body>
	<nav class="navbar navbar-expand-lg navbar-dark" >
		<div class="container">
			<a class="navbar-brand" href="index.php"> 
				<img src="/images/logo.svg" width="30" height="30" class="d-inline-block align-top" style="filter: invert(1)" alt="">
				台灣抓漏小天使
			</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbar">
				<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
					<?php $uri = $_SERVER['REQUEST_URI'];?>
					<li class="nav-item <?= $uri=='/search.php'?'active':''?>">
						<a class="nav-link" href="search.php">搜尋洩漏紀錄</a>
					</li>
					<li class="nav-item <?= $uri=='/subscribe.php'?'active':''?>">
						<a class="nav-link" href="subscribe.php">訂閱外洩事件</a>
					</li>
					<li class="nav-item <?= $uri=='/breaches.php'?'active':''?>">
						<a class="nav-link" href="breaches.php">重大外洩事件</a>
					</li>
					<li class="nav-item <?= $uri=='/stat.php'?'active':''?>">
						<a class="nav-link" href="stat.php">網站統計數據</a>
					</li>
					<li class="nav-item <?= $uri=='/faq.php'?'active':''?>">
						<a class="nav-link" href="faq.php">常見問題</a>
					</li>
					<li class="nav-item <?= $uri=='/about.php'?'active':''?>">
						<a class="nav-link" href="about.php">關於本服務</a>
					</li>
				</ul>
				<ul class="navbar-nav my-2 my-lg-0" style="flex-direction: row;">
					<li class="nav-item" style="padding-right: .5rem;padding-left: .5rem;">
						<a class="nav-link" href="https://www.facebook.com/breach.tw/" target="_blank">
							<img src="/images/facebook.svg" width="24" height="24" class="d-inline-block align-top" style="filter: invert(1)" alt="">
						</a>
					</li>
					<li class="nav-item" style="padding-right: .5rem;padding-left: .5rem;">
						<a class="nav-link" href="https://github.com/seadog007/breach.tw" target="_blank">
							<img src="/images/github.svg" width="24" height="24" class="d-inline-block align-top" style="filter: invert(1)" alt="">
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
