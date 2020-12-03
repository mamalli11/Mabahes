const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const Products = sequelize.define("products", {
  //? Model attributes
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  Name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Price: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  Image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Weight: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(function () {
    console.log("----- success Products");
  })
  .catch(function (error) {
    console.log("- error \n", error);
  });

module.exports = Products;
