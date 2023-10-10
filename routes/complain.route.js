/**
 * Route logic for the complain resource
 */

const complainController = require("../controllers/complain.controller");

module.exports = (app) => {

    /**
     * Create a complain
     * 
     * POST /customerComplainSystem/api/v1/Sendcomplain
     * Add a middleware for request body validation of ticket
     * And add another middleware for check is there any available engineer or not.
     */

    app.post("/customerComplainSystem/api/v1/Sendcomplain", complainController.createComplain);

    /**
     * Get all the tickets
     * 
     * GET /crm/api/v1/tickets/
     */
    // app.get("/crm/api/v1/tickets", ticketController.getAllTickets);

}