
function renderSoul({ imageContext }, soul) {
  imageContext.fillStyle = soul.id === 'player' ? 'blue' : 'green';
  imageContext.fillRect(
    soul.x - soul.sprite.width / 2,
    soul.y - soul.sprite.height / 2,
    soul.sprite.width,
    soul.sprite.height
  );
}

module.exports = renderSoul;
