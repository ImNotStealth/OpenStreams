const express = require("express");
const router = express.Router();
const fs = require("fs");
const request = require("request");

router.get('', async(req, res) => {
    const range = req.headers.range;
    console.log(range);
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
    const url = "https://cdn.qubyt.net/open-streams/videos/HgTwBgOW0nMw1qqxPytm3NoQlVFNCX.MP4";
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

module.exports = router;