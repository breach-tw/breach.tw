    <?php $title = '網站統計數據';
        require 'src/header.php';
        require 'src/common.php';
        $stat = site_stat();
    ?>

    <header class="ts borderless extra padded massive center aligned fluid jumbotron">
        <h1 class="ts header"><?=$title?></h1>
        <p style="color: white">本頁數據產生於 <?=$stat['cache_gen_time']?> (GMT+8)</p>
    </header>

    <section class="ts narrow container">
        <h3 class="ts left aligned header">資料覆蓋率統計</h3>
        <div class="ts very padded segment">
            <p>不重複洩漏數量：<?=$stat['unique_hash']?>
            <br>台灣人口數量：<?=$stat['total_pop']?>
            <br>估計數據覆蓋量：<?=intval($stat['cover_rate'] * 10000)/100?> %</p>
            <p>以上根據政府於 <?=intval($stat['total_pop_month'] / 100)?> 年 <?=$stat['total_pop_month'] % 100?> 月的人口統計數據</p>
        </div>
    </section>

    <section class="ts narrow container">
        <h3 class="ts left aligned header">搜尋統計</h3>
        <div class="ts very padded segment">
            <p>有效搜尋總數：<?=$stat['total_unique_search']?>
            <br>命中數量：<?=$stat['hit']?>
            <br>未命中數量：<?=$stat['no_hit']?>
            <br>命中率：<?=intval($stat['hit_rate'] * 10000)/100?> %</p>
            <p>*有效搜尋總數：Unique hash in search log
            <br>*命中率：（命中數量/有效搜尋總數）</p>
        </div>
    </section>

    <section class="ts narrow container">
        <h3 class="ts left aligned header">數據來源統計</h3>
        <div class="ts very padded segment">
            <table class="ts striped celled table">
                <tr><td>TBD</td></tr>
            </table>
        </div>
    </section>

    <?php require 'src/footer.php'; ?>
