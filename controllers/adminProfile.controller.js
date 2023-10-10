const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../configs/adminSecret.config");
const db = require("../models");
const Admin = db.admin;

exports.signup = async () => {

    const adminObj = {
        adminName: req.body.name,
        adminId: req.body.id,
        adminEmail: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }

    try {
        const adminCreated = await Admin.create(adminObj);
        console.log("admin ", adminCreated);

        resizeBy.status(200).redirect("/admin-login");

    } catch (err) {
        console.log("Some error happened ", err.message);
        res.status(500).send({
            message: "Some internal server error ! "
        })
    }

}

exports.signin = async (req, res) => {

    try {
        const admin = await Admin.findOne({
            where: {
                adminId: req.body.id
            }
        });

        console.log("admin info ", admin);
        if (admin == null) {
            return res.status(400).send({
                message: "Failed ! customerId passed doesn't exist"
            })
        }


        /**
         * If the password passed is correct
         */

        const passwordIsValid = bcrypt.compareSync(req.body.password, admin.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid credentials ! try again"
            })
        }

        /**
        * Create the JWT token
        */
        const token = jwt.sign({
            id: admin.adminId
        }, secretKey.secret, {
            expiresIn: 30000
        });


        /**Set access token in response header */
        res.cookie("x-access-token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 60 * 1000),
        })

        res.status(201).redirect("/admin-login")
    } catch (err) {

    }
}