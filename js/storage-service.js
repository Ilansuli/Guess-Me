'use strict'

function saveToStorage(key,value){
    var json = JSON.stringify(value)
    // console.log('json', json)
    localStorage.setItem(key,json)
}


function loadFromStorage(key){
    var json = localStorage.getItem(key)
    var value = JSON.parse(json)
    return value
}