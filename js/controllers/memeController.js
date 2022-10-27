'use strict'

let gElCanvas
let gCtx

function onInit() {

    document.querySelector('.meme-editor').classList.add('hidden')

    renderGallery()

    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    
    // renderMeme()
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
        console.log('canvas width:', gElCanvas.width, 'height:', gElCanvas.height);
        console.log('canvas:', gElCanvas);
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        if (lines.length > 0) {
            drawText(lines)
            const meme = getMeme()
            // ---- WORK ON THIS LATER IF THERE IS TIME -----
            // const {selectedLineIdx: lineIdx} = meme
            // drawLineSelectionRect(lines[lineIdx])
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

// gCtx.measureText(txt).width
// מחזיר את אורך השורה שהטקסט דורש

// to work on if there is time
function drawLineSelectionRect(line){
    console.log('line to select', line);

    // gCtx.strokeStyle = gCurrDrawTools.color
    // gCtx.strokeRect(x, y, 20, 20)
    // gCtx.fillStyle = 'orange'
    // gCtx.fillRect(x, y, 150, 150)

}

function addListeners() {
    
    //  -- WORK ON THIS LATER IF THERE IS TIME --
    // addMouseListeners()
    // addTouchListeners()
}

function getCanvasHeight() {
    return gElCanvas.getBoundingClientRect().height
}

function getCanvasWidth() {
    return gElCanvas.getBoundingClientRect().width
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
    console.log('downloading');
    const imgContent = gElCanvas.toDataURL('image/jpeg')// image/jpeg the default format
    elLink.href = imgContent
}