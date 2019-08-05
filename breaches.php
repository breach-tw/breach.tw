<?php
$title = '本網站收錄之重大外洩事件';
require 'src/common.php';
require 'src/main.head.php';
?>

<body>
    <?php require 'src/main.banner.php' ?>

    <div class="container grid-xl content">
        <?php
        foreach (get_breaches() as $_ => $val) {
            ?>
            <section class="card">
                <h3 class="card-title"><?= $val['name'] ?></h3>
                <div class="card-body">
                    <h4>外洩數量級：<?= number_format($val['round_k'] * 1000) ?> 筆</h4>
                    <p>敘述：<?= $val['description'] ?></p>
                </div>
            </section>
        <?php
        }
        ?>

        <section class="card">
            <h3 class="card-title">資料來源 & 聲明</h3>
            <div class="card-body">
                <p>本頁面僅顯示五千筆以上之外洩事件，剩餘較小（例如 Google 所得之名冊）將只會供受害者查詢。</p>
                <p>本網站資料來源皆為匿名人士提供，且本網站並不保存其原始資料，只保存雜湊值以便查詢洩漏情況。<br>攻擊本網站並無法獲得資料，且本網站保留法律追訴權。</p>
                <p>若想匿名提供資源，可聯絡 <a href="mailto:admin@breach.tw">admin@breach.tw</a>，建議可加上 PGP Key <a href="https://pgp.key-server.io/pks/lookup?op=get&fingerprint=on&search=0xF85EC40BC49D4040">C49D4040</a></p>
            </div>
        </section>
    </div>

    <?php require 'src/main.footer.php'; ?>
</body>