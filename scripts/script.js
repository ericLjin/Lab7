// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

//register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js')
    .then(function(registration) {
      console.log('ServiceWorker registration successful: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

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
