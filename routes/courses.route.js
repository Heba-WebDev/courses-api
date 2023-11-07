const express = require("express");
const { body } = require("express-validator");
const coursesRouter = express.Router();
const { validationSchema } = require("../middlewares/validationSchema");

let {
  getAllCourses,
  getCourse,
  postCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses.controller");

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     description: Get a list of all courses.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "Courses retrieved successfully"
 *               data: [course1, course2]
 */

coursesRouter.route("/").get(getAllCourses);

/**
 * @swagger
 *
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     description: Get a single course by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the course to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course found
 *       404:
 *         description: Course doesn't exist
 */

coursesRouter.route("/:id").get(getCourse);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     description: Create a new course.
 *     requestBody:
 *       description: Course details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Bad request
 */
coursesRouter.route("/").post(validationSchema(), postCourse);

/**
 * @swagger
 *
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     description: Update a single course by its ID. You can modify the "title" and/or "price" fields.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the course to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title for the course (if being updated).
 *               price:
 *                 type: number
 *                 description: New price for the course (if being updated).
 *     responses:
 *       200:
 *         description: Course updated successfully
 *
 *       400:
 *         description: Bad request, title and/or price are missing or invalid
 *       404:
 *         description: Course doesn't exist
 */

coursesRouter.route("/:id").put(updateCourse);

/**
 * @swagger
 *
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     description: Delete a single course by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the course to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Course deleted successfully
 *       404:
 *         description: Course doesn't exist
 */

coursesRouter.route("/:id").delete(deleteCourse);

module.exports = { coursesRouter };
