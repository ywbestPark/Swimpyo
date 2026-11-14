// 오프라인에서도 열리도록 앱 파일을 캐시. 파일을 고치면 v 숫자를 올려야 새 버전이 반영됨
const V='swimpyo-v2',F=['./','index.html','manifest.json','icon.svg','icon-192.png','icon-512.png','apple-touch-icon.png','data/dictionary.json','data/solutions.json','data/sentences.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x))))));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match('index.html'))))});
