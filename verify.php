    <?php $title = 'E-mail 驗證';
        require 'src/header.php';
        require 'src/common.php';
    ?>

    <header class="jumbotron jumbotron-fluid">
        <div class="container">
            <h1 ><?=$title?></h1>
        </div>
    </header>

    <div class="container" style="max-width: 600px;margin: 10px auto;">
        <?php
            $status = verify_code($_GET['code']);
            if($status == 1){
        ?>
        <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">E-mail 驗證完成</h5>
                <p class="card-text">E-mail 驗證完成，會在發現個資外洩時第一時間通知您。</p>
                <a href="/about.php" class="btn btn-dark">查看更多關於我們的訊息</a>
            </div>
        </div>
        <?php
            }else if($status == 0){
        ?>
        <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">E-mail 已驗證過。</h5>
                <a href="/" class="btn btn-dark">回首頁</a>
            </div>
        </div>
        <?php
            }else{
        ?>
        <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">未知錯誤，如持續發生請通知管理員。</h5>
                <a href="/" class="btn btn-dark">回首頁</a>
            </div>
        </div>
        <?php
            }
        ?>
    </div>
