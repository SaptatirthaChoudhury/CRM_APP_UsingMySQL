const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../configs/adminSecret.config");
const db = require("../models");
const Admin = db.admin;

exports.adminSignup = async (req, res) => {

    const adminObj = {
        adminName: req.body.name,
        adminId: req.body.id,
        adminRole: req.body.role,
        adminEmail: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }

    try {
        const adminCreated = await Admin.create(adminObj);
        console.log("admin ", adminCreated);

        res.status(302).redirect("/admin-login")

    } catch (err) {
        console.log("Some error happened ", err.message);
        res.status(302).redirect("/admin-signup")
    }

}

exports.adminSignin = async (req, res) => {

    try {
        const admin = await Admin.findOne({
            where: {
                adminId: req.body.id,
                adminRole: req.body.role

            }
        });

        console.log("admin info ", admin);
        if (admin == null) {
            return res.status(302).redirect("/admin-signup");
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
        }, key.adminSecret, {
            expiresIn: 30000
        });


        /**Set access token in response header */
        res.cookie("ADMIN_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 60 * 1000),
        })
      console.log("request object : ____", req.cookies.ADMIN_token);
        res.status(302).redirect("/admin/home")
    } catch (err) {
        console.log("Internal error ! " + err.message);
        res.status(500).send({
            message: "Some internal error while signin"
        })
    }
}