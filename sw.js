const V='paycheck-v1',A=['/','/hourly.html','/salary.html','/about.html','/privacy-policy.html','/terms.html','/contact.html','/css/style.css','/js/calc.js','/js/pwa.js','/manifest.json','/icons/icon-192.png','/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
e.respondWith(caches.match(e.request).then(r=>{const n=fetch(e.request).then(x=>{caches.open(V).then(c=>c.put(e.request,x.clone()));return x}).catch(()=>r);return r||n}))});
