/**
 * This is the controller file for the user resource
 */
const db = require("../models");
const objectConverter = require("../utils/objectConvereter");
const constants = require("../utils/constants");

const User = db.user
/**
 * Get the list of all the users
 */

exports.findAll = async (req, res) => {

    const queryObj = {};

    /**
     * Reading the optional query params
     */
    const userTypeQP = req.query.userType;
    const userStatusQP = req.query.userStatus;

    if (userTypeQP) {
        queryObj.userType = userTypeQP;
    }

    if (userStatusQP) {
        queryObj.userStatus = userStatusQP;
    }

    try {

        const users = await User.findAll({
            where: queryObj
        });
        console.log(users);
        return res.status(200).send(objectConverter.userResponse(users))

    } catch (err) {
        console.log("Error while fetching all the users");
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

/**
 * This method will return the user details based on the id
 */
exports.findByUserId = async (req, res) => {

    try {
        const user = await User.findOne({
            where: {
                userId: req.params.id
            }
        });
        // console.log(Array.isArray(user));
        return res.status(200).send(user);


    } catch (err) {
        console.log("Error while searching the user ", err);
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

exports.update = async (req, res) => {
    try {

        const myId = "@sapta"
        const isAdminOrNot = await User.findOne({
            where: {
                userId: myId
            }
        });


        const user = await User.findOne({
            where: {
                userId: req.params.id
            }
        })

        user.name = req.body.name != undefined ? req.body.name : user.name;

        if (req.body.userStatus || req.body.userType) {

            if (isAdminOrNot.userType == constants.userTypes.admin) {

                user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus;
                user.userType = req.body.userType != undefined ? req.body.userType : user.userType;
            } else {
                return res.status(405).send({
                    message: "Only admin can change userStatus and userType field ! "
                })
            }
        } else {
            user.userStatus = user.userStatus;
            user.userType = user.userType;
        }

        const updatedUser = await user.save();
        console.log("updatedUser : ", updatedUser);
        res.status(200).send({
            name: updatedUser.name,
            userId: updatedUser.userId,
            email: updatedUser.email,
            userType: updatedUser.userType,
            userStatus: updatedUser.userStatus
        });

    } catch (err) {
        console.log("Error while DB operation", err.message);
        return res.status(500).send({
            message: "Internal server error"
        })

    }
}
