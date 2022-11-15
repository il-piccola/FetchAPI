const getCookie = (name) => {
    if (document.cookie && document.cookie !== '') {
        for (const cookie of document.cookie.split(';')) {
        const [key, value] = cookie.trim().split('=')
            if (key === name) {
                return decodeURIComponent(value)
            }
        }
    }
}
function switchButton(disabled) {
    document.querySelector('#button').disabled = disabled;
    document.querySelector('#sentence').disabled = disabled;
    if (disabled == true) {
        const buttonHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>画像生成中…';
        document.querySelector('#button').innerHTML = buttonHTML;
    } else {
        document.querySelector('#button').innerHTML = '画像生成開始';
    }
}
const showImage = async(url, n, sentence) => {
    const spinnerHTML = '<div class="spinner-border text-primary" style="width: 200px; height: 200px;" role="status"><span class="visually-hidden">Loading...</span></div>';
    switchButton(true);
    for (let i=0; i<n; i++) {
        let tag = '#img' + i;
        document.querySelector(tag).innerHTML = ''
    }
    for (let i=0; i<n; i++) {
        let tag = '#img' + i;
        document.querySelector(tag).innerHTML = spinnerHTML;
        let body = new URLSearchParams();
        body.append('sentence', sentence);
        try {
            let response = await fetch(url, {
                method: 'POST',
                body: body,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                    'X-CSRFToken': getCookie('csrftoken'),
                }
            });
            let blobResponse = await response.blob();
            if (response.ok) {
                let fileUrl = URL.createObjectURL(blobResponse);
                document.querySelector(tag).innerHTML = `<img src='${fileUrl}' width=300 height=300 />`;
                if (i == n-1) {
                    switchButton(false);
                }
            } else {
                document.querySelector(tag).innerHTML = `response status = '${response.status}' '${response.statusText}'`;
            }
        } catch(e) {
            document.querySelector(tag).innerHTML = `error = '${e.message}'`;
        }
    }
}
