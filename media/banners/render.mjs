import {chromium} from '/opt/node-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [s,n] of [[1,'yupir-banner-700x350.png'],[2,'yupir-banner-1400x700.png']]){
 const p=await b.newPage({viewport:{width:700,height:350},deviceScaleFactor:s});
 await p.goto('file://'+process.cwd()+'/banner.html',{waitUntil:'networkidle'}); await p.waitForTimeout(600);
 await p.screenshot({path:n}); await p.close();}
await b.close();
