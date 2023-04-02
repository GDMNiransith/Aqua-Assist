const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require ("dotenv").config();
const path = require ('path')

//middleware
app.use(cors());
app.use(bodyParser.json());


//models
require('./model/Issue');
require('./model/Campaign')
require ('./model/User')
require('./model/Donation')


//Routes
const issueRoute = require("./routes/IssueRoute");
app.use("/issue", issueRoute);
const campaignRoute =require("./routes/CampaignRoute")
app.use("/campaign",campaignRoute);
const registerRoute =require("./routes/RegisterRoute")
app.use("/register",registerRoute);
const loginRoute =require("./routes/LoginRoute")
app.use("/login",loginRoute);

const donationRoute =require("./routes/DonationRoute")
app.use("/donation",donationRoute);














//Database Connection
const PORT = process.env.PORT || 4000;
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
});
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("Mongodb Connection Success !😊") ;
})
app.listen(PORT, () => {
    console.log(`Server :    Alive @ ${PORT}`)  
})