'use strict'

var gQuestsTree 
var gCurrQuest
var gPrevQuest = null

var QUESTS_STORAGE_KEY = 'questions'

function createQuestsTree() {
  gQuestsTree = createQuest('Male')
  gQuestsTree.yes = createQuest('Ghandi')
  gQuestsTree.no = createQuest('Rita')
  gCurrQuest = gQuestsTree
  gPrevQuest = null
  saveToStorage(QUESTS_STORAGE_KEY, gQuestsTree)
  // console.log(localStorage[QUESTS_STORAGE_KEY])
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // DONE: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  gCurrQuest = gPrevQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  // console.log(gQuestsTree)
  var newQuest = createQuest(newQuestTxt)
  newQuest.yes = createQuest(newGuessTxt)
  newQuest.no = createQuest(gCurrQuest.txt)
  gPrevQuest[lastRes] = newQuest
  if(gCurrQuest) gCurrQuest = gQuestsTree

  saveToStorage(QUESTS_STORAGE_KEY, gQuestsTree)
  }

function getCurrQuest() {
  return gCurrQuest
}
