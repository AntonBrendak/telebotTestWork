//DB
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_TABLE, process.env.DB_LOGIN, process.env.DB_PASS, {
    dialect: "mysql",
    host: process.env.DB_HOST,
    logging: false,     //// false|console.log
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
});

//Export
module.exports = sequelize;