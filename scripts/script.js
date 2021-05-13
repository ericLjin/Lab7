// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {

  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let entryVal = 0;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        entryVal++;
        newPost.classList.add(`entry-${entryVal}`)
        newPost.entry = entry;
        newPost.addEventListener('click', function() {
            setState({page: "entry"}, this);
        });
        document.querySelector('main').appendChild(newPost);
      });
    });

    window.addEventListener('popstate', function(e) {
        let state = e.state;
        setState(e.state);
    });

    //swap to settings
    const settings = document.querySelector('img');
    settings.addEventListener('click', function() {
        setState({page: "settings"});
    });

    //go back to main page
    const header = document.querySelector('h1');
    header.addEventListener('click', function() {
        setState({page: "Journal Entries"});
    });

});
