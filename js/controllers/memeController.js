'use strict'

let gElCanvas
let gCtx

function onInit() {

    document.querySelector('.meme-editor').classList.add('hidden')

    renderGallery()

    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

}

function renderMeme() {
    const meme = getMeme()
    const { lines, selectedLineIdx: lineIdx, selectedImgId: imgId } = meme
    const imgUrl = getImgPath(imgId)
    drawImgAndText(imgUrl, lines)

    if (lines.length === 0) {
        document.querySelector('.editor-tools input').value = ''
    } else {
        const { txt } = lines[lineIdx]
        document.querySelector('.editor-tools input').value = txt || ' '
    }
}

function drawImgAndText(imgUrl, lines) {
    const img = new Image()
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        if (lines.length > 0) {
            drawText(lines)
            const meme = getMeme()
            const { selectedLineIdx: lineIdx } = meme
            drawLineSelectionRect(lines[lineIdx])
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
    // const meme = getMeme()
    // const { lines, selectedLineIdx} = meme
    // console.log('removing box from', lines[selectedLineIdx]);
    // drawLineSelectionRect(lines[selectedLineIdx], false)
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
    renderMeme()
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
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onRandomMeme() {
    makeRamdomMeme()
    showMemeEditor()
    renderMeme()
}

function onSaveMeme() {
    saveMeme()
}

function renderSavedMemes(){

}

function onShowSavedMemes(){

}