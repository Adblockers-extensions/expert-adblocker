console.log("Crunchyroll Ad Blocker .........");

(() => {
  setInterval(() => {
    document
      .querySelectorAll('video[title="Advertisement"]')
      .forEach((video) => {
        video.duration && (video.currentTime = video.duration);
      });
  }, 250);
})();
