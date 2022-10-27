'use strict'

var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}

var gImgs = [
    {id: 1, url: 'img/gallery/1.jpg', keywords: ['politician', 'trump', 'angry']},
    {id: 2, url: 'img/gallery/2.jpg', keywords: ['cute', 'dog', 'kiss']},
    {id: 3, url: 'img/gallery/3.jpg', keywords: ['cute', 'dog', 'baby']},
    {id: 4, url: 'img/gallery/4.jpg', keywords: ['cute', 'cat', 'sleep']},
    {id: 5, url: 'img/gallery/5.jpg', keywords: ['funny', 'baby']},
]; 

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [ {
        txt: 'Too Much Cuteness', 
        size: 30,
        font: 'Impact',
        align: 'left',
        strokeColor: 'red',
        fillColor: 'purple',
        xPos: 20,
        yPos: 50
    },
    {
        txt: 'So Soft and Cuddly', 
        size: 30,
        font: 'Impact',
        align: 'left',
        strokeColor: 'red',
        fillColor: 'purple',
        xPos: 20,
        yPos: 150
    }
]
}

function addLine() {
    let newLine = {
        txt: 'Say Something!', 
        size: 30,
        font: 'Impact',
        align: 'center',
        strokeColor: 'red',
        fillColor: 'purple',
        xPos: getCanvasWidth() / 2,
        yPos: 60
    }
    gMeme.lines.unshift(newLine)
    gMeme.selectedLineIdx = 0
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx - 1 < 0 )? 0 : gMeme.selectedLineIdx - 1
}

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function getImgPath(imgId) {
    const img = gImgs.find(image => imgId === image.id)
    const {url} = img
    return url
}

function setLineText(newTxt) {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
}

function setLineStrokeColor(newClr){
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = newClr
}

function setLineFillColor(newClr){
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].fillColor = newClr
}

function setMemeImg(imgId){
    gMeme.selectedImgId = +imgId
}

function setLineFontSize(diff){
    if (gMeme.lines.length === 0) return
    let newSize = gMeme.lines[gMeme.selectedLineIdx].size + 2*(+diff)
    gMeme.lines[gMeme.selectedLineIdx].size = newSize
}

function setFontType(select){
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].font = select.value
}

function setLineYPos(diff){
    if (gMeme.lines.length === 0) return
    let newYPos = gMeme.lines[gMeme.selectedLineIdx].yPos + 5*(+diff)
    const lineHeight = gMeme.lines[gMeme.selectedLineIdx].size
    if (newYPos < lineHeight || newYPos > getCanvasHeight()) return
    gMeme.lines[gMeme.selectedLineIdx].yPos = newYPos
}

function setLineAlignment(newAlign) {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].align = newAlign
    
    setLineXPos (gMeme.lines[gMeme.selectedLineIdx])
}

function setLineXPos(line) {
    switch (line.align) {
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].xPos = 10
            break;
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].xPos = getCanvasWidth() - 10
            break;
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].xPos = getCanvasWidth() / 2
            break;
        default:
            gMeme.lines[gMeme.selectedLineIdx].xPos = 15
            break;
    }
}

function setLineSelect() {
    if (gMeme.lines.length === 0) return
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1 > gMeme.lines.length-1)? 0: ++gMeme.selectedLineIdx
}