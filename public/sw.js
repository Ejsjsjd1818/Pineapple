importScripts("./u/bundle.js");
importScripts("./u/config.js");
importScripts(__uv$config.sw || "./u/sw.js");
const uv = new UVServiceWorker();
self.addEventListener("fetch", function (event) {
  if (event.request.url.startsWith(location.origin + __uv$config.prefix)) {
    event.respondWith(
      (async function () {
        return await uv.fetch(event);
      })(),
    );
  } else {
    event.respondWith(
      (async function () {
        return await fetch(event.request);
      })(),
    );
  }
});