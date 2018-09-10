var handleError = require('handle-error-web');
var probable = require('probable');

(function go() {
  window.onerror = reportTopLevelError;
  // Stuff goes here.
})();

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

