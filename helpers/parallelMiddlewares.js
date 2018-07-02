// Require dependency to process asynchronously
const async = require("async");

// Make middlewares run in parallel where possible
exports.parallelMiddlewares = function parallelMiddlewares(middlewares) {
  return function (req, res, next) {
    async.each(middlewares, function (mw, cb) {
      mw(req, res, cb);
    }, next);
  };
}