// www.deployfleet.com used to serve the web app, which installed a service worker. Browsers that still
// have it fetch this file on their next visit: it removes itself and the app's caches, then reloads
// open tabs so they show this site. Safe to delete once old visitors have cycled through (mid-2027).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await self.registration.unregister();
    await Promise.all((await caches.keys()).map((key) => caches.delete(key)));
    const tabs = await self.clients.matchAll({ type: 'window' });
    tabs.forEach((tab) => tab.navigate(tab.url));
  })());
});
