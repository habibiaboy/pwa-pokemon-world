const CACHE_NAME = "pokeworld-v1";
var urlsToCache = [
    "/",
    "/index.html",
    "/src/public/assets/css/style.css",
    "/src/public/assets/css/font-material-google.css",
    "/src/public/assets/font/material.woff2",
    "/src/public/images/icon/favicon.ico",
    "/src/public/images/first-generation.png",
    "/src/public/images/pokemon.png",
    "/src/public/images/pokemon-icon.png",
    "/src/public/lib/materialize/css/materialize.min.css",
    "/src/public/lib/materialize/js/materialize.min.js",
    "/src/public/assets/js/jquery-3.5.1.js",
    "/src/public/assets/js/main.js",
    "/src/public/controller/pokemonController.js",
    "/src/public/model/pokemonModel.js",
    "/src/public/helper/fetch.js",
];

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
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    // console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                // console.log(
                //     "ServiceWorker: Memuat aset dari server: ",
                //     event.request.url
                // );
                return fetch(event.request);
            })
            .catch((err) => {
                console.log('error-catch')
            })
    );
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