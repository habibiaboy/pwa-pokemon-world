const CACHE_NAME = "pokeworld-v1";
var urlsToCache = [
    "/",
    "/index.html",
    "/src/public/assets/css/style.css",
    "/src/public/assets/css/font-material-google.css",
    "/src/public/assets/font/iconfont/codepoints",
    "/src/public/assets/font/iconfont/material-icons.css",
    "/src/public/assets/font/iconfont/MaterialIcons-Regular.eot",
    "/src/public/assets/font/iconfont/MaterialIcons-Regular.ijmap",
    "/src/public/assets/font/iconfont/MaterialIcons-Regular.svg",
    "/src/public/assets/font/iconfont/MaterialIcons-Regular.ttf",
    "/src/public/assets/font/iconfont/MaterialIcons-Regular.woff",
    "/src/public/assets/font/iconfont/MaterialIcons-Regular.woff2",
    "/src/public/images/icon/favicon.ico",
    "/src/public/images/first-generation.png",
    "/src/public/images/pokemon.png",
    "/src/public/images/pokemon-icon.png",
    "/src/public/lib/materialize/css/materialize.min.css",
    "/src/public/lib/materialize/js/materialize.min.js",
    "/src/public/assets/js/jquery-3.5.1.js",
    "/src/public/assets/js/sw-registary.js",
    "/manifest.json",
    "/icon/72.png",
    "/icon/100.png",
    "/icon/114.png",
    "/icon/128.png",
    "/icon/144.png",
    "/icon/196.png",
    "/icon/256.png",
    "/icon/512.png",
    "/icon/1024.png",
    "/src/public/assets/js/main.js",
    "/src/public/controller/pokemonController.js",
    "/src/public/model/pokemonModel.js",
    "/src/public/helper/fetch.js",
];

var urlPromise = [
    "/src/public/assets/js/main.js",
    "/src/public/controller/pokemonController.js",
    "/src/public/model/pokemonModel.js",
    "/src/public/helper/fetch.js",
    "/src/public/assets/js/sw-registary.js",
    "/src/public/assets/font/iconfont/MaterialIcons-Regular.eot",
    "/src/public/assets/font/iconfont/MaterialIcons-Regular.ijmap",
    "/src/public/assets/font/iconfont/MaterialIcons-Regular.svg",
    "/src/public/assets/font/iconfont/MaterialIcons-Regular.ttf",
    "/src/public/assets/font/iconfont/MaterialIcons-Regular.woff",
    "/src/public/assets/font/iconfont/MaterialIcons-Regular.woff2"
]

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        }).catch((err) => {
            console.log(err);
        })
    );
});

self.addEventListener("fetch", function (event) {
    if (checkPromise(event.request.url.split('/'))) {
        event.respondWith(async function () {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(event.request);
            if (cachedResponse) return cachedResponse;
            const networkResponse = await fetch(event.request);
            event.waitUntil(
                cache.put(event.request, networkResponse.clone())
            );
            return networkResponse;
        }());
    } else {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


function checkPromise(url) {
    var newPathname = "";
    for (i = 3; i < url.length; i++) {
        newPathname += "/";
        newPathname += url[i];
    }
    return urlPromise.includes(newPathname);
}