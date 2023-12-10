// ==UserScript==
// @name         RaceResults
// @namespace    http://tampermonkey.net/
// @version      1
// @description  try to take over the world!
// @author       sashavirtual
// @match        http*://klavogonki.ru/g/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=klavogonki.ru
// @grant        none
// ==/UserScript==


let buttonMore= document.createElement('button')
buttonMore.textContent = "ХОЧУ РЕЗУЛЬТАТЫ"
let resultsParagraph= document.createElement('div')

document.querySelector("#play-right").appendChild(buttonMore)
document.querySelector("#play-right").appendChild(resultsParagraph)

function print(){
    let players = document.querySelector("#players")
let playerObj={}
for(let index=0;index<players.children.length;index++){
    let speed=document.querySelector(`#stats${index} > div:nth-child(2) > span.bitmore > span`)
    if(speed&&document.querySelector(`#car${index} > tbody > tr > td.name`).textContent!=='Гость'){
    let player=players.children[index]
    let time='05:00'
    let name=document.querySelector(`#car${index} > tbody > tr > td.name > div > table > tbody > tr:nth-child(2) > td > div > a`).textContent
    if(document.querySelector(`#stats${index} > div:nth-child(1) > span > span`)){
    time=document.querySelector(`#stats${index} > div:nth-child(1) > span > span`).textContent
    }
    let rang=document.querySelector(`#car${index} > tbody > tr > td.name > div > table > tbody > tr:nth-child(2) > td > div > a`).classList[0]
    let timeMS=document.querySelector(`#stats${index} > div:nth-child(1)`).textContent
    let timeArr=time.split(':')
    if (timeArr[0]==='5'){
        timeArr[0]='05'
    }
    timeMS=timeMS[timeMS.length-1]
    playerObj[name]={}
    playerObj[name].speed=+speed.textContent
        time = Number(Number(timeArr[0])*60)+Number(timeArr[1])+'.'+timeMS
    playerObj[name].time=+time
playerObj[name].errors=+document.querySelector(`#stats${index} > div:nth-child(3) > span:nth-child(1) > span`).textContent
playerObj[name].errorPercentage=+document.querySelector(`#stats${index} > div:nth-child(3) > span:nth-child(2) > span`).textContent.replace(',',".")
        playerObj[name]["rang"]=rang

    }

}
    resultsParagraph.textContent=JSON.stringify(playerObj).replace(/\},/ig,'},\n')
navigator.clipboard.writeText(JSON.stringify(playerObj).replace(/\},/ig,'},\n')+',\n')
}
buttonMore.addEventListener('click',print)
