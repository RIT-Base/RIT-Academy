// sw.js — TCC & RIT Academy Service Worker
// CacheStorage API untuk aset statis dan CDN runtime (CodeMirror, Pyodide, Fonts)
// 100% Client-Side di browser mahasiswa (bebas biaya, hemat kuota seluler, offline-ready).

const CACHE_NAME = 'rit-academy-cache-v1';

// URL CDN dan font yang aman dan stabil untuk di-cache jangka panjang (Cache-First)
const IMMUTABLE_CDN_HOSTS = [
  'cdn.jsdelivr.net',
  'esm.sh',
  'unpkg.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

self.addEventListener('install', (event) => {
  // Langsung aktif tanpa menunggu tab lama ditutup
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Hanya proses request GET
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1. Strategi Cache-First untuk CDN eksternal (Pyodide WASM, CodeMirror ESM, Web Fonts)
  const isCdn = IMMUTABLE_CDN_HOSTS.some((host) => url.hostname.includes(host));
  if (isCdn) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) {
          return cached;
        }
        try {
          const networkResponse = await fetch(request);
          // Simpan response yang valid atau opaque (CORS)
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          console.warn('[SW] Gagal fetch CDN asset:', request.url, err);
          throw err;
        }
      })
    );
    return;
  }

  // 2. Strategi Stale-While-Revalidate untuk aset lokal (CSS, JS, Konten Markdown/JSON)
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cached); // Fallback ke cache jika offline

        return cached || fetchPromise;
      })
    );
  }
});
