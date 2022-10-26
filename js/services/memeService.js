'use strict'

var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}

var gImgs = [{id: 2, url: 'img/gallery/2.jpg', keywords: ['cute', 'dog']}]; 

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

function getImgPath(imgId) {
    const img = gImgs.find(image => imgId === image.id)
    const {url} = img
    return url
}
