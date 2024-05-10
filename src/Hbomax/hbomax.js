const HBOMAX = () => {
  const adtext = document.querySelector('.gigKKX')
  const FORWARD = 5.5;
  const player = document.querySelectorAll("video")[0];
  if (player && player.buffered.length >= 1) {
    if (adtext?.textContent==='Ad') {
      fastForward(player);
      return;
    } else {
      backToNormal(player);
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

