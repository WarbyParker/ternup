"use strict";
function isUndefined(expression) {
  return typeof expression === "undefined";
}

module.exports = function ternup(condition, fallback) {
  if (isUndefined(fallback)) fallback = "";

  return function(expr1, expr2) {
    if (isUndefined(expr1)) expr1 = fallback;
    if (isUndefined(expr2)) expr2 = fallback;

    return condition ? expr1 : expr2;
  };
}
