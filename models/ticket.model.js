const constants = require("../utils/constants");

module.exports = (sequelize, Sequelize) => {

    const Ticket = sequelize.define("ticket", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        title: {
            type: Sequelize.STRING,
            allownull: false
        },
        ticketPriority: {
            type: Sequelize.INTEGER,
            allownull: false,
            defaultValue: 4
        },
        description: {
            type: Sequelize.STRING,
            allownull: false
        },
        status: {
            type: Sequelize.STRING,
            allownull: false,
            defaultValue: constants.ticketStatus.open,
            validate: {
                isIn: {
                    args: [constants.ticketStatus.open, constants.ticketStatus.closed, constants.ticketStatus.blocked],
                    msg: 'Must be valid ticket status'
                }
            }
        },
        reporter: {
            type: Sequelize.STRING,
            allownull: false
        },
        assignee: {
            type: Sequelize.STRING
        }

    })

    return Ticket;
}