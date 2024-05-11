import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import adsCount from "../contentScript/AdsCount";

const App: React.FC<{}> = () => {
    const FORWARD = 10.0;
    let lowSwitch = false;
    let highSwitch = false;
    let playerDiv;
    const adsObserver = new MutationObserver(() => {
        let adLabel = playerDiv.querySelector("div.AdUnitView");

        let players = playerDiv.querySelectorAll("video");
        if (adLabel) {
            players.forEach(fastForward);
        } else {
            players.forEach(backToNormal);
        }
    });

    function fastForward(player) {
        player.playbackRate = FORWARD;
        player.muted = true;
        let qualityContainer = document.querySelector(
            ".controls__setting-quality.controls__setting--navigable"
        ) as HTMLElement;
        if (qualityContainer && lowSwitch == false) {
            qualityContainer.click();
            adsCount(Promise.resolve(1));
            const lowQuality = document.querySelector(
                '.controls__setting-option[data-val="2150400"]'
            ) as HTMLElement;
            if (lowQuality) {
                lowSwitch = true;
                highSwitch = false;
                lowQuality.click();
            }
        }
    }

    function backToNormal(player) {

        player.playbackRate = 1.0;
        player.muted = false;
        let qualityContainer = document.querySelector(
            ".controls__setting-quality.controls__setting--navigable"
        ) as HTMLElement;
        if (qualityContainer && highSwitch == false) {
            qualityContainer.click();
            const highQuality = document.querySelector(
                '.controls__setting-option[data-val="Infinity"]'
            ) as HTMLElement;
            if (highQuality) {
                highQuality.click();
                highSwitch = true;
                lowSwitch = false;
            }
        }
    }

    function attachAdsObserver() {
        playerDiv = document.querySelector("#web-player-app");
        if (playerDiv) {
            adsObserver.observe(playerDiv, {
                attributes: false,
                childList: true,
                subtree: true,
            });
        } else {
            setTimeout(attachAdsObserver, 1000);
        }
    }

    attachAdsObserver();

    return <></>;
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
