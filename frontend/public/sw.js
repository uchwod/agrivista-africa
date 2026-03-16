const CACHE = 'agri-ai-v1'
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(['/', '/index.html'])))
  self.skipWaiting()
})
self.addEventListener('fetch', (e) => {
  if (e.request.url.startsWith('http') && e.request.method === 'GET') {
    e.respondWith(
      caches.match(e.request).then((cached) => cached || fetch(e.request).then((r) => {
        const clone = r.clone()
        if (r.ok && e.request.url.match(/\.(js|css|svg|woff2?)$/)) {
          caches.open(CACHE).then((cache) => cache.put(e.request, clone))
        }
        return r
      }))
    )
  }
})
