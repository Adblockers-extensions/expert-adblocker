console.log("HBOMAX Ad Blocker running.....");
function HBOMAX() {
  const FORWARD = 5.5;
  const adLabel = document.querySelector('[data-testid="ad"]');
  const player = document.querySelectorAll("video")[0];
  if (player && player.buffered.length >= 1) {
    if (adLabel && adLabel.style.visibility === "visible") {
      console.log("AD DETECED");
      console.log(console.log(`SKIPPING AD ON ${FORWARD}`));
      observer.disconnect();
      fastForward(player);
      return;
    } else {
      backToNormal(player);
      observer.disconnect();
    }
  }
  function fastForward(player) {
    player.playbackRate = FORWARD;
    player.muted = true;
  }
  function backToNormal(player) {
    player.playbackRate = 1.0;
    player.muted = false;
  }
}
const observer = new MutationObserver(HBOMAX);
observer.observe(document, {
  childList: true,
  subtree: true,
  attributes: true,
});
HBOMAX();
