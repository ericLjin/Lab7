// sw.js - Service Worker

//install script
const CACHE_NAME = 'lab7-cache';
const urlsToCache = [
  '/',
  '/style.css',
  '/script/scripts.js',
  '/script/router.js',
  '/index.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }));
});

//activation
self.addEventListener('activate', function(event) {
  event.waitUntil(clients.claim());
});

//fetch req
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) return response; //success, fetched and cached previously
        return fetch(event.request); //otherwise attempt to fetch
      }));
});
