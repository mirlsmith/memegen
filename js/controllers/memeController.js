'use strict'

let gElCanvas
let gCtx

function onInit() {

    renderGallery()

    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)

    renderMeme()
}

function renderMeme() {

    const meme = getMeme()
    const { lines, selectedLineIdx: lineIdx, selectedImgId: imgId } = meme
    const imgUrl = getImgPath(imgId)
    // const line = lines[lineIdx]
    drawImgAndText(imgUrl, lines)
    
    const { txt } = lines[lineIdx] || ''

    document.querySelector('.editor-tools input').value = (txt)? txt : ''
}

function drawImgAndText(imgUrl, lines) {
    const img = new Image()
    // const { align, fillColor, strokeColor, size, font, txt, xPos, yPos } = lines[0]
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        if (lines.length > 0) drawText(lines)
        // drawText(txt, xPos, yPos, size, font, strokeColor, fillColor, align, lines)
    }
    img.src = imgUrl
}

// function drawText(text = 'Funny Stuff', x = 40, y = 70, size, font, strkClr, fillClr, align, lines) {
function drawText(lines) {

    // const { align1, fillColor1, strokeColor1, size1, font1, txt1, xPos1, yPos1 } = lines[0] //THIS IS WHERE I STOPPED I need to rewrite the function so that it can handle multiple lines of text

    lines.forEach(line => {
        let { align, fillColor, strokeColor, size, font, txt, yPos } = line
        let xPos

        gCtx.lineWidth = 2
        gCtx.strokeStyle = strokeColor
        gCtx.fillStyle = fillColor
        
        switch (align) {
            case 'left':
                gCtx.textAlign = 'start'
                xPos = 20
                break;
            case 'right':
                gCtx.textAlign = 'end'
                xPos = gElCanvas.width-20
                break;
            case 'center':
                gCtx.textAlign = 'center'
                xPos = gElCanvas.getBoundingClientRect().width/2
                break;
            default:
                gCtx.textAlign = 'start'
                xPos = 20
                break;
        }

        gCtx.font = `${size}px ${font}`
        gCtx.fillText(txt, xPos, yPos)
        gCtx.strokeText(txt, xPos, yPos)

    });
}

// gCtx.measureText(txt).width
// מחזיר את אורך השורה שהטקסט דורש

function getCanvasHeight () {
    return gElCanvas.getBoundingClientRect().height
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