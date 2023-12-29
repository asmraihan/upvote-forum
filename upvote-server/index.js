const express = require("express");
const app = express();
const cors = require("cors");
const fileupload = require("express-fileupload");
const exp = require("constants");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const hbs = require("hbs");
const { v4: uuidv4 } = require("uuid");
const sms = require("ssl-wireless-sms-send");
const nodemailer = require("nodemailer");
const https = require("https");
const fs = require("fs");
const console = require("console");
//? MIDDLEWARES
app.use(express.json());

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(fileupload());


//? CONTROLERS IMPORT
const auth = require("./routes/auth")


//? CONTROLLERS USE
app.use("/auth", auth)


//? VIEW ENGINE
app.get("/", (req, res) => {
    res.send("<center><h1>Server is Running</h1></center>");
});
app.get("/test", (req, res) => {
    res.send("<center><h1>test</h1></center>");
});

const server = app.listen(5000, () =>
    console.log(`
🚀 Server ready at: http://localhost:5000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)