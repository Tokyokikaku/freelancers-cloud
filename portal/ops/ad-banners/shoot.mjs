import { chromium } from "/tmp/claude-0/-home-user-freelancers-cloud/2d2a316c-86a9-517e-921e-6f869f2ea6c4/scratchpad/node_modules/playwright-core/index.mjs";
import fs from "node:fs";
const sizes = JSON.parse(fs.readFileSync("/tmp/claude-0/ad/sizes.json","utf8"));
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args:["--no-sandbox","--allow-file-access-from-files"] });
const p = await b.newPage({ viewport:{width:1400,height:1400}, deviceScaleFactor:1 });
await p.goto("file:///tmp/claude-0/ad/banners.html"); await p.waitForTimeout(1500);
fs.mkdirSync("/tmp/claude-0/ad/out",{recursive:true});
for (const n of sizes) { await p.locator("#b"+n).screenshot({path:`/tmp/claude-0/ad/out/seika-navi_${n}.png`}); }
await b.close();
