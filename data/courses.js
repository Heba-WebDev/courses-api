const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const courses = sequelize.define(
  "courses",
  {
    course_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    price: DataTypes.DECIMAL,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = { courses };
