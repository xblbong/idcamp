const CACHE_NAME = 'snapstory-shell-v1';
const SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  // ICONS
  '/icons/icon-72x72.png',
  '/icons/icon-144x144.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // SCREENSHOTS (opsional, jika ada di manifest)
  '/screenshots/desktop.png',
  '/screenshots/mobile.png',
  // CSS (jika ada file CSS terpisah)
  '/styles/main.css',
  // JS UTAMA
  '/src/scripts/index.js',
  '/src/scripts/app.js',
  // JS UTILS
  '/src/scripts/utils/idb.js',
  '/src/scripts/utils/auth.js',
  // JS DATA/MODEL
  '/src/scripts/data/api.js',
  '/src/scripts/data/story-model.js',
  // JS PRESENTER
  '/src/scripts/presenters/home-presenter.js',
  '/src/scripts/presenters/login-presenter.js',
  '/src/scripts/presenters/add-story-presenter.js',
  '/src/scripts/presenters/add-story-camera-presenter.js',
  '/src/scripts/presenters/register-presenter.js',
  // JS VIEW
  '/src/scripts/views/home-view.js',
  '/src/scripts/views/login-view.js',
  '/src/scripts/views/add-story-view.js',
  '/src/scripts/views/add-story-camera-view.js',
  '/src/scripts/views/register-view.js',
  // JS PAGE
  '/src/scripts/pages/home-page.js',
  '/src/scripts/pages/login-page.js',
  '/src/scripts/pages/register-page.js',
  '/src/scripts/pages/add-story-page.js',
  '/src/scripts/pages/add-story-camera.js',
  // JS ROUTES
  '/src/scripts/routes/routes.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL))
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.origin === 'https://story-api.dicoding.dev') {
    // Network first, fallback ke cache jika offline (atau tampilkan pesan error)
    event.respondWith(
      fetch(event.request)
        .then(response => {
          return response;
        })
        .catch(() => {
          return new Response(JSON.stringify({ error: true, message: "Offline, data tidak tersedia." }), {
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }

  // Untuk file statis (shell)
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('push', function(event) {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }
  const title = data.title || 'Notifikasi Baru!';
  const options = data.options || {
    body: 'Ada update baru di aplikasi!',
    icon: 'images/logo.png',
    badge: '/favicon.png',
    data: '/',
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});