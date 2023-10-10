/**
 * This file should have the logic to create controller for Ticket resource
 */
const db = require("../models");
const Complain = db.complain;



exports.createComplain = async (req, res) => {

    try {

        const complainObj = {
            complain_Category: req.body.categoryName,
            customer_Name: req.body.customerName,
            customer_Email: req.body.emailId,
            description: req.body.description
        }

        const complainCreated = await Complain.create(complainObj)

        console.log("complainCreated : ", complainCreated);

        res.status(200).redirect("/complain");
        

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