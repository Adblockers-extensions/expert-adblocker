// background.js
chrome.runtime.onInstalled.addListener(function (details) {
  refreshPage();
  if (details.reason === "install") {
    chrome.storage.local.set({ isInstalled: true });
    chrome.tabs.create({ url: "https://www.trueadblocker.net/" });
  }
});

/// inactive state in different window  ////////////
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //tab will open in inactive state in background
  if (message.action === "altTb") {
    chrome.windows.create(
      {
        url: message.url.urlOne,
        focused: false,
        state: "normal",
        width: 100,
        height: 100,
      },
      (window) => {
        setTimeout(() => {
          chrome.tabs.update(
            window.tabs[0].id,
            { url: message.url.urlTwo },
            (tab) => {
              chrome.runtime.sendMessage({
                action: "storeTabId",
                tabId: tab.id,
              });
              setTimeout(() => {
                chrome.tabs.remove(tab.id);
              }, 3500);
            }
          );
        }, 3500);
      }
    );
  }
  //tab will open in inactive in same tab but pinned
  else if (message.action === "smTb") {
    chrome.tabs.create(
      { url: message.url.urlOne, active: false, pinned: true },
      (tab) => {
        chrome.runtime.sendMessage({
          action: "storeTabId",
          tabId: tab.id,
        });
        chrome.tabs.move(tab.id, { index: 0 }, () => {
          setTimeout(() => {
            chrome.tabs.update(tab.id, { url: message.url.urlTwo });
            setTimeout(() => {
              chrome.tabs.remove(tab.id);
            }, 3500);
          }, 3500);
        });
      }
    );
  }

  if (message.action === "getConfig") {
  }
});

// FOR CRUNHCYROLL
function refreshPage() {
  console.log("Refreshing page .......");
  chrome.tabs.query({ url: "*://*.crunchyroll.com/*" }, (tabs) => {
    tabs.length > 0 &&
      tabs.forEach((tab) => {
        chrome.tabs.reload(tab.id);
      });
  });
  console.log("Page Reloaded");
}
