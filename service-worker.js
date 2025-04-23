const CACHE_NAME = "pixelNest";
const urlsToCache = [
  "/",
  "/index.html",
  "/about.html",
  "/blog.html",
  "/contact.html",
  "/faq.html",
  "/gallery.html",
  "/portfolio.html",
  "/services.html",
  "/testimonials.html",
  "/team.html",
  "/styles.css",
  "/script.js",
  "/offline.html",

  // Images
  "/assets/images/about.webp",
  "/assets/images/blog1.webp",
  "/assets/images/blog2.webp",
  "/assets/images/blog3.webp",
  "/assets/images/blog4.webp",
  "/assets/images/blog5.webp",
  "/assets/images/blog6.webp",
  "/assets/images/gallery1.webp",
  "/assets/images/gallery2.webp",
  "/assets/images/gallery3.webp",
  "/assets/images/gallery4.webp",
  "/assets/images/gallery5.webp",
  "/assets/images/gallery6.webp",
  "/assets/images/gallery7.webp",
  "/assets/images/gallery8.webp",
  "/assets/images/gallery9.webp",
  "/assets/images/index.webp",
  "/assets/images/mainbg.webp",
  "/assets/images/portfolio1.webp",
  "/assets/images/portfolio2.webp",
  "/assets/images/portfolio3.webp",
  "/assets/images/portfolio4.webp",
  "/assets/images/portfolio5.webp",
  "/assets/images/portfolio6.webp",
  "/assets/images/team1.webp",
  "/assets/images/team2.webp",
  "/assets/images/team3.webp",
  "/assets/images/team4.webp",
  "/assets/images/team5.webp",
  "/assets/images/team6.webp",
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching assets");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event with offline fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          if (event.request.destination === "document") {
            return caches.match("/offline.html"); // Only fallback for pages
          }
        })
      );
    })
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
