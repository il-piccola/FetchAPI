function showImage(url) {
    const button = document.querySelector('button');
    button.disabled = true;
    fetch(url).then(response => {
        response.blob().then(blobResponse => {
            const fileUrl = URL.createObjectURL(blobResponse);
            document.querySelector('#img').innerHTML = `<img src='${fileUrl}' />`;
        })
    })
    button.disabled = false;
}
