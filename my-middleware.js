module.exports = function (options) {
  return function (req, res, next) {
    console.log(options.option1 + options.option2);
    next();
  };
};
