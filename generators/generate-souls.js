var soulDefs = require('../defs/soul-defs');
var randomId = require('idmaker').randomId;

function generateSouls({ probable, grids }) {
  var player = JSON.parse(JSON.stringify(soulDefs.player));
  player.id = 'player';
  var souls = [];

  var numberOfSouls = probable.rollDie(16) + probable.roll(16);

  for (var i = 0; i < numberOfSouls; ++i) {
    let soul = JSON.parse(
      JSON.stringify(soulDefs[probable.roll(4) === 0 ? 'octo' : 'doof'])
    );
    soul.id = soul.type + '-' + randomId(4);
    souls.push(soul);
  }

  souls.push(player);

  souls.forEach(setGridProps);
  return souls;

  function setGridProps(soul) {
    let grid = probable.pickFromArray(grids);
    soul.grid = {
      id: grid.id,
      colOnGrid: probable.roll(grid.rows[0].length),
      rowOnGrid: probable.roll(grid.rows.length)
    };
  }
}

module.exports = generateSouls;
