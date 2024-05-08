// id="amazon-video-ads-iframe"
{
  /* <main id="amazon-video-ads-ui">
  <div class="App">
    <div style="background-color: black; height: 100%; position: absolute; width: 100%;">
      <video
        src="https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/0a0cd105-ae15-49cb-aa71-fc3645a791c1.MP4/mp4_900Kbs_30fps_48khz_96Kbs_480p_H264_baseline.mp4?c=589238365994342246&amp;a=586943023743236170&amp;d=15.015&amp;br=939&amp;w=854&amp;h=480&amp;ct=1014%2C1020&amp;ca=-"
        style="height: 100%; width: 100%;"
      ></video>
    </div>
  </div>
</main>; */
}

// document
//   .querySelector("#amazon-video-ads-ui")
//   .querySelector("video").currentTime += 10;

console.log("Twitch Ad Blocker Running..............");
(() => {
  setInterval(() => {
    const videoAdsContainer = document.querySelector("#amazon-video-ads-ui");
    if (videoAdsContainer) {
      const adVideos = videoAdsContainer.querySelectorAll("video");
      if (adVideos.length > 0) {
        adVideos.forEach((ad) => {
          ad.duration && (ad.currentTime = ad.duration);
          console.log("Ad Skipped : ", ad);
        });
      }
    }
  }, 250);
})();
