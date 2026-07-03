const CACHE = 'denki2-v1';
const ASSETS = [
  '/denki2-app/',
  '/denki2-app/index.html',
  '/denki2-app/questions.js',
  '/denki2-app/questions2.js',
  '/denki2-app/manifest.json',
  '/denki2-app/icon-192.png',
  '/denki2-app/icon-512.png'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request))); });
