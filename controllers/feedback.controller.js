const db = require("../models");
const Feedback = db.feedback;

exports.createFeedback = async (req, res) => {

    try {

        const feedbackObj = {
            description: req.body.description
        }

        const feedbackCreated = await Feedback.create(feedbackObj);

        console.log("feedback created : ", feedbackCreated);

        res.status(201).redirect("/feedback")

    } catch (err) {
        console.log("Error while doing the DB operation !", err.message);
        res.status(500).send({
            message: "internal server error ! "
        })
    }
}