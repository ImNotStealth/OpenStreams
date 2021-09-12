const express = require("express");
const mongoose = require("mongoose");
const app = express();
const session = require('express-session');
const logger = require("../src/js/logger");
const package = require("../package.json");
const PORT = 2053;
const mongoURL = "mongodb+srv://EmtSdgRDdYYTshrZqmWb:MR8nfZwnDH3M0xXFHGL9$jbF!e&M9AnaER$&vrSwP$JJKvPI3A@qubyt.2dpxo.mongodb.net/openstreams?retryWrites=true&w=majority";

/* 
    Static Folders
*/
logger.info("Initializing OpenStreams.", "INIT");
logger.info("Setting up Express Settings.", "INIT");
app.use(express.static('public'));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));

/* 
    Set up Pages
*/
app.set('views', './src/views');
app.set('view engine', 'ejs');

/*
    Routes
*/
const loginRouter = require('../src/routes/login');
const authRouter = require("../src/routes/auth");
const watchRouter = require("../src/routes/watch");

const apiVideoRouter = require("../src/routes/api/apiVideo");
const apiUserRouter = require("../src/routes/api/apiUser");

const noPageRouter = require('../src/routes/404');

runStartup();

app.use('/', loginRouter);
app.use("/auth", new authRouter(mongoose));
app.use("/watch", watchRouter);
app.use("/api/video", new apiVideoRouter(mongoose));
app.use("/api/user", new apiUserRouter(mongoose));
app.use(noPageRouter);

function runStartup() {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((result) => {
        logger.info("Successfully connected to MongoDB.", "DB");
        app.listen(PORT, () => {
            logger.info(`OpenStreams ${package.version} is now running on port http://localhost:${PORT}`);
        })
    }).catch((err) => {
        //logger.error(`Failed to connect to MongoDB (${err})`, "DB");
        throw err;
    })

   /* const User = require("../src/models/user");
    const crypto = require("crypto");
    const user = new User({
        _id: "Stealth",
        username: "Stealth",
        password: crypto.createHash("sha256").update("L0ts0fC0des4Me!").digest("hex")
    })
    user.save().then((result) => {
        console.log(result);
    }).catch((error) => {
        logger.error(error);
    });*/
}