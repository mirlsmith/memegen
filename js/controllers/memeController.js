'use strict'

let gElCanvas
let gCtx

function onInit() {

    document.querySelector('.meme-editor').classList.add('hidden')
    document.querySelector('.saved-memes').classList.add('hidden')

    renderGallery()

    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

}

function renderMeme(isLineSelected = true) {
    const meme = getMeme()
    const { lines, selectedLineIdx: lineIdx, selectedImgId: imgId } = meme
    const imgUrl = getImgPath(imgId)
    drawImgAndText(imgUrl, lines, isLineSelected)

    if (lines.length === 0) {
        document.querySelector('.editor-tools input').value = ''
    } else {
        const { txt } = lines[lineIdx]
        document.querySelector('.editor-tools input').value = txt || ' '
    }
}

function drawImgAndText(imgUrl, lines, isLineSelected) {
    //gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    const img = new Image()
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        if (lines.length > 0) {
            drawText(lines)
            const meme = getMeme()
            const { selectedLineIdx: lineIdx } = meme
            if (isLineSelected) drawLineSelectionRect(lines[lineIdx])
        }
    }
    img.src = imgUrl
}

function drawText(lines) {

    lines.forEach(line => {
        let { align, fillColor, strokeColor, size, font, txt, xPos, yPos } = line

        gCtx.lineWidth = 2
        gCtx.strokeStyle = strokeColor
        gCtx.fillStyle = fillColor

        switch (align) {
            case 'left':
                gCtx.textAlign = 'start'
                break;
            case 'right':
                gCtx.textAlign = 'end'
                break;
            case 'center':
                gCtx.textAlign = 'center'
                break;
            default:
                gCtx.textAlign = 'start'
                break;
        }
        gCtx.font = `${size}px ${font}`
        gCtx.fillText(txt, xPos, yPos)
        gCtx.strokeText(txt, xPos, yPos)
    });
}

function drawLineSelectionRect(line) {
    let { size, xPos, yPos, txt, align } = line
    let textWidth = gCtx.measureText(txt).width;

    switch (align) {
        case 'right':
            xPos = xPos - textWidth
            break;
        case 'center':
            xPos = xPos - textWidth / 2
            break;
    }

    let lineHeight = size * 1.286;
    gCtx.setLineDash([15, 3, 3, 3]);
    gCtx.strokeRect(xPos - 2, yPos - lineHeight + 5, textWidth + 6, lineHeight + 5)
    gCtx.setLineDash([]);
}


// ---  WORK ON THIS IF THERE IS TIME -------
function removeLineSelection() {
    renderMeme(false)
}

function addListeners() {

    //  -- WORK ON THIS LATER IF THERE IS TIME --
    // addMouseListeners()
    // addTouchListeners()
}

function getCanvasHeight() {
    return gElCanvas.height
}

function getCanvasWidth() {
    return gElCanvas.width
}

function onTextChange(elInput) {
    setLineText(elInput.value)
    renderMeme()
}

function onStrokeClrChange(elColor) {
    setLineStrokeColor(elColor.value)
    renderMeme()

}

function onFillClrChange(elColor) {
    setLineFillColor(elColor.value)
    renderMeme()
}

function onFontSizeChange(diff) {
    setLineFontSize(diff)
    renderMeme()
}

function onFontTypeChange(elSelect) {
    setFontType(elSelect)
    setSelectOptionsFont(elSelect.value)
    renderMeme()
}

function setSelectOptionsFont(fontName){
    document.querySelector('.slct-fnt').style.fontFamily = fontName
}

function onMoveLine(diff) {
    setLineYPos(diff)
    renderMeme()
}

function onAlignChange(elAlignBtn) {
    const align = elAlignBtn.dataset.align
    setLineAlignment(align)
    renderMeme()
}

function onLineSelect() {
    setLineSelect()
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function downloadImg(elLink) {
    removeLineSelection()
    setTimeout(()=>{
        const imgContent = gElCanvas.toDataURL('image/jpeg');
        elLink.href = imgContent},500)
    
}

function onRandomMeme() {
    makeRamdomMeme()
    showMemeEditor()
    renderMeme()
}

function onSaveMeme() {
    removeLineSelection()

    setTimeout(()=>{
        const memeUrl = gElCanvas.toDataURL('image/jpeg'); 
        saveMeme(memeUrl); 
        renderMemeGallery(); 
        showMemeGallery() },300)
}

function renderMemeGallery() {
    const memes = getSavedMemes()
    let strHTML = memes.map((meme) => {
        return `<article class="meme-img"><img data-id="${meme.memeId}" onclick="onSavedMemeSelect(this)" src="${meme.url}"
            alt="meme image"></article>`
    })
    
    document.querySelector('.saved-memes-container').innerHTML = strHTML.join('')
}

function getSavedMemes() {
    return gSavedMemes
}

function onSavedMemesLink() {
    showMemeGallery()
}

function showMemeGallery(){
    closeAllSections()
    document.querySelector('.saved-memes').classList.remove('hidden')
}

function closeAllSections() {
    document.querySelector('.gallery').classList.add('hidden')
    document.querySelector('.meme-editor').classList.add('hidden')
    document.querySelector('.saved-memes').classList.add('hidden')
}


function onSavedMemeSelect(elMeme) {
    setMeme(elMeme.dataset.id)
    renderMeme()
    showMemeEditor()
}