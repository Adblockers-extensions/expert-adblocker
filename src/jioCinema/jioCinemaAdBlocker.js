console.log("Jiocinema ad blocker........");

// Target video elements with title="Advertisement"
const targetNode = document.body;

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      // Check added nodes for video elements with title="Advertisement"
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "VIDEO") {
          if (node.getAttribute("title") === "Advertisement") {
            node.addEventListener("loadedmetadata", () => {
              console.log("Ad Video : ", node);
              const controls = document.querySelector(
                ".mui-style-esv9wg-hideControls"
              );
              controls.style.display = "none";
              node.muted = true;
              node.style.display = "none";
              if (!isNaN(node.duration) && isFinite(node.duration)) {
                node.currentTime = node.duration;
                console.log("Ad video skipped successfully ");
              } else {
                console.log("Failed to Skip Ad video");
              }
              controls.style.display = "block";
            });
          }
        }
      });
    }
  }
};

// Create a new observer instance
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
