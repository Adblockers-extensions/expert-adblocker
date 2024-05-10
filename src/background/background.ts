chrome.runtime.onInstalled.addListener((details) => {
  switch (details.reason) {
    case "install":
      console.info("EXTENSION INSTALLED");
      const urlPrefixes = [
        "https://www.youtube.com",
        "https://www.twitch.tv/",
        "https://open.spotify.com",
        "https://www.hulu.com",
      ];
      chrome.tabs.query({}, (tabs) => {
        tabs
          .filter((tab) =>
            urlPrefixes.some((prefix) => tab.url.startsWith(prefix))
          )
          .forEach(({ id }) => {
            console.log("TABS DETECTED:", id);
            chrome.tabs.reload(id);
          });
      });
      chrome.storage.local.set({ ExtensionState: true });
      chrome.tabs.create({ url: "https://www.trueadblocker.net" });
      break;
    case "update":
      console.info("EXTENSION UPDATED");
      break;
    default:
      console.info("BROWSER UPDATED");
      break;
  }
});