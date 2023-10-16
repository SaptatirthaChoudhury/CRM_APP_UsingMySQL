/**
 * Route logic for the admin resource
 */

const adminController = require("../controllers/adminAuth.controller");

module.exports = (app) => {

    app.post("/customerComplainSystem/api/v1/adminAuth/signup", adminController.adminSignup);

    app.post("/customerComplainSystem/api/v1/adminAuth/signin", adminController.adminSignin);
}
