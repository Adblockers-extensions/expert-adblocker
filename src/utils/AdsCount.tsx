export default async function adsCount(resultPromise: Promise<number>) {
    const response = await resultPromise;
    console.log(response);
    chrome.storage.local.get("blockedAds", function (result) {
        const prevBlocked = result.blockedAds || 0;
        const newBlocked = prevBlocked + response;
        chrome.storage.local.set({ blockedAds: newBlocked }, function () {
            console.log("Blocked ads updated to: " + newBlocked);
        });
    });
}