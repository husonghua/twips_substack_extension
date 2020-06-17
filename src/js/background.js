chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({
        substackPreset: {
            theme: 'twip-theme-dark',
            size: 'twip-size-auto'
        }
    }, function () {
        console.log("Preset is set");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    hostContains: 'substack.com'
                },
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});