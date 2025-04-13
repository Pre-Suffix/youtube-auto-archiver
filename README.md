# YouTube Auto Archiver
> A simple tool made for datahoarders that can't bear the thought of having their favourite YouTube videos becoming lost media.

## Installation

To run the backend server, simply clone this repository, rename `._env` to `.env`, and fill in the variables.

To use the Firefox extension, edit `app.js` and properly fill in the two constants on the top of the file. Then, zip it and add it to Firefox, making sure you're using one of the blue-variants (Nightly, Developer) and have enabled unsigned extensions.

## Usage

If you want to archive a YouTube video you're watching, with the extension active, right-click on the tab and select "Save this video". It will send a request to your webserver to start downloading the video automatically.