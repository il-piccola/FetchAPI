function showImage(url) {
    fetch(url).then(response => {
        response.blob().then(blobResponse => {
            const fileUrl = URL.createObjectURL(blobResponse)
            document.querySelector('#img').innerHTML = `<img src='${fileUrl}' />`
        })
    })
}
