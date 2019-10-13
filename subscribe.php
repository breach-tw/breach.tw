    <?php $title = '外洩事件訂閱';
    require 'src/header.php';
    ?>

    <header class="jumbotron jumbotron-fluid">
        <div class="container">
            <h1><?= $title ?></h1>
            <p class="lead">在此檢視、更改或取消訂閱外洩事件</p>
        </div>
    </header>

    <div class="padded container searchForm">
        <h1 class="breach-title">請輸入 E-mail</h1>
        <form id="subscription_status_form">
            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" class="form-control" id="email" placeholder="name@example.com" required />
            </div>
            <button class="btn btn-outline-dark btn-block" type="submit" id="query">送出</button>
            <p>按下送出按鈕即代表您已閱讀並同意 <a href="/policy.php#tos">服務條款</a></p>
        </form>
    </div>

    <div class="padded container unSubForm" style="display:none">
        <h1 class="breach-title">取消訂閱表單</h1>
        <div class="alert alert-light text-center" role="alert">
            此 E-mail 已訂閱洩漏訊息，請輸入相關資訊來取消訂閱。
        </div>
        <p>身分證字號會做去識別化後回傳，不會將資料本身傳送給我們。</p>
        <form id="unsubscribe_form">
            <div class="form-group">
                <label for="unsubscribe_form_fullname">姓名</label>
                <input type="text" class="form-control" id="unsubscribe_form_fullname" placeholder="姓名" required />
            </div>
            <div class="form-group">
                <label for="nid">身分證字號後六碼</label>
                <input type="text" class="form-control" id="unsubscribe_form_nid" maxlength="6" placeholder="身分證字號後六碼" required />
            </div>
            <div class="form-group">
                <label for="unsubscribe_form_email">E-mail</label>
                <input type="email" class="form-control" id="unsubscribe_form_email" placeholder="name@example.com" required disabled />
                <button type="button" class="btn btn-link" onclick="location.reload()">重新輸入 E-mail</button>
            </div>
            <button class="btn btn-outline-dark btn-block" type="submit" id="unsubscribe">取消訂閱</button>
        </form>
    </div>
    <div class="padded container subForm" style="display:none">
        <h1 class="breach-title">訂閱表單</h1>
        <div class="alert alert-light text-center" role="alert">
            此 E-mail 尚未訂閱洩漏訊息，請輸入相關資訊來訂閱。
        </div>
        <p>身分證字號會做去識別化後回傳，不會將資料本身傳送給我們。<br>訂閱後若發現大規模個資外洩時，且您在外洩清單內將會即時通知您。</p>
        <form id="subscribe_form">
            <div class="form-group">
                <label for="subscribe_form_fullname">姓名</label>
                <input type="text" class="form-control" id="subscribe_form_fullname" placeholder="姓名" required />
            </div>
            <div class="form-group">
                <label for="subscribe_form_nid">身分證字號後六碼</label>
                <input type="text" class="form-control" id="subscribe_form_nid" maxlength="6" placeholder="身分證字號後六碼" required />
            </div>
            <div class="form-group">
                <label for="subscribe_form_email">E-mail</label>
                <input type="email" class="form-control" id="subscribe_form_email" placeholder="name@example.com" required disabled />
                <button type="button" class="btn btn-link" onclick="location.reload()">重新輸入 E-mail</button>
            </div>
            <button class="btn btn-outline-dark btn-block" type="submit" id="subscribe">訂閱</button>
        </form>
    </div>
    <script src="https://www.google.com/recaptcha/api.js?render=<?= RECAPTCHA_SITE_KEY ?>"></script>
    <script>
        const RECAPTCHA_SITE_KEY = '<?= RECAPTCHA_SITE_KEY ?>'
    </script>
    <script src="/js/main.js"></script>

    <script>
        dqs('#subscribe_form').addEventListener("submit", (e) => {
            e.preventDefault();
            let el = e.target;
            subscribe_func(el);
        });
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

    <?php require 'src/footer.php'; ?>