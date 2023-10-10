/**
 * This is going to be the starting point of the application
 */

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
app.get("/complain", (req, res) => {
    res.render("complain");
})
app.get("/feedback", (req, res) => {
    res.render("feedback");
})
app.get("/dashboard", (req, res) => {
    res.render("customerDashboard");
})
app.get("/admin/home", (req, res) => {
    res.render("adminHome");
})
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
db.sequelize.sync({ force: true }).then(() => {
    console.log("Table created");
}).catch(err => {
    console.log("Error message : ", err);
})


/**
 * importing the routes and connect to the server
 */
const authRoute = require("./routes/auth.route");
authRoute(app);

const userRoute = require("./routes/user.route");
userRoute(app);

const complainRoute = require("./routes/complain.route");
complainRoute(app);

const feedbackRoute = require("./routes/feedback.route");
feedbackRoute(app);



// App running on PORT

app.listen(serverConfig.PORT, () => {
    console.log(`App is running on port : ${serverConfig.PORT}`);
});