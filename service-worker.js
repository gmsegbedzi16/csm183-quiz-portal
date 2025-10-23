
const CACHE_NAME = 'csm183-quiz-v1';
const FILES = [
  '/',
  '/index.html',
  '/topics.html',
  '/quiz.html',
  '/styles.css',
  '/questions.json',
  '/manifest.json'
];
self.addEventListener('install', evt=>{
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache=>cache.addAll(FILES))
  );
  self.skipWaiting();
});
self.addEventListener('activate', evt=>{
  evt.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', evt=>{
  if (evt.request.method !== 'GET') return;
  evt.respondWith(
    caches.match(evt.request).then(resp=>resp || fetch(evt.request).then(r=>{
      return caches.open(CACHE_NAME).then(cache=>{
        cache.put(evt.request, r.clone());
        return r;
      });
    }).catch(()=>caches.match('/index.html')))
  );
});
