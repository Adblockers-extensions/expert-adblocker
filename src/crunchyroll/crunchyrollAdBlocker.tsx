import adsCount from "../contentScript/AdsCount";
import observeMutations from "../facebook/Observer";

let adnumber=0;
let lastLabel = null;
const checkPlayerDiv = () => {
    const containerElement = document.querySelectorAll('#vilos');
    const label=document.querySelector('[data-testid="vilos-ad_label"]')
    if (label && label !== lastLabel) {
        lastLabel = label;
        const number = label.textContent.split(" ")[3];
        if (number) {
            adnumber = parseInt(number);
            adsCount(Promise.resolve(adnumber));
        }
    }

    if (containerElement) {
        containerElement.forEach((element) => {
            if (element) {
                const adContainer = element.querySelectorAll('#ad-container');
                adContainer.forEach((ele) => {
                    const video = ele.querySelector('video');
                    if (video && video.buffered && video.buffered.length > 0) {
                        console.log(video);
                        video.muted = true;
                        video.currentTime = video.duration;
                        
                    }
                });
            }
        });
    }
};

observeMutations(checkPlayerDiv);
