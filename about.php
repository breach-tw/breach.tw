    <?php $title = '關於本服務';
        require 'src/header.php';
        require 'src/common.php';
    ?>

    <header class="ts borderless extra padded massive center aligned fluid jumbotron">
        <h1 class="ts header"><?=$title?></h1>
    </header>

    <section class="ts narrow container">
        <h3 class="ts left aligned header">服務內容</h3>
        <div class="ts very padded segment">
            <p>本產品提供台灣（中華民國）之個資外洩事件查詢以及個資外洩追蹤服務。</p>
        </div>
    </section>

    <section class="ts narrow container">
        <h3 class="ts left aligned header">開發動機</h3>
        <div class="ts very padded segment">
            <p>本作品為教育部資訊安全人才培育計畫 108年度新型態資安暑期課程 AIS3 2019 資安實務專題競賽之產物。</p>
            <p>主要想法構思來自 Have I Been Pwned 以及 Experian IdentityWorks 兩個網站。</p>
        </div>
    </section>

    <section class="ts narrow container" style="padding-bottom: 60px;">
        <h3 class="ts left aligned header">技術細節</h3>
        <div class="ts very padded segment">
            <p>根據<a href="https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=I0050021">台灣個資法</a>規定之個資搜集方法過於複雜，故使用 SHA-1 雜湊函數將姓名以及身分證字號去識別化後回傳主機，同時也可避免開發者偷偷搜集使用者個資，增加使用者信任度。</p>
        </div>
    </section>

    <?php require 'src/footer.php'; ?>
