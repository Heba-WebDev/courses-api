const appError = require("../utils/globalError");
const { FAIL } = require("../utils/httpStatusCode");
const { ADMIN } = require("../utils/userRoles");
const allowTo = (role) => {
  return (req, res, next) => {
    if (req.decodedToken?.role === role) {
      next();
    } else {
      const error = appError.create("You are not autherized", 401, FAIL);
      next(error);
    }
  };
};

module.exports = { allowTo };
