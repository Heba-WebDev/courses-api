const express = require("express");
const usersRouter = express.Router();
const multer = require("multer");
const appError = require("../utils/globalError");

const storageFn = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    const fileName = `user-${Date.now()}.${extension}`;
    cb(null, fileName);
  },
});
const filterFile = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[0];
  if (fileType === "image") {
    return cb(null, true);
  } else {
    return cb(appError.create("Invalid file. Please upload an image.", 400));
  }
};
const upload = multer({ storage: storageFn, fileFilter: filterFile });

let {
  getAllUsers,
  getUser,
  signup,
  login,
  updateUser,
} = require("../controllers/users.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const { FAIL } = require("../utils/httpStatusCode");

usersRouter.route("/").get(verifyToken, getAllUsers);

usersRouter.route("/:id").get(getUser);

usersRouter.route("/signup").post(upload.single("image"), signup);
usersRouter.route("/login").post(login);
usersRouter.route("/updateRole").post(updateUser);

module.exports = { usersRouter };
