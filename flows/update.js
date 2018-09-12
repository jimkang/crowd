var updateGrid = require('./update-grid');
var updateSoul = require('./update-soul');
var rbush = require('../dumb-rbush');
var findWhere = require('../findwhere');
var math = require('basic-2d-math');
var callNextTick = require('call-next-tick');

// Not really a radius: More like half a square.
const clickRadius = 20;

var targetTree = rbush(9);
var turn = 0;

function update({ gameState, recentClickX, recentClickY, commands, probable }) {
  if (commands) {
    commands.forEach(command => runCommand(gameState, command));
    return;
  }
  if (gameState.allowAdvance && !isNaN(recentClickX) && !isNaN(recentClickY)) {
    var thingsHit = targetTree.search({
      minX: recentClickX - clickRadius,
      maxX: recentClickX + clickRadius,
      minY: recentClickY - clickRadius,
      maxY: recentClickY + clickRadius
    });
    // console.log('thingsHit', thingsHit);

    // Assuming: if there is more than one intersection from the same grid hit,
    // there are so close that it doesn't matter which one we pick.
    // If it does matter, we can sort thingsHit by click distance.
    var selectedGridPoint = findWhere(thingsHit, {
      gridId: gameState.player.grid.id
    });
    if (selectedGridPoint) {
      if (
        selectedGridPoint.col === gameState.player.grid.colOnGrid &&
        selectedGridPoint.row === gameState.player.grid.rowOnGrid
      ) {
        gameState.uiOn = true;
        // TODO: This shouldn't increment turn.
      } else if (
        pointsAreAdjacent(
          [selectedGridPoint.col, selectedGridPoint.row],
          [gameState.player.grid.colOnGrid, gameState.player.grid.rowOnGrid]
        )
      ) {
        // Eventually, things other than clicking an adjacent space should
        // trigger interact().
        interact(gameState, thingsHit, selectedGridPoint, probable);
      }
    }
  }

  if (turn === 0) {
    gameState.grids.forEach(grid => updateGrid(targetTree, grid));
  }
  gameState.souls.forEach(soul =>
    updateSoul(gameState.grids, targetTree, soul)
  );
  turn += 1;
}

function interact(gameState, thingsHit, selectedGridPoint, probable) {
  movePlayer(gameState, selectedGridPoint);
  gameState.souls.forEach(soul => moveSoul(gameState, probable, soul));
}

function movePlayer(gameState, selectedGridPoint) {
  gameState.player.grid.colOnGrid = selectedGridPoint.col;
  gameState.player.grid.rowOnGrid = selectedGridPoint.row;
}

function moveSoul(gameState, probable, soul) {
  if (!soul.moves) {
    return;
  }
  // TODO: Moving for an actual reason.
  if (soul.id === 'player') {
    return;
  }
  var neighbors = getNeighboringGridPoints(
    soul,
    findWhere(gameState.grids, { id: soul.grid.id })
  );
  console.log('neighbors', neighbors);
  var neighbor = probable.pickFromArray(neighbors);
  soul.grid.colOnGrid = neighbor[0];
  soul.grid.rowOnGrid = neighbor[1];
}

// Cardinally adjacent, that is.
function pointsAreAdjacent(a, b) {
  var dist = math.getVectorMagnitude(math.subtractPairs(a, b));
  return dist === 1;
}

function getNeighboringGridPoints(soul, grid) {
  var neighbors = [
    [soul.grid.colOnGrid + 1, soul.grid.rowOnGrid],
    [soul.grid.colOnGrid, soul.grid.rowOnGrid + 1],
    [soul.grid.colOnGrid - 1, soul.grid.rowOnGrid],
    [soul.grid.colOnGrid, soul.grid.rowOnGrid - 1]
  ];
  return neighbors.filter(isInGridBounds);

  function isInGridBounds(neighbor) {
    return (
      neighbor[0] >= 0 &&
      neighbor[0] < grid.rows[0].length &&
      neighbor[1] >= 0 &&
      neighbor[1] < grid.rows.length
    );
  }
}

function runCommand(gameState, command) {
  var thingsHit;

  if (command.cmdType === 'blast') {
    thingsHit = targetTree.search({
      // This probably should be based on something other than the sprite size.
      minX: gameState.player.x - 3 * gameState.player.sprite.width,
      maxX: gameState.player.x + 3 * gameState.player.sprite.width,
      minY: gameState.player.y - 3 * gameState.player.sprite.height,
      maxY: gameState.player.y + 3 * gameState.player.sprite.height
    });
    // TODO: Further check that these are actually in a circle, rather than just
    // in a box circumscribing it.
    thingsHit = thingsHit.filter(isBlastable);
    console.log('blasting:', thingsHit);
    doSoulRemoval(() => console.log('souls removed.'));
  }

  function doSoulRemoval(done) {
    removeSouls(gameState, thingsHit);
    callNextTick(done);
  }
}

function isBlastable(thing) {
  // For now, only blast other souls.
  return thing.type && thing.type !== 'player';
}

function removeSouls(gameState, souls) {
  var ids = pluck(souls, 'id');
  souls.forEach(removeFromTargetTree);

  // Find souls that match these ids, then splice them out of the array.
  for (var i = gameState.souls.length - 1; i >= 0; --i) {
    if (ids.indexOf(gameState.souls[i].id) !== -1) {
      gameState.souls.splice(i, 1);
    }
  }
}

function removeFromTargetTree(soul) {
  targetTree.remove(soul);
}

function pluck(array, prop) {
  return array.map(getProp);

  function getProp(item) {
    return item[prop];
  }
}

module.exports = update;
