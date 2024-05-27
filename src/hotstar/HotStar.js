import adsCount from "../utils/AdsCount";
import observeMutations from "../utils/Observer";

let hasCalledAdsCount = false;
const HOTSTAR = () => {
  const AdVideo = document.querySelector("#ad-video-container");
  if (AdVideo) {
    const videoElement = AdVideo.querySelectorAll("video");
    videoElement.forEach((video) => {
      if (video) {
        video.muted = false;
        video.currentTime = video.duration;
        if (!hasCalledAdsCount) {
          adsCount("Disney+Hotstar", Promise.resolve(1));
          hasCalledAdsCount = true;
        }
      }
      if (hasCalledAdsCount) {
        hasCalledAdsCount = false;
      }
    });
  }
};

observeMutations(HOTSTAR);
