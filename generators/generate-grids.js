var randomId = require('idmaker').randomId;

function generateGrids({ probable }) {
  var grids = [];
  var numberOfGrids = 1 + probable.rollDie(2);
  for (var i = 0; i < numberOfGrids; ++i) {
    let xSpace = 40;
    let ySpace = 40;
    let numberOfCols = 20;
    let numberOfRows = 20;
    let grid = {
      id: 'grid-' + randomId(4),
      xSpace,
      ySpace,
      // TODO: Should this be a separate table?
      xOffset: 0,
      yOffset: 0,
      numberOfCols,
      numberOfRows,
      width: numberOfCols * xSpace,
      height: numberOfRows * ySpace,
      // color: probable.pickFromArray(['red', 'green', 'blue'])
      color: `hsl(${probable.roll(360)}, 50%, 50%)`
    };
    grid.rows = getIntersectionRows(grid);
    grids.push(grid);
  }
  return grids;
}

function getIntersectionRows(grid) {
  var rows = [];
  for (var rowIndex = 0; rowIndex < grid.numberOfRows; ++rowIndex) {
    let row = [];
    for (var colIndex = 0; colIndex < grid.numberOfCols; ++colIndex) {
      row.push({
        x: grid.xOffset + colIndex * grid.xSpace,
        y: grid.yOffset + rowIndex * grid.ySpace,
        col: colIndex,
        row: rowIndex,
        gridId: grid.id
      });
    }
    rows.push(row);
  }
  return rows;
}

module.exports = generateGrids;
