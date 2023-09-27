const authJwt = require("./auth.jwt");
const verifyUserForTicket = require("./checkForValidUser");
const verifySignup = require("./verifySignup");
/**
 * More middleware are yet to come
 */
module.exports = {
    authJwt,
    verifyUserForTicket,
    verifySignup
}