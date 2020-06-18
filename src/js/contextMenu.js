var contextMenus = {};
var showForPages = ["https://*.substack.com/*"];

contextMenus.createMenu =
    chrome.contextMenus.create({
            "id": "substack_quote",
            "title": "Substack Quote",
            "contexts": ["selection"],
            "documentUrlPatterns": showForPages
        },
        function () {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
            }
        }
    );
chrome.contextMenus.onClicked.addListener(contextMenuHandler);

function contextMenuHandler(info, tab) {
    chrome.storage.sync.get("substackPreset", function (data) {
        let pageUrl = info.pageUrl;
        let quote = info.selectionText;
        let subdomain = pageUrl.substring(
            pageUrl.lastIndexOf("https://") + 8,
            pageUrl.lastIndexOf(".substack.com")
        );
        let url = new URL("https://twips.app/substack_quote");
        url.searchParams.append("subdomain", subdomain);
        url.searchParams.append("quote", quote);
        url.searchParams.append("theme", data.substackPreset.theme);
        url.searchParams.append("size", data.substackPreset.size);
        chrome.tabs.update({
            url: url.href
        });
    });

}