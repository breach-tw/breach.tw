    <?php $title = '訂閱外洩事件';
        require 'src/header.php';
        require 'src/common.php';
    ?>


    <header class="ts borderless extra padded massive center aligned fluid jumbotron">
        <h1 class="ts header"><?=$title?></h1>
    </header>

    <section class="ts narrow container">
        <h3 class="ts left aligned header">訂閱表單</h3>
        <p>身分證字號會做去識別化後回傳，不會將資料本身傳送給我們。<br>訂閱後若發現大規模個資外洩時，且您在外洩清單內將會即時通知您。</p>
        <div class="ts negative message" id="missingkeyword1" style="display: none;">
            <div class="header">缺少姓名</div>
            <p>請輸入姓名</p>
        </div>
        <div class="ts negative message" id="missingkeyword2" style="display: none;">
            <div class="header">缺少身分證字號</div>
            <p>請輸入身分證字號</p>
        </div>
        <div class="ts negative message" id="missingkeyword3" style="display: none;">
            <div class="header">缺少 E-mail 位置</div>
            <p>請輸入 E-mail</p>
        </div>
        <div class="ts negative message" id="backenderr" style="display: none;">
            <div class="header">後端錯誤</div>
            <p id="backenderr_text"></p>
        </div>
        <div class="ts positive message" id="sub_breach" style="display: none;">
            <div class="header">訂閱完成</div>
            <p>雖已發現個資洩漏情形，但在未來進一步的個資洩漏時還是會通知您。</p>
        </div>
        <div class="ts positive message" id="sub_nobreach" style="display: none;">
            <div class="header">訂閱完成</div>
            <p>未在資料庫中找到，已新增訂閱資訊至系統，未來發現大規模個資外洩時會即時通知您。</p>
        </div>
        <div class="ts very padded segment">
            <form class="ts form" onsubmit="subscribe_func(this); return false;">
                <div class="two fields">
                    <div class="field">
                        <label>姓名<span style="color:red;">*</span></label>
                        <input id="fullname" />
                    </div>
                    <div class="field">
                        <label>身分證字號<span style="color:red;">*</span></label>
                        <input id="nid" />
                    </div>
                </div>
                <div class="one fields">
                    <div class="field">
                        <label>E-mail<span style="color:red;">*</span></label>
                        <input id="email" />
                    </div>
                </div>
                <button class="ts primary button" type="submit" id="subscribe">訂閱</button>
            </form>
        </div>
        <script src="https://www.google.com/recaptcha/api.js?render=<?=RECAPTCHA_SITE_KEY?>"></script>
        <script>
            function subscribe_func(form){
                hideElementById('missingkeyword1');
                hideElementById('missingkeyword2');
                hideElementById('missingkeyword3');
                hideElementById('backenderr');
                hideElementById('sub_nobreach');
                hideElementById('sub_breach');
                document.getElementById('subscribe').setAttribute('disabled', true);
                if (form.fullname.value == ''){
                    showElementById('missingkeyword1');
                }else if (form.nid.value == ''){
                    showElementById('missingkeyword2');
                }else if (form.email.value == ''){
                    showElementById('missingkeyword3');
                }else{
                    let hash = sha1(form.fullname.value+form.nid.value);
                    grecaptcha.execute('<?=RECAPTCHA_SITE_KEY?>', {action: 'subscribe'}).then(function(token) {
                        $.getJSON('/api/subscribe.php?hash=' + hash + '&email=' + form.email.value + '&name=' + form.fullname.value + '&token=' + token, function(res){
                            document.getElementById('#subscribe').setAttribute('disabled', false);
                            if (res.status == 0){
                                if (res.result.length > 0){
                                    showElementById('sub_breach');
                                }else{
                                    showElementById('sub_nobreach');
                                }
                            }else{
                                document.getElementById('backenderr_text').innerText = res.error;
                                showElementById('backenderr');
                            }
                        });
                    });
                }
            }
        </script>
    </section>

    <?php require 'src/footer.php'; ?>
