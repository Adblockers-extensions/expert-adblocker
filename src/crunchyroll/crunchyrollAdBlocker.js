console.log("Crunchyroll Ad Blocker .........");

(() => {
  setInterval(() => {
    document
      .querySelectorAll('video[title="Advertisement"]')
      .forEach((video) => {
        video.duration && (video.currentTime = video.duration);
      });
    var elements = document.getElementsByClassName('erc-watch-upsell-banner upsell-banner-container');
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = 'none';
    }
  }, 250);
})();
