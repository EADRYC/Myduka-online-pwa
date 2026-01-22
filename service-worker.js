const CACHE_NAME = 'e-online-cache-v1';
const urlsToCache = [
  '/', 
  'https://i.imgur.com/9mKlU68.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Tunatumia {cache: 'reload'} kuhakikisha anapata faili jipya
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Requests - Mkakati wa "Network First"
// Hii ni muhimu kwa duka ili mteja akibadilisha bei au bidhaa ionekane fasta
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
