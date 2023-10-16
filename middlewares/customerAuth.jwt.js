const jwt = require("jsonwebtoken");
const customerSecret = require("../configs/customerSecret.config");
const constants = require("../utils/constants");
const db = require("../models");
const Customer = db.customer;

const verifyToken = (req, res, next) => {

    const customerToken = req.cookies["CUSTOMER_token"]

    /**
     * Check if the token is present
     */

    if (!customerToken) {
        return res.status(302).redirect("/signin")
    }

    /**
        * Go and validate the token
        */
    jwt.verify(customerToken, customerSecret.secret, async (err, decoded) => {



        if (err) {
            return res.status(302).redirect("/signup");
        }

        req.id = decoded.id;

        next();
    })

    /**
     * Read the value of the token id and set it in the request for further use....
     */

}

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                userId: req.userId
            }
        });

        if (user && user.userType == constants.userTypes.admin) {
            next();
        } else {
            res.status(403).send({
                message: "Only ADMIN users are allowed to access this endpoint"
            })
        }
    } catch (err) {
        console.log("Error while reading the user info", err.message);
    }

}

const isValidUserIdReqParam = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                userId: req.params.id
            }
        });

        if (!user) {
            return res.status(400).send({
                message: "UserId passed doesn't exist"
            })
        }
        next();
    } catch (err) {
        console.log("Error while reading the user info", err.message);
        return res.status(500).send({
            message: "Internal server error while reading the user data"
        })
    }
}

const isAdminOrOwner = async (req, res, next) => {

    /**
     * Either the caller should be the ADMIN or the caller should be the owner of the userId
     */

    try {

        const callingUser = await User.findOne({
            where: {
                userId: req.userId
            }
        });

        if (callingUser.userType == constants.userTypes.admin || callingUser.userId == req.params.id) {
            next();
        } else {
            res.status(403).send({
                message: "Only admin or the owner is allowed to make this call"
            })
        }

    } catch (err) {
        console.log("Error while reading the user info", err.message);
        return res.status(500).send({
            message: "Internal server error while reading the user data"
        })

    }

}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isValidUserIdReqParam: isValidUserIdReqParam,
    isAdminOrOwner: isAdminOrOwner
};

module.exports = authJwt;