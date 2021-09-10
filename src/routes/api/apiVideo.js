const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Video = require("../../models/video");
const logger = require("../../js/logger");
let mongoose;

router.get('', async(req, res) => {
    const response = [];

    Video.find({}, {}, (err, docs) => {
        for (const result in docs) {
            const add = {
                "id": docs[result]._id,
                "title": docs[result].title,
                "path": docs[result].path,
                "thumbnail": docs[result].thumbnail
            }
            response.push(add);
        }
        res.status(200).json(response);
    });

	/*const username = req.body.username;
	const password = req.body.password;
	if (username && password) {
		User.findById(username).then((result) => {
			if (result != null && result.password === crypto.createHash("sha256").update(password).digest("hex")) {
				req.session.loggedin = true;
				req.session.username = username;
				req.session.password = password;
				res.redirect('/');
			} else {
				req.session.error = "Invalid Credentials";
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
	}*/
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