'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)

    const meme = getMeme()
    renderMeme(meme)
}




function renderMeme(meme) {
    console.log(meme);
    const {lines, selectedLineIdx:lineIdx , selectedImgId:imgId} = meme
    console.log(lines);
    const {align, fillColor, strokeColor, size, txt} = lines[lineIdx]
    // console.log('font align is:',lines[lineIdx].align);
    // console.log('font color is:',lines[lineIdx].color);
    // console.log('font size is:',lines[lineIdx].size);
    // console.log('txt is:',lines[lineIdx].txt);
    console.log('font align is:', align);
    console.log('font stroke color is:', strokeColor);
    console.log('font fill color is:', fillColor);
    console.log('font size is:', size);
    console.log('txt is:', txt);
    const imgUrl = getImgPath(imgId)
    console.log('url is:', imgUrl);

    const line = lines[lineIdx]

    drawImgAndText(imgUrl, line)

}

function drawImgAndText(imgUrl, line) {
    const img = new Image() // Create a new html img element
    // When the image ready draw it on the canvas
    const {align, fillColor, strokeColor, size, font, txt, xPos, yPos} = line
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(txt, xPos, yPos, size, font, strokeColor, fillColor, align)
    }
    img.src = imgUrl // Send a network req to get that image, define the img src
}

function drawText(text = 'Funny Stuff', x=40, y=70, size, font, strkClr, fillClr, align) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strkClr
    gCtx.fillStyle = fillClr

    gCtx.textAlign = align

    gCtx.font = `${size}px ${font}`
    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

// gCtx.measureText(txt).width
// מחזיר את אורך השורה שהטקסט דורש

// gCtx.textAlign = ‘center’ גם חשוב