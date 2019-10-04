    <?php $title = '常見問題';
        require 'src/header.php';
    ?>

    <header class="ts borderless extra padded massive center aligned fluid jumbotron">
        <h1 class="ts header"><?=$title?></h1>
    </header>

    <section class="ts narrow container" id="section1">
        <h3 class="ts left aligned header">個資被洩露，我應該怎麼做？</h3>
        <div class="ts very padded segment">
            <p>個資一旦被外洩就很難收回，但您可以盡力將傷害降到最低。<br>例如檢查是否有不同網站共用密碼，注意個資有沒有被拿去註冊奇怪的帳號。<br>另外密碼也盡量避免使用身分證或生日的組合，以免有心人士透過外洩的個資猜到您的密碼。</p>
        </div>
    </section>

    <section class="ts narrow container" id="section2">
        <h3 class="ts left aligned header">這是詐騙嗎？</h3>
        <div class="ts very padded segment">
            <p>請您放心，這個網站只是一群熱愛資安的青年自發設立的網站，旨在加強大眾的資安意識。<br>在您按下送出搜尋按鈕後，您的資料會透過雜湊的方式去識別化，我們不會也無法知道您的姓名及身份證字號。</p>
        </div>
    </section>

    <section class="ts narrow container" id="section3">
        <h3 class="ts left aligned header">雜湊是什麼？</h3>
        <div class="ts very padded segment">
            <p>雜湊是一種對資料的處理方法，可將任意資料轉換成固定長度的字串。將兩筆不同的資料雜湊後，得到相同結果的機率極低。而雜湊後的字串極難轉換回原本的資料。<br>透過這兩個特性，我們可以在不知道您的姓名及身分證字號的情況下，辨別資料庫內是否含有您的資料。</p>
        </div>
    </section>

    <section class="ts narrow container" id="section4">
        <h3 class="ts left aligned header">通知會從哪個電子郵件地址寄送？</h3>
        <div class="ts very padded segment">
            <p>我們的電子郵件皆會從 mailer@brench.tw 所寄出</p>
        </div>
    </section>

    <section class="ts narrow container" style="padding-bottom: 60px;" id="section5">
        <h3 class="ts left aligned header">API 要怎麼用？</h3>
        <div class="ts very padded segment">
            <p>我們目前還在撰寫 API 文件，若有急需請洽 <a href="https://t.me/seadog007">https://t.me/seadog007</a></p>
        </div>
    </section>

    <?php require 'src/footer.php'; ?>
