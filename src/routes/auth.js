const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const User = require("../models/user");
const logger = require("../js/logger");
let mongoose;

router.post('/', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (username && password) {
		User.findById(username).then((result) => {
			if (result != null && result.password === crypto.createHash("sha256").update(password).digest("hex")) {
				req.session.loggedin = true;
				req.session.username = username;
				req.session.password = password;
				res.redirect('/');
			} else {
				req.session.error = "Invalid Crendentials";
                res.redirect("/");
                req.session.error = "";
			}
		}).catch((err) => {
			console.log(err);
			//logger.error(err, "AUTH");
		})
	} else {
        res.render("login");
		res.end();
	}
});

router.get("/logout", (req, res) => {
	req.session.loggedin = undefined;
	req.session.error = undefined;
	res.redirect("/");
})

module.exports = function (c) {
    mongoose = c;
    return router;
};