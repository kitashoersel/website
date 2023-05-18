/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';

const worker = self as unknown as ServiceWorkerGlobalScope;

const CACHE = `cache-${version}`;
const ASSETS = new Set(build.concat(files));

worker.addEventListener('install', (event) => {
  const addFilesToCache = async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
  };

  event.waitUntil(addFilesToCache());
});

worker.addEventListener('activate', (event) => {
  const deleteOldCaches = async () => {
    await Promise.all((await caches.keys()).filter((key) => key !== CACHE).map((key) => caches.delete(key)));
  };

  event.waitUntil(deleteOldCaches());
});

worker.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || event.request.headers.has('range')) return;
  const url = new URL(event.request.url);
  const isStaticAsset = url.host === self.location.host && ASSETS.has(url.pathname);

  const respond = async () => {
    const cache = await caches.open(CACHE);

    if (isStaticAsset) {
      return cache.match(event.request) as Promise<Response>;
    }

    try {
      const response = await fetch(event.request);

      if (response.status === 200) {
        cache.put(event.request, response.clone());
      }

      return response;
    } catch {
      return cache.match(event.request) as Promise<Response>;
    }
  };

  event.respondWith(respond());
});
