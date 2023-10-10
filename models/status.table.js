
const constants = require("../utils/constants");

module.exports = (sequelize, Sequelize) => {

    const complainStatus = sequelize.define("complainStatus", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: Sequelize.STRING,
            allownull: false,
            defaultValue: constants.complainStatus.inProgress,
            validate: {
                isIn: {
                    args: [constants.complainStatus.inProgress, constants.complainStatus.resolved, constants.complainStatus.blocked],
                    msg: 'Must be valid complain status'
                }
            }
        },
        message: {
            type: Sequelize.TEXT,
            allownull: false
        }

    })

    return complainStatus;
}