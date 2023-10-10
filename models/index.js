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

const complainSchema = require("./complain.table");
db.complain = complainSchema(sequelize, Sequelize);

const customerSchema = require("./customer.table");
db.customer = customerSchema(sequelize, Sequelize);

const feedbackSchema = require("./feedback.table");
db.feedback = feedbackSchema(sequelize, Sequelize);

const statusSchema = require("./status.table");
db.status = statusSchema(sequelize, Sequelize);

const adminSchema = require("./adminProfile.table");
db.admin = adminSchema(sequelize, Sequelize);

/**
 * Establish the relation between
 *  Customer and Complain : One to Many
 */
db.customer.hasMany(db.complain);
db.complain.belongsTo(db.customer);

/**
 * Establish the relation between
 * Customer and Feedback : One to Many
 */
db.customer.hasMany(db.feedback);
db.feedback.belongsTo(db.customer);

/**
 * Establish the relation between complain and status : One to One
 */
db.complain.hasOne(db.status);
db.status.belongsTo(db.complain);

/**
 * Establish the relation between admin and status : One to One
 */
db.admin.hasOne(db.status);
db.status.belongsTo(db.admin);



module.exports = db;