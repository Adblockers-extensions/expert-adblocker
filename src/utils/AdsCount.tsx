export default async function adsCount(AdsPath: string, resultPromise: Promise<number>) {
    try {
        const response = await resultPromise;

        // Initialize the default countdata
        const defaultCountData = [
            { name: 'SonyLiv', count: 0 },
            { name: 'HboMax', count: 0 }
        ];

        // Check if there are any open tabs
        chrome.tabs.query({}, function(tabs) {
            if (tabs.length === 0) {
                // No tabs are open, initialize AdsData
                chrome.storage.local.set({ AdsData: JSON.stringify(defaultCountData) }, function () {
                    console.log("Initial AdsData set because no tabs are open");
                });
            }
        });

        // First, update the blockedAds count
        chrome.storage.local.get("blockedAds", function (result) {
            const prevBlocked = result.blockedAds || 0;
            const newBlocked = prevBlocked + response;
            chrome.storage.local.set({ blockedAds: newBlocked }, function () {
                console.log("Blocked ads updated to: ", newBlocked);

                // Now, update AdsData with the newBlocked value
                chrome.storage.local.get(['AdsData'], function (result) {
                    let parsedData;
                    if (result.AdsData) {
                        parsedData = JSON.parse(result.AdsData);
                    } else {
                        parsedData = defaultCountData;
                    }

                    // Find the index of the service and update its count
                    const serviceIndex = parsedData.findIndex(item => item.name === AdsPath);
                    if (serviceIndex !== -1) {
                        parsedData[serviceIndex].count = newBlocked;

                        // Save the updated data
                        chrome.storage.local.set({ AdsData: JSON.stringify(parsedData) }, function () {
                            console.log("Updated Count");
                        });
                    } else {
                        console.log(`Service "${AdsPath}" not found.`);
                    }
                });
            });
        });

    } catch (error) {
        console.error("Error updating ad counts:", error);
    }
}
