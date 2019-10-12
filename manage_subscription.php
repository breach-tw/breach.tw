<?php $title = '查詢或取消訂閱';
        require 'src/header.php';
    ?>

    <header class="jumbotron jumbotron-fluid">
        <div class="container">
            <h1><?=$title?></h1>
        </div>
    </header>

    <div class="padded container">
        <h1 class="breach-title">查詢訂閱紀錄</h1>
        <form id="subscription_status_form">
            <div class="form-group">
                <label for="email" >E-mail</label>
                <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="name@example.com"
                    required />
            </div>
            <button class="btn btn-outline-dark btn-block" type="submit" id="query">查詢</button>
        </form>
    </div>

    <div class="padded container" style="margin-top: 40px;">
        <h1 class="breach-title">取消訂閱外洩事件</h1>
        <p>身分證字號會做去識別化後回傳，不會將資料本身傳送給我們。</p>
        <form id="unsubscribe_form">
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
                    type="password"
                    class="form-control"
                    id="nid"
                    maxlength="6"
                    placeholder="身分證字號後六碼"
                    required />
            </div>
            <div class="form-group">
                <label for="email" >E-mail</label>
                <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="name@example.com"
                    required />
            </div>
            <button class="btn btn-outline-dark btn-block" type="submit" id="unsubscribe">取消訂閱</button>
        </form>
    </div>
    <script src="https://www.google.com/recaptcha/api.js?render=<?=RECAPTCHA_SITE_KEY?>"></script>
    <script>const RECAPTCHA_SITE_KEY='<?= RECAPTCHA_SITE_KEY?>'</script>
    <script src="/js/main.js"></script>

    <script>
    <script>
        dqs('#subscription_status_form').addEventListener("submit", (e) => {
            e.preventDefault();
            let el = e.target;
            subscription_status_func(el);
        });

        dqs('#unsubscribe_form').addEventListener("submit", (e) => {
            e.preventDefault();
            let el = e.target;
            unsubscribe_func(el);
        });
    </script>
    </script>

    <?php require 'src/footer.php'; ?>
