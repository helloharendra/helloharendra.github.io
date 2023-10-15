'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "009c9e65172e010890f7f65fde438006",
"index.html": "34768953969acf39aa9d5b26be7fca93",
"/": "34768953969acf39aa9d5b26be7fca93",
"main.dart.js": "5c32440a14cfd1ca82e6991887a54ab0",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "a16e8f3e208747b2b0af36c61a4431de",
"icons/Icon-192.png": "3590426720cf51e354374e887e691ef3",
"icons/Icon-maskable-192.png": "3590426720cf51e354374e887e691ef3",
"icons/Icon-maskable-512.png": "a16e8f3e208747b2b0af36c61a4431de",
"icons/Icon-512.png": "a16e8f3e208747b2b0af36c61a4431de",
"manifest.json": "d40c47d1c161f94dbcb13094d37f1f55",
"assets/AssetManifest.json": "8365de7f75bbb9f45887ade0549a434e",
"assets/NOTICES": "77506a1ecd51c9b07b67f9b3803c04db",
"assets/FontManifest.json": "515783acec5018d7aa7a40bb9849ad1c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "599e17d2bec18676299366f45757a58c",
"assets/fonts/MaterialIcons-Regular.otf": "f13932e159c5049c7b0dfc14deff9be7",
"assets/assets/images/heroCover5.jpg": "dc66f5c16aa374f12ff8d64c9940bf81",
"assets/assets/images/food.gif": "658050319924e9e34e18af0396866445",
"assets/assets/images/heroCover3.jpg": "47164bcf2ef802220bfbbfa4c0a37c0d",
"assets/assets/images/hero.png": "7108cd79df2134866ab64661c53ba8d5",
"assets/assets/images/loader1.gif": "bc56b31a50e519be2ed335a47e75bc62",
"assets/assets/images/heroCover2.JPG": "188c46e2defb1197552b9860b26b2b61",
"assets/assets/images/harendra.jpg": "088bce2a43250ea395221b0b9ba1e5a0",
"assets/assets/images/flutter_portfolio.png": "c773ababc8a2427325729eb25a1ad669",
"assets/assets/images/ai.gif": "f8e1e3d972a610163598776b3e5858ce",
"assets/assets/images/vinay.jpeg": "f7787a6ea5ab35c1327ea0285c68f0ad",
"assets/assets/images/gym.png": "75770903650e502b649dc3cecc3a4340",
"assets/assets/images/age_gender.gif": "1c5059ee5f9f4dbe54fce04686e43a8a",
"assets/assets/images/loading.gif": "3c6fb4f1755cfac52f4946fc5d04ecd1",
"assets/assets/images/loader.gif": "07cf1452ea43d105cd4b73884e0c2c7c",
"assets/assets/images/facemask.gif": "386597bc3a50b43d2404e914427e099e",
"assets/assets/images/pankaj.jpeg": "bffde714a17c669d2ea18f2257e6f663",
"assets/assets/images/portfolio.jpg": "b90817f95ba4af81706103963c3b40ba",
"assets/assets/images/ai2.gif": "592e6ef725a7a6dae150fe05bba38ea0",
"assets/assets/images/loading1.gif": "0b0d582996a1f5c784e0950e27bfeadf",
"assets/assets/images/ai1.gif": "73371d18d873ea3bf2c5246f9aec6549",
"assets/assets/images/myloader.gif": "08b4d7372f3ebee01bdd86707f1a001c",
"assets/assets/images/html_portfolio.png": "b18d3d037884d97ca506907dfe12a374",
"assets/assets/images/eagle_developers.png": "19a9368fc62ac3abbea5944d472a2402",
"assets/assets/images/shubham.png": "6a709948ac1e4d1e77ec8514236d422d",
"assets/assets/videos/cover.mp4": "e532260876bed2ff8ad51ad12f974fb8",
"assets/assets/fonts/KiwiMaru-Medium.ttf": "d238cfe492cfa31c8e908354cfef25b9",
"assets/assets/fonts/Signatra.ttf": "7b67035b3b8dab514ecf09763597a947",
"assets/assets/fonts/BebasNeue-Regular.ttf": "21bb70b62317f276f2e97a919ff5bd8c",
"assets/assets/fonts/VarelaRound-Regular.ttf": "159cb67fc3bc762a8c3232f0a0c6728e",
"assets/assets/fonts/Lobster-Regular.ttf": "9406d0ab606cf8cb91c41b65556bd836",
"assets/assets/fonts/TrainOne-Regular.ttf": "77513edcbf2298ca044b8a33a4353eeb",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/chromium/canvaskit.js": "ffb2bb6484d5689d91f393b60664d530",
"canvaskit/chromium/canvaskit.wasm": "393ec8fb05d94036734f8104fa550a67",
"canvaskit/canvaskit.js": "5caccb235fad20e9b72ea6da5a0094e6",
"canvaskit/canvaskit.wasm": "d9f69e0f428f695dc3d66b3a83a4aa8e",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
