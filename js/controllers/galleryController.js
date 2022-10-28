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
    if (getMeme().lines.length === 0) addLine()
    document.querySelector('.gallery').classList.add('hidden')
    document.querySelector('.meme-editor').classList.remove('hidden')
    renderMeme()
}

function onGalleryLink() {
    document.querySelector('.gallery').classList.remove('hidden')
    document.querySelector('.meme-editor').classList.add('hidden')
}