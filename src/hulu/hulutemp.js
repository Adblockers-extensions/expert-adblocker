console.log("HULU Ad Blocker .........");
(() => {
  const FORWARD = 8.0;
  setInterval(() => {
    document.querySelectorAll('#ad-video-player').forEach((video) => {
      if (video.duration) {
        video.playbackRate = FORWARD;
        video.mute = true;
        console.log("Skipping Video");
        video.currentTime = video.duration;
      };
    });
  }, 250);
})();