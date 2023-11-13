const express = require("express");
const usersRouter = express.Router();

let {
  getAllUsers,
  getUser,
  signup,
  login,
  updateUser,
} = require("../controllers/users.controller");
const { verifyToken } = require("../middlewares/verifyToken");

usersRouter.route("/").get(verifyToken, getAllUsers);

usersRouter.route("/:id").get(getUser);

usersRouter.route("/signup").post(signup);
usersRouter.route("/login").post(login);
usersRouter.route("/updateRole").post(updateUser);

module.exports = { usersRouter };
