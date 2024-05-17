import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./popup.css";

const App: React.FC<{}> = () => {
  const [blockedCount, setBlockedCount] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(['AdsData'], function (result) {
      if (result.AdsData) {
        const parsedData = JSON.parse(result.AdsData);
        setBlockedCount(parsedData)
        console.log(parsedData); // Logs the array of objects
        // You can now work with parsedData as needed
      } else {
        console.log("No data found under AdsData key.");
      }
    });
  }, []);

  return (
    <>
      <Loader blockedCount={blockedCount} />
    </>
  );
};


const Loader = ({ blockedCount }) => {
  const [isActiveYoutube, setIsActiveYoutube] = useState(true);
  const [currentURL, setCurrentURL] = useState("");
  const [currentPage, setCurrentPage] = useState("");

  const [isConnecting, setisConnecting] = useState(false);

  useEffect(() => {
    chrome.tabs.query(
      { active: true, lastFocusedWindow: true },
      function (tabs) {
        const currentTab = tabs[0];
        const currentUrl = currentTab.url;

        const url = new URL(currentUrl);

        // Extracting domain name and page information
        setCurrentURL(url.hostname);
        setCurrentPage(url.pathname);
      }
    );
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("appData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setIsActiveYoutube(parsedData.isActiveYoutube);
    }
  }, []);

  useEffect(() => {
    const dataToStore = { isActiveYoutube };
    localStorage.setItem("appData", JSON.stringify(dataToStore));
  }, [isActiveYoutube]);

  /////////////////////////////////////////////////////////////

  const onAdBlocker = () => {
    setIsActiveYoutube(true);

    setisConnecting(true);
    setTimeout(() => {
      setisConnecting(false);
      // Code to handle turning on ad blocking
    }, 2000);
    const message = { message: true };
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab) {
        chrome.tabs.sendMessage(activeTab.id!, message, (response) => {
          if (response && response.farewell) {
            console.log(response.farewell, "response");
          }
        });
      }
    });
  };

  const offAdBlocker = () => {
    setIsActiveYoutube(false);
    const message = { message: false };
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab) {
        chrome.tabs.sendMessage(activeTab.id!, message, (response) => {
          if (response && response.farewell) {
            console.log(response.farewell, "response");
          }
        });
      }
    });
  };

  ////////////////////////////////////////////

  return (
    <>
      <div className="true-adblocker-popoup__container">
        <header className="top">
          <div className="logo">
            <img src="/expert-ad-blocker-128.png" alt="logo" />
            <span>Expert Adblocker</span>
          </div>
          <div className="currentURL">
            <p>{currentURL}</p>
          </div>
          <div className="blocked_count">
            <div className="tadb_info">
              <h2>NUMBER OF ITEMS BLOCKED</h2>
              {
                blockedCount?.map((item,ind) => (
                  <div key={ind} className="tadb_info-container">

                    <div className="top">
                      <div className="left">
                        <p>{item.name}</p>
                      </div>
                      <div className="right">
                        <p>{item.count} Ads</p>
                      </div>
                    </div>


                  </div>
                ))
              }
            </div>
          </div>
        </header>

        <div className="middle">
          <button
            onClick={isActiveYoutube ? offAdBlocker : onAdBlocker}
            className="connected-btn"
          >
            {isActiveYoutube ? <span>OFF</span> : <span>ON</span>}
          </button>
        </div>
      </div>
    </>
  );
};

const root = document.createElement("div");
root.classList.add("true-adblocker-popoup");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
