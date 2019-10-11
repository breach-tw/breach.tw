<?php include 'src/config.php'; ?>
<!DOCTYPE HTML>
<html>

<head>
	<title>台灣抓漏小天使</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
	<link href="https://fonts.googleapis.com/css?family=Noto+Sans+TC:400,700&display=swap&subset=chinese-traditional" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php include 'src/og.php'; ?>
	<style>
		html,
		body {
			height: 100%;
			width: 100%;
			color: #FFF;
			font-family: 'Open Sans', 'Noto Sans TC', sans-serif;
		}

		body {
			background-image: url('images/main.jpg');
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center center;
		}

		#container {
			position: absolute;
			width: 100%;
			height: 100%;
			background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.65) 100%);
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			text-align: center;
		}

		h1 {
			font-size: 70px;
			font-weight: bold;
		}

		h3 {
			font-size: 32px;
		}

		.btn {
			border: 2px solid #f8f9fa;
			font-weight: bold;
		}

		@media (max-width: 768px) {
			h1 {
				font-size: 28px;
			}

			h3 {
				font-size: 16px;
			}
		}
	</style>
</head>

<body>
	<div id="container">
		<h1>台灣抓漏小天使</h1>
		<h3>個資外洩追蹤系統</h3>
		<br />
		<div>
			<a href="search.php" class="btn btn-outline-light">開始使用</a>
			<a href="about.php" class="btn btn-outline-light">關於本服務</a>
		</div>
	</div>
</body>

</html>