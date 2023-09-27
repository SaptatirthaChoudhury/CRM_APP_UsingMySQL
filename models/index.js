/**
 * This file will expose the functionalities of all the model files defined under the models directory
 */

// Create the connection with the db

const Sequelize = require("sequelize");
const config = require("../configs/db.config");

/**
 * Creating the db connection
 */
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool:
        {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const ticketSchema = require("./ticket.model");
db.ticket = ticketSchema(sequelize, Sequelize);
const userSchema = require("./user.model");
db.user = userSchema(sequelize, Sequelize);

/**
 * Establish the relation between
 *  User and Ticket : One to Many
 */
db.user.hasMany(db.ticket);
db.ticket.belongsTo(db.user);

/**
 * let's see if any upgradation comes then we extend further
 */

module.exports = db;