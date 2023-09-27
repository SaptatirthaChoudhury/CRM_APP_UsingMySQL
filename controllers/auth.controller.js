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
const User = db.user;

/**
 * Logic to accept the registration/signup
 * 
 * req -> What we get  from the client
 * res -> What we return from the server
 */

exports.signup = async (req, res) => {
    /**
     * I need to read the data from the request body
     */
    if (req.body.userType == constants.userTypes.engineer) {
        req.body.userStatus = constants.userStatus.pending
    }

    /**
     * Convert that into the js object for inserting inthe mongo db
     */

    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password, 8),
        userStatus: req.body.userStatus
    }

    /**
     * Insert the data and return the response
     */

    try {
        const userCreated = await User.create(userObj);
        console.log("user : ", userCreated);
        const response = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            password: userCreated.password,
            userStatus: userCreated.userStatus
        }

        res.status(201).send(response)
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
        const user = await User.findOne({
            where: {
                userId: req.body.userId
            }
        });
        console.log("Inside  auth signin ___");
        console.log("user info : ", user);
        if (user == null) {
            return res.status(400).send({
                message: "Failed ! UserId passed doesn't exist"
            })
        }

        /**
         * Check if the user is in PENDING state
         */
        if (user.userStatus == constants.userStatus.pending) {
            return res.status(400).send({
                message: "Not yet approved from the admin"
            })
        }

        /**
         * If the password passed is correct
         */

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid credentials ! try again"
            })
        }

        /**
         * Create the JWT token
         */
        const token = jwt.sign({
            id: user.userId
        }, secretKey.secret, {
            expiresIn: 1000
        });

      
        /**
         * Send the successfull login response
         */
        res.status(200).send({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus,
            accessToken: token
        })

    } catch (err) {
        console.log("Internal error ! " + err.message);
        res.status(500).send({
            message: "Some internal error while signin"
        })
    }
}