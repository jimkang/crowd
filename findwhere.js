function findWhere(array, condition) {
  var key = Object.keys(condition)[0];
  return array.find(meetsCondition);

  function meetsCondition(item) {
    return item[key] === condition[key];
  }
}

module.exports = findWhere;
