const express = require("express");
const router = express.Router();

router.use(async(req, res) => {
    res.status(404);

    if (req.accepts('html')) {
        res.render('404');
        return;
    }

    if (req.accepts('json')) {
        res.json({ "error": 'Page not found.' });
        return;
    }
})

module.exports = router;