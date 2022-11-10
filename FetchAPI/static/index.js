function switchButton(disabled) {
    document.querySelector('#button').disabled = disabled;
    if (disabled == true) {
        const buttonHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>画像生成中…';
        document.querySelector('#button').innerHTML = buttonHTML;
    } else {
        document.querySelector('#button').innerHTML = '画像生成開始';
    }
}
const showImage = async(url, n) => {
    const spinnerHTML = '<div class="spinner-border text-primary" style="width: 200px; height: 200px;" role="status"><span class="visually-hidden">Loading...</span></div>';
    switchButton(true);
    for (i==0; i<n; i++) {
        const tag = '#img' + i;
        document.querySelector(tag).innerHTML = spinnerHTML;
        try {
            const response = await fetch(url);
            const blobResponse = await response.blob();
            if (response.ok) {
                const fileUrl = URL.createObjectURL(blobResponse);
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
