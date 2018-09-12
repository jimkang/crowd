var applyToPointsInRows = require('../apply-to-points-in-rows');

function renderGrid({ imageContext, playerGridId }, grid) {
  drawGridLines({ grid, imageContext, playerGridId });
  drawIntersections({ grid, imageContext, playerGridId });
}

function drawGridLines({ grid, imageContext, playerGridId }) {
  var cols = rowsToCols(grid.rows);

  imageContext.strokeStyle = grid.color;
  imageContext.lineWidth = playerGridId === grid.id ? 2 : 1;

  cols.forEach(drawCol);
  grid.rows.forEach(drawRow);

  imageContext.stroke();

  function drawCol(col) {
    imageContext.moveTo(col[0].x, col[0].y);
    imageContext.lineTo(col[0].x, col[col.length - 1].y);
  }

  function drawRow(row) {
    imageContext.moveTo(row[0].x, row[0].y);
    imageContext.lineTo(row[row.length - 1].x, row[0].y);
    console.log('row', row);
  }
}

function rowsToCols(rows) {
  var cols = [];
  for (var colIndex = 0; colIndex < rows[0].length; ++colIndex) {
    let col = [];
    for (let rowIndex = 0; rowIndex < rows.length; ++rowIndex) {
      col.push(rows[rowIndex][colIndex]);
    }
    cols.push(col);
  }
  return cols;
}

function drawIntersections({ grid, imageContext, playerGridId }) {
  var radius = playerGridId === grid.id ? 8 : 4;
  imageContext.fillStyle = grid.color;
  imageContext.beginPath();
  applyToPointsInRows(grid.rows, point =>
    drawIntersectionCircle(imageContext, radius, point)
  );
  imageContext.fill();
}

function drawIntersectionCircle(imageContext, radius, point) {
  var x = point.x;
  var y = point.y;
  imageContext.moveTo(x, y);
  imageContext.arc(x, y, radius, 0, Math.PI * 2);
}

module.exports = renderGrid;
