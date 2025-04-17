const { Sequelize } = require("sequelize");

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT || 3306;

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: "mysql",
});

const dbConnectMySql = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa a la DB de MySql")
  } catch (e) {
    console.log("Error de conexión a la DB de MySql: ", e);
  }
};

module.exports = { sequelize, dbConnectMySql };
