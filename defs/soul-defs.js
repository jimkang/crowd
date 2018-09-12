module.exports = {
  player: {
    type: 'player',
    sprite: {
      col: 2,
      row: 0,
      width: 32,
      height: 32,
      hitRadius: 48,
      color: {
        normal: 'blue',
        hurt: 'hsl(200, 50% 20%)'
      }
    }
  },
  doof: {
    type: 'doof',
    moves: true,
    sprite: {
      col: 1,
      row: 0,
      width: 32,
      height: 32,
      hitRadius: 100,
      color: {
        normal: 'green',
        hurt: 'hsl(140, 50%, 30%)'
      }
    }
  },
  barrier: {
    type: 'barrier',
    passable: false,
    sprite: {
      col: 0,
      row: 0,
      width: 32,
      height: 32,
      hitRadius: 32,
      color: {
        normal: 'gray'
      }
    }
  }
};
