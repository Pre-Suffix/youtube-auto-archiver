require("dotenv").config();
const express = require("express");
const PASS = process.env.PASS ?? "password";
const DIRECTORY = process.env.DIRECTORY;
const youtubedl = require("youtube-dl-exec");

const app = express();

async function main() {

    // sets up API endpoint
    app.get('/', (req, res) => {
        if(!req.query.pass || req.query.pass != PASS) return res.sendStatus(401); // If password is invalid return HTTP 401
        else if(!req.query.id) return res.sendStatus(418); // If there is no ID, return HTTP 418
        else if(req.query.id.length != 11) return res.sendStatus(404); // If the ID is invalid, return HTTP 404

        // Check if user requested full download
        let full = req.query.full ?? false;
        if(typeof full != "boolean") full = full == "yes";

        // Return that request was properly recieved
        res.sendStatus(200);

        // Log to console video download
        console.log("Downloading video " + req.query.id);

        // Summon YT-DLP to download video
        if(full)
            youtubedl("https://www.youtube.com/watch?v=" + req.query.id, {
                paths: DIRECTORY, // Download to the directory defined by .env variable
                output: "%(title)s.%(ext)s", // Set video name to its title
                windowsFilenames: true, // Change uncompatible characters to Windows-supported ones
                noCheckCertificates: true,
                noWarnings: true,
                preferFreeFormats: true,
                
                // Embed multiple video data into download
                embedThumbnail: true,
                embedSubs: true,
                embedMetadata: true,
                embedChapters: true,
                addHeader: ['referer:youtube.com', 'user-agent:googlebot']
            })
            .then(() => { console.log("Finished downloading video " + req.query.id); });
        else
            youtubedl("https://www.youtube.com/watch?v=" + req.query.id, {
                paths: DIRECTORY, // Download to the directory defined by .env variable
                output: "%(title)s.%(ext)s", // Set video name to its title
                windowsFilenames: true, // Change uncompatible characters to Windows-supported ones
                noCheckCertificates: true,
                noWarnings: true,
                preferFreeFormats: true,
                addHeader: ['referer:youtube.com', 'user-agent:googlebot']
            })
            .then(() => { console.log("Finished downloading video " + req.query.id); });

    });

    // Start web server
    app.listen(process.env.PORT ?? 8088);
    console.log("Listening on port " + process.env.PORT ?? "8088");

}

main();
