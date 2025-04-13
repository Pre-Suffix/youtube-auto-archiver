// BASIC CONSTANTS. CHANGE THIS BEFORE USE
const PASS = "password";
const URL = "http://localhost:8080/?pass=" + PASS + "&id=";

// Function to request video save
async function saveVideo(tab) {
  const url = new URL(tab.url);
  // If the URL doesn't correspond to a valid youtube video, exit function
  if(url.hostname != "www.youtube.com" || url.pathname != "/watch" || !url.searchParams.has("v")) return false;

  // Fetch ID from URL, then send the proper API call
  let id = url.searchParams.get("v");
  await fetch(URL + id);

  return true;
}

// Setup context menu
const saveVideoID = "save-yt-video"
browser.contextMenus.create({
  id: saveVideoID,
  title: "Save this video",
  contexts: ["tab"]
});

// eslint-disable-next-line no-unused-vars
browser.contextMenus.onClicked.addListener((info, tab) => {
  if(info.menuItemId == saveVideoID) saveVideo(tab);
});