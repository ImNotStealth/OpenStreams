const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const User = require("../../models/user");
const request = require("request");
const logger = require("../../js/logger");
let mongoose;

router.get('/:id', async(req, res) => {
	User.findById(req.params.id).then((result) => {
        if (!result) {
            res.status(404).render('404');
            return;
        }
        const response = {
            "username": result.username,
            "avatar": result.avatar
        }
        res.json(response);
    });
})

module.exports = function (c) {
    mongoose = c;
    return router;
};