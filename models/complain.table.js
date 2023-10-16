const constants = require("../utils/constants");


module.exports = (sequelize, Sequelize) => {

    const Complain = sequelize.define("complain", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        complain_Category: {
            type: Sequelize.STRING(255),
            allownull: false
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: constants.complainStatus.inProgress,
            validate: {
                isIn: {
                    args: [constants.complainStatus.inProgress, constants.complainStatus.resolved, constants.complainStatus.blocked],
                    msg: 'Must be valid complain status'
                }
            }
        },
        description: {
            type: Sequelize.TEXT,
            allownull: false
        },
        customer_Name: {
            type: Sequelize.STRING(255),
            allownull: false
        },
        customerToken: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },
        customer_Email: {
            type: Sequelize.STRING(255),
            allownull: false,
            validate: {
                isEmail: true
            }
        },

    }, {
        timestamps: true,
    })

    return Complain;
}