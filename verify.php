    <?php $title = 'E-mail 驗證';
        require 'src/header.php';
        require 'src/common.php';
    ?>

    <header class="ts borderless extra padded massive center aligned fluid jumbotron">
        <h1 class="ts header"><?=$title?></h1>
    </header>

    <section class="ts narrow container">
        <?php
            $status = verify_code($_GET['code']);
            if($status == 0){
        ?>
        <div align="center" class="ts very positive padded segment">
            <p align="center">E-mail 驗證完成，會在發現個資外洩時第一時間通知您。</p>
            <button class="ts primary button" onclick="window.location='about.php'">查看更多關於我們的訊息</button>
        </div>
        <?php
            }else if($status == 1){
        ?>
        <div align="center" class="ts very negative padded segment">
            <p align="center">E-mail 已驗證過。</p>
            <button class="ts primary button" onclick="window.location='index.php'">回首頁</button>
        </div>
        <?php
            }else{
        ?>
        <div align="center" class="ts very negative padded segment">
            <p align="center">未知錯誤，如持續發生請通知管理員。</p>
            <button class="ts primary button" onclick="window.location='index.php'">回首頁</button>
        </div>
        <?php
            }
        ?>
    </section>
