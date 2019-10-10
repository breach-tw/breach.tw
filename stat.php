    <?php $title = '網站統計數據';
        require 'src/header.php';
        require 'src/common.php';
        $stat = site_stat();
    ?>

    <header class="jumbotron jumbotron-fluid">
        <div class="container">
            <h1 ><?=$title?></h1>
            <p class="lead">本頁數據產生於 <?=$stat['cache_gen_time']?> (GMT+8)</p>
        </div>
    </header>

    <div class="container">
        <h3 class="breach-title">資料覆蓋率統計</h3> 
        <p>不重複洩漏數量：<?=$stat['unique_hash']?>
        <br>台灣人口數量：<?=$stat['total_pop']?>
        <br>估計數據覆蓋量：<?=intval($stat['cover_rate'] * 10000)/100?> %</p>
        <p>以上根據政府於 <?=intval($stat['total_pop_month'] / 100)?> 年 <?=$stat['total_pop_month'] % 100?> 月的人口統計數據</p>


        <h3 class="breach-title">搜尋統計</h3> 
        <p>有效搜尋總數：<?=$stat['total_unique_search']?>
        <br>命中數量：<?=$stat['hit']?>
        <br>未命中數量：<?=$stat['no_hit']?>
        <br>命中率：<?=intval($stat['hit_rate'] * 10000)/100?> %</p>
        <p>*有效搜尋總數：Unique hash in search log
        <br>*命中率：（命中數量/有效搜尋總數）</p>

        <?php
            // Trash Code, Need someone to fix
            $predef_type = ['政府單位', '教育機構', '民間企業', '其他'];
        ?>
        <h3 class="breach-title">數據來源統計</h3> 
        <table class="table">  
            <thead>
                <tr>
                    <td>數據類別</td>
                    <td>大型洩漏</td>
                    <td>小型洩漏</td>
                    <td>總計</td>
                </tr>
            </thead>
            <tbody>
                <?php
                    foreach($predef_type as $tp){
                        echo '<tr><td>' . $tp . '</td>';
                        foreach($stat['source'] as $source){
                            $match = 0;
                            foreach($source as $data){
                                if ($data['type'] == $tp){
                                    $match = $data['count'];
                                }
                            }
                            echo '<td>' . $match . '</td>';
                        }
                        echo '</tr>';
                    }
                ?>
            </tbody>
        </table>
    </div>



    <?php require 'src/footer.php'; ?>
