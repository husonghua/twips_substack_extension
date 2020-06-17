let theme = document.getElementById('theme');
let size = document.getElementById('size');
let save = document.getElementById('save');
let successAlert = document.getElementById('successAlert');

chrome.storage.sync.get('substackPreset', function (data) {
    theme.value = data.substackPreset.theme;
    size.value = data.substackPreset.size;
});

save.onclick = function () {
    chrome.storage.sync.set({
        substackPreset: {
            theme: theme.value,
            size: size.value
        }
    }, function () {
        successAlert.classList.remove("d-none");
    });
};