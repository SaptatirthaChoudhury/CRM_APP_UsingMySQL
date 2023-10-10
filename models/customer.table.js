
const constants = require("../utils/constants");

module.exports = (sequelize, Sequelize) => {

    const Customer = sequelize.define("customer", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customerName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        customerId: {
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
        customerStatus: {
            type: Sequelize.STRING,
            defaultValue: constants.customerStatus.approved,
            validate: {
                isIn: {
                    args: [[constants.customerStatus.approved, constants.customerStatus.pending, constants.customerStatus.rejected]],
                    msg: 'Must be a valid userStatus'
                }
            }
        }
    })

    return Customer;
}
