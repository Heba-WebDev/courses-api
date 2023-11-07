//const express = require("express");
require("dotenv").config();
const { validationResult } = require("express-validator");
const { courses } = require("../data/courses");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/globalError");
const { SUCCESS, FAIL } = require("../utils/httpStatusCode");

const getAllCourses = asyncWrapper(async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 2;
  const offset = (page - 1) * limit;
  const totalCourses = await courses.count();
  const totalPages = Math.ceil(totalCourses / limit);

  const result = await courses.findAll({
    limit: limit,
    offset: offset,
  });

  if (result?.length === 0) {
    const err = appError.create("Page not found!", 404, FAIL);
    return next(err);
  }

  res.send({
    status: SUCCESS,
    data: result,
    totalPages: totalPages,
  });
});

const getCourse = asyncWrapper(async (req, res, next) => {
  const course = await courses.findOne({
    where: { course_id: req.params.id },
  });

  if (!course) {
    const err = appError.create("course not found.", 404, FAIL);
    return next(err);
  }

  return res.status(200).json({
    status: SUCCESS,
    data: course,
  });
});

const postCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = appError.create(errors, 400, FAIL);
    return next(err);
  }

  const { title, price } = req.body;
  courses
    .create({
      title: title,
      price: price,
    })
    .then((result) => {
      return res.status(201).json({
        status: SUCCESS,
        data: { data: result, message: "Sucessfully created." },
      });
    });
});

const updateCourse = asyncWrapper(async (req, res, next) => {
  const id = Number(req.params.id);
  if (!req.body.title && !req.body.price) {
    const err = appError.create("Title and/or price are missing", 400, FAIL);
    return next(err);
  }
  const { title, price } = req.body;
  courses
    .update(
      {
        title: title,
        price: price,
      },
      {
        where: {
          course_id: Number(req.params.id),
        },
      }
    )
    .then((result) => {
      return res.status(200).json({ status: SUCCESS, data: { result } });
    });
});

const deleteCourse = asyncWrapper(async (req, res, next) => {
  const course = await courses.findOne({
    where: { course_id: req.params.id },
  });

  if (!course) {
    const err = appError.create("course not found.", 404, FAIL);
    return next(err);
  }
  courses
    .destroy({
      where: {
        course_id: Number(req.params.id),
      },
    })
    .then((result) => {
      return res.status(200).json({
        status: SUCCESS,
        data: { data: result, message: "Successfully deleted." },
      });
    });
});

module.exports = {
  getAllCourses,
  getCourse,
  postCourse,
  updateCourse,
  deleteCourse,
};
