console.log("Peacock Ad Blocker running.....");
let remainingTimeSet = false;

const checkForAdCountdown = () => {
  const adCountdownGuide = document.querySelector(".ad-countdown__guide");
  if (adCountdownGuide) {
    console.log("Ad Started");

    const remainingTimeDiv = document.querySelector(
      ".ad-countdown__remaining-time"
    );

    if (remainingTimeDiv && !remainingTimeSet) {
      const remainingTimeText = remainingTimeDiv.textContent;
      console.log("Remaining Time : ", remainingTimeText);
      remainingTimeSet = true;
      const remainingTimeInSeconds = parseInt(remainingTimeText, 10) + 1;

      const adVideoElement = document.getElementById("core-video-shaka");

      if (adVideoElement) {
        console.log("Ad Video Element Found");
        adVideoElement.style.visibility = "hidden";
        adVideoElement.muted = true;
        adVideoElement.currentTime += remainingTimeInSeconds;
        adVideoElement.style.visibility = "visible";
        adVideoElement.muted = false;
        remainingTimeSet = false;

        console.log("Ad Video Skipped!");
      } else {
        console.log("Ad Video Element Not found");
      }
    }
  }
};

const observer = new MutationObserver(checkForAdCountdown);
observer.observe(document, { childList: true, subtree: true });
checkForAdCountdown();
