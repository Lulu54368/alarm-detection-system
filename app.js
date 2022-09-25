const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptons = {
	origin: "http://localhost:8080/"
		};
app.use (cors(corsOptions));
app.use (bodyParser.json());
app.use (bodyParser.urlencoded({extended:true}));


