const { Sequelize } = require('sequelize');

const dbConfig = require("./database").dbConfig;

const sequelize= new Sequelize(dbConfig.DB, dbConfig.USER,
dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operationsAliases: false,
	pool: {
	max: dbConfig.pool.max,
	min: dbConfig.pool.min,
	acquire: dbConfig.pool.acquire,
	idle: dbConfig.pool.idle
	}
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize=sequelize
db.sequelize.sync();
module.exports={sequelize, db}