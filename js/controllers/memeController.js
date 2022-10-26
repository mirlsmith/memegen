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
    const {lines, selectedLineIdx:lineIdx , selectedImgId:imgId} = meme
    const {align, fillColor, strokeColor, size, txt} = lines[lineIdx]
    const imgUrl = getImgPath(imgId)
    const line = lines[lineIdx]
    drawImgAndText(imgUrl, line)

    document.querySelector('.editor-tools input').value = txt
}

function drawImgAndText(imgUrl, line) {
    const img = new Image()
    const {align, fillColor, strokeColor, size, font, txt, xPos, yPos} = line
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(txt, xPos, yPos, size, font, strokeColor, fillColor, align)
    }
    img.src = imgUrl
}

function drawText(text = 'Funny Stuff', x=40, y=70, size, font, strkClr, fillClr, align) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strkClr
    gCtx.fillStyle = fillClr

    gCtx.textAlign = align

    gCtx.font = `${size}px ${font}`
    gCtx.fillText(text, x, y) 
    gCtx.strokeText(text, x, y)
}

// gCtx.measureText(txt).width
// מחזיר את אורך השורה שהטקסט דורש

// gCtx.textAlign = ‘center’ גם חשוב

function onTextChange(elInput){
    setLineText(elInput.value)
    renderMeme()
}