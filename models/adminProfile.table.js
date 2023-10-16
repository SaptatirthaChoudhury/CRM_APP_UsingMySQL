const constants = require("../utils/constants");

module.exports = (sequelize, Sequelize) => {

    const Admin_Profile = sequelize.define("admin", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        adminName: {
            type: Sequelize.STRING,
            allownull: false
        },
        adminId: {
            type: Sequelize.STRING,
            allownull: false,
            unique: true
        },
        adminRole: {
            type: Sequelize.STRING,
            allownull: false,
            validate: {
                isIn: {
                    args: [[constants.adminRole.customerServiceManager, constants.adminRole.dataPrivacyOfficer, constants.adminRole.digitalProductSupportSpecialist, constants.adminRole.financeManager, constants.adminRole.fraudPreventionSpecialist, constants.adminRole.inventoryManager, constants.adminRole.itSupportSpecialist, constants.adminRole.logisticsCoordinator, constants.adminRole.productSafetyManager, constants.adminRole.qualityAssuranceManager, constants.adminRole.returnsAndRefundsSpecialist]],
                    msg: "Must be a valid admin role"
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allownull: false
        },
        adminEmail: {
            type: Sequelize.STRING,
            allownull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        }
    })

    return Admin_Profile;
}