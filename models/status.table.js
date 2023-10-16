
const constants = require("../utils/constants");

module.exports = (sequelize, Sequelize) => {

    const complainStatus = sequelize.define("complainStatus", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        message: {
            type: Sequelize.TEXT,

        },
        customerToken: {
            type: Sequelize.INTEGER
        }

    })

    return complainStatus;
}