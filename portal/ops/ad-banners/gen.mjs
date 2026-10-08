import fs from "node:fs";
const P = "/home/user/freelancers-cloud/portal/public/hero/person.webp";
const LOGO = "/tmp/claude-0/logo/i1.svg";
// size configs: text block is on the left, person tight against it on the right
const S = [
 { n:"300x250", w:300,h:250, lay:"std", logo:18, h1:21, sub:0, cta:11.5, ph:262, pr:-14, pb:-8, tw:150 },
 { n:"336x280", w:336,h:280, lay:"std", logo:20, h1:24, sub:0, cta:13, ph:292, pr:-14, pb:-8, tw:170 },
 { n:"300x600", w:300,h:600, lay:"tall", logo:24, h1:34, sub:0, cta:17, ph:420, pr:-58, pb:-30, tw:260 },
 { n:"728x90", w:728,h:90, lay:"wide", logo:20, h1:20, sub:0, cta:13, ph:118, pr:10, pb:-36, tw:0 },
 { n:"320x100", w:320,h:100, lay:"mini", logo:16, h1:15, sub:0, cta:11, ph:124, pr:-6, pb:-34, tw:210 },
 { n:"1200x628", w:1200,h:628, lay:"std", logo:44, h1:68, sub:26, cta:32, ph:660, pr:100, pb:-44, tw:560 },
 { n:"1200x1200", w:1200,h:1200, lay:"sq", logo:52, h1:100, sub:34, cta:44, ph:1000, pr:-90, pb:-10, tw:900 },
];
const COPY = { h1a:"成果報酬型サービス", h1b:"比較メディア", sub:"成果に応じて料金を支払う<br>サービスだけを集めました。", cta:"サービスを比較する", chip:"まとめて資料請求（無料）" };
const logo = (s)=>`<div class="logo" style="gap:${s*.3}px"><img src="file://${LOGO}" style="width:${s}px;height:${s}px"><b style="font-size:${s*.78}px">成果報酬ナビ</b></div>`;
function banner(c){
  const {w,h,lay}=c;
  const person=`<img class="person" src="file://${P}" style="height:${c.ph}px;right:${c.pr}px;bottom:${c.pb}px">`;
  let body="";
  if(lay==="std"){
    body=`<div class="txt" style="left:${w*.06}px;top:${h*.09}px;width:${c.tw}px">${logo(c.logo)}
    <div class="h1" style="font-size:${c.h1}px;margin-top:${h*.07}px"><span class="b">成果報酬型<br>サービス</span><br>${COPY.h1b}</div>
    ${c.sub?`<div class="sub" style="font-size:${c.sub}px;margin-top:${h*.035}px">${COPY.sub}</div>`:""}
    <div class="cta" style="font-size:${c.cta}px;margin-top:${h*.06}px;padding:${c.cta*.55}px ${c.cta*1.1}px">${COPY.cta}</div></div>`;
  } else if(lay==="sq"){
    body=`<div class="txt" style="left:${w*.07}px;top:${h*.07}px;width:${c.tw}px">${logo(c.logo)}
    <div class="h1" style="font-size:${c.h1}px;margin-top:${h*.05}px"><span class="b">成果報酬型<br>サービス</span><br>${COPY.h1b}</div>
    <div class="sub" style="font-size:${c.sub}px;margin-top:${h*.025}px;width:${w*.46}px">${COPY.sub}</div>
    <div class="cta" style="font-size:${c.cta}px;margin-top:${h*.045}px;padding:${c.cta*.55}px ${c.cta*1.1}px">${COPY.cta}</div></div>`;
  } else if(lay==="tall"){
    body=`<div class="txt" style="left:${w*.07}px;top:${h*.05}px;width:${c.tw}px">${logo(c.logo)}
    <div class="h1" style="font-size:${c.h1}px;margin-top:${h*.035}px"><span class="b">成果報酬型<br>サービス</span><br>${COPY.h1b}</div>
    ${c.sub?`<div class="sub" style="font-size:${c.sub}px;margin-top:${h*.02}px;width:${w*.5}px">${COPY.sub}</div>`:""}
    <div class="cta" style="font-size:${c.cta}px;margin-top:${h*.03}px;padding:${c.cta*.55}px ${c.cta*1.1}px">${COPY.cta}</div></div>`;
  } else if(lay==="wide"){
    body=`<div class="txt row" style="left:18px;top:0;height:${h}px">${logo(c.logo)}
    <div class="h1" style="font-size:${c.h1}px;margin-left:26px"><span class="b">${COPY.h1a}</span>${COPY.h1b}</div>
    <div class="cta" style="font-size:${c.cta}px;margin-left:26px;padding:${c.cta*.6}px ${c.cta*1.2}px">${COPY.cta}</div></div>`;
  } else { // mini
    body=`<div class="txt" style="left:10px;top:9px;width:${c.tw}px">${logo(c.logo)}
    <div class="h1" style="font-size:${c.h1}px;margin-top:6px"><span class="b">${COPY.h1a}</span>${COPY.h1b}</div>
    <div class="cta" style="font-size:${c.cta}px;margin-top:7px;padding:${c.cta*.4}px ${c.cta*.9}px">${COPY.cta}</div></div>`;
  }
  return `<div class="banner" id="b${c.n}" style="width:${w}px;height:${h}px"><div class="arc a1"></div><div class="arc a2"></div>${person}${body}<div class="frame"></div></div>`;
}
const html=`<!doctype html><meta charset=utf-8><link rel=stylesheet href="file:///tmp/claude-0/ad/fonts.css"><style>
body{margin:0;background:#888;font-family:'Noto Sans JP',sans-serif}
.banner{position:relative;overflow:hidden;margin:20px;background:radial-gradient(circle at 10% 18%,rgba(255,255,255,.95),rgba(255,255,255,.4) 42%,transparent 58%),linear-gradient(110deg,#f7fbff 0%,#edf7ff 49%,#dff1ff 71%,#b9ddf6 100%)}
.arc{position:absolute;border-radius:50%;pointer-events:none}
.a1{width:130%;height:50%;left:-20%;bottom:-32%;border:solid rgba(93,173,237,.16);border-width:min(4vw,22px)}
.a2{width:120%;height:55%;right:-45%;bottom:-30%;border:solid rgba(29,111,213,.22);border-width:min(5vw,26px)}
.person{position:absolute;width:auto;max-width:none}
.txt{position:absolute;z-index:2}.txt.row{display:flex;align-items:center}
.logo{display:flex;align-items:center}.logo b{font-family:'Zen Kaku Gothic New',sans-serif;font-weight:700;letter-spacing:.06em;color:#0b4a9e;white-space:nowrap}
.h1{font-weight:900;line-height:1.16;color:#0f172a;white-space:nowrap}.h1 .b{color:#0b4a9e}
.row .h1 .b{margin-right:.35em}
.sub{font-weight:500;color:#334155;line-height:1.55}
.cta{display:inline-block;background:#f28c00;color:#fff;font-weight:900;border-radius:999px;box-shadow:0 3px 0 #c97200;white-space:nowrap}
.frame{position:absolute;inset:0;border:1px solid rgba(15,23,42,.18);pointer-events:none;z-index:5}
</style><body>${S.map(banner).join("\n")}</body>`;
fs.writeFileSync("/tmp/claude-0/ad/banners.html",html);
// fonts: collect characters
const chars=[...new Set((html.replace(/<[^>]*>/g," ").match(/[^\x00-\x7f]/g)||[]).concat(..."0123456789".split("")))].join("");
fs.writeFileSync("/tmp/claude-0/ad/chars.txt",chars+"成果報酬ナビ");
fs.writeFileSync("/tmp/claude-0/ad/sizes.json",JSON.stringify(S.map(c=>c.n)));
