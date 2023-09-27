
const constants = require("../utils/constants");

module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        userType: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: constants.userTypes.customer,
            validate: {
                isIn: {
                    args: [[constants.userTypes.customer, constants.userTypes.admin, constants.userTypes.engineer]],
                    msg: 'Must be valid userType'
                }
            }
        },
        userStatus: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: constants.userStatus.approved,
            validate: {
                isIn: {
                    args: [[constants.userStatus.approved, constants.userStatus.pending, constants.userStatus.rejected]],
                    msg: 'Must be a valid userStatus'
                }
            }
        }
    })

    return User;
}
