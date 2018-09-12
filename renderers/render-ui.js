// Get the various DOM roots.
// var uiBoard = document.querySelector('#ui-board');
var controlsLayer = document.querySelector('#controls-layer');
var blastButton = document.querySelector('#blast-button');
var helpLayer = document.querySelector('#help-layer');
var closeHelpButton = document.querySelector('#close-help-button');

var playerCommandQueue = [];
var concludeUI;
blastButton.addEventListener('click', onBlastClick);
closeHelpButton.addEventListener('click', onCloseHelpClick);

function onBlastClick() {
  playerCommandQueue.push({ cmdType: 'blast' });
  concludeUI();
}

function onCloseHelpClick() {
  helpLayer.classList.add('hidden');
  if (concludeUI) {
    concludeUI();
  }
}

function renderUI({ gameState, onAdvance }) {
  playerCommandQueue.length = 0;

  if (gameState.uiOn) {
    controlsLayer.classList.remove('hidden');
  } else {
    controlsLayer.classList.add('hidden');
  }

  concludeUI = function advanceWithCommands() {
    gameState.uiOn = false;
    onAdvance({ gameState, commands: playerCommandQueue });
  };
}

module.exports = renderUI;
