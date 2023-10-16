
const statusController = require("../controllers/status.controller");
const verifyAdmin = require("../middlewares/adminAuth");

module.exports = (app) => {

    app.post("/updateCustomerComplainStatus/api/v1", [verifyAdmin.verifyAdminToken], statusController.updateStatus);
}