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
    const tag = '#img' + n;
    const spinnerHTML = '<div class="spinner-border text-primary" style="width: 200px; height: 200px;" role="status"><span class="visually-hidden">Loading...</span></div>';
    document.querySelector(tag).innerHTML = spinnerHTML;
    const response = await fetch(url);
    const blobResponse = await response.blob();
    const fileUrl = URL.createObjectURL(blobResponse);
    document.querySelector(tag).innerHTML = `<img src='${fileUrl}' width=300 height=300 />`;
    switchButton(false);
    // fetch(url).then(response => {
    //     response.blob().then(blobResponse => {
    //         const fileUrl = URL.createObjectURL(blobResponse);
    //         document.querySelector(tag).innerHTML = `<img src='${fileUrl}' width=300 height=300 />`;
    //         switchButton(false);
    //     })
    // })
}
