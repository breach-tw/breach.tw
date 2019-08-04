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
            <p>本產品提供台灣（中華民國）之個資外洩事件查詢及追蹤服務。<br>讓使用者了解自己是否存在於重大資安外洩事件清單中，且增加使用者之資訊安全素養。</p>
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
            <p>由於依據<a href="https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=I0050021">我國個人資料保護法</a>所規定之個資搜集方法過於繁雜，故使用 SHA-1 雜湊函數將姓名及身分證字號去識別化後回傳主機，亦可避免開發者暗中搜集使用者個資，提升使用者對本產品的信任。</p>
            <p>本網站資料來源皆為匿名人士提供，且本網站並不保存其原始資料，只保存雜湊值以便查詢洩漏情況。<br>攻擊本網站並無法獲得資料，且本網站保留法律追訴權。</p>
            <p>若想匿名提供資源，可聯絡 <a href="mailto:admin@breach.tw">admin@breach.tw</a>，建議可加上 PGP Key <a href="https://pgp.key-server.io/pks/lookup?op=get&fingerprint=on&search=0xF85EC40BC49D4040">C49D4040</a></p>
        </div>
    </section>

    <?php require 'src/footer.php'; ?>
