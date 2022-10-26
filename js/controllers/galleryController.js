'use strict'

function renderGallery() {
    const imgs = getImgs()
    let strHTML = imgs.map((img) => {
        return `<article class="gallery-img">
        <img data-id="${img.id}" onclick="onImgSelect(this)" src='${img.url}' alt="image"></article>`
    })

    document.querySelector('.gallery-container').innerHTML = strHTML.join('')
}

function onImgSelect(elImg) {
    setMemeImg(elImg.dataset.id)
    renderMeme()
}