import adsCount from "../utils/AdsCount";
import observeMutations from "../utils/Observer";

let hasCalledAdsCount = false; // Flag to track if adsCount has been called

const HOTSTAR = () => {

    const AdVideo = document.querySelector('#ad-video-container');
    if (AdVideo) {
        const videoElement = AdVideo.querySelector('video');
        if (videoElement &&!hasCalledAdsCount) { // Check if videoElement exists and adsCount hasn't been called yet
            videoElement.muted = false;
            videoElement.currentTime = videoElement.duration;
            console.log("Ad Video Skipped");
            adsCount("Disney+Hotstar", Promise.resolve(1));
            hasCalledAdsCount = true; // Set the flag to true after calling adsCount
            return;
        }
    }
}

observeMutations(HOTSTAR);