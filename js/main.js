function hideElementById(id) {
    document.getElementById(id).style.display = 'none';
}

function showElementById(id) {
    document.getElementById(id).style.display = '';
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

    document.getElementById("hash").value = ""
    document.getElementById('genhash').innerHTML = '正在計算雜湊值...'
    document.getElementById('genhash').setAttribute('disabled', true);
    Swal.fire({
        type: 'info',
        title: '正在計算雜湊值...',
        toast: true,
        position: 'top-end',
        showConfirmButton: false
    })
    await delay(1300)
    Swal.close()
    document.getElementById('genhash').innerHTML = '產生'
    document.getElementById('genhash').removeAttribute('disabled');
    document.getElementById("hash").value = sha1(form.fullname.value + form.nid.value);
}

function search_func(form) {
    search_by_hash(form.hash.value, true);
}

async function search_by_hash(hash, hashed = false) {
    document.getElementById('search').setAttribute('disabled', true);
    if (!hashed) {
        document.getElementById('search').blur();
        Swal.fire({
            type: 'info',
            title: '正在計算雜湊值...',
            toast: true,
            position: 'top-end',
            showConfirmButton: false
        })
        document.getElementById('search').innerHTML = '正在計算雜湊值...'
        await delay(1300)
        Swal.close()
    }
    Swal.fire({
        type: 'info',
        title: '搜尋中...',
        toast: true,
        position: 'top-end',
        showConfirmButton: false
    })
    document.getElementById('search').innerHTML = '搜尋中...'
    grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: 'search'
    }).then(function (token) {
        fetch('/api/search.php?mode=recaptcha&hash=' + hash + '&token=' + token)
            .then(res => res.json())
            .then(async res => {
                await delay(1000)
                // 清除 swal
                Swal.close()
                document.getElementById('search').innerHTML = '送出'
                await delay(100)
                // 列出結果
                document.getElementById('search').removeAttribute('disabled');
                if (res.status == 0) {
                    if (Object.size(res.result) > 0) {
                        let breach = []
                        for (source in res.result) breach.push(source + '：' + res.result[source].join('、'))
                        Swal.fire({
                            type: 'error',
                            title: '真是太糟糕了',
                            html: `發現個資洩漏情形<br><br><h4>已發現項目</h4>${breach.join('<br/>')}`,
                            footer: '<a href="/subscribe.php">訂閱外洩事件</a>｜<a href="/breaches.php">外洩事件列表 & 解釋</a>｜<a href="/faq.php#section1">我應該怎麼做？</a>'
                        })
                    } else {
                        Swal.fire({
                            type: 'success',
                            title: '搜尋完畢',
                            html: '您的個資目前未在大規模洩漏中找到，不過可能只是未被本網站發現<br/>再接再厲，繼續保持。',
                            footer: '<a href="/subscribe.php">訂閱外洩事件</a>'
                        })
                    }
                } else {
                    Swal.fire({
                        type: 'error',
                        title: '伺服器錯誤',
                        text: res.error
                    })
                }
            });
    });
}

function subscribe_func(form) {
    document.getElementById('subscribe').setAttribute('disabled', true);
    let hash = sha1(form.fullname.value + form.nid.value);
    grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: 'subscribe'
    }).then(function (token) {
        fetch('/api/subscribe.php?hash=' + hash + '&email=' + form.email.value + '&name=' + form.fullname.value + '&token=' + token)
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                document.getElementById('subscribe').removeAttribute('disabled');
                if (res.status == 0) {
                    if (res.result.length > 0) {
                        Swal.fire({
                            type: 'success',
                            title: '訂閱完成',
                            html: '雖已發現個資洩漏情形，但在未來進一步的個資洩漏時還是會通知您。'
                        })
                    } else {
                        Swal.fire({
                            type: 'success',
                            title: '訂閱完成',
                            html: '未在資料庫中發現個資洩漏情形，已新增訂閱資訊至系統，未來發現大規模個資外洩時會即時通知您。'
                        })
                    }
                } else {
                    Swal.fire({
                        type: 'error',
                        title: '伺服器錯誤',
                        text: res.error
                    })
                }
            });
    });
}