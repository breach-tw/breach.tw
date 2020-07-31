if (!sessionStorage.popup) {
    sessionStorage.popup = true
    Swal.fire({
        type: 'info',
        title: '回復營運聲明',
        width:'90%',
        html: '<p>親愛的使用者：</p><p>先前，本專案因持續受到政府與企業單位關切，原專案發起人不堪其擾，而移轉至香港商 Starlight Systems Company 公司（後更名至 Eons Data Communications Limited，下稱本公司）。</p><p>然為落實專案發起人承諾之個人資料安全主張，實現「個資不離地」，且顧及當前香港情勢，本公司決定於今日起將台灣區訂閱之個人資料轉交予 台灣數位串流有限公司（下稱合作公司） 負責。基於促進公眾利益之出發點，本站將持續提供免費無償之查詢服務。</p><p>為了保障各位使用者的個人資料安全，本次轉移遵循「資料庫不移轉」的方針，包括但不限於訂閱名單的所有資料庫內容，皆不會移轉至新服務內。</p><p>此外，我們在此聲明，後續服務中，供大眾查詢之內容皆為本公司所判斷、查核、新增至系統，概與舊有團隊與合作公司無關，敬請各位使用者繼續支持本專案。</p><p>此致</p><p>Eons Data Communications Limited 專案營運經理<br>台灣數位串流有限公司 專案營運經理</p><p>2020 年 08 月 01 日</p>'
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
