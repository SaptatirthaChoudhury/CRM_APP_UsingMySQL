/**
 * Route logic for the feedback resource
 */

const feedbackController = require("../controllers/feedback.controller");

module.exports = (app) => {

    app.post("/customerComplainSystem/api/v1/sendFeedback", feedbackController.createFeedback);
}