self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("treinos-v3").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
        "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.min.js",
        "https://cdn.jsdelivr.net/npm/js-confetti@0.11.0/dist/js-confetti.min.js",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = ["treinos-v3"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          console.warn("Fetch failed for:", event.request.url);
        })
      );
    })
  );
});
