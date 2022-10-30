'use strict'

function renderGallery(txtFilter) {
    const imgs = getImgs(txtFilter)
    let strHTML = imgs.map((img) => {
        return `<article class="gallery-img">
        <img data-id="${img.id}" onclick="onImgSelect(this)" src='${img.url}' alt="image"></article>`
    })

    document.querySelector('.gallery-container').innerHTML = strHTML.join('')
}

function onImgSelect(elImg) {
    setMemeImg(elImg.dataset.id)
    if (getMeme().lines.length === 0) addLine()
    showMemeEditor()
    renderMeme()
}

function showMemeEditor() {
    closeAllSections()
    document.querySelector('.meme-editor').classList.remove('hidden')
}

function onGalleryLink() {
    closeAllSections()
    document.querySelector('.gallery').classList.remove('hidden')
}

function onSetFilterByTxt(filterBy) {
    renderGallery(filterBy)
}