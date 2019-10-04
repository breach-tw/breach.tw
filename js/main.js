function hideElementById(id) {
    document.getElementById(id).style.display = 'none';
}
function showElementById(id) {
    document.getElementById(id).style.display = '';
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
function one_step(form){
    hideElementById('missingkeyword1');
    hideElementById('missingkeyword2');
    hideElementById('backenderr');
    hideElementById('breach');
    hideElementById('nobreach');
    if (form.fullname.value == ''){
        showElementById('missingkeyword1');
    }else if (form.nid.value == ''){
        showElementById('missingkeyword2');
    }else{
        search_by_hash(sha1(form.fullname.value+form.nid.value));
    }
}
function search_by_hash(hash){
    document.getElementById('search').setAttribute('disabled', true);
    grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'search'}).then(function(token) {
        fetch('/api/search.php?mode=recaptcha&hash=' + hash + '&token=' + token)
            .then(function(response){
                return response.json();
            })
            .then(function(res){
                document.getElementById('search').removeAttribute('disabled');
                if (res.status == 0){
                    if (Object.size(res.result) > 0){
                        document.getElementById('breach_list').innerHTML = '';
                        for (source in res.result){
                            let breach_element = document.createElement('li');
                            breach_element.innerText = source + '：' + res.result[source].join('、');
                            document.getElementById('breach_list').appendChild(breach_element);
                        }
                        showElementById('breach');
                    }else{
                        showElementById('nobreach');
                    }
                }else{
                    document.getElementById('backenderr_text').innerText = res.error;
                    showElementById('backenderr');
                }
            });
    });
}
function search_func(form){
    hideElementById('nobreach');
    hideElementById('breach');
    hideElementById('missingkeyword3');
    hideElementById('missingkeyword4');
    hideElementById('backenderr');
    search_by_hash(form.hash.value);
}
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
        grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'subscribe'}).then(function(token) {
            fetch('/api/subscribe.php?hash=' + hash + '&email=' + form.email.value + '&name=' + form.fullname.value + '&token=' + token)
                .then(function(response){
                    return response.json();
                })
                .then(function(res){
                    document.getElementById('subscribe').removeAttribute('disabled');
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
function gen_sha1(form){
    hideElementById('hash_res');
    hideElementById('missingkeyword1');
    hideElementById('missingkeyword2');
    if (form.fullname.value == ''){
        showElementById('missingkeyword1');
    }else if (form.nid.value == ''){
        showElementById('missingkeyword2');
    }else{
        document.getElementById('real_res').textContent = sha1(form.fullname.value+form.nid.value);
        showElementById('hash_res');
    }
}
