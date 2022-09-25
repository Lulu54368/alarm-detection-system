const { Sequelize, DataTypes } = require('sequelize');
const{sequelize} = require("../config/sequelize")
const User = sequelize.define('User', {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token:{
      type: DataTypes.String,
      allowNull: false
    }
});
module.exports={User}