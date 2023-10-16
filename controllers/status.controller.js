const db = require("../models");
const Complain = db.complain;

exports.updateStatus = async (req, res) => {

    try {

        const targetComplain = await Complain.findOne({ where: { complain_Category: "payment issues" } })
        if (targetComplain) {
            targetComplain.status = req.body.status
            await targetComplain.save();
        }

    } catch (err) {
        console.log("error inside get status !", err);
        res.status(500).send({
            message: "Internal error happened ! "
        })

    }
}