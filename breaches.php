    <?php $title = '本網站收錄之重大外洩事件';
        require 'src/header.php';
        require 'src/common.php';
    ?>

    <header class="ts borderless extra padded massive center aligned fluid jumbotron">
        <h1 class="ts header"><?=$title?></h1>
    </header>

    <?php
        foreach(get_breaches() as $_ => $val){
    ?>
    <section class="ts narrow container">
        <h3 class="ts left aligned header"><?=$val['name']?></h3>
        <div class="ts very padded segment">
            <h4>外洩數量級：<?=number_format($val['round_k']*1000)?> 筆</h4>
            <p>敘述：<?=$val['description']?></p>
        </div>
    </section>
    <?php
        }
    ?>

    <section class="ts narrow container" style="padding-bottom: 60px;">
        <h3 class="ts left aligned header">資料來源 & 聲明</h3>
        <div class="ts very padded segment">
            <p>本網站資料來源皆為匿名人士提供，且本網站並不保存其原始資料，只保存雜湊值以便查詢洩漏情況。<br>攻擊本網站並無法獲得資料，且本網站保留法律追訴權。</p>
        </div>
    </section>

    <?php require 'src/footer.php'; ?>
