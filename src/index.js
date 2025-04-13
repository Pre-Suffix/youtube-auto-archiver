require("dotenv").config();
const express = require("express");
const PASS = process.env.PASS ?? "password";
const youtubedl = require("youtube-dl-exec");

const app = express();

async function main() {
    let DIRECTORY = process.env.DIRECTORY;

    app.get('/', (req, res) => {
        if(!req.query.pass || req.query.pass != PASS) return res.sendStatus(401);
        else if(!req.query.id) return res.sendStatus(418);
        else if(req.query.id.length != 11) return res.sendStatus(404);
        res.sendStatus(200);

        console.log("Downloading video " + req.query.id);

        youtubedl("https://www.youtube.com/watch?v=" + req.query.id, {
            paths: DIRECTORY,
            output: "%(title)s.%(ext)s",
            windowsFilenames: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ['referer:youtube.com', 'user-agent:googlebot']
        })
        .then(() => { console.log("Finished downloading video " + req.query.id); });
    });

    app.listen(process.env.PORT ?? 8088);
    console.log("(2/2) Listening on port " + process.env.PORT ?? "8088");

}

main();