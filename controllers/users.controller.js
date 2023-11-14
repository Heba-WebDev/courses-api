require("dotenv").config();
const { users } = require("../data/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateJwt = require("../utils/generateJWT");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { SUCCESS, FAIL } = require("../utils/httpStatusCode");
const appError = require("../utils/globalError");
const { ADMIN } = require("../utils/userRoles");

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 2;
  const offset = (page - 1) * limit;
  const totalUsers = await users.count();
  const totalPages = Math.ceil(totalUsers / limit);

  const result = await users.findAll({
    attributes: { exclude: ["password"] },
    limit: limit,
    offset: offset,
  });

  if (result?.length === 0) {
    const err = appError.create("No user found!", 404, FAIL);
    return next(err);
  }
  res.send({
    status: SUCCESS,
    data: result,
    totalPages: totalPages,
  });
});

const getUser = asyncWrapper(async (req, res, next) => {
  const user = await users.findOne({
    where: { id: req.params.id },
  });

  if (!user) {
    const err = appError.create("User not found.", 404, FAIL);
    return next(err);
  }

  return res.status(200).json({
    status: SUCCESS,
    data: course,
  });
});

const signup = asyncWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (role) {
    const err = appError.create("You are not allowed to add a role", 401, FAIL);
    return next(err);
  }
  if (!name || !email || !password) {
    const err = appError.create(
      "Name, email and password are required.",
      404,
      FAIL
    );
    return next(err);
  }

  const user = await users.findOne({
    where: { email: req.body.email },
  });

  if (user) {
    const err = appError.create("Email exists", 400, FAIL);
    return next(err);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const token = await generateJwt({ name: name });
  users
    .create({
      name: name,
      email: email,
      password: hashedPassword,
      image: req?.file?.filename,
    })
    .then((result) => {
      return res.status(201).json({
        status: SUCCESS,
        data: {
          data: { result, accessToken: token },
          message: "User sucessfully created.",
        },
      });
    });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = appError.create("Email and password are required.", 400, FAIL);
    return next(err);
  }
  const user = await users.findOne({
    where: { email: email },
  });

  if (!user) {
    const err = appError.create("User not found.", 400, FAIL);
    return next(err);
  }

  const matchedPassword = await bcrypt.compare(password, user.password);
  const token = await generateJwt({ name: user.name, role: user.role });

  if (!matchedPassword) {
    const err = appError.create("Invalid Credentials.", 401, FAIL);
    return next(err);
  } else {
    return res.status(200).json({
      status: SUCCESS,
      data: {
        data: {
          name: user.name,
          email: user.email,
          role: user.role,
          accessToken: token,
        },
        message: "User sucessfully loged in.",
      },
    });
  }
});

const updateUser = asyncWrapper(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    const err = appError.create("Email is required.", 400, FAIL);
    return next(err);
  } else if (email !== process.env.ADMIN) {
    const err = appError.create("You are not autherized.", 401, FAIL);
    return next(err);
  }

  try {
    const user = await users.update(
      {
        role: ADMIN,
      },
      {
        where: { email: email },
      }
    );
    return res.status(200).json({
      status: SUCCESS,
      data: {
        data: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        message: "User sucessfully upgraded to an admin.",
      },
    });
  } catch {
    const err = appError.create("Not autherized", 401, FAIL);
    return next(err);
  }
});

module.exports = {
  getAllUsers,
  getUser,
  signup,
  login,
  updateUser,
};
