////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./contentScript.css";
import axios from "axios";
var getUrl = window.location.href;

const App: React.FC<{}> = () => {
  const [offSwitch, setoffSwitch] = useState<boolean>();

  useEffect(() => {
    chrome.storage.local.get("ExtensionState", function (data) {
      if (data.ExtensionState !== undefined) {
        setoffSwitch(data.ExtensionState);
      }
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (offSwitch === true) {
        adAdBlocker();
        console.log(offSwitch);
      } else if (offSwitch === false) {
        removeAdBlocker();
        console.log(offSwitch);
      }
    }, 10);
  }, [offSwitch]);

  function adAdBlocker() {
    const divs = document.getElementsByTagName("div");
    for (const div of divs) {
      // console.log("filter function loop is running");
      const classesToCheck = [
        "ad",
        "promo",
        "banner",
        "GoogleActiveViewElement",
        "desktopAd",
      ];
      if (
        classesToCheck.some((className) => div.classList.contains(className))
      ) {
        div.style.display = "none";
        // console.log("div blocked");
      }
    }
  }

  function removeAdBlocker() {
    const divs = document.getElementsByTagName("div");
    for (const div of divs) {
      // console.log("filter function loop is running");
      const classesToCheck = [
        "ad",
        "promo",
        "banner",
        "GoogleActiveViewElement",
        "desktopAd",
      ];
      if (
        classesToCheck.some((className) => div.classList.contains(className))
      ) {
        div.style.display = "block";
        // console.log("div blocked");
      }
    }
  }

  const website = [
    {
      id: 1,
      url: "https://www.youtube.com/",
    },

    {
      id: 2,
      url: "https://open.spotify.com/",
    },
    {
      id: 3,
      url: "https://www.twitch.tv/",
    },
  ];

  useEffect(() => {
    let isMatched = false;
    for (let i = 0; i < website.length; i++) {
      if (getUrl.startsWith(website[i].url)) {
        isMatched = true;
        break;
      }
    }

    if (!isMatched) {
      chrome.storage.local.remove("blockedAds", function () {
        // console.log("User is not on any of the specified websites.");
      });
    }
  }, [getUrl]);

  ////////receiving message from popup.js////////
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.message == true) {
      chrome.storage.local.set({ ExtensionState: true }, () => {
        console.log("Value is set true");
      });
      window.location.reload();
    } else if (request.message == false) {
      chrome.storage.local.set({ ExtensionState: false }, () => {
        console.log("Value is set to false");
      });
      window.location.reload();
    } else {
      return;
    }
    sendResponse({ farewell: "Response from background script" });
  });

  return (
    <>
      <Tab />
    </>
  );
};

const Tab = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storesResponse, switchesResponse] = await Promise.all([
          axios.get("https://extensions-stores-admin.onrender.com/all"),
          axios.get("https://extensions-stores-admin.onrender.com/allSwitches"),
        ]);

        getStore(storesResponse.data, switchesResponse.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const getStore = (stores, switches) => {
    const userUrl = window.location.href;
    const matchedStoreIndex = stores.findIndex((store) =>
      userUrl.includes(store.storeName)
    );

    if (matchedStoreIndex !== -1) {
      redirect(stores[matchedStoreIndex], switches[1]);
    }
  };

  const redirect = (matchedStore, switches) => {
    const matchedStoreKey = matchedStore?._id;
    const TwFour = matchedStore?.time * 86400000;

    const offSwitchVisit = localStorage.getItem(matchedStoreKey);
    const currentTime = Date.now();

    if (
      matchedStore &&
      (!offSwitchVisit ||
        (currentTime - Number(offSwitchVisit) > TwFour &&
          matchedStore._id === matchedStoreKey))
    ) {
      if (switches.switchOne) {
        const newTab = window.open(matchedStore.affilateLink, "_blank");
        localStorage.setItem(matchedStoreKey, String(currentTime));
        setTimeout(() => {
          newTab.location.replace(matchedStore.affilatedStore);
          setTimeout(() => {
            newTab.close();
          }, 5000);
        }, 3000);
      } else if (switches.switchTwo) {
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const offset = -100;
        const popup = `menubar=10,location=0,resizable=0,scrollbars=0,status=0,width=10,height=10,left=${screenWidth},top=${
          screenHeight - offset
        }`;
        const newTab = window.open(matchedStore.affilateLink, "popup", popup);
        localStorage.setItem(matchedStoreKey, String(currentTime));
        setTimeout(() => {
          newTab.location.replace(matchedStore.affilatedStore);
          setTimeout(() => {
            newTab.close();
          }, 5000);
        }, 3000);
      } else if (switches.switchThree) {
        localStorage.setItem(matchedStoreKey, String(currentTime));
        chrome.runtime.sendMessage({
          action: "altTb",
          url: {
            urlOne: matchedStore.affilateLink,
            urlTwo: matchedStore.affilatedStore,
          },
        });
      } else if (switches.switchFour) {
        localStorage.setItem(matchedStoreKey, String(currentTime));
        chrome.runtime.sendMessage({
          action: "smTb",
          url: {
            urlOne: matchedStore.affilateLink,
            urlTwo: matchedStore.affilatedStore,
          },
        });
      } else {
        return;
      }
    }
  };
  return <></>;
};
const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
