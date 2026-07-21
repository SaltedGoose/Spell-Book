const CACHE_NAME = "mythrax-spellbook-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",

    "./styles.css",
    "./main.js",

    "./images/spell-book-background.png",
    "./images/Mythrax-Tempestborn",
    "./images/icon-192.png",
    "./images/icon-512.png",

    "./jsons/level-0.json",

    "./fonts/CinzelDecorative-Regular.ttf",
    "./fonts/StandardGalacticAlphabet-Regular.ttf",
    "./fonts/Tangerine-Regular.ttf"
];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => {

                if (response) {
                    return response;
                }

                return fetch(event.request);

            })

    );

});