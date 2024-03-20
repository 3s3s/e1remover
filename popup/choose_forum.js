/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */

document.addEventListener("click", e => {
    if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
        // Ignore when click is not on a button within <div id="popup-content">.
        return;
    }  
    browser.tabs
    .query({ active: true, currentWindow: true })
    .then(Start)
    .catch(reportError);
})

/**
* Just log the error to the console.
*/
function reportError(error) {
    console.error(`Could not Start: ${error}`);
}

function Start(tabs)
{
    browser.tabs.sendMessage(tabs[0].id, {
        command: "StartRemove",
        forumID: document.getElementById('nForum').value,
        authorName: document.getElementById('nAuthor').value,
    });
}