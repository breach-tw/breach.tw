<?php $title = '常見問題';
    require 'src/header.php';
?>

<header class="jumbotron jumbotron-fluid">
    <div class="container">
        <h1 ><?=$title?></h1>
    </div>
</header>

<div class="container">
    <h3 class="breach-title" id="section1">個資被洩露，我應該怎麼做？</h3> 
    <p>個資一旦被外洩就很難收回，但您可以盡力將傷害降到最低。<br/>例如檢查是否有不同網站共用密碼，注意個資有沒有被拿去註冊奇怪的帳號。<br/>另外密碼也盡量避免使用身分證或生日的組合，以免有心人士透過外洩的個資猜到您的密碼。</p>

    <h3 class="breach-title" id="section2">這是詐騙嗎？</h3>    
    <p>請您放心，這個網站只是一群熱愛資安的青年自發設立的網站，旨在加強大眾的資安意識。<br/>在您按下送出搜尋按鈕後，您的資料會透過雜湊的方式去識別化，我們也無從得知您的姓名及身份證字號。</p>


    <h3 class="breach-title" id="section3">雜湊是什麼？</h3> 
    <p>雜湊是一種對資料的處理方法，可將任意資料轉換成固定長度的字串。將兩筆不同的資料雜湊後，得到相同結果的機率極低。而雜湊後的字串極難轉換回原本的資料。<br/>透過這兩個特性，我們可以在不知道您的姓名及身分證字號的情況下，辨別資料庫內是否含有您的資料。</p>  

    <h3 class="breach-title" id="section4">通知會從哪個電子郵件地址寄送？</h3> 
    <p>我們的電子郵件皆會從 <code>mailer@breach.tw</code> 寄出</p>

    <h3 class="breach-title" id="section5"> API 要怎麼用？</h3> 
    <p>我們目前還在撰寫 API 文件，若有急需請洽 <a href="https://t.me/seadog007">https://t.me/seadog007</a></p>

    <h3 class="breach-title" id="section6">網站架設在哪裡？</h3> 
    <p>主資料庫存放在 Google Cloud SQL 上，網頁服務及資料庫備援由 <a href="https://cras.4202.tw">黃羿</a> 及 <a href="https://seadog007.work">尤理衡</a> 無償提供。</p>
</div>

<?php require 'src/footer.php'; ?>
