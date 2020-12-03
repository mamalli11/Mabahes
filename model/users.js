const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const User = sequelize.define("users", {
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
  isAdmin: {
    type: DataTypes.BOOLEAN(),
    defaultValue: false,
    allowNull: false,
    comment: "1 = true | 0 = false",
  },
  Phone: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  Email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  Address: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  Password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
});

sequelize
  .sync()
  .then(function () {
    console.log("----- success User");
  })
  .catch(function (error) {
    console.log("- error \n", error);
  });

module.exports = User;
