/**
 * This file should have the logic to create controller for Ticket resource
 */
const db = require("../models");
const Complain = db.complain;
const Status = db.status;
const Customer = db.customer;



exports.createComplain = async (req, res) => {

    try {

        const complainObj = {
            complain_Category: req.body.categoryName,
            customer_Name: req.body.customerName,
            customer_Email: req.body.emailId,
            customerToken: req.body.token,
            description: req.body.description,

        }

        const complainCreated = await Complain.create(complainObj)
        console.log("complainCreated : ", complainCreated);

        const getCustomer = await Customer.findOne({ where: { email: complainCreated.customer_Email } })

        if (getCustomer) {
            complainCreated.customerId = getCustomer.id
            await complainCreated.save();
        }



        const createStatus = await Status.create({ status: "IN_PROGRESS", complainId: complainCreated.id, customerToken: complainCreated.customerToken })
        console.log("complain status : ", createStatus);

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

exports.getAllComplains = async (req, res) => {

    try {

        const complains = await Complain.findAll();
       console.log("get all complains ", complains);
        return complains;


    } catch (err) {
        console.log("Error while fetching all the users");
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}