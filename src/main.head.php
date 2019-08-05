<?php require 'config.php'; ?>
<!DOCTYPE HTML>

<head>
    <title><?= $title . ' │ 台灣抓漏小天使' ?></title>
    <script src="/js/simplemde.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/emn178/js-sha1/build/sha1.min.js"></script>
    <?php include 'src/configureMeta.php'; ?>
    <?php include 'src/configureCss.php'; ?>
    <?php include 'src/configureGa.php'; ?>
    <script>
        function expandMenu() {
            $('#largeMainNav').addClass('stackable');
            $('#mobileMainNav').addClass('hidden');
        }

        function collapseMenu() {
            $('#largeMainNav').removeClass('stackable');
            $('#mobileMainNav').removeClass('hidden');
        }
    </script>
</head>