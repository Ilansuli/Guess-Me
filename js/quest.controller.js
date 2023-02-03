'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)

function init() {
  if (!localStorage[QUESTS_STORAGE_KEY]) createQuestsTree()
  else {
    gQuestsTree = loadFromStorage(QUESTS_STORAGE_KEY)
    gCurrQuest = gQuestsTree
  }
}

function onStartGuessing() {
  // DONE: hide the game-start section
  $('.game-start').hide()
  renderQuest()
  // DONE: show the quest section
  $('.quest').show(300)
}

function renderQuest() {
  // DONE: select the <h2> inside quest and update
  // its text by the currQuest text
  var currQuest = getCurrQuest()
  $('.quest h2').text(currQuest.txt)

}

function onUserResponse(ev) {
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.alert').style.visibility = 'visible'
      // TODO: improve UX
    } else {
      // alert('I dont know...teach me!')
      // DONE: hide and show new-quest section'
      $('.quest').hide()
      $('.new-quest').show(300)
    }
  } else {
    // DONE: update the lastRes global var
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  // DONE: Get the inputs' values
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()
  // DONE: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)
  $('#newQuest').val('')
  $('#newGuess').val('')
  onRestartGame()
}

function onRestartGame() {
  console.log('heh');
  $('.new-quest').hide()
  $('.game-start').show()
  gLastRes = null
}

