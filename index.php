<?php include 'src/config.php'; ?>
<!DOCTYPE HTML>
<html>
<head>
<title>台灣抓漏小天使</title>
<meta charset="utf-8">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
<link href="//fonts.googleapis.com/earlyaccess/notosanstc.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="styles/tocas.css">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<?php include 'src/og.php'; ?>
<style>
html, body
{
    height: 100%;
    width: 100%;
}
p
{
	/*font-family: Hacked;*/
	font-size: 2em !important;
    padding-top: 7px;
}
.mobile p
{
	font-size: 1em !important;
}
h1
{
	/*font-family: Hacked;*/
	font-size: 5em !important;
	letter-spacing: 1px;
}
.mobile h1
{
	font-size: 2em !important;
}
/*
@font-face {
    font-family: Hacked;
    src: url(https://hackedfont.com/HACKED.ttf);
}
*/
</style>
</head>
<body style="background-image: url('images/main.jpg'); background-size: cover; background-repeat: no-repeat; background-position: center center">
    <div style="position: absolute; width: 100%; height: 100%; background: radial-gradient(ellipse at center, rgba(0,0,0,0.50) 0%,rgba(0,0,0,0.65) 100%); display: flex;    align-items: center;
    justify-content: center;flex-direction: column;text-align: center;">

        <div class="large device only">
            <h1 class="ts center aligned inverted header">
		台灣抓漏小天使
                <div class="sub header">
					<p>個資外洩追蹤系統</p>
                </div>
            </h1>

            <br>
            <a href="search.php" class="ts inverted medium basic button">開始使用</a>
            <a href="about.php" class="ts inverted medium basic button">關於本服務</a>
        </div>

        <div class="mobile only">
            <h1 class="ts center aligned inverted header mobile">
		台灣抓漏小天使
                <div class="sub header">
					<p class="mobile">個資外洩追蹤系統</p>
                </div>
            </h3>

            <a href="search.php" class="ts inverted small basic button">開始使用</a>
        </div>

    </div>

</body>
</html>
