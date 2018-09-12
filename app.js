var update = require('./flows/update');
var Render = require('./renderers/render');
var findWhere = require('./findwhere');
var generateGrids = require('./generators/generate-grids');
var generateSouls = require('./generators/generate-souls');

var theGameState = {
  allowAdvance: true,
  animations: [],
  ephemerals: {
    blasts: []
  }
};

var probable = {
  roll(sides) {
    return ~~(Math.random() * sides);
  },
  rollDie(sides) {
    return ~~(Math.random() * (sides + 1));
  },
  pickFromArray(array) {
    return array[~~(Math.random() * array.length)];
  }
};

var render = Render({ onAdvance: advance });

(function go() {
  window.onerror = reportTopLevelError;
  followRoute();
})();

function followRoute() {
  theGameState.grids = generateGrids({ probable });
  theGameState.souls = generateSouls({ probable, grids: theGameState.grids });
  theGameState.player = findWhere(theGameState.souls, { id: 'player' });

  advance({});
}

function advance({ recentClickX, recentClickY, commands }) {
  if (theGameState.allowAdvance) {
    update({
      gameState: theGameState,
      recentClickX,
      recentClickY,
      commands,
      probable
    });
    render({ gameState: theGameState });
  }
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  console.log(error);
}

