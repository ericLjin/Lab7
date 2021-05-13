// router.js

export const router = {};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function(stateObj, post) {
    const header = document.querySelector('h1');
    const pageID = stateObj.page;

    if(pageID === "settings")
    {
        document.querySelector('body').className = "settings";
        header.textContent = "Settings";
        window.history.pushState({page: "settings"}, "settings", "#settings");
    }
    else if(pageID === "Journal Entries")
    {
        document.querySelector('body').className = ""; 
        header.textContent = "Journal Entries";
        document.querySelector('entry-page').remove(); //clear <entry-page> element
        let newEntry = document.createElement('entry-page');
        document.querySelector('body').append(newEntry);
        window.history.pushState({page: "Journal Entries"}, "journalEntries", window.location.pathname + window.location.search);
    }
    else if(post) //runs if a new post is pushed onto the history stack
    {
        document.querySelector('body').className = "single-entry";
        let entryNum = post.className.split('-')[1]; //takes the form "entry-123"
        header.textContent = `Entry ${entryNum}`;
        const entryPageElem = document.querySelector('entry-page');
        entryPageElem.entry = post.entry;
        window.history.pushState({page: "entry", postObj: post.entry, entryNum: entryNum}, "entry", `#entry${entryNum}`);
    }
    else if(pageID === "entry") //runs if we return to a post using back
    {
        let postObj = stateObj.postObj;
        let entryNum = stateObj.entryNum;
        document.querySelector('body').className = "single-entry";
        header.textContent = `Entry ${entryNum}`;
        const entryPageElem = document.querySelector('entry-page');
        entryPageElem.entry = postObj.entry;
        window.history.pushState({page: "entry", postObj: post.entry, entryNum: entryNum}, "entry", `#entry${entryNum}`);
    }
}
