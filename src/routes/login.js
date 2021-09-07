const express = require("express");
const router = express.Router();

router.get('', async(req, res) => {
    if (req.session.loggedin) {
		res.render("home", { session: req.session, sessionID: req.sessionID });
	} else {
		res.render('login', { session: req.session });
	}
	res.end();
})

module.exports = router;