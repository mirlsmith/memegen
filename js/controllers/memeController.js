'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)

    renderMeme()
}

function renderMeme() {

    drawText()
    drawImg()
}

function drawImg() {
    const img = new Image() // Create a new html img element
    img.src = 'img/gallery/1.jpg' // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawText(text = 'Funny Stuff', x=40, y=70) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'

    gCtx.font = '40px Impact'
    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}
