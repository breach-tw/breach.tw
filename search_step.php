    <?php $title = '搜尋洩漏紀錄';
        require 'src/header.php';
    ?>

    <header class="jumbotron jumbotron-fluid">
        <div class="container">
            <h1 ><?=$title?></h1>
        </div>
    </header>

    <div class="padded container">
        <h1 class="breach-title">雜湊產生器</h1> 
        <p>此方法可避免將個人資料直接回傳給我們<br/>產生後請貼上到下方表單進行追蹤或搜尋<br/>雜湊值產生方法為：<code>sha1(姓名+身分證後六碼)</code></p>
        <form id="search_step_form">
            <div class="form-group">
                <label for="fullname">姓名</label> 
                <input 
                    type="text" 
                    class="form-control" 
                    id="fullname"  
                    placeholder="姓名" 
                    required />
            </div>
            <div class="form-group">
                <label for="nid" >身分證字號後六碼</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="nid" 
                    maxlength="6"  
                    placeholder="身分證字號後六碼" 
                    required />
            </div>
            <button type="submit" id="genhash" class="btn btn-outline-dark btn-block">產生</button>
        </form>
        <br/>
        <br/>
        <h1 class="breach-title">搜尋表單</h1> 
        <form id="search_hash_form">
            <div class="form-group">
                <label for="hash" >雜湊代碼</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="hash" 
                    maxlength="40" 
                    required />
            </div>
            <button type="submit" id="search" class="btn btn-outline-dark btn-block">搜尋</button>
        </form>
    </div>

    <script src="https://www.google.com/recaptcha/api.js?render=<?=RECAPTCHA_SITE_KEY?>"></script>
    <script>const RECAPTCHA_SITE_KEY='<?= RECAPTCHA_SITE_KEY?>'</script>
    <script src="/js/main.js"></script>

    <script>
        dqs('#search_step_form').addEventListener("submit", (e) => {
            e.preventDefault();
            let el = e.target;
            gen_sha1(el);
        });

        dqs('#search_hash_form').addEventListener("submit", (e) => {
            e.preventDefault();
            let el = e.target;
            search_func(el);
        });
    </script>

    <?php require 'src/footer.php'; ?>
