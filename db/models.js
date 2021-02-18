//DB
const Sequelize = require("sequelize");
var sequelize = require('./connect')


//DB models
var DbModels = {}


DbModels.Matches = sequelize.define("matches", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    player1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    player2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    voters: {
        type: Sequelize.TEXT('long'),
        allowNull: true
    },
    voute1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    voute2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
    }
    
});



//Export
module.exports = DbModels;


