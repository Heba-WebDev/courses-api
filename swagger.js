const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Courses RESTful API",
      version: "1.0.0",
      description: "An API to get, update, delete, and add courses",
    },
    components: {
      schemas: {
        Course: {
          type: "object",
          properties: {
            // Define the properties of the Course object
            // For example:
            title: { type: "string" },
            price: { type: "string" },
          },
        },
      },
    },
  },
  apis: [__dirname + "/routes/courses.route.js"],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
