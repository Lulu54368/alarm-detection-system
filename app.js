const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

const corsOptionsDelegate = require("./middleware/cors").corsOptionsDelegate
//app.use (cors(corsOptions));
app.use (bodyParser.json());
app.use (bodyParser.urlencoded({extended:true}));

/*//connect to mysql
var mysql = require('mysql8');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});*/

  

const { Sequelize } = require('sequelize');

const dbConfig = require("./config/database").dbConfig;

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
app.get('/home', cors(corsOptionsDelegate), function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for an allowed domain.'})
  })
const server = app.listen(3000, () => {
    console.log("server is running... ");
  });
module.exports = server;