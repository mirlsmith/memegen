'use strict'

//var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}

var gImgs = [
    {id: 1, url: 'img/gallery/1.jpg', keywords: ['politician', 'trump', 'angry']},
    {id: 2, url: 'img/gallery/2.jpg', keywords: ['cute', 'dog', 'kiss']},
    {id: 3, url: 'img/gallery/3.jpg', keywords: ['cute', 'dog', 'baby']},
    {id: 4, url: 'img/gallery/4.jpg', keywords: ['cute', 'cat', 'sleep']},
    {id: 5, url: 'img/gallery/5.jpg', keywords: ['funny', 'baby']},
    {id: 6, url: 'img/gallery/6.jpg', keywords: ['funny']},
    {id: 7, url: 'img/gallery/7.jpg', keywords: ['cute', 'baby', 'funny']},
    {id: 8, url: 'img/gallery/8.jpg', keywords: ['cute', 'happy', 'movie']},
    {id: 9, url: 'img/gallery/9.jpg', keywords: ['cute', 'baby', 'evil']},
    {id: 10, url: 'img/gallery/10.jpg', keywords: ['politician', 'obama', 'happy']},
    {id: 11, url: 'img/gallery/11.jpg', keywords: ['kiss', 'fight', 'men']},
    {id: 12, url: 'img/gallery/12.jpg', keywords: ['funny']},
    {id: 13, url: 'img/gallery/13.jpg', keywords: ['movie', 'happy']},
    {id: 14, url: 'img/gallery/14.jpg', keywords: ['movie', 'serious']},
    {id: 15, url: 'img/gallery/15.jpg', keywords: ['movie']},
    {id: 16, url: 'img/gallery/16.jpg', keywords: ['movie', 'happy']},
    {id: 17, url: 'img/gallery/17.jpg', keywords: ['politician', 'serious']},
    {id: 18, url: 'img/gallery/18.jpg', keywords: ['movie']},
]; 

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: []
}

var gRandomLines = ['Is this really', 'Mornings make me', 'People are always like', 'Before coffee', 'Bring it on']

var gSavedMemes = []

function addLine(txt = 'Say Something') {
    let y = (gMeme.lines[gMeme.selectedLineIdx])? gMeme.lines[gMeme.selectedLineIdx].yPos + 50 : 60
    let newLine = {
        txt, 
        size: 30,
        font: 'Impact',
        align: 'center',
        strokeColor: 'black',
        fillColor: 'white',
        xPos: getCanvasWidth() / 2,
        yPos: y
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
    
    setLineXPos(gMeme.lines[gMeme.selectedLineIdx])
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

function makeRamdomMeme() {
    gMeme = {
        selectedImgId: getRandomIntInclusive(1,gImgs.length),
        selectedLineIdx: 0,
        lines: []
    }

    let numLines = getRandomIntInclusive(1,2)
    for (let i = 0; i < numLines; i++) {
        addLine(gRandomLines[getRandomIntInclusive(0, gRandomLines.length-1)])
    }
}

function saveMeme(url) {
    const meme = getMeme()
    const memeId = makeId(3)
    gSavedMemes.unshift({memeId, meme, url})
}

function setMeme(memeId) {
    const newMeme = getSelectedMeme(memeId)
    gMeme = newMeme
}

function getSelectedMeme(id) {
    const chosenMeme = gSavedMemes.find(savedMeme => id === savedMeme.memeId)
    const {meme} = chosenMeme
    console.log('chosen meme', meme); //SOMETHING HERE ISN'T WORKING
    return meme
}