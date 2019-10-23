if (!sessionStorage.popup) {
    sessionStorage.popup = true
    Swal.fire({
        type: 'info',
        title: '網站轉移聲明',
        html: '<p>親愛的使用者：</p><p>由於持續受到政府與企業單位關切，本人（專案發起人）不堪其擾，因此於西元 2019 年 10 月 23 日正式將本專案移轉予 香港 Starlight Systems Company 公司（下稱該公司）。</p><p>本人一貫堅持資訊安全與民主、言論自由之立場，並基於促進公眾利益之出發點營運本站至今，本人承諾本次服務移轉絕對安全，如服務條款所示，絕無個資洩漏之可能，請各位使用者放心。<span style="color: red;">目前本站所有服務皆已暫停提供，待服務轉移完成後，將會重新啟動服務。</span></p><p>為了保障各位使用者的資訊安全，<span style="color: red;">本次服務移轉僅包含網域、網站名、商標名、Google Analytics 之使用權限與社群媒體粉絲專頁，不包含資料庫</span>，敬請各位放心。另在此聲明，後續服務之資料庫內容皆為該公司所新增、維護，概與舊有團隊無關。</p><p>請注意，由於上述資料庫不移轉方針，包括但不限於訂閱名單的所有資料庫內容皆不會移轉至新服務內。為了避免造成困擾，平台預定將提供一鍵續訂頁面，讓使用者能無縫轉移至新服務上。使用該續訂頁面，即代表您（使用者）同意舊有團隊將您的信箱地址、姓名與身分證末六碼之雜湊值及姓名（用於信件內稱謂）提供予該公司作為訂閱信件寄送用途。舊有團隊與該公司再次保證，絕不會將上述資料用於信件訂閱服務外之用途。</p><p>該公司深受本人信任，日後將接手本專案之營運，敬請各位使用者繼續支持本專案。</p><p>此致</p><p>Breach.tw 台灣抓漏小天使 專案發起人<br />Starlight Systems Company 公司負責人</p><p>2019 年 10 月 23 日</p>'
    });
}

const delay = s => {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, s);
    });
};

Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function one_step(form) {
    search_by_hash(sha1(form.fullname.value + form.nid.value));
}

async function gen_sha1(form) {
    $('#hash').val("");
    $('#genhash').text('正在計算雜湊值...').attr('disabled', true);
    showToast('正在計算雜湊值...');
    await delay(700);
    Swal.close();
    $('#genhash').text('產生').removeAttr('disabled');
    $('#hash').val(sha1(form.fullname.value + form.nid.value));
}

function search_func(form) {
    search_by_hash(form.hash.value, true);
}

async function search_by_hash(hash, hashed = false) {
    $('#search').attr('disabled', true);
    if (!hashed) {
        $('#search')[0].blur(); // HTMLElement API
        $('#search').text('正在計算雜湊值...')[0];
        showToast('正在計算雜湊值...');
        await delay(700);
        Swal.close();
    }

    showToast('搜尋中...');
    $('#search').text('搜尋中...');

    grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: 'search'
    }).then(function (token) {
        let param = new URLSearchParams({
            "mode": "recaptcha",
            "hash": hash,
            "token": token
        });
        fetch('/api/search.php?' + param.toString())
            .then(res => res.json())
            .then(async res => {
                await delay(700);
                // 清除 swal
                Swal.close();
                $('#search').text('送出').removeAttr('disabled');
                await delay(100);
                // 列出結果
                if (res.status == 0) {
                    if (Object.size(res.result) > 0) {
                        let breach = [];
                        for (source in res.result) breach.push(source + '：' + res.result[source].join('、'));
                        Swal.fire({
                            type: 'error',
                            title: '真是太糟糕了',
                            html: `發現個資洩漏情形<br/><br/><h4>已發現項目</h4>${breach.join('<br/>')}`,
                            footer: '<a href="/subscribe.php">訂閱外洩事件</a>｜<a href="/breaches.php">外洩事件列表 & 解釋</a>｜<a href="/faq.php#what-should-i-do-if-leaked">我應該怎麼做？</a>'
                        });
                    } else {
                        Swal.fire({
                            type: 'success',
                            title: '搜尋完畢',
                            html: '您的個資目前未在大規模洩漏中找到，不過可能只是未被本網站發現<br/>再接再厲，繼續保持。',
                            footer: '<a href="/subscribe.php">訂閱外洩事件</a>'
                        });
                    }
                } else {
                    Swal.fire({
                        type: 'error',
                        title: '伺服器錯誤',
                        text: res.error
                    });
                }
            });
    });
}

