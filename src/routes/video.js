const express = require("express");
const router = express.Router();
const fs = require("fs");
const request = require("request");

router.get('', async(req, res) => {
    const range = req.headers.range;
    if (range === undefined) return;
    const url = "https://cdn.qubyt.net/open-streams/kung-fu-panda.MP4";
    let options;
    request({
        url: url,
        method: 'HEAD'
      }, function(error, response, body){
        setResponseHeaders(response.headers);
        pipeToResponse();
      });

      
    function setResponseHeaders(headers){
        positions = range.replace(/bytes=/, "").split("-");
        start = parseInt(positions[0], 10); 
        total = headers['content-length'];
        end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        chunksize = (end-start)+1;

        res.writeHead(206, { 
            "Content-Range": "bytes " + start + "-" + end + "/" + total, 
            "Accept-Ranges": "bytes",
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

    /*const range = req.headers.range;
    if (range === undefined) return;
    const videoPath = './spiderverse.mp4';
    const videoSize = fs.statSync(videoPath).size;

    const chunkSize = 1 * 1e+6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunkSize, videoSize - 1);

    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, { start, end });
    stream.pipe(res);*/
});

module.exports = router;