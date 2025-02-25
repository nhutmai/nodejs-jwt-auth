const connDB = require("./config/connection");
const seedAdmin = require("./seed/indexSeed");
const session = require("express-session");
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

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
        mongoUrl: process.env.DB_URL,
        collectionName: process.env.COLLECTION_SESSION,
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
    }
}))

app.use(passport.initialize());


app.use("/", router)

app.listen(process.env.PORT, () => {
    console.log("Server started");
})