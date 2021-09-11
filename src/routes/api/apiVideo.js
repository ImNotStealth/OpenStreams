const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Video = require("../../models/video");
const request = require("request");
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
});

router.get('/:id', async(req, res) => {
	Video.findById(req.params.id).then((result) => {
        if (!result) {
            res.render('404');
            return;
        }
        const range = req.headers.range;
        let start;
        let end;
        if (range) {
            const bytesPrefix = "bytes=";
            if (range.startsWith(bytesPrefix)) {
                const bytesRange = range.substring(bytesPrefix.length);
                const parts = bytesRange.split("-");
                if (parts.length === 2) {
                    const rangeStart = parts[0] && parts[0].trim();
                    if (rangeStart && rangeStart.length > 0) {
                        start = parseInt(rangeStart);
                    }
                    const rangeEnd = parts[1] && parts[1].trim();
                    if (rangeEnd && rangeEnd.length > 0) {
                        end = parseInt(rangeEnd);
                    }
                }
            }
        }
        const url = result.path;
        let options;
        request({
            url: url,
            method: 'HEAD'
        }, function(error, response, body){
            setResponseHeaders(response.headers);
            pipeToResponse();
        });

        
        function setResponseHeaders(headers){
            if (!range) return;
            positions = range.replace(/bytes=/, "").split("-");
            start = parseInt(positions[0], 10); 
            total = headers['content-length'];
            end = positions[1] ? parseInt(positions[1], 10) : total - 1;
            chunksize = (end-start)+1;

            res.writeHead(206, { 
                "Content-Range": "bytes " + start + "-" + end + "/" + total, 
                "Accept-Ranges": range,
                "Content-Length": chunksize,
                "Content-Type":"video/mp4"
            });
        }
        
        function pipeToResponse() {
            options = {
                url: url,
                headers: {
                range: "bytes=" + start + "-" + end,
                connection: 'keep-alive'
                }
            };
            request(options).pipe(res);
        }
    });
})

module.exports = function (c) {
    mongoose = c;
    return router;
};