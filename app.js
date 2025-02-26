const connDB = require("./config/connection");
const seedAdmin = require("./seed/indexSeed");
const express = require("express");
const mongoStore = require("connect-mongo");
const passport = require("passport");
const router = require("./routes/index");
require("./config/passport");
require("dotenv").config();

const app = express();

connDB();
seedAdmin();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize());

app.use("/", router)

app.listen(process.env.PORT, () => {
    console.log("Server started");
})