const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");

const host = "localhost";
const user = "root";
const password = "";
const database = "mabahs";
// const port = "";

const check = async () => {
  const connection = await mysql.createConnection({ host, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
};

check();

const seque = new Sequelize(database, user, password, {
  dialect: "mysql",
  host,
  logging: false,
});

module.exports = seque;
