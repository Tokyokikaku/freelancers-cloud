import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
http.createServer((q, r) => { let p = path.join('dist', decodeURIComponent(q.url.split('?')[0])); if (p.endsWith('/') || !path.extname(p)) p = path.join(p, 'index.html');
  fs.readFile(p, (e, d) => { if (e) { r.writeHead(404); r.end('404'); } else { r.writeHead(200, { 'content-type': { '.html': 'text/html;charset=utf-8', '.css': 'text/css', '.xml': 'application/xml' }[path.extname(p)] || 'text/plain' }); r.end(d); } }); }).listen(4321, () => console.log('http://localhost:4321'));
