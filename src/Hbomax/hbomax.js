import adsCount from "../utils/AdsCount";
import observeMutations from "../utils/Observer";
let fast = false;
let normal = false;
console.log("HBOMAX RUNNING");
const HBOMAX = () => {
  const adtext = document.querySelector(".gigKKX");
  const FORWARD = 5.5;
  const player = document.querySelectorAll("video");
  if (player && adtext) {
    if (adtext?.textContent === "Ad") {
      player.forEach(fastForward);
    } else {
      player.forEach(backToNormal);
    }
  }
  function fastForward(player) {
    player.playbackRate = FORWARD;
    player.muted = true;
    if (fast) {
      fast = true;
      normal = false;
      // adsCount("HboMax", Promise.resolve(1));
      console.log("ad skipped");
    }
  }
  function backToNormal(player) {
    player.playbackRate = 1.0;
    player.muted = false;
    if (!normal) {
      fast = false;
      normal = true;
    }
  }
};
observeMutations(HBOMAX);
