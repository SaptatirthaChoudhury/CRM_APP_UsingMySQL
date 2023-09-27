const userController = require("../controllers/user.controller");


module.exports = (app) => {
    app.get("/crm/api/v1/users", userController.findAll)

    app.get("/crm/api/v1/users/:id", userController.findByUserId)

    app.put("/crm/api/v1/users/:id", userController.update)
}