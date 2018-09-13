var soulDefs = require('../defs/soul-defs');
var randomId = require('idmaker').randomId;

function generateSouls({ probable, grids }) {
  var { souls, openSpaceRows } = generateBarriers({ probable, grids });
  var doofs = [placePlayer({ probable, openSpaceRows, grid: grids[0] })];

  const soulsLimit = probable.rollDie(16) + probable.roll(16);
  const soulStartY = probable.roll(~~(grids[0].rows.length * 0.2));
  const soulStartX = probable.roll(~~(grids[0].rows[0].length * 0.2));

  for (var row = soulStartY; row < grids[0].rows.length; ++row) {
    for (var col = soulStartX; col < grids[0].rows[0].length; ++col) {
      if (
        openSpaceRows[row] &&
        openSpaceRows[row][col] &&
        probable.roll(2) === 0 &&
        doofs.length < soulsLimit
      ) {
        let soul = JSON.parse(JSON.stringify(soulDefs.doof));
        soul.id = soul.type + '-' + randomId(4);
        soul.grid = {
          id: grids[0].id,
          colOnGrid: col,
          rowOnGrid: row
        };
        doofs.push(soul);
      }
    }
  }

  return souls.concat(doofs);
}

function placePlayer({ probable, openSpaceRows, grid }) {
  var soul = JSON.parse(JSON.stringify(soulDefs['player']));
  soul.id = 'player';
  var row;
  var col;
  do {
    row = probable.roll(openSpaceRows.length);
  } while (!openSpaceRows[row]);
  do {
    col = probable.roll(openSpaceRows[row].length);
  } while (!openSpaceRows[row][col]);

  soul.grid = {
    id: grid.id,
    colOnGrid: col,
    rowOnGrid: row
  };

  openSpaceRows[row][col] = false;
  return soul;
}

function generateBarriers({ probable, grids }) {
  var colLimit = grids[0].rows[0].length;
  var rowLimit = grids[0].rows.length;
  var boxOccupiedRows = getSpacesOccupiedByBoxes({
    probable,
    grids,
    colLimit,
    rowLimit
  });
  var souls = [];

  for (var row = 0; row < rowLimit; ++row) {
    for (var col = 0; col < colLimit; ++col) {
      let occupied = false;
      if (boxOccupiedRows[row] && boxOccupiedRows[row][col]) {
        occupied = true;
      }
      if (!occupied) {
        let barrier = JSON.parse(JSON.stringify(soulDefs.barrier));
        barrier.id = 'barrier-' + randomId(4);
        barrier.grid = {
          id: grids[0].id,
          colOnGrid: col,
          rowOnGrid: row
        };
        souls.push(barrier);
      }
    }
  }

  return { souls, openSpaceRows: boxOccupiedRows };
}

function getSpacesOccupiedByBoxes({ probable, colLimit, rowLimit }) {
  var boxRows = []; // Will contain columns of booleans.
  const numberOfBoxes = probable.rollDie(32) + probable.rollDie(32);
  for (var i = 0; i < numberOfBoxes; ++i) {
    let boxWidth = probable.rollDie(~~(colLimit / 2));
    let boxHeight = probable.rollDie(~~(rowLimit / 2));
    let yStart = probable.roll(rowLimit);
    let xStart = probable.roll(colLimit - boxWidth);
    for (let y = yStart; y < yStart + boxHeight; ++y) {
      for (let x = xStart; x < xStart + boxWidth; ++x) {
        let row = boxRows[y];
        if (!row) {
          row = [];
          boxRows[y] = row;
        }
        row[x] = true;
      }
    }
  }
  if (console.table) {
    console.table(boxRows);
  }
  return boxRows;
}

module.exports = generateSouls;
