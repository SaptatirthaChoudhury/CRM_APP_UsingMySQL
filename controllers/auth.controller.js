/**
 * This file will contain the logic for the registration of the user and login of the user
 * 
 * User:
 * 
 * Customer
 *   1. Registration is approved by default
 *   2. Should be able to login immediately
 * 
 * Engineer
 *   1. Should be able to registered
 *   2. Initially he/she will be in PENDING state
 *   3. ADMIN should be able to approve this
 * 
 * Admin
 *   1. ADMIN user should be only created from the backend...No API should be supported for it
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const constants = require("../utils/constants");
const secretKey = require("../configs/secret.config");
const db = require("../models");
const Customer = db.customer;

/**
 * Logic to accept the registration/signup
 * 
 * req -> What we get  from the client
 * res -> What we return from the server
 */

exports.signup = async (req, res) => {
   
    /**
     * Creating object for signup field
     */

    const customerObj = {
        customerName: req.body.name,
        customerId: req.body.userId,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)

    }

    /**
     * Insert the data and return the response
     */

    try {
        const userCreated = await Customer.create(customerObj);
        console.log("user : ", userCreated);


        /**
        * Send the successfull status code and redirect to home page
        */
        res.status(200);
        res.redirect("/signin");


    } catch (err) {
        console.log("Some error happened ", err.message);
        res.status(500).send({
            message: "Some internal server error ! "
        })
    }
}

/**
 * Logic for Signin
 */

exports.signin = async (req, res) => {

    /**
     * If the userId passed is correct
     */

    try {
        const customer = await Customer.findOne({
            where: {
                customerId: req.body.customerId
            }
        });

        console.log("customer info : ", customer);
        if (customer == null) {
            return res.status(400).send({
                message: "Failed ! customerId passed doesn't exist"
            })
        }


        /**
         * If the password passed is correct
         */

        const passwordIsValid = bcrypt.compareSync(req.body.password, customer.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid credentials ! try again"
            })
        }

        /**
         * Create the JWT token
         */
        const token = jwt.sign({
            id: customer.customerId
        }, secretKey.secret, {
            expiresIn: 30000
        });

        /**Set access token in response header */
        res.cookie("x-access-token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 60 * 1000),
        })

        /**
         * Send the successfull status code to response header and redirect to home page
         */
        res.status(200);
        res.redirect("/");

    } catch (err) {
        console.log("Internal error ! " + err.message);
        res.status(500).send({
            message: "Some internal error while signin"
        })
    }
}