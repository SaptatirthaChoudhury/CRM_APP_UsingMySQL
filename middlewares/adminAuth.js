const jwt = require("jsonwebtoken");
const secretConfig = require("../configs/adminSecret.config");

const verifyAdminToken = (req, res, next) => {

    const adminToken = req.cookies["ADMIN_token"]
    console.log("adminToken : ", adminToken);

    if (!adminToken) {
        return res.status(403).send({
            message: "No token provided ! Access prohibited"
        })
    }
    

    /**
    * Go and validate the token
    */
    jwt.verify(adminToken, secretConfig.adminSecret, (err, decoded) => {

        console.log("error jwt : ", err);
        console.log("decoded : ", decoded);

        if (err) {
            return res.status(401).send({
                message: "UnAuthorized !"
            })
        }

        req.adminToken = adminToken

        next();
    })
}

const authVerify = {
    verifyAdminToken: verifyAdminToken
}

module.exports = authVerify;