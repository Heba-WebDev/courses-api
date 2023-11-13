const jwt = require("jsonwebtoken");
const appError = require("../utils/globalError");
const { FAIL } = require("../utils/httpStatusCode");
const verifyToken = (req, res, next) => {
  const authHeder =
    req?.headers["Authorization"] || req?.headers["authorization"];

  if (!authHeder) {
    const error = appError.create("Token is required", 401, FAIL);
    return next(error);
  }
  const token = authHeder;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.decodedToken = decodedToken;
    next();
  } catch (err) {
    const error = appError.create("Not a valid Token", 401, FAIL);
    return next(error);
  }
};

module.exports = { verifyToken };
