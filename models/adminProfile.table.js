
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