import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./popup.css";

const App: React.FC<{}> = () => {
  const [blockedCount, setBlockedCount] = useState(0);

  useEffect(() => {
    chrome.storage.local.get("blockedAds", function (result) {
      setBlockedCount(result.blockedAds);
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

              <div className="tadb_info-container">
                <div className="top">
                  <div className="left">
                    <p>on this page</p>
                    <h4>{blockedCount}</h4>
                  </div>
                  <div className="right">
                    <p>in total</p>
                    <h4>{blockedCount}</h4>
                  </div>
                </div>
                {/* <div className="bottom">
                  <a href="https://www.trueadblocker.net/">
                    <button>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                        <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                      </svg>{" "}
                      Share numbers with friends
                    </button>
                  </a>
                </div> */}
              </div>
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
