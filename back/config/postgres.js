const { Sequelize } = require("sequelize");

const database = process.env.PG_DATABASE;
const username = process.env.PG_USER;
const password = process.env.PG_PASSWORD;
const host = process.env.PG_HOST;
const port = process.env.PG_PORT || 5432;

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const dbConnectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa a la DB de PostgreSQL");
  } catch (e) {
    console.log("Error de conexión a la DB de PostgreSQL: ", e);
  }
};

module.exports = { sequelize, dbConnectPostgres };