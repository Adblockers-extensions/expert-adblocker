import adsCount from "../utils/AdsCount";
import observeMutations from "../utils/Observer";
let fast = false;
let normal = false;
const HBOMAX = () => {
  const adtext = document.querySelector(".gigKKX");
  const FORWARD = 5.5;
  const player = document.querySelectorAll("video")[0];
  if (player && player.buffered.length >= 1) {
    if (adtext?.textContent === "Ad") {
      fastForward(player);
      return;
    } else {
      backToNormal(player);
    }
  }
  function fastForward(player) {
    if (!fast) {
      player.playbackRate = FORWARD;
      player.muted = true;
      fast = true;
      normal = false;
      adsCount("HboMax",Promise.resolve(1));
    }
  }
  function backToNormal(player) {
    if (!normal) {
      player.playbackRate = 1.0;
      player.muted = false;
      fast = false;
      normal = true;
    }
  }
};
observeMutations(HBOMAX);
