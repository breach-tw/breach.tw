    <?php $title = '搜尋洩漏紀錄';
        require 'src/header.php';
        require 'src/common.php';
    ?>


    <header class="ts borderless extra padded massive center aligned fluid jumbotron">
        <h1 class="ts header"><?=$title?></h1>
    </header>

    <section class="ts narrow container">
        <h3 class="ts left aligned header">搜尋表單</h3>
        <p>輸入姓名及身分證字號，網頁會將去識別化的運算結果回傳，不會將資料本身傳送給我們。<br>還是不放心嗎？<a href="search_step.php">這裡有分次操作的版本</a></p>
        <div class="ts negative message" id="missingkeyword1" style="display: none;">
            <div class="header">缺少姓名</div>
            <p>請輸入姓名</p>
        </div>
        <div class="ts negative message" id="missingkeyword2" style="display: none;">
            <div class="header">缺少身分證字號</div>
            <p>請輸入身分證字號</p>
        </div>
        <div class="ts negative message" id="backenderr" style="display: none;">
            <div class="header">後端錯誤</div>
            <p id="backenderr_text"></p>
        </div>
        <div class="ts negative message" id="breach" style="display: none;">
            <div class="header">真是太糟糕了</div>
            <p>發現個資洩漏情形<br>
            已發現項目：<ul id="breach_list"></ul></p>
            <p><button class="ts button secondary right" onclick="window.location='subscribe.php';">訂閱外洩事件</button></p>
        </div>
        <div class="ts positive message" id="nobreach" style="display: none;">
            <div class="header">搜索完畢</div>
            <p>您的個資目前未在大規模洩漏中找到，不過可能只是未被本網站發現<br>再接再厲，繼續保持。</p>
            <p><button class="ts button secondary right" onclick="window.location='subscribe.php';">訂閱外洩事件</button></p>
        </div>
        <div class="ts very padded segment">
            <form class="ts form" onsubmit="one_step(this); return false;">
                <div class="two fields">
                    <div class="field">
                        <label>姓名<span style="color:red;">*</span></label>
                        <input id="fullname" />
                    </div>
                    <div class="field">
                        <label>身分證字號<span style="color:red;">*</span></label>
                        <input id="nid" maxlength="10" />
                    </div>
                </div>
                <button class="ts primary button" type="submit" id="search">搜尋</button>
            </form>
        </div>
        <script src="https://www.google.com/recaptcha/api.js?render=<?=RECAPTCHA_SITE_KEY?>"></script>
        <script>
            Object.size = function(obj) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            };
            function one_step(form){
                $('#missingkeyword1').hide();
                $('#missingkeyword2').hide();
                $('#backenderr').hide();
                $('#breach').hide();
                $('#nobreach').hide();
                if (form.fullname.value == ''){
                    $('#missingkeyword1').show();
                }else if (form.nid.value == ''){
                    $('#missingkeyword2').show();
                }else{
                    search(sha1(form.fullname.value+form.nid.value.toUpperCase()));
                }
            }
            function search(hash){
                $('#nobreach').hide();
                $('#breach').hide();
                $('#search').attr('disabled', true);
                grecaptcha.execute('<?=RECAPTCHA_SITE_KEY?>', {action: 'search'}).then(function(token) {
                    $.getJSON('/api/search.php?hash=' + hash + '&token=' + token, function(res){
                        $('#search').attr('disabled', false);
                        if (res.status == 0){
                            if (Object.size(res.result) > 0){
                                $('#breach_list')[0].innerHTML = '';
                                for (source in res.result){
                                    $('#breach_list').append('<li>' + source + '：' + res.result[source].join('、') + '</li>');
                                }
                                $('#breach').show();
                            }else{
                                $('#nobreach').show();
                            }
                        }else{
                            $('#backenderr_text')[0].innerText = res.error;
                            $('#backenderr').show();
                        }
                    });
                });
            }
        </script>
    </section>

    <?php require 'src/footer.php'; ?>
