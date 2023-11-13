const express = require("express");
const swagger = require("./swagger");
const cors = require("cors");
const app = express();
const { coursesRouter } = require("./routes/courses.route");
const { usersRouter } = require("./routes/users.route");
const { sequelize } = require("./data/db");
const { courses } = require("./data/courses");
const { users } = require("./data/users");
const { FAIL, ERROR } = require("./utils/httpStatusCode");

swagger(app);
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText,
    message: error.message,
  });
});

app.all("*", (req, res, next) => {
  res
    .status(404)
    .send({ status: FAIL, data: null, message: "Resource not found." });
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    courses.sync();
    users.sync({ alter: true });
    console.log("Connection has been established successfully.");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
};

const startServer = () => {
  app.listen(3000, () => {
    console.log(`APP RUNNING ON PORT 3000`);
  });
};

const initializeApp = async () => {
  const dbConnectionSuccessful = await connectToDatabase();

  if (dbConnectionSuccessful) {
    startServer();
  }
};

initializeApp();
