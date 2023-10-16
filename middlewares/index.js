const verifyCustomer = require("./customerAuth.jwt");
const verifyUserForTicket = require("./checkForValidUser");
const verifySignup = require("./verifySignup");
const verifyAdmin = require("./adminAuth");

/**
 * More middleware are yet to come
 */
module.exports = {
    verifyCustomer,
    verifyUserForTicket,
    verifySignup,
    verifyAdmin
}