const spinnerHTML = '<div class="spinner-border text-primary" style="width: 200px; height: 200px;" role="status"><span class="visually-hidden">Loading...</span></div>'
const buttonHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>画像生成中…'
function showImage(url) {
    document.querySelector('#button').disabled = true;
    document.querySelector('#button').innerHTML = buttonHTML;
    document.querySelector('#img').innerHTML = spinnerHTML;
    fetch(url).then(response => {
        response.blob().then(blobResponse => {
            const fileUrl = URL.createObjectURL(blobResponse);
            document.querySelector('#button').disabled = false;
            document.querySelector('#button').innerHTML = '画像生成開始'
            document.querySelector('#img').innerHTML = `<img src='${fileUrl}' width=300 height=300 />`;
        })
    })
}
