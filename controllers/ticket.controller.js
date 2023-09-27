/**
 * This file should have the logic to create controller for Ticket resource
 */
const db = require("../models");
const Ticket = db.ticket;
const User = db.user;
const constants = require("../utils/constants");
const objectConvereter = require("../utils/objectConvereter");

exports.createTicket = async (req, res) => {

    try {
        const reporterId = "Ma"
        console.log("___***** inside ticket controller ****____", req.userId);
        const ticketObj = {
            title: req.body.title,
            ticketPriority: req.body.ticketPriority,
            description: req.body.description,
            status: req.body.status,
            reporter: reporterId
        }

        /**
         *  Find the Engineer available and attach to the ticket Object
         */
        const engineer = await User.findOne({
            where: {
                userType: constants.userTypes.engineer,
                userStatus: constants.userStatus.approved
            }
        })
        console.log("engineer : ", engineer);
        if (engineer) {
            ticketObj.assignee = engineer.userId
        }

        const ticketCreated = await Ticket.create(ticketObj)

        console.log("ticketCreated : ", ticketCreated);

    } catch (err) {
        console.log("Error while doing the DB operation ", err.message);
        res.status(500).send({
            message: "Internal server error ! "
        })
    }
}

/**
 * Getting all the tickets
 */

exports.getAllTickets = async (req, res) => {

    /**
     * We need to find the all the tickets
     * We can use query params to filter out the tickets 
     */
    const queryObj = {};

    const statusQP = req.query.status;
    const reporterQP = req.query.reporter;
    const assigneeQP = req.query.assignee;

    if (statusQP) {
        queryObj.status = statusQP;
    }

    if (reporterQP) {
        queryObj.reporter = reporterQP
    }

    if (assigneeQP) {
        queryObj.assignee = assigneeQP
    }

    try {

        const tickets = await Ticket.findAll({
            where: queryObj
        })
        console.log(tickets);
        return res.status(200).send(tickets)


    } catch (err) {
        console.log("Error while fetching all the users");
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}