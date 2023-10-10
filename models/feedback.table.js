
module.exports = (sequelize, Sequelize) => {

    const Feedback = sequelize.define("feedback", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        description: {
            type: Sequelize.STRING,
            allownull: false
        },

    })

    return Feedback;
}