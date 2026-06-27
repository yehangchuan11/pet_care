const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const ROOT = 'E:/CodexProject/pet_care';
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};
http.createServer((q,r)=>{
  let f = path.join(ROOT, q.url=='/'?'index.html':q.url);
  fs.readFile(f,(e,d)=>{
    if(e){r.writeHead(404);r.end('404');return}
    r.writeHead(200,{'Content-Type':MIME[path.extname(f).toLowerCase()]||'text/plain'});
    r.end(d);
  });
}).listen(PORT,'127.0.0.1',()=>{
  fs.writeFileSync(ROOT+'/.server_started','ok');
  console.log('Listening on http://127.0.0.1:'+PORT);
});