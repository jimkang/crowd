function renderMessage({ messageType, message }) {
  var slate = document.querySelector(`#${messageType}`);
  slate.text(message);
  slate.classed('hidden', false);
}

module.exports = renderMessage;
