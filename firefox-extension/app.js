// BASIC CONSTANTS. CHANGE THIS BEFORE USE
const PASS = "password";
const URL = "http://localhost:8080/?pass=" + PASS + "&id=";

// Function to request video save
async function saveVideo(tab, full = false) {
  const url = new URL(tab.url);
  // If the URL doesn't correspond to a valid youtube video, exit function
  if(url.hostname != "www.youtube.com" || url.pathname != "/watch" || !url.searchParams.has("v")) return false;

  // Fetch ID from URL, then send the proper API call
  let id = url.searchParams.get("v");
  await fetch(URL + id + "&full=" + full ? "yes" : "no");
  
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
  if(info.menuItemId == saveVideoID || info.menuItemId == saveVideoFullID) saveVideo(tab, info.menuItemId == saveVideoFullID);
});