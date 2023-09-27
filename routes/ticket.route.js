/**
 * Route logic for the ticket resource
 */

const ticketController = require("../controllers/ticket.controller");

module.exports = (app) => {

    /**
     * Create a ticket
     * 
     * POST /crm/api/v1/tickets/
     * Add a middleware for request body validation of ticket
     * And add another middleware for check is there any available engineer or not.
     */

    app.post("/crm/api/v1/tickets/", ticketController.createTicket);

    /**
     * Get all the tickets
     * 
     * GET /crm/api/v1/tickets/
     */
    app.get("/crm/api/v1/tickets", ticketController.getAllTickets);

}