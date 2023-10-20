/**
 * This is going to be the starting point of the application
 */
const verifyCustomer = require("./middlewares/customerAuth.jwt");
const complain = require("./controllers/complain.controller");


const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


// Registration body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const ejs = require("ejs");
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

/**
 * HTML rendering by ejs
 */
app.get("/", (req, res) => {
    res.render("home");
})
app.get("/home", (req, res) => {
    res.render("home");
})
app.get("/signup", (req, res) => {
    res.render("signup");
})
app.get("/signin", (req, res) => {
    res.render("signin")
})
app.get("/logout", [verifyCustomer.verifyToken], async (req, res) => {
    try {

        res.clearCookie("CUSTOMER_token");
        console.log("logout successfully");
        await req.verifiedCustomer.save();
        res.render("signin");

    } catch (err) {
        res.status(500).send("logout error : ", err)
    }

})


app.get("/complain", [verifyCustomer.verifyToken], (req, res) => {
    res.render("complain");
})
app.get("/feedback", [verifyCustomer.verifyToken], (req, res) => {
    res.render("feedback");
})



async function allComplain() {
    const complains = await complain.getAllComplains();

    app.get("/dashboard", [verifyCustomer.verifyToken], (req, res) => {

        res.render("customerDashboard", { complains: complains });
    })

    app.get("/admin/home", (req, res) => {
        res.render("adminHome", { complains: complains });
    })
}
allComplain();




app.get("/admin-login", (req, res) => {
    res.render("adminLogin");
})
app.get("/admin-signup", (req, res) => {
    res.render("adminSignup");
})



/**
 * Code for the table initialization
 */
const db = require("./models");


/**
 * Execute the create table operation
 */
db.sequelize.sync({ force: false }).then(() => {
    console.log("Table created");
}).catch(err => {
    console.log("Error message : ", err);
})


/**
 * importing the routes and connect to the server
 */
const authRoute = require("./routes/customerAuth.route");
authRoute(app);

const complainRoute = require("./routes/complain.route");
complainRoute(app);

const feedbackRoute = require("./routes/feedback.route");
feedbackRoute(app);

const adminAuthRoute = require("./routes/adminAuth.route");
adminAuthRoute(app);

const statusRoute = require("./routes/status.route");
statusRoute(app);







// App running on PORT

app.listen(serverConfig.PORT, () => {
    console.log(`App is running on port : ${serverConfig.PORT}`);
});