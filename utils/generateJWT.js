const jwt = require("jsonwebtoken");
module.exports = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION,
  });
  return token;
};
