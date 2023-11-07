const { ERROR } = require("../utils/httpStatusCode");
module.exports = (asyncFn) => {
  return (req, res, next) => {
    asyncFn(req, res, next).catch((error) => {
      res.status(500).send({ status: ERROR, message: error });
    });
  };
};
