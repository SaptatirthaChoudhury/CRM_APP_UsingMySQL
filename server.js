/**
 * This is going to be the starting point of the application
 */

const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const bodyParser = require('body-parser');

// Registration body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
const authRoute = require("./routes/auth.route");
authRoute(app);

const userRoute = require("./routes/user.route");
userRoute(app);

const ticketRoute = require("./routes/ticket.route");
ticketRoute(app)

// App running on PORT

app.listen(serverConfig.PORT, () => {
    console.log(`App is running on port : ${serverConfig.PORT}`);
});