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
        description: {
            type: Sequelize.TEXT,
            allownull: false
        },
        customer_Name: {
            type: Sequelize.STRING(255),
            allownull: false
        },
        customer_Email: {
            type: Sequelize.STRING(255),
            allownull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

    }, {
        timestamps: true,
    })

    return Complain;
}