    <?php $title = '訂閱外洩事件';
    require 'src/header.php';
    ?>

    <header class="jumbotron jumbotron-fluid">
        <div class="container">
            <h1><?= $title ?></h1>
        </div>
    </header>

    <div class="padded container">
        <h1 class="breach-title">訂閱表單</h1>
        <p>身分證字號會做去識別化後回傳，不會將資料本身傳送給我們。<br>訂閱後若發現大規模個資外洩時，且您在外洩清單內將會即時通知您。</p>
        <form id="subscribe_form">
            <div class="form-group">
                <label for="fullname">姓名</label>
                <input type="text" class="form-control" id="fullname" placeholder="姓名" required />
            </div>
            <div class="form-group">
                <label for="nid">身分證字號後六碼</label>
                <input type="password" class="form-control" id="nid" maxlength="6" placeholder="身分證字號後六碼" required />
            </div>
            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" class="form-control" id="email" placeholder="name@example.com" required />
            </div>
            <button class="btn btn-outline-dark btn-block" type="submit" id="subscribe">訂閱</button>
            <p>按下訂閱按鈕即代表您已閱讀並同意 <a href="/policy.php#tos">服務條款</a></p>
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
    </script>

    <?php require 'src/footer.php'; ?>