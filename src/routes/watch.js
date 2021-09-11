const { response } = require("express");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const request = require("request");
const Video = require("../models/video");
const logger = require("../js/logger");

router.get('/:id', async(req, res) => {
    if (req.session.loggedin) {
        Video.findById(req.params.id).then((result) => {
            if (!result) {
                res.render('404');
                return;
            }
            logger.info(`Request made for: ${result.title}`, "MOVIE-REQUEST");
            const response = {
                id: result.id,
                title: result.title,
                path: `/api/video/${result.id}`,
                thumbnail: result.thumbnail
            }
            res.render("watch", { session: req.session, video: response });
        })
	} else res.redirect('/');
});

module.exports = router;