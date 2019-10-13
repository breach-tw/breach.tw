    <?php $title = '搜尋洩漏紀錄';
        require 'src/header.php';
    ?>

    <header class="jumbotron jumbotron-fluid">
        <div class="container">
            <h1 ><?=$title?></h1>
        </div>
    </header>

   
    <div class="padded container">
        <h1 class="breach-title">搜尋洩漏紀錄</h1>
        <p>輸入姓名及身分證字號，網頁會將去識別化的運算結果回傳，不會將資料本身傳送給我們。<br/>還是不放心嗎？<a href="search_step.php">這裡有分次操作的版本</a><br/><span style="color: red;">使用前，請確認網址為 breach.tw，若還是有疑慮，請勿使用。</span></p>
        <form id="search_form">
            <div class="form-group ">
                <label for="fullname">姓名</label> 
                <input 
                    type="text" 
                    class="form-control" 
                    id="fullname"  
                    placeholder="姓名" 
                    required />
            </div>
            <div class="form-group ">
                <label for="nid" >身分證字號後六碼</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="nid" 
                    maxlength="6"  
                    placeholder="身分證字號後六碼" 
                    required />
            </div>
            <button type="submit" id="search" class="btn btn-outline-dark btn-block">送出</button>
        </form>
    </div>
    <script src="https://www.google.com/recaptcha/api.js?render=<?=RECAPTCHA_SITE_KEY?>"></script>
    <script>const RECAPTCHA_SITE_KEY='<?= RECAPTCHA_SITE_KEY?>'</script>
    <script src="/js/main.js"></script>

    <script>
        $('#search_form').on("submit", function(e) {
            e.preventDefault();
            let el = e.target;
            one_step(el);
        });
    </script>

    <?php require 'src/footer.php'; ?>
