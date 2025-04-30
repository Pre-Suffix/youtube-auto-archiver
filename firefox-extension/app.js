// BASIC CONSTANTS. CHANGE THIS BEFORE USE
const _PASS = "password";
const _URL = "http://localhost:8080/?pass=" + _PASS + "&id=";

// Function to request video save
async function saveVideo(tab, full = false) {
  const url = new URL(tab.url);
  // If the URL doesn't correspond to a valid youtube video, exit function
  if(url.hostname != "www.youtube.com" || url.pathname != "/watch" || !url.searchParams.has("v")) return false;

  // Fetch ID from URL, then send the proper API call
  let id = url.searchParams.get("v");
  console.log("Requesting to save video " + id);
  await fetch(_URL + id + (full ? "&full=yes" : ""));
  
  return true;
}

// Setup context menu
const saveVideoID = "save-yt-video"
browser.contextMenus.create({
  id: saveVideoID,
  title: "Save this video",
  contexts: ["tab"]
});

// Setup context menu
const saveVideoFullID = "save-yt-video-full"
browser.contextMenus.create({
  id: saveVideoFullID,
  title: "Save this video w/ extras",
  contexts: ["tab"]
});


// eslint-disable-next-line no-unused-vars
browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "save-yt-video":
      saveVideo(tab, false);
      break;
    case "save-yt-video-full":
      saveVideo(tab, true);
      break;
  }
});
