import { useState } from "react";

// ─── IMAGE API 预留接口 ───────────────────────────────────────────────────────
async function generatePortrait(element, name) {
  // TODO: 接入图像生成API (DALL-E / Stable Diffusion 等)
  // const res = await fetch("https://api.openai.com/v1/images/generations", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json", "Authorization": `Bearer ${YOUR_KEY}` },
  //   body: JSON.stringify({ model: "gpt-image-1", prompt: buildImagePrompt(element, name), n: 1, size: "1024x1536" })
  // });
  // const data = await res.json();
  // return data.data?.[0]?.url || null;
  return null;
}
function buildImagePrompt(element, name) {
  const s = { Water:"deep indigo and silver, moonlight, ocean mystery", Fire:"crimson and molten gold, ember glow, fierce energy", Earth:"forest green and amber, ancient stone, grounded power", Metal:"silver-white crystal, geometric light, ethereal clarity", Wood:"jade and sage, blooming vines, ancient forest" };
  return `Hyper-detailed fine line art portrait of a beautiful mysterious androgynous figure. ${s[element]||s.Water}. Ornate celestial headdress, half-veiled face, holding glowing orb. Art Nouveau, dark background, gold filigree. Editorial fashion aesthetic. No text.`;
}
// ─────────────────────────────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  :root{--gold:#c9a84c;--gl:#e8c96a;--gd:#8a6f32;--ink:#0a0806;--td:#1a1208;--tm:#4a3820;--tl:#7a6040;}
  body{background:var(--ink);}
  .app{min-height:100vh;background:var(--ink);font-family:'EB Garamond',serif;position:relative;overflow-x:hidden;}
  .stars{position:fixed;inset:0;pointer-events:none;z-index:0;}
  .star{position:absolute;width:2px;height:2px;background:var(--gl);border-radius:50%;opacity:0;animation:twinkle var(--dur) var(--delay) infinite;}
  @keyframes twinkle{0%,100%{opacity:0;}50%{opacity:var(--b);}}
  .wrap{position:relative;z-index:1;max-width:620px;margin:0 auto;padding:56px 20px 100px;}

  /* HEADER */
  .hdr{text-align:center;margin-bottom:52px;}
  .sigil{width:64px;height:64px;margin:0 auto 20px;}
  .sigil svg{width:100%;height:100%;animation:spin 22s linear infinite;}
  @keyframes spin{to{transform:rotate(360deg);}}
  .brand{font-family:'Cinzel',serif;font-size:9px;letter-spacing:.35em;text-transform:uppercase;color:var(--gd);margin-bottom:8px;}
  .title{font-family:'Cinzel Decorative',serif;font-size:clamp(30px,6vw,44px);color:var(--gold);letter-spacing:.06em;text-shadow:0 0 60px rgba(201,168,76,.25);margin-bottom:6px;}
  .subtitle{font-family:'Cinzel',serif;font-size:11px;color:var(--gd);letter-spacing:.28em;text-transform:uppercase;}

  /* CARD */
  .card{background:linear-gradient(160deg,#fdf6e8,#f0e0c0);border:1px solid var(--gd);padding:40px 36px;position:relative;box-shadow:0 24px 64px rgba(0,0,0,.65),inset 0 1px 0 rgba(255,255,255,.3);}
  .card::before,.card::after{content:'';position:absolute;width:20px;height:20px;border-color:var(--gold);border-style:solid;}
  .card::before{top:10px;left:10px;border-width:1.5px 0 0 1.5px;}
  .card::after{bottom:10px;right:10px;border-width:0 1.5px 1.5px 0;}
  .card-intro{text-align:center;margin-bottom:28px;font-style:italic;font-size:15px;color:var(--tl);line-height:1.7;}

  /* FORM */
  .flabel{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--tl);margin-bottom:7px;display:block;}
  .finput{width:100%;background:rgba(255,255,255,.4);border:1px solid rgba(138,111,50,.4);padding:14px 16px;font-family:'EB Garamond',serif;font-size:19px;color:var(--td);outline:none;transition:all .25s;border-radius:1px;}
  .finput:focus{border-color:var(--gold);background:rgba(255,255,255,.6);box-shadow:0 0 0 3px rgba(201,168,76,.1);}
  .fgroup{margin-bottom:20px;}
  .frow{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;}
  .fsel{appearance:none;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a6f32' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;}
  .fdiv{display:flex;align-items:center;gap:12px;margin:4px 0 22px;}
  .fdivl{flex:1;height:1px;background:rgba(138,111,50,.2);}
  .fdivt{font-family:'Cinzel',serif;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:rgba(138,111,50,.45);}
  .btn{width:100%;padding:16px;background:linear-gradient(135deg,#2a1f0a,#1a1208);border:1px solid var(--gold);color:var(--gold);font-family:'Cinzel',serif;font-size:12px;letter-spacing:.25em;text-transform:uppercase;cursor:pointer;transition:all .3s;position:relative;overflow:hidden;margin-top:6px;}
  .btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(201,168,76,.1),transparent);opacity:0;transition:opacity .3s;}
  .btn:hover::before{opacity:1;}
  .btn:hover{box-shadow:0 0 28px rgba(201,168,76,.2);transform:translateY(-1px);}
  .btn:disabled{opacity:.5;cursor:not-allowed;transform:none;}
  .mode-tabs{display:flex;margin-bottom:24px;border:1px solid rgba(138,111,50,.3);overflow:hidden;}
  .mtab{flex:1;padding:11px;text-align:center;font-family:'Cinzel',serif;font-size:10px;letter-spacing:.15em;text-transform:uppercase;cursor:pointer;transition:all .2s;background:transparent;border:none;color:var(--tl);}
  .mtab.active{background:linear-gradient(135deg,#2a1f0a,#1a1208);color:var(--gold);}
  .mtab-badge{display:inline-block;margin-left:6px;padding:1px 6px;background:rgba(201,168,76,.2);border:1px solid rgba(201,168,76,.3);font-size:8px;color:var(--gold);vertical-align:middle;}

  /* LOADING */
  .loading{padding:60px 36px;text-align:center;}
  .ring{width:80px;height:80px;margin:0 auto 24px;border:1.5px solid rgba(138,111,50,.25);border-top-color:var(--gold);border-right-color:var(--gd);border-radius:50%;animation:spin 2s linear infinite;}
  .ltitle{font-family:'Cinzel Decorative',serif;font-size:13px;color:var(--gold);letter-spacing:.1em;margin-bottom:8px;}
  .lsub{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.2em;color:var(--gd);text-transform:uppercase;}

  /* RESULT */
  .rcard{background:linear-gradient(170deg,#fdf6e8,#ecdfc5);border:1px solid var(--gd);overflow:hidden;box-shadow:0 32px 80px rgba(0,0,0,.75);animation:fadeUp .9s ease forwards;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}

  /* PORTRAIT */
  .portrait{position:relative;width:100%;aspect-ratio:3/4;max-height:500px;overflow:hidden;background:#0d0b06;}
  .portrait img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block;}
  .portrait-ph{width:100%;height:100%;min-height:340px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;}
  .portrait-ph-sigil{width:100px;height:100px;opacity:.3;}
  .portrait-ph-sigil svg{width:100%;height:100%;animation:spin 30s linear infinite;}
  .portrait-ph-txt{font-family:'Cinzel',serif;font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:var(--gd);opacity:.4;}
  .portrait-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 35%,rgba(8,6,3,.88) 80%,#080603 100%);pointer-events:none;}
  .portrait-info{position:absolute;bottom:0;left:0;right:0;padding:28px 32px 24px;text-align:center;}
  .rname{font-family:'Cinzel Decorative',serif;font-size:clamp(24px,5.5vw,38px);color:var(--gold);text-shadow:0 0 40px rgba(201,168,76,.55);margin-bottom:6px;line-height:1.1;}
  .rtagline{font-family:'EB Garamond',serif;font-style:italic;font-size:15px;color:rgba(232,201,106,.7);margin-bottom:14px;}
  .ebadge{display:inline-flex;align-items:center;gap:7px;padding:6px 16px;border:1px solid rgba(201,168,76,.35);background:rgba(8,6,3,.6);}
  .eicon{font-size:16px;}.etxt{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);}

  /* SUMMARY */
  .summary{background:linear-gradient(135deg,#1a1208,#221708);border-bottom:1px solid rgba(138,111,50,.35);padding:26px 32px;}
  .slabel{font-family:'Cinzel',serif;font-size:9px;letter-spacing:.35em;text-transform:uppercase;color:var(--gd);text-align:center;margin-bottom:18px;}
  .sgrid{display:grid;grid-template-columns:1fr 1fr;border:1px solid rgba(201,168,76,.18);}
  .sitem{padding:12px 15px;border-bottom:1px solid rgba(201,168,76,.1);border-right:1px solid rgba(201,168,76,.1);display:flex;flex-direction:column;gap:4px;}
  .sitem:nth-child(even){border-right:none;}
  .sitem.full{grid-column:1/-1;border-right:none;border-bottom:none;}
  .sitem:nth-last-child(2):nth-child(odd){border-bottom:none;}
  .sk{font-family:'Cinzel',serif;font-size:8.5px;letter-spacing:.25em;text-transform:uppercase;color:var(--gd);}
  .sv{font-family:'EB Garamond',serif;font-size:15px;color:var(--gl);line-height:1.35;}
  .pbar{margin-top:4px;}.ptrack{height:2.5px;background:rgba(201,168,76,.15);border-radius:2px;overflow:hidden;}
  .pfill{height:100%;background:linear-gradient(90deg,var(--gd),var(--gold));border-radius:2px;}
  .pscore{font-family:'Cinzel',serif;font-size:10px;color:var(--gold);margin-top:4px;}
  .rdots{display:flex;align-items:center;gap:5px;margin-top:4px;flex-wrap:wrap;}
  .rdot{width:7px;height:7px;border-radius:50%;border:1px solid var(--gd);}
  .rdot.on{background:var(--gold);border-color:var(--gold);}
  .rdot.half{background:linear-gradient(90deg,var(--gold) 50%,transparent 50%);border-color:var(--gold);}
  .rnum{font-family:'Cinzel',serif;font-size:11px;color:var(--gold);margin-left:3px;}

  /* BODY */
  .rbody{padding:32px 32px 24px;}
  .section{margin-bottom:28px;}
  .stitle{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:var(--gd);margin-bottom:10px;padding-bottom:7px;border-bottom:1px solid rgba(138,111,50,.22);}
  .stext{font-size:17px;line-height:1.85;color:var(--tm);}
  .tgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;margin-top:4px;}
  .tpill{padding:8px 12px;background:rgba(138,111,50,.1);border:1px solid rgba(138,111,50,.25);text-align:center;font-family:'Cinzel',serif;font-size:10px;letter-spacing:.1em;color:var(--tm);}
  .dnum{font-family:'Cinzel Decorative',serif;font-size:56px;color:var(--gold);text-align:center;line-height:1;margin-bottom:6px;text-shadow:0 0 28px rgba(201,168,76,.2);}
  .dlbl{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.25em;color:var(--gd);text-align:center;text-transform:uppercase;}
  .fortune-box{background:rgba(138,111,50,.07);border:1px solid rgba(138,111,50,.28);padding:20px;margin-top:4px;}
  .fperiod{font-family:'Cinzel',serif;font-size:9.5px;letter-spacing:.2em;color:var(--gold);text-transform:uppercase;margin-bottom:8px;}
  .ftext{font-size:16px;line-height:1.85;color:var(--tm);font-style:italic;}
  .crystal-row{display:flex;align-items:flex-start;gap:14px;margin-top:4px;}
  .cgem{width:40px;height:40px;flex-shrink:0;border:1px solid var(--gd);transform:rotate(45deg);display:flex;align-items:center;justify-content:center;background:rgba(138,111,50,.1);}
  .cgem-i{width:18px;height:18px;border:1px solid rgba(201,168,76,.45);background:rgba(201,168,76,.12);}

  /* 2026 GUIDANCE */
  .guidance-wrap{background:linear-gradient(160deg,#120e07,#1c1508);border-top:1px solid rgba(138,111,50,.25);border-bottom:1px solid rgba(138,111,50,.25);padding:32px 32px 28px;margin-bottom:0;}
  .guidance-year{font-family:'Cinzel Decorative',serif;font-size:11px;letter-spacing:.2em;color:var(--gold);text-align:center;margin-bottom:6px;}
  .guidance-intro{font-family:'EB Garamond',serif;font-style:italic;font-size:15px;color:var(--tl);text-align:center;line-height:1.7;margin-bottom:24px;}

  /* cautions */
  .caution-card{background:rgba(180,60,40,.06);border:1px solid rgba(180,80,50,.25);padding:18px 20px;margin-bottom:12px;}
  .caution-area{display:flex;align-items:center;gap:8px;margin-bottom:8px;}
  .caution-icon{font-size:14px;}
  .caution-area-label{font-family:'Cinzel',serif;font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:#c07060;}
  .caution-warning{font-size:16px;line-height:1.8;color:var(--tm);margin-bottom:8px;}
  .caution-tip{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.08em;color:var(--gd);border-left:2px solid rgba(201,168,76,.3);padding-left:10px;line-height:1.6;}

  /* power colors */
  .colors-row{display:flex;gap:12px;margin-top:8px;flex-wrap:wrap;}
  .color-chip{flex:1;min-width:120px;padding:14px 16px;display:flex;flex-direction:column;gap:6px;border:1px solid rgba(138,111,50,.25);}
  .color-swatch{width:28px;height:28px;border-radius:50%;flex-shrink:0;border:1px solid rgba(255,255,255,.1);}
  .color-name{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--gold);}
  .color-reason{font-size:14px;line-height:1.7;color:var(--tl);}

  /* talisman */
  .talisman-box{background:rgba(138,111,50,.07);border:1px solid rgba(138,111,50,.3);padding:20px;display:flex;gap:16px;align-items:flex-start;margin-top:8px;}
  .talisman-gem{width:48px;height:48px;flex-shrink:0;border:1px solid var(--gd);transform:rotate(45deg);display:flex;align-items:center;justify-content:center;background:rgba(138,111,50,.12);}
  .talisman-gem-i{width:22px;height:22px;border:1px solid rgba(201,168,76,.5);background:rgba(201,168,76,.15);}
  .talisman-content{flex:1;}
  .talisman-name{font-family:'Cinzel',serif;font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:var(--gold);margin-bottom:6px;}
  .talisman-reason{font-size:15px;line-height:1.8;color:var(--tm);margin-bottom:10px;}
  .talisman-link{display:inline-block;font-family:'Cinzel',serif;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(201,168,76,.4);padding:6px 14px;text-decoration:none;transition:all .2s;}
  .talisman-link:hover{background:rgba(201,168,76,.1);border-color:var(--gold);}

  /* LANDING INTRO */
  .landing{margin-bottom:32px;}
  .landing-desc{font-family:'EB Garamond',serif;font-style:italic;font-size:17px;line-height:1.9;color:var(--tl);text-align:center;margin-bottom:24px;}
  .landing-tiers{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .ltier{background:rgba(138,111,50,.05);border:1px solid rgba(138,111,50,.2);padding:18px 20px;position:relative;}
  .ltier--paid{border-color:rgba(201,168,76,.38);background:rgba(201,168,76,.04);}
  .ltier-badge{position:absolute;top:-11px;right:12px;background:linear-gradient(135deg,var(--gd),var(--gold));color:var(--td);font-family:'Cinzel',serif;font-size:10px;letter-spacing:.15em;padding:3px 11px;font-weight:600;}
  .ltier-label{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:12px;}
  .ltier-list{list-style:none;display:flex;flex-direction:column;gap:7px;}
  .ltier-list li{font-size:14px;color:var(--tm);display:flex;align-items:flex-start;gap:8px;line-height:1.5;}
  .ltier-list li::before{content:'✦';color:var(--gd);font-size:9px;flex-shrink:0;margin-top:3px;}

  /* LOCKED / UPGRADE */
  .locked{position:relative;overflow:hidden;}
  .locked-blur{filter:blur(5px);pointer-events:none;user-select:none;}
  .locked-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:rgba(8,6,3,.5);}
  .lock-icon{font-size:26px;}
  .lock-msg{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);text-align:center;}
  .upgrade-box{margin:0 32px 32px;background:linear-gradient(135deg,#1e1508,#2a1d0a);border:1px solid rgba(201,168,76,.4);padding:28px 24px;text-align:center;}
  .upgrade-title{font-family:'Cinzel Decorative',serif;font-size:16px;color:var(--gold);margin-bottom:8px;line-height:1.3;}
  .upgrade-sub{font-family:'EB Garamond',serif;font-style:italic;font-size:15px;color:var(--gd);margin-bottom:20px;line-height:1.6;}
  .upgrade-features{display:flex;flex-direction:column;gap:8px;margin-bottom:22px;text-align:left;}
  .upgrade-feat{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.12em;color:rgba(201,168,76,.7);display:flex;align-items:center;gap:8px;}
  .upgrade-feat::before{content:'✦';color:var(--gold);flex-shrink:0;}
  .upgrade-price{font-family:'Cinzel Decorative',serif;font-size:22px;color:var(--gold);margin-bottom:4px;}
  .upgrade-price-sub{font-family:'Cinzel',serif;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--gd);margin-bottom:18px;}
  .btn-upgrade{width:100%;padding:16px;background:linear-gradient(135deg,var(--gd),var(--gold));border:none;color:var(--td);font-family:'Cinzel',serif;font-size:12px;letter-spacing:.22em;text-transform:uppercase;cursor:pointer;transition:all .3s;font-weight:600;}
  .btn-upgrade:hover{box-shadow:0 0 30px rgba(201,168,76,.35);transform:translateY(-1px);}

  .divider{display:flex;align-items:center;gap:12px;margin:24px 0;}
  .dl{flex:1;height:1px;background:linear-gradient(90deg,transparent,var(--gd),transparent);}
  .dd{width:6px;height:6px;background:var(--gold);transform:rotate(45deg);flex-shrink:0;}
  .rfooter{padding:18px 32px;background:rgba(138,111,50,.05);border-top:1px solid rgba(138,111,50,.2);text-align:center;}
  .rfooter-txt{font-family:'Cinzel',serif;font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:var(--tl);opacity:.65;}
  .rfooter-link{font-family:'Cinzel',serif;font-size:8.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--tm);text-decoration:none;transition:color .3s;}
  .rfooter-link:hover{color:var(--gl);}
  .reset-btn{display:block;margin:0 32px 32px;width:calc(100% - 64px);padding:13px;background:transparent;border:1px solid rgba(138,111,50,.35);color:var(--gd);font-family:'Cinzel',serif;font-size:10px;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:all .2s;}
  .reset-btn:hover{border-color:var(--gold);color:var(--gold);}
  .err{background:rgba(180,50,50,.08);border:1px solid rgba(180,50,50,.3);color:#b07070;padding:11px 14px;font-family:'Cinzel',serif;font-size:11px;letter-spacing:.1em;text-align:center;margin-top:14px;}
`;

const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const HOURS=Array.from({length:24},(_,i)=>`${String(i).padStart(2,'0')}:00`);
const DAYS=Array.from({length:31},(_,i)=>i+1);
const YEARS=Array.from({length:80},(_,i)=>2005-i);
const EL={Water:{icon:"💧"},Fire:{icon:"🔥"},Earth:{icon:"🌿"},Metal:{icon:"⚡"},Wood:{icon:"🌳"}};

function Stars(){
  const arr=Array.from({length:65},(_,i)=>({id:i,top:Math.random()*100,left:Math.random()*100,dur:(2+Math.random()*5).toFixed(1),delay:(Math.random()*6).toFixed(1),b:(0.1+Math.random()*0.6).toFixed(2)}));
  return <div className="stars">{arr.map(s=><div key={s.id} className="star" style={{top:`${s.top}%`,left:`${s.left}%`,"--dur":`${s.dur}s`,"--delay":`${s.delay}s`,"--b":s.b}}/>)}</div>;
}
function SigilSVG(){
  return <svg viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="34" stroke="#c9a84c" strokeWidth=".7" strokeDasharray="3 5"/><circle cx="36" cy="36" r="26" stroke="#8a6f32" strokeWidth=".5"/><polygon points="36,6 64,56 8,56" stroke="#c9a84c" strokeWidth=".7" fill="none"/><polygon points="36,66 8,16 64,16" stroke="#c9a84c" strokeWidth=".7" fill="none"/><circle cx="36" cy="36" r="5" fill="#c9a84c" opacity=".5"/><circle cx="36" cy="36" r="2.5" fill="#c9a84c"/></svg>;
}
function PopBar({score}){
  return <div className="pbar"><div className="ptrack"><div className="pfill" style={{width:`${score}%`}}/></div><div className="pscore">{score} / 100</div></div>;
}
function RatingDots({score}){
  const full=Math.floor(score),half=score-full>=0.5?1:0,empty=10-full-half;
  return <div className="rdots">{Array.from({length:full},(_,i)=><div key={`f${i}`} className="rdot on"/>)}{half===1&&<div className="rdot half"/>}{Array.from({length:empty},(_,i)=><div key={`e${i}`} className="rdot"/>)}<span className="rnum">{score}/10</span></div>;
}
function parse(text){
  try{return JSON.parse(text.replace(/```json|```/g,"").trim());}catch{return null;}
}

function freePrompt(name){
  return `You are an ancient oracle combining name etymology, elemental energy analysis, and yearly guidance.

Name: "${name}"

Reply ONLY with a valid JSON object — absolutely no markdown, no backticks, no commentary outside the JSON:

{
  "summary": {
    "name": "Name as given",
    "origin": "2-4 word origin label e.g. Hebrew · Ancient Middle East",
    "meaning": "Core meaning in 5-8 words",
    "popularity": 72,
    "nickname": "Most natural nickname",
    "feature": "Single defining trait in 3-5 words",
    "rating": 8.5
  },
  "tagline": "Evocative soul-essence phrase max 8 words",
  "origin": "2-3 sentences on etymology and history",
  "essence": "2-3 sentences on core soul nature",
  "element": "Water, Fire, Earth, Metal, or Wood",
  "elementReason": "1-2 sentences on why this element governs them",
  "traits": ["trait1","trait2","trait3","trait4","trait5"],
  "guidance2026": {
    "intro": "1 sentence framing what kind of year 2026 is for this elemental soul",
    "cautions": [
      {
        "area": "e.g. Communication / Relationships / Finances / Health / Career",
        "warning": "2 sentences — be honest and specific about what could go wrong. Name real tendencies: impulsive speech, over-trusting, neglecting health, financial overreach. Do NOT be vague.",
        "tip": "One concrete behavioral action to counter this"
      },
      {
        "area": "different area from first",
        "warning": "2 sentences, equally specific and honest",
        "tip": "One concrete action"
      }
    ],
    "powerColors": [
      { "color": "color name", "hex": "#c9a84c", "reason": "1 sentence on why this color protects and empowers them in 2026" },
      { "color": "color name", "hex": "#4a7ab5", "reason": "1 sentence" }
    ],
    "talisman": {
      "item": "Specific crystal or gemstone name",
      "reason": "2 sentences — what energy it carries and exactly how it counters their 2026 challenges",
      "shopLink": "#shop"
    }
  }
}

Rules: popularity = integer 1-100. rating = float 0.0-10.0 (one decimal).
Cautions must feel like a trusted friend telling hard truths — specific, grounded, not generic horoscope filler.`;
}

function paidPrompt(name,month,day,year,hour){
  return `You are an ancient oracle combining name etymology, numerology, and elemental energy analysis.

Person: "${name}", born ${month} ${day}, ${year} at ${hour}.

Reply ONLY with valid JSON — no markdown, no backticks:

{
  "summary": {
    "name": "Name as given",
    "origin": "2-4 word origin label",
    "meaning": "Core meaning in 5-8 words",
    "popularity": 72,
    "nickname": "Most natural nickname",
    "feature": "Single defining trait in 3-5 words",
    "rating": 8.5
  },
  "tagline": "Evocative soul-essence phrase max 8 words",
  "origin": "2-3 sentences on etymology and history",
  "essence": "2-3 sentences on core soul nature",
  "element": "Water, Fire, Earth, Metal, or Wood",
  "elementReason": "1-2 sentences on why this element governs them",
  "traits": ["trait1","trait2","trait3","trait4","trait5"],
  "guidance2026": {
    "intro": "1 sentence on what kind of year 2026 is for this elemental soul",
    "cautions": [
      { "area": "area name", "warning": "2 specific honest sentences", "tip": "1 concrete action" },
      { "area": "different area", "warning": "2 specific honest sentences", "tip": "1 concrete action" }
    ],
    "powerColors": [
      { "color": "color name", "hex": "#hexcode", "reason": "1 sentence" },
      { "color": "color name", "hex": "#hexcode", "reason": "1 sentence" }
    ],
    "talisman": { "item": "crystal name", "reason": "2 sentences", "shopLink": "#shop" }
  },
  "destinyNumber": 7,
  "destinyMeaning": "2-3 sentences on this life path number",
  "currentEnergy": "2-3 sentences on energetic themes right now based on birth chart cycle",
  "yearAhead": "2-3 sentences on what the coming year holds — both challenges and gifts",
  "crystal": "One crystal recommendation with reason, 1-2 sentences"
}

popularity = integer 1-100. rating = float 0.0-10.0. Be deeply personal and mystical.`;
}

export default function App(){
  const [mode,setMode]=useState("free");
  const [name,setName]=useState("");
  const [month,setMonth]=useState("");
  const [day,setDay]=useState("");
  const [year,setYear]=useState("");
  const [hour,setHour]=useState("");
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState(null);
  const [isPaid,setIsPaid]=useState(false);
  const [portraitUrl,setPortraitUrl]=useState(null);
  const [error,setError]=useState("");

  const canSubmit=mode==="free"?name.trim().length>0:name.trim()&&month&&day&&year&&hour;

  const handleReveal = async () => {
  if (!canSubmit) { setError("Please complete all fields."); return; }
  setError(""); setLoading(true); setResult(null); setPortraitUrl(null);
  const prompt = mode === "paid"
    ? paidPrompt(name.trim(), month, day, year, hour)
    : freePrompt(name.trim());

  try {
    const res = await fetch("/api/oracle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ max_tokens: 1600, messages: [{ role: "user", content: prompt }] })
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6).trim();
        if (data === "[DONE]") continue;
        try {
          const json = JSON.parse(data);
          // Anthropic streaming delta
          const delta = json?.delta?.text || json?.choices?.[0]?.delta?.content || "";
          if (delta) {
            fullText += delta;
            // 尝试实时解析，有完整JSON就先渲染
            const parsed = parse(fullText);
            if (parsed) {
              setResult({ ...parsed, inputName: name.trim() });
              setIsPaid(mode === "paid");
              setLoading(false);
            }
          }
        } catch { /* 继续累积 */ }
      }
    }

    // 流结束后最终解析一次
    const parsed = parse(fullText);
    if (parsed) {
      setResult({ ...parsed, inputName: name.trim() });
      setIsPaid(mode === "paid");
    } else if (!result) {
      setError("The oracle is silent. Please try again.");
    }

  } catch {
    setError("The veil could not be lifted. Please try again.");
  }
  setLoading(false);
};

  const reset=()=>{setResult(null);setPortraitUrl(null);setIsPaid(false);setName("");setMonth("");setDay("");setYear("");setHour("");};

  const el=result?EL[result.element]||EL.Water:null;
  const s=result?.summary;
  const g=result?.guidance2026;

  return(
    <>
      <style>{CSS}</style>
      <div className="app">
        <Stars/>
        <div className="wrap">

          {/* HEADER */}
          <div className="hdr">
            <div className="sigil"><SigilSVG/></div>
            <div className="brand">Wonlv · Veil</div>
            <h1 className="title">Veil</h1>
            <p className="subtitle">Reveal the Soul Within Your Name</p>
          </div>

          {/* FORM */}
          {!result&&!loading&&(
            <div className="card">
              <p className="card-intro">What does your name truly mean?<br/>Enter it below and the oracle will speak.</p>
              <div className="mode-tabs">
                <button className={`mtab${mode==="free"?" active":""}`} onClick={()=>setMode("free")}>Free Reading</button>
                <button className={`mtab${mode==="paid"?" active":""}`} onClick={()=>setMode("paid")}>Full Destiny<span className="mtab-badge">$9.90</span></button>
              </div>
              <div className="fgroup">
                <label className="flabel">Your Name</label>
                <input className="finput" type="text" placeholder="Enter your name..."
                  value={name} onChange={e=>setName(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&handleReveal()}/>
              </div>
              {mode==="paid"&&(
                <>
                  <div className="fdiv"><div className="fdivl"/><span className="fdivt">Birth Chart</span><div className="fdivl"/></div>
                  <div className="fgroup">
                    <label className="flabel">Date of Birth</label>
                    <div className="frow">
                      <select className="finput fsel" value={month} onChange={e=>setMonth(e.target.value)}>
                        <option value="">Month</option>{MONTHS.map(m=><option key={m}>{m}</option>)}
                      </select>
                      <select className="finput fsel" value={day} onChange={e=>setDay(e.target.value)}>
                        <option value="">Day</option>{DAYS.map(d=><option key={d} value={d}>{d}</option>)}
                      </select>
                      <select className="finput fsel" value={year} onChange={e=>setYear(e.target.value)}>
                        <option value="">Year</option>{YEARS.map(y=><option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="fgroup">
                    <label className="flabel">Hour of Birth</label>
                    <select className="finput fsel" value={hour} onChange={e=>setHour(e.target.value)}>
                      <option value="">Select hour...</option>{HOURS.map(h=><option key={h}>{h}</option>)}
                    </select>
                  </div>
                </>
              )}
              {error&&<div className="err">{error}</div>}
              <button className="btn" onClick={handleReveal} disabled={!canSubmit}>
                ✦ {mode==="paid"?"Unveil My Full Destiny":"Reveal My Name"} ✦
              </button>
            </div>
          )}

          {/* PRICING */}
          {!result&&!loading&&(
            <div className="landing">
              <p className="landing-desc">
                VEIL reveals the soul within your name — drawing on ancient etymology, elemental wisdom, and destiny numerology. Free for everyone. Unlock the full birth-chart report for $9.90.
              </p>
              <div className="landing-tiers">
                <div className="ltier">
                  <div className="ltier-label">Free Reading</div>
                  <ul className="ltier-list">
                    <li>Name origin &amp; meaning</li>
                    <li>Soul essence &amp; core traits</li>
                    <li>Elemental nature</li>
                    <li>2026 guidance &amp; talisman</li>
                  </ul>
                </div>
                <div className="ltier ltier--paid">
                  <div className="ltier-badge">$9.90</div>
                  <div className="ltier-label">Full Destiny</div>
                  <ul className="ltier-list">
                    <li>Everything in Free</li>
                    <li>Life Path Number</li>
                    <li>Birth chart energy cycle</li>
                    <li>The year ahead forecast</li>
                    <li>Personal power stone</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* LOADING */}
          {loading&&(
            <div className="card" style={{textAlign:"center"}}>
              <div className="loading">
                <div className="ring"/>
                <div className="ltitle">Reading the Veil...</div>
                <div className="lsub">Consulting the ancient stars</div>
              </div>
            </div>
          )}

          {/* RESULT */}
          {result&&el&&s&&(
            <div className="rcard">

              {/* PORTRAIT */}
              <div className="portrait">
                {portraitUrl
                  ?<img src={portraitUrl} alt={result.inputName}/>
                  :<div className="portrait-ph">
                    <div className="portrait-ph-sigil"><SigilSVG/></div>
                    <div className="portrait-ph-txt">Portrait · Coming Soon</div>
                  </div>
                }
                <div className="portrait-overlay"/>
                <div className="portrait-info">
                  <div className="rname">{result.inputName}</div>
                  <div className="rtagline">"{result.tagline}"</div>
                  <div className="ebadge"><span className="eicon">{el.icon}</span><span className="etxt">{result.element} Element</span></div>
                </div>
              </div>

              {/* 7-TRAIT SUMMARY */}
              <div className="summary">
                <div className="slabel">✦ Name at a Glance ✦</div>
                <div className="sgrid">
                  <div className="sitem"><span className="sk">Name</span><span className="sv">{s.name}</span></div>
                  <div className="sitem"><span className="sk">Origin</span><span className="sv">{s.origin}</span></div>
                  <div className="sitem"><span className="sk">Meaning</span><span className="sv">{s.meaning}</span></div>
                  <div className="sitem"><span className="sk">Nickname</span><span className="sv">{s.nickname}</span></div>
                  <div className="sitem"><span className="sk">Feature</span><span className="sv">{s.feature}</span></div>
                  <div className="sitem"><span className="sk">Popularity</span><PopBar score={s.popularity}/></div>
                  <div className="sitem full"><span className="sk">Rating</span><RatingDots score={s.rating}/></div>
                </div>
              </div>

              {/* BODY — free content */}
              <div className="rbody">
                <div className="section">
                  <div className="stitle">✦ Name Origin</div>
                  <p className="stext">{result.origin}</p>
                </div>
                <div className="divider"><div className="dl"/><div className="dd"/><div className="dl"/></div>
                <div className="section">
                  <div className="stitle">✦ Soul Essence</div>
                  <p className="stext">{result.essence}</p>
                </div>
                <div className="section">
                  <div className="stitle">✦ Core Traits</div>
                  <div className="tgrid">{result.traits?.map((t,i)=><div key={i} className="tpill">{t}</div>)}</div>
                </div>
                <div className="section">
                  <div className="stitle">✦ Elemental Nature</div>
                  <p className="stext">{result.elementReason}</p>
                </div>
              </div>

              {/* 2026 GUIDANCE — free, always visible */}
              {g&&(
                <div className="guidance-wrap">
                  <div className="guidance-year">✦ 2026 Guidance ✦</div>
                  <div className="guidance-intro">{g.intro}</div>

                  {/* Cautions */}
                  <div className="section">
                    <div className="stitle" style={{color:"#c07060",borderColor:"rgba(180,80,50,.2)"}}>⚠ What to Watch in 2026</div>
                    {g.cautions?.map((c,i)=>(
                      <div key={i} className="caution-card">
                        <div className="caution-area">
                          <span className="caution-icon">⚠</span>
                          <span className="caution-area-label">{c.area}</span>
                        </div>
                        <p className="caution-warning">{c.warning}</p>
                        <p className="caution-tip">✦ {c.tip}</p>
                      </div>
                    ))}
                  </div>

                  {/* Power Colors */}
                  <div className="section">
                    <div className="stitle">✦ Your Power Colors</div>
                    <div className="colors-row">
                      {g.powerColors?.map((c,i)=>(
                        <div key={i} className="color-chip">
                          <div className="color-swatch" style={{background:c.hex}}/>
                          <div className="color-name">{c.color}</div>
                          <div className="color-reason">{c.reason}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Talisman */}
                  <div className="section" style={{marginBottom:0}}>
                    <div className="stitle">✦ Your 2026 Talisman</div>
                    <div className="talisman-box">
                      <div className="talisman-gem"><div className="talisman-gem-i"/></div>
                      <div className="talisman-content">
                        <div className="talisman-name">{g.talisman?.item}</div>
                        <div className="talisman-reason">{g.talisman?.reason}</div>
                        <a className="talisman-link" href={g.talisman?.shopLink||"#"} target="_blank" rel="noopener noreferrer">
                          ✦ Shop Now ✦
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAID CONTENT */}
              {isPaid&&(
                <div className="rbody" style={{paddingTop:28}}>
                  <div className="divider"><div className="dl"/><div className="dd"/><div className="dl"/></div>
                  <div className="section">
                    <div className="dnum">{result.destinyNumber}</div>
                    <div className="dlbl">Life Path Number</div>
                    <p className="stext" style={{marginTop:16}}>{result.destinyMeaning}</p>
                  </div>
                  <div className="section">
                    <div className="stitle">✦ Energy Reading</div>
                    <div className="fortune-box">
                      <div className="fperiod">Present Moment</div>
                      <div className="ftext">{result.currentEnergy}</div>
                    </div>
                    <div className="fortune-box" style={{marginTop:10}}>
                      <div className="fperiod">The Year Ahead</div>
                      <div className="ftext">{result.yearAhead}</div>
                    </div>
                  </div>
                  <div className="section">
                    <div className="stitle">✦ Your Power Stone</div>
                    <div className="crystal-row">
                      <div className="cgem"><div className="cgem-i"/></div>
                      <p className="stext">{result.crystal}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* LOCKED TEASER + UPGRADE — free users, very bottom */}

              {result && !isPaid && (
                  <div className="upgrade-box" style={{marginTop:24}}>
                    <div className="upgrade-title">Your Destiny Awaits</div>
                    <div className="upgrade-sub">Reveal the complete reading with your birth chart</div>
                    <div className="upgrade-features">
                      <div className="upgrade-feat">Life Path Number & its deeper significance</div>
                      <div className="upgrade-feat">Current energy cycle & what it means for you</div>
                      <div className="upgrade-feat">The year ahead — challenges & gifts</div>
                      <div className="upgrade-feat">Your personal power stone</div>
                      <div className="upgrade-feat">Downloadable PDF destiny report</div>
                    </div>
                    <div className="upgrade-price">$9.90</div>
                    <div className="upgrade-price-sub">One-time · Instant delivery</div>
                    <button className="btn-upgrade" onClick={()=>{setResult(null);setMode("paid");}}>✦ Unlock Full Report ✦</button>
                  </div>
              )}

              <div className="rfooter">
                <div className="rfooter-txt">✦ Veil by Wonlv · veil.wonlv.com ✦</div>
                <div style={{marginTop:8,display:'flex',justifyContent:'center',gap:16}}>
                  <a href="/privacy" className="rfooter-link">Privacy</a>
                  <a href="/terms" className="rfooter-link">Terms</a>
                  <a href="mailto:support@veil.wonlv.com" className="rfooter-link">support@veil.wonlv.com</a>
                </div>
              </div>
              <button className="reset-btn" onClick={reset}>✦ Begin a New Reading ✦</button>

            </div>
          )}
        </div>
      </div>
    </>
  );
}

                    
