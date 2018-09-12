var renderGrid = require('./render-grid');
var renderSoul = require('./render-soul');
var renderBlast = require('./render-blast');
var renderUI = require('./render-ui');

const widthLimit = 800;

// Get the various DOM roots.
var canvasesContainer = document.querySelector('#canvases-container');
var imageBoard = document.querySelector('#image-board');
var uiBoard = document.querySelector('#ui-board');
var inputBoard = document.querySelector('#input-board');
var imageContext = imageBoard.getContext('2d', { alpha: false });

// If changing window size means that board size needs to change, consider
// putting this in render();
var { boardWidth, boardHeight } = resizeBoards();

function Render({ onAdvance, uiOn }) {
  inputBoard.addEventListener('click', onInputBoardClick);

  return render;

  function render({ gameState }) {
    draw(gameState);
    // Test.
    // imageContext.strokeStyle = 'green';
    // imageContext.beginPath();
    // imageContext.moveTo(0, probable.roll(800));
    // imageContext.lineTo(800, probable.roll(800));
    // imageContext.stroke();

    renderUI({ gameState, onAdvance, uiOn });
  }

  function onInputBoardClick(e) {
    onAdvance({ recentClickX: e.offsetX, recentClickY: e.offsetY });
  }
}

function draw(gameState) {
  imageContext.clearRect(0, 0, boardWidth, boardHeight);
  gameState.grids.forEach(grid =>
    renderGrid(
      {
        imageContext,
        playerGridId: gameState.player.grid.id
      },
      grid
    )
  );
  gameState.souls.forEach(soul => renderSoul({ imageContext }, soul));
  gameState.ephemerals.blasts.forEach(blast =>
    renderBlast({ imageContext }, blast)
  );
}

function resizeBoards() {
  var boardWidth = document.body.getBoundingClientRect().width;

  if (boardWidth > widthLimit) {
    boardWidth = widthLimit;
  }
  var boardHeight = document.body.getBoundingClientRect().height;
  if (boardHeight < 400) {
    boardHeight = boardWidth;
  }

  canvasesContainer.style.width = boardWidth;
  canvasesContainer.style.height = boardHeight;
  imageBoard.width = boardWidth;
  imageBoard.height = boardHeight;
  uiBoard.style.width = boardWidth;
  uiBoard.style.height = boardHeight;
  inputBoard.width = boardWidth;
  inputBoard.height = boardHeight;

  return { boardWidth, boardHeight };
}

module.exports = Render;
