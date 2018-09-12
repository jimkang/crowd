function rbush() {
  var items = [];

  return {
    search,
    remove,
    insert
  };

  function insert(item) {
    items.push(item);
  }

  function remove(item) {
    var index = -1;
    for (var i = 0; i < items.length; ++i) {
      if (items[i].id === item.id) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      items.splice(index, 1);
    }
  }

  function search({ minX, maxX, minY, maxY }) {
    return items.filter(itemIsInArea);

    function itemIsInArea(item) {
      return (
        item.x >= minX && item.x <= maxX && item.y >= minY && item.y <= maxY
      );
    }
  }
}

module.exports = rbush;
