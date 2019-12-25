<?php $title = '常見問題';
    require 'src/header.php';
?>

<header class="jumbotron jumbotron-fluid">
    <div class="container">
        <h1 ><?=$title?></h1>
    </div>
</header>

<div class="container">
    <h3 class="breach-title" id="what-should-i-do-if-leaked">個資被洩露，我應該怎麼做？</h3> 
    <p>個資一旦被外洩就很難收回，但您可以盡力將傷害降到最低。<br/>例如檢查是否有不同網站共用密碼，注意個資有沒有被拿去註冊奇怪的帳號。<br/>另外密碼也盡量避免使用身分證或生日的組合，以免有心人士透過外洩的個資猜到您的密碼。</p>

    <h3 class="breach-title" id="is-this-fraud">這是詐騙嗎？</h3>    
    <p>請您放心，這個網站只是一群熱愛資安的青年自發設立的網站，旨在加強大眾的資安意識。<br/>在您按下送出搜尋按鈕後，您的資料會透過雜湊的方式去識別化，我們也無從得知您的姓名及身份證字號。</p>


    <h3 class="breach-title" id="what-is-hash">雜湊是什麼？</h3> 
    <p>雜湊是一種對資料的處理方法，可將任意資料轉換成固定長度的字串。將兩筆不同的資料雜湊後，得到相同結果的機率極低。而雜湊後的字串極難轉換回原本的資料。<br/>透過這兩個特性，我們可以在不知道您的姓名及身分證字號的情況下，辨別資料庫內是否含有您的資料。</p>  

    <h3 class="breach-title" id="which-email-address-would-notification-come-from">通知會從哪個電子郵件地址寄送？</h3> 
    <p>我們的電子郵件皆會從 <code>mailer@breach.tw</code> 寄出</p>

    <h3 class="breach-title" id="how-to-use-api"> API 要怎麼用？</h3> 
    <p>我們目前還在撰寫 API 文件，相關文件可於 <a href="https://github.com/breach-tw/breach.tw/tree/example_api_clients">GitHub 專案找到</a></p>

    <h3 class="breach-title" id="where-is-the-site-running">網站架設在哪裡？</h3> 
    <p>網頁服務及查詢資料庫存放於香港商 Starlight Systems Company 之主機，訂閱通知所用資料庫由 台灣數位串流有限公司 提供。</p>
</div>

<?php require 'src/footer.php'; ?>
