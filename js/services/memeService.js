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
        txt: 'Too much Cuteness', 
        size: 30,
        font: 'Impact',
        align: 'left',
        strokeColor: 'red',
        fillColor: 'purple',
        xPos: 30,
        yPos: 50
    } ]
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
    gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
}

function setMemeImg(imgId){
    gMeme.selectedImgId = +imgId
}