function subscribe_func(form) {
    $('#subscribe').attr('disabled', true);
    let hash = sha1(form.subscribe_form_fullname.value + form.subscribe_form_nid.value);
    grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: 'subscribe'
    }).then(function (token) {
        let param = new URLSearchParams({
            "hash": hash,
            "email": form.subscribe_form_email.value,
            "name": form.subscribe_form_fullname.value,
            "token": token
        });
        fetch('/api/subscribe.php?' + param.toString())
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                $('#subscribe').removeAttr('disabled');
                if (res.status == 0) {
                    if (Object.size(res.result) > 0) {
                        Swal.fire({
                            type: 'success',
                            title: '訂閱完成',
                            html: '雖已發現個資洩漏情形，但在未來進一步的個資洩漏時還是會通知您。'
                        });
                    } else {
                        Swal.fire({
                            type: 'success',
                            title: '訂閱完成',
                            html: '未在資料庫中發現個資洩漏情形，已新增訂閱資訊至系統，未來發現大規模個資外洩時會即時通知您。'
                        });
                    }
                } else {
                    Swal.fire({
                        type: 'error',
                        title: '伺服器錯誤',
                        text: res.error
                    });
                }
            });
    });
}

function subscription_status_func(form) {
    $('#query').attr('disabled', true);
    grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: 'query_subscription_status'
    }).then(function (token) {
        let param = new URLSearchParams({
            "email": form.email.value,
            "token": token
        });
        fetch('/api/subscription_status.php?' + param.toString())
            .then(function (res) {
                return res.json();
            }).then(function (res) {
                $('#query').removeAttr('disabled');
                if (res.status == 0) {
                    if (res.result == 'not_subscribed') {
                        $('.searchForm').hide();
                        $('.subForm').show();
                        $('#subscribe_form_email').val(form.email.value);
                    } else if (res.result == 'verification_pending') {
                        Swal.fire({
                            type: 'info',
                            title: '查詢結果',
                            html: '此 E-mail 已訂閱洩漏訊息，但尚未驗證 E-mail，請前往您的電子郵箱確認。'
                        });
                    } else if (res.result == 'subscribed') {
                        $('.searchForm').hide();
                        $('.unSubForm').show();
                        $('#unsubscribe_form_email').val(form.email.value);
                    }
                } else {
                    Swal.fire({
                        type: 'error',
                        title: '發生錯誤',
                        text: res.error
                    });
                }
            });
    });
}

function unsubscribe_func(form) {
    $('#unsubscribe').attr('disabled', true);
    let hash = sha1(form.unsubscribe_form_fullname.value + form.unsubscribe_form_nid.value);
    grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: 'unsubscribe'
    }).then(function (token) {
        let param = new URLSearchParams({
            "hash": hash,
            "email": form.unsubscribe_form_email.value,
            "token": token
        });
        fetch('/api/unsubscribe.php?' + param.toString())
            .then(function (res) {
                return res.json();
            }).then(function (res) {
                $('#unsubscribe').removeAttr('disabled');
                if (res.status == 0) {
                    Swal.fire({
                        type: 'success',
                        title: '取消訂閱成功',
                        html: '已取消訂閱洩漏訊息。'
                    });
                } else {
                    Swal.fire({
                        type: 'error',
                        title: '發生錯誤',
                        text: res.error
                    });
                }
            });
    });
}

function showToast(title, type = "info") {
    Swal.fire({
        type: type,
        title: title,
        toast: true,
        position: 'top-end',
        showConfirmButton: false
    });
}
