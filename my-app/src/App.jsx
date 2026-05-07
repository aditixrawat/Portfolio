import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Epilogue:wght@200;300;400;500;600;700;900&family=DM+Mono:wght@300;400;500&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --cream:#F5F0E8;
      --cream2:#EDE7D9;
      --cream3:#E4DCCB;
      --ink:#111111;
      --ink2:#1C1C1C;
      --ink3:#2A2A2A;
      --burg:#7B1C2E;
      --burg2:#9B2335;
      --burg3:#5C1221;
      --burg-lo:rgba(123,28,46,0.09);
      --muted:#888880;
      --muted2:#5A5A52;
      --border:rgba(17,17,17,0.12);
      --border2:rgba(17,17,17,0.07);
      --monster:#00FF41;
      --serif:'Playfair Display',Georgia,serif;
      --sans:'Epilogue',sans-serif;
      --mono:'DM Mono',monospace;
    }
    html{scroll-behavior:smooth}
    body{display:block;background:var(--cream);color:var(--ink);font-family:var(--sans);font-weight:300;overflow-x:hidden;cursor:none;min-height:100vh}
    ::selection{background:var(--burg);color:#fff}
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:var(--cream)}
    ::-webkit-scrollbar-thumb{background:var(--burg)}

    #dot{position:fixed;top:0;left:0;z-index:10005;width:8px;height:8px;background:var(--burg);border-radius:50%;pointer-events:none;mix-blend-mode:multiply}
    #ring{position:fixed;top:0;left:0;z-index:10004;width:32px;height:32px;border:1.5px solid rgba(123,28,46,0.45);border-radius:50%;pointer-events:none}

    /* ── NAV ── */
    nav{position:fixed;top:0;left:0;right:0;z-index:500;display:flex;justify-content:space-between;align-items:center;padding:1.3rem 4rem;background:rgba(245,240,232,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--border2)}
    .nav-logo{font-family:var(--serif);font-size:1.1rem;font-weight:700;color:var(--ink);letter-spacing:-.01em;text-decoration:none}
    .nav-logo span{color:var(--burg)}
    .nav-links{display:flex;gap:2.5rem;list-style:none;align-items:center}
    .nav-links a{font-family:var(--mono);font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted2);text-decoration:none;transition:color .2s;padding-bottom:2px;border-bottom:1px solid transparent}
    .nav-links a:hover{color:var(--burg);border-bottom-color:var(--burg)}
    .nav-cta{font-family:var(--mono);font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:var(--burg)!important;border:1.5px solid var(--burg)!important;padding:.35rem 1rem;text-decoration:none;transition:all .2s;border-bottom:1.5px solid var(--burg)!important}
    .nav-cta:hover{background:var(--burg)!important;color:#fff!important}

    /* ── HERO ── */
    .hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:8rem 4rem 4rem;gap:5rem;position:relative;overflow:hidden}
    .hero-deco{position:absolute;right:-.05em;top:-.15em;font-family:var(--serif);font-size:clamp(16rem,26vw,32rem);font-weight:900;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(17,17,17,0.055);pointer-events:none;user-select:none;letter-spacing:-.05em}
    .hero-left{display:flex;flex-direction:column;gap:2rem}
    .hero-status{display:inline-flex;align-items:center;gap:.5rem;font-family:var(--mono);font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted2);margin-bottom:2rem;opacity:0;animation:fadeUp .6s .2s forwards}
    .live-dot{width:7px;height:7px;border-radius:50%;background:var(--burg);animation:blink 2s ease-in-out infinite}
    .hero-eyebrow{font-family:var(--mono);font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:var(--muted2);margin-bottom:1.8rem;opacity:0;animation:fadeUp .7s .3s forwards;display:flex;align-items:center;gap:.8rem}
    .hero-eyebrow::before{content:'';display:inline-block;width:28px;height:1px;background:var(--burg)}
    h1.h{font-family:var(--serif);font-size:clamp(3.5rem,5.5vw,6rem);font-weight:900;line-height:.95;letter-spacing:-.025em;color:var(--ink);opacity:0;animation:fadeUp .8s .35s forwards}
    h1.h em{color:var(--burg);font-style:italic}
    .hero-sub{margin-top:1.8rem;font-size:.88rem;line-height:1.9;color:var(--muted2);max-width:440px;opacity:0;animation:fadeUp .8s .5s forwards}
    .brands-row{display:flex;gap:.6rem;align-items:center;flex-wrap:wrap;margin-top:1.4rem;opacity:0;animation:fadeIn .7s .7s forwards}
    .brands-label{font-family:var(--mono);font-size:.52rem;letter-spacing:.2em;color:var(--muted);text-transform:uppercase}
    .brand-chip{font-family:var(--mono);font-size:.55rem;letter-spacing:.1em;padding:.2rem .65rem;border:1px solid rgba(123,28,46,0.35);color:var(--burg);text-transform:uppercase}
    .hero-cta{margin-top:2.8rem;display:flex;gap:1rem;align-items:center;flex-wrap:wrap;opacity:0;animation:fadeUp .8s .65s forwards}
    .btn{padding:.85rem 2rem;font-family:var(--mono);font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;transition:all .22s;cursor:pointer;border:none}
    .btn-fill{background:var(--ink);color:var(--cream)}
    .btn-fill:hover{background:var(--burg);transform:translateY(-2px)}
    .btn-stroke{background:transparent;color:var(--ink);border:1.5px solid var(--ink)}
    .btn-stroke:hover{border-color:var(--burg);color:var(--burg)}
    .hero-stats{display:flex;gap:3rem;margin-top:4rem;padding-top:2rem;border-top:1px solid var(--border);opacity:0;animation:fadeUp .8s .85s forwards}
    .snum{font-family:var(--serif);font-size:2.4rem;font-weight:700;color:var(--ink);line-height:1}
    .snum span{color:var(--burg)}
    .slabel{font-family:var(--mono);font-size:.55rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin-top:.3rem}

    /* hero right */
    .hero-right{display:flex;flex-direction:column;gap:1rem;align-items:flex-end;position:relative}
    .hero-right-card{width:100%;max-width:340px;background:var(--ink2);padding:2.5rem;position:relative;overflow:hidden;opacity:0;animation:fadeUp .9s .5s forwards}
    .hero-right-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--burg3),var(--burg2))}
    .hrc-label{font-family:var(--mono);font-size:.55rem;letter-spacing:.25em;text-transform:uppercase;color:rgba(245,240,232,.3);margin-bottom:1.2rem}
    .hrc-name{font-family:var(--serif);font-size:2rem;font-weight:700;color:var(--cream);line-height:1.1;margin-bottom:.4rem}
    .hrc-role{font-family:var(--mono);font-size:.6rem;letter-spacing:.15em;text-transform:uppercase;color:var(--burg2);margin-bottom:1.8rem}
    .hrc-loc{font-family:var(--mono);font-size:.55rem;letter-spacing:.15em;text-transform:uppercase;color:rgba(245,240,232,.4)}
    .hrc-portrait {
  position: absolute;
  top: 3.5rem;
  right: 1.5rem;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(177, 97, 97, 0.9);
  box-shadow: 0 0 0 1px rgba(0,0,0,.12);
}
.hrc-portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
    /* ── MONSTER STICKER ── */
    .monster-sticker{
      position:relative;width:100%;max-width:340px;
      background:var(--monster);padding:1.1rem 1.4rem;
      display:flex;align-items:center;gap:1rem;
      border:2.5px solid #000;box-shadow:4px 4px 0 #000;
      opacity:0;animation:stickerPop .5s 1.1s cubic-bezier(.34,1.56,.64,1) forwards;
      overflow:hidden;transform:rotate(-1.5deg);transition:transform .25s,box-shadow .25s;cursor:default;
    }
    .monster-sticker:hover{transform:rotate(0deg) scale(1.03);box-shadow:6px 6px 0 #000}
    .monster-sticker::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(-45deg,transparent,transparent 6px,rgba(0,0,0,0.04) 6px,rgba(0,0,0,0.04) 12px)}
    .ms-logo{flex-shrink:0;position:relative;z-index:1;width:72px;height:72px;object-fit:contain}
    .ms-content{position:relative;z-index:1}
    .ms-role{font-family:var(--mono);font-size:.62rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:#000;line-height:1.4}
    .ms-role strong{display:block;font-size:.72rem;letter-spacing:.06em;font-weight:700}
    .ms-meta{display:flex;align-items:center;gap:.5rem;margin-top:.3rem}
    .ms-badge{font-family:var(--mono);font-size:.48rem;letter-spacing:.15em;text-transform:uppercase;background:#000;color:var(--monster);padding:.15rem .5rem;font-weight:500}
    .ms-duration{font-family:var(--mono);font-size:.48rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(0,0,0,.55)}

    /* marquee */
    .marquee-strip{overflow:hidden;padding:.8rem 0;background:var(--ink);position:relative;z-index:1}
    .marquee-track{display:inline-flex;gap:2.5rem;animation:marquee 20s linear infinite;white-space:nowrap}
    .mi{font-family:var(--mono);font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(245,240,232,.3)}
    .mi.b{color:var(--burg2)}
    .mi.w{color:rgba(245,240,232,.65)}

    /* section base */
    section{padding:7rem 4rem;position:relative;z-index:1}
    .sec-eyebrow{font-family:var(--mono);font-size:.55rem;letter-spacing:.3em;text-transform:uppercase;color:var(--burg);margin-bottom:.7rem}
    .sec-title{font-family:var(--serif);font-size:clamp(2.4rem,4vw,4rem);font-weight:900;line-height:.97;letter-spacing:-.025em;color:var(--ink)}
    .sec-title em{color:var(--burg);font-style:italic}

    /* ── DROPS — dark red fronts ── */
    #drops{background:var(--cream)}
    .drops-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:3rem}
    .drops-hint{font-family:var(--mono);font-size:.55rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);display:flex;align-items:center;gap:.4rem}
    .drops-hint::after{content:'→';animation:nudge 1.8s ease-in-out infinite}
    .drops-scroller{overflow-x:auto;padding-bottom:1.2rem;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:var(--burg) transparent}
    .drops-scroller::-webkit-scrollbar{height:3px}
    .drops-scroller::-webkit-scrollbar-thumb{background:var(--burg)}
    .drops-row{display:flex;gap:1.5rem;width:max-content}

    .drop-card{perspective:1100px;width:390px;height:500px;flex-shrink:0}
    .drop-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.23,1,.32,1)}
    .drop-card:hover .drop-inner{transform:rotateY(180deg)}
    .drop-front,.drop-back{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;flex-direction:column;padding:2.2rem;overflow:hidden}

    /* FRONT — dark burgundy */
    .drop-front{background:var(--burg3);border:1px solid var(--burg)}
    .drop-front::after{content:'';position:absolute;bottom:0;left:0;right:0;height:4px;background:linear-gradient(90deg,rgba(245,240,232,.2),rgba(245,240,232,.6));transform:scaleX(0);transform-origin:left;transition:transform .4s}
    .drop-card:hover .drop-front::after{transform:scaleX(1)}

    /* BACK — dark ink */
    .drop-back{background:var(--ink);border:1px solid var(--ink3);transform:rotateY(180deg)}

    .drop-num{font-family:var(--mono);font-size:.52rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(245,240,232,.45);margin-bottom:.5rem}
    .drop-visual{flex:1;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.25);margin:0 -2.2rem;position:relative;overflow:hidden}
    .drop-visual-icon{font-size:4rem;opacity:.35;position:relative;z-index:1}
    .drop-visual-stripe{position:absolute;inset:0;background:repeating-linear-gradient(-45deg,transparent,transparent 10px,rgba(245,240,232,.025) 10px,rgba(245,240,232,.025) 20px)}
    .drop-title{font-family:var(--serif);font-size:1.6rem;font-weight:700;color:var(--cream);line-height:1.15;margin-top:1.5rem;margin-bottom:.4rem}
    .drop-concept{font-size:.78rem;color:rgba(245,240,232,.6);font-style:italic;line-height:1.65}
    .drop-flip-hint{font-family:var(--mono);font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(245,240,232,.25);margin-top:1rem}

    .db-num{font-family:var(--mono);font-size:.5rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(245,240,232,.28);margin-bottom:1.2rem}
    .db-row{margin-bottom:.9rem}
    .db-label{font-family:var(--mono);font-size:.5rem;letter-spacing:.25em;text-transform:uppercase;color:var(--burg2);margin-bottom:.25rem}
    .db-text{font-size:.75rem;color:rgba(245,240,232,.72);line-height:1.7}
    .db-stack{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.25rem}
    .db-tag{font-family:var(--mono);font-size:.54rem;letter-spacing:.08em;padding:.18rem .55rem;border:1px solid rgba(123,28,46,.4);color:var(--burg2);background:rgba(123,28,46,.12)}

    /* skills */
    #skills{background:var(--ink);padding:7rem 4rem}
    #skills .sec-title{color:var(--cream)}
    #skills .sec-eyebrow{color:var(--burg2)}
    .skills-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;margin-top:4rem;background:rgba(255,255,255,.05)}
    .skill-block{background:var(--ink2);padding:2.5rem 2rem;transition:background .3s;position:relative;overflow:hidden}
    .skill-block::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--burg3),var(--burg2));transform:scaleX(0);transform-origin:left;transition:transform .4s}
    .skill-block:hover::after{transform:scaleX(1)}
    .skill-block:hover{background:var(--ink3)}
    .skill-icon{font-size:1.8rem;margin-bottom:1.2rem;display:block}
    .skill-name{font-family:var(--serif);font-size:1.3rem;font-weight:700;color:var(--cream);margin-bottom:.6rem}
    .skill-desc{font-size:.74rem;color:rgba(245,240,232,.4);line-height:1.8;margin-bottom:1.2rem}
    .skill-tags{display:flex;flex-wrap:wrap;gap:.35rem}
    .skill-tag{font-family:var(--mono);font-size:.54rem;letter-spacing:.07em;padding:.18rem .55rem;background:rgba(123,28,46,.12);color:var(--burg2);border:1px solid rgba(123,28,46,.3)}

    /* ── MEDIUM — single featured card ── */
    #writing{background:var(--cream2)}
    .medium-featured{display:grid;grid-template-columns:1fr 1fr;gap:0;margin-top:3.5rem;border:1px solid var(--border)}
    .mf-left{background:var(--burg3);padding:3.5rem;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
    .mf-left::before{content:'';position:absolute;top:-40%;right:-20%;width:300px;height:300px;border-radius:50%;background:rgba(155,35,53,0.3);pointer-events:none}
    .mf-tag{font-family:var(--mono);font-size:.52rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(245,240,232,.45);margin-bottom:auto;padding-bottom:2rem}
    .mf-title{font-family:var(--serif);font-size:2rem;font-weight:700;color:var(--cream);line-height:1.2;letter-spacing:-.02em;margin-bottom:1.2rem}
    .mf-date{font-family:var(--mono);font-size:.52rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(245,240,232,.35)}
    .mf-right{background:#fff;padding:3.5rem;display:flex;flex-direction:column;justify-content:space-between}
    .mf-excerpt{font-size:.9rem;color:var(--muted2);line-height:1.85;flex:1;margin-bottom:2rem}
    .mf-read{display:inline-flex;align-items:center;gap:.6rem;font-family:var(--mono);font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--burg);text-decoration:none;border-bottom:1px solid var(--burg);padding-bottom:2px;transition:gap .2s}
    .mf-read:hover{gap:1rem}
    .mf-medium-link{display:flex;align-items:center;gap:.5rem;font-family:var(--mono);font-size:.55rem;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);text-decoration:none;margin-top:1.5rem;transition:color .2s}
    .mf-medium-link:hover{color:var(--burg)}
    .mf-meta{display:flex;justify-content:space-between;align-items:flex-end}

    /* visual */
    #visual{background:var(--cream)}
    .visual-grid{display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:230px 230px;gap:2px;margin-top:3.5rem}
    .vcell{background:var(--cream3);border:1px solid var(--border);display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;transition:all .3s}
    .vcell:hover{border-color:var(--burg);background:#fff}
    .vcell:first-child{grid-row:1/3}
    .vcell-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:6rem;opacity:.06;pointer-events:none}
    .vcell-inner{position:relative;z-index:1;text-align:center;padding:1.5rem}
    .vcell-icon{font-size:1.5rem;opacity:.3;margin-bottom:.6rem;display:block}
    .vcell-caption{font-family:var(--mono);font-size:.52rem;letter-spacing:.25em;text-transform:uppercase;color:var(--muted2)}
    .vcell-brands{position:absolute;bottom:1rem;left:1rem;display:flex;flex-direction:column;gap:.25rem}
    .vcell-brand{font-family:var(--mono);font-size:.48rem;letter-spacing:.18em;text-transform:uppercase;color:var(--burg);opacity:.75}
    .vcell-large-text{font-family:var(--serif);font-size:clamp(2rem,5vw,3.5rem);font-weight:900;color:var(--ink);line-height:1;text-align:center;padding:2rem;position:relative;z-index:1}
    .vcell-large-text span{color:var(--burg);font-style:italic}
    .vcell-video{cursor:pointer;position:relative}
    .vcell-play-badge{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.88);font-size:2.5rem;color:var(--burg);opacity:.65;transition:all .25s;z-index:2}
    .vcell-video:hover .vcell-play-badge{opacity:1;transform:translate(-50%,-50%) scale(1)}

    .video-modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:9998;backdrop-filter:blur(4px)}
    .video-modal{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999;width:min(92vw,900px);aspect-ratio:16/9;max-height:90vh;background:#111;border-radius:18px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,.4)}
    .video-modal iframe{width:100%;height:100%;border:none;display:block;aspect-ratio:16/9}
    .video-modal-close{position:absolute;top:1rem;right:1rem;width:42px;height:42px;background:rgba(255,255,255,.08);border:none;border-radius:50%;color:#fff;font-size:1.2rem;cursor:pointer;z-index:1;transition:all .2s}
    .video-modal-close:hover{background:rgba(255,255,255,.18)}

    /* thinking */
    #thinking{background:var(--ink2);padding:7rem 4rem}
    .thinking-list{margin-top:5rem}
    .thinking-item{display:grid;grid-template-columns:56px 1fr 200px;align-items:center;gap:2.5rem;padding:2rem 0;border-bottom:1px solid rgba(255,255,255,.06);transition:padding-left .3s}
    .thinking-item:first-child{border-top:1px solid rgba(255,255,255,.06)}
    .thinking-item:hover{padding-left:.6rem}
    .thinking-item:hover .t-num{color:var(--burg2)}
    .t-num{font-family:var(--mono);font-size:.52rem;letter-spacing:.2em;color:rgba(255,255,255,.18);text-transform:uppercase;transition:color .2s}
    .t-text{font-family:var(--serif);font-size:clamp(1.3rem,2.2vw,2rem);font-weight:700;color:var(--cream);letter-spacing:-.02em;line-height:1.2}
    .t-text em{color:var(--burg2);font-style:italic}
    .t-note{font-family:var(--mono);font-size:.58rem;letter-spacing:.1em;color:rgba(245,240,232,.22);text-align:right;line-height:1.6}

    /* contact */
    #contact{background:var(--burg3);text-align:center;min-height:70vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:7rem 4rem;position:relative;overflow:hidden}
    #contact::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(155,35,53,0.5),transparent 70%);pointer-events:none}
    .contact-deco{position:absolute;font-family:var(--serif);font-size:clamp(12rem,22vw,28rem);font-weight:900;color:rgba(255,255,255,.04);top:-10%;left:50%;transform:translateX(-50%);pointer-events:none;user-select:none;white-space:nowrap;letter-spacing:-.05em}
    .contact-eyebrow{font-family:var(--mono);font-size:.55rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(245,240,232,.45);margin-bottom:1.5rem;position:relative}
    .contact-headline{font-family:var(--serif);font-size:clamp(3rem,6vw,5.5rem);font-weight:900;color:#fff;line-height:.97;letter-spacing:-.03em;margin-bottom:1.2rem;position:relative}
    .contact-sub{font-family:var(--mono);font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(245,240,232,.5);margin-bottom:3rem;position:relative}
    .contact-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;position:relative}
    .btn-white{background:#fff;color:var(--burg3);border:none}
    .btn-white:hover{background:var(--cream2);transform:translateY(-2px)}
    .btn-outline-white{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.4)}
    .btn-outline-white:hover{border-color:#fff;background:rgba(255,255,255,.08)}
    .social-strip{display:flex;justify-content:center;gap:.8rem;margin-top:3rem;position:relative}
    .soc-btn{width:44px;height:44px;border:1.5px solid rgba(255,255,255,.25);background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;color:#fff;text-decoration:none;transition:all .2s}
    .soc-btn:hover{background:#fff;color:var(--burg3);border-color:#fff}

    footer{background:var(--ink);padding:1.8rem 4rem;display:flex;justify-content:space-between;align-items:center;position:relative;z-index:1}
    .ft{font-family:var(--mono);font-size:.52rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(245,240,232,.18)}
    .ft-status{display:flex;align-items:center;gap:.45rem;font-family:var(--mono);font-size:.52rem;letter-spacing:.15em;text-transform:uppercase;color:var(--burg2)}
    .ft-dot{width:5px;height:5px;border-radius:50%;background:var(--burg2);animation:blink 2s ease-in-out infinite}

    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}
    @keyframes nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(5px)}}
    @keyframes stickerPop{0%{transform:rotate(-1.5deg) scale(0.75);opacity:0}70%{transform:rotate(-1.5deg) scale(1.06)}100%{transform:rotate(-1.5deg) scale(1);opacity:1}}
    @keyframes glitchPulse{0%{opacity:.25;transform:translate3d(0,0,0)}30%{opacity:.1;transform:translate3d(3px,-2px,0)}60%{opacity:.18;transform:translate3d(-2px,1px,0)}100%{opacity:0;transform:translate3d(0,0,0)}}

    .drop-philosophy{font-family:var(--mono);font-size:.67rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(245,240,232,.34);margin-top:.7rem;opacity:0;transition:opacity .3s ease,transform .3s ease;transform:translateY(6px)}
    .drop-card:hover .drop-philosophy{opacity:1;transform:translateY(0)}
    .drop-visual{position:relative;transition:transform .35s ease,filter .35s ease}
    .drop-card:hover .drop-visual{transform:translateY(-2px) scale(1.01);filter:contrast(1.02) saturate(1.08)}
    .vcell{background:var(--cream3);border:1px solid var(--border);display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;transition:all .3s,transform .35s ease}
    .vcell:hover{border-color:var(--burg);background:#fff;transform:translateY(-2px)}
    .vcell-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:6rem;opacity:.06;pointer-events:none;transition:transform .45s ease}
    .vcell:hover .vcell-bg{transform:translate3d(10px,-8px,0)}

    .diag-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(5px);z-index:10000;}
    .diagnostics-shell{position:fixed;top:50%;left:50%;width:min(90vw,800px);max-height:85vh;background:rgba(28,28,30,0.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.15);border-radius:12px;box-shadow:0 20px 40px rgba(0,0,0,0.5);z-index:10001;overflow:hidden;display:flex;flex-direction:column;transform-origin:center;}
    .diagnostics-shell.glitch{transform:translate(-51%, -49%) scale(1.01); filter:contrast(1.2) drop-shadow(0 0 10px rgba(0,255,65,.12));}
    .diag-topbar{display:flex;justify-content:center;align-items:center;padding:0.8rem 1rem;background:rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.1);position:relative;}
    .diag-traffic-lights{position:absolute;left:1rem;display:flex;gap:8px;}
    .diag-dot{width:12px;height:12px;border-radius:50%;}
    .diag-dot.red{background:#FF5F56;cursor:pointer;}
    .diag-dot.yellow{background:#FFBD2E;}
    .diag-dot.green{background:#27C93F;}
    .diag-title{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:0.85rem;font-weight:600;color:rgba(255,255,255,0.8);letter-spacing:0.5px;}
    .diag-container{display:grid;grid-template-columns:240px 1fr;min-height:450px;}
    .diag-sidebar{padding:1.5rem 1rem;background:rgba(0,0,0,0.2);border-right:1px solid rgba(255,255,255,0.1);display:flex;flex-direction:column;gap:2rem;overflow-y:auto;}
    .diag-section-title{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:0.7rem;text-transform:uppercase;color:rgba(255,255,255,0.4);letter-spacing:0.05em;margin-bottom:0.5rem;padding-left:0.8rem;}
    .diag-stats-grid{display:flex;flex-direction:column;gap:0.6rem;padding:0 0.8rem;}
    .diag-stat-item{display:flex;justify-content:space-between;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:0.75rem;color:rgba(255,255,255,0.7);}
    .diag-stat-item strong{color:rgba(255,255,255,0.9);font-weight:500;}
    .diag-command-list-vertical{display:flex;flex-direction:column;gap:0.2rem;}
    .diag-command-button{background:transparent;border:none;color:rgba(255,255,255,0.6);text-align:left;padding:0.6rem 0.8rem;border-radius:6px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:0.85rem;cursor:pointer;transition:all 0.2s;width:100%;}
    .diag-command-button:hover{background:rgba(255,255,255,0.08);color:#fff;}
    .diag-command-button.active{background:#007AFF;color:#fff;font-weight:500;}
    .diag-main{padding:1.5rem;font-family:'SF Mono',Consolas,Menlo,monospace;color:#E2E8F0;display:flex;flex-direction:column;background:rgba(0,0,0,0.4);overflow-y:auto;}
    .diag-terminal-text{font-size:0.85rem;line-height:1.6;white-space:pre-wrap;margin-bottom:1rem;}
    .diag-terminal-prompt{color:#27C93F;margin-right:0.5rem;}
    .diag-terminal-path{color:#3B82F6;margin-right:0.5rem;}
    .diag-terminal-output{display:flex;flex-direction:column;gap:0.5rem;font-size:0.85rem;opacity:0.9;}
    .diag-glitch-overlay{position:fixed;inset:0;pointer-events:none;z-index:10002;opacity:0;mix-blend-mode:screen;transition:opacity .15s ease;}
    .diag-glitch-overlay.active{opacity:.1;animation:glitchPulse .18s ease-out;}
    @media(max-width:768px){
      .diag-container{grid-template-columns:1fr;grid-template-rows:auto 1fr;height:80vh;min-height:auto;}
      .diag-sidebar{border-right:none;border-bottom:1px solid rgba(255,255,255,0.1);max-height:250px;}
    }

    body.late-night{background:#0b0c11!important;color:#f3f4f6!important;}
    body.late-night .hero, body.late-night .medium-featured, body.late-night .thinking-item, body.late-night #skills, body.late-night #contact, body.late-night .drop-card, body.late-night .skill-block, body.late-night .vcell{filter:brightness(.92) saturate(.95);}
    .late-night .hero-right-card, .late-night .monster-sticker, .late-night .mf-left, .late-night .mf-right{background:rgba(18,17,22,.98);}
    .late-night .nav, .late-night footer{background:rgba(7,8,12,.93);border-color:rgba(255,255,255,.05);} 

    .reveal{opacity:0;transform:translateY(20px);transition:opacity .7s,transform .7s}
    .reveal.visible{opacity:1;transform:translateY(0)}

    @media(max-width:1100px){
      .hero{grid-template-columns:1fr;gap:3rem;padding:7rem 2rem 4rem}
      .hero-right{align-items:flex-start}
      .hero-right-card,.monster-sticker{max-width:100%}
      .skills-grid{grid-template-columns:repeat(2,1fr)}
      .medium-featured{grid-template-columns:1fr}
    }
    @media(max-width:768px){
      nav{padding:1rem 1.2rem}
      .nav-links{gap:1.2rem}
      section,#skills,#thinking,#contact{padding:4.5rem 1.2rem}
      .hero{padding:6rem 1.2rem 3rem}
      h1.h{font-size:3rem}
      .hero-stats{gap:1.5rem}
      .skills-grid{grid-template-columns:1fr}
      .visual-grid{grid-template-columns:1fr 1fr;grid-template-rows:auto}
      .vcell:first-child{grid-row:auto;grid-column:1/-1;min-height:180px}
      .thinking-item{grid-template-columns:40px 1fr}
      .t-note{display:none}
      footer{flex-direction:column;gap:.5rem;text-align:center}
    }
  `}</style>
);

/* ── data ── */
const drops = [
  { num:"DROP I", icon:"🏷️", title:"DeepFashion Tagger", concept:"Teaching machines to read a fit.", philosophy:"Data-led style that feels considered, not arbitrary.", problem:"Fashion metadata is inconsistent and expensive to label at scale.", approach:"Classification model on the DeepFashion dataset — auto-tagging garment attributes: category, color, silhouette, formality.", stack:["Python","PyTorch","OpenCV","Flask API","Pandas"], outcome:"~70% reduction in manual tagging time. Exposed limits of single-label classification on layered outfits." },
  { num:"DROP II", icon:"🧴", title:"Skincare Intel Scraper", concept:"Beauty data, finally structured.", philosophy:"Beauty systems are better when they speak the same language.", problem:"Skincare ingredient data is scattered across reviews, blogs, and brand pages — never in one clean source.", approach:"BeautifulSoup + Requests scraper pipeline harvesting product data into a clean, EDA-ready dataset.", stack:["Python","BeautifulSoup","Requests","Pandas","Matplotlib"], outcome:"2,000+ product records compiled. Ingredient frequency patterns for a skincare recommender prototype." },
  { num:"DROP III", icon:"🔗", title:"CustomQR", concept:"Functional art. Encoded.", philosophy:"The interface is the brand; the code is the polish.", problem:"Standard QR codes often lack brand alignment and visual appeal, creating a disconnect between functional tech and modern aesthetics.", approach:"Bridged the gap between data encoding and tech-driven design by building a Python-based generator with a dynamic preview engine and custom styling.", stack:["Python","Tkinter","ttkbootstrap","QR Code API"], outcome:"Delivered an intuitive UI that supports real-time URL encoding and customizable color themes." },
];

const skills = [
  { icon:"📊", name:"Data Analysis", desc:"Exploratory analysis, pattern recognition, and insight storytelling via clean reproducible notebooks.", tags:["Pandas","NumPy","Matplotlib","Seaborn","Jupyter","EDA"] },
  { icon:"🌐", name:"Web Development", desc:"Functional, aesthetic web experiences — Flask backends to polished frontends.", tags:["Flask","HTML","CSS","JavaScript","REST APIs"] },
  { icon:"🤖", name:"Machine Learning", desc:"Classification models, feature engineering, and applied ML on real-world datasets.", tags:["Scikit-learn","PyTorch","TF-IDF","CNNs","Python"] },
  { icon:"🔗", name:"APIs & Scraping", desc:"Extracting, cleaning, and structuring data from the web and third-party APIs at scale.", tags:["BeautifulSoup","Requests","Selenium","JSON","Postman"] },
];

const thoughts = [
  { text:"Good UI reduces <em>decision fatigue.</em>", note:"UX is empathy made visible." },
  { text:"Data is only useful if it <em>changes behavior.</em>", note:"Numbers without action are noise." },
  { text:"Aesthetic instinct is an <em>engineering advantage.</em>", note:"Beauty and function aren't opposites." },
  { text:"The best systems are <em>invisible.</em>", note:"Complexity hidden, clarity exposed." },
];

const marqueeData = [
  {t:"Aditi Rawat",c:"w"},{t:"·",c:""},{t:"Delhi, India",c:""},{t:"·",c:""},
  {t:"Creative Engineer",c:"b"},{t:"·",c:""},{t:"Fashion × Data",c:"b"},{t:"·",c:""},
  {t:"8th Sin",c:"w"},{t:"·",c:""},{t:"444nomizo",c:"w"},{t:"·",c:""},
  {t:"Ichimise",c:"w"},{t:"·",c:""},{t:"Monster Energy",c:"w"},{t:"·",c:""},
  {t:"Systems With Taste",c:"b"},{t:"·",c:""},
];

const diagnosticsStats = [
  { label: "Aesthetic Engine", value: "ACTIVE" },
  { label: "Overthinking Module", value: "OVERCLOCKED" },
  { label: "Creative RAM", value: "FULL" },
  { label: "Trend Resistance", value: "HIGH" },
  { label: "Corporate Compatibility", value: "UNKNOWN" },
  { label: "Current Obsession", value: "DIGITAL DECAY" },
  { label: "Energy Source", value: "Monster Energy" },
];

const diagnosticCommands = [
  {
    id: "whoami",
    label: "whoami",
    lines: [
      "Aditi Rawat / Creative technologist / Fashion Systems Architect",
      "Building premium interfaces that feel polished, minimal, and intentional.",
      "This panel is a secret diagnostic layer for the quietly curious."
    ]
  },
  {
    id: "open archive",
    label: "open archive",
    lines: [
      "Archive online: /collections /moodboards /runway /motion", 
      "Current favorite archive: fashion tech collateral from 2025.",
      "Hidden notes live in the corners of every line."
    ]
  },
  {
    id: "current obsession",
    label: "current obsession",
    lines: [
      "DIGITAL DECAY — the tension between glossy and worn-in.",
      "A system that feels polished but remembers the edge.",
      "The ideal output is elegant, gritty, and quietly unexpected."
    ]
  },
  {
    id: "visual memory",
    label: "visual memory",
    lines: [
      "Aesthetic references: black lacquer, plum glass, neon haze.",
      "Subtle grain, scanline rhythm, soft motion blur.",
      "Design language: fashion archive meets experimental terminal."
    ]
  },
  {
    id: "unfinished ideas",
    label: "unfinished ideas",
    lines: [
      "1. Modular capsule wardrobe recommender based on mood scans.",
      "2. Fashion metadata engine that talks in color, pattern, and memory.",
      "3. Responsive visual system for editorial drops with soundscapes."
    ]
  },
  {
    id: "system logs",
    label: "system logs",
    lines: [
      "[00:02] boot sequence complete.",
      "[00:08] calibration stable: motion, grain, glow.",
      "[00:11] diagnostics activated by hidden shortcut.",
      "[00:14] interface ready. waiting for next command."
    ]
  }
];

function DiagnosticsPanel({ open, selectedCommand, setSelectedCommand, onClose, glitch }) {
  const command = diagnosticCommands.find((item) => item.id === selectedCommand) || diagnosticCommands[0];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="diag-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={onClose}
          />
          <motion.section
            className={`diagnostics-shell ${glitch ? "glitch" : ""}`}
            initial={{ y: "-40%", x: "-50%", opacity: 0, scale: 0.95 }}
            animate={{ y: "-50%", x: "-50%", opacity: 1, scale: 1 }}
            exit={{ y: "-40%", x: "-50%", opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="diag-topbar">
              <div className="diag-traffic-lights">
                <div className="diag-dot red" onClick={onClose}></div>
                <div className="diag-dot yellow"></div>
                <div className="diag-dot green"></div>
              </div>
              <div className="diag-title">aditi@macbook-pro:~</div>
            </div>
            
            <div className="diag-container">
              <div className="diag-sidebar">
                <div>
                  <div className="diag-section-title">System Status</div>
                  <div className="diag-stats-grid">
                    {diagnosticsStats.map((stat) => (
                      <div key={stat.label} className="diag-stat-item">
                        <span>{stat.label}</span>
                        <strong>{stat.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="diag-section-title">Commands</div>
                  <div className="diag-command-list-vertical">
                    {diagnosticCommands.map((item) => (
                      <button
                        key={item.id}
                        className={`diag-command-button ${item.id === selectedCommand ? "active" : ""}`}
                        onClick={() => setSelectedCommand(item.id)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="diag-main">
                <div className="diag-terminal-text">
                  <span className="diag-terminal-prompt">aditi@macbook-pro</span>
                  <span className="diag-terminal-path">~ %</span>
                  <span> {command.label}</span>
                </div>
                <div className="diag-terminal-output">
                  {command.lines.map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
          <div className={`diag-glitch-overlay ${glitch ? "active" : ""}`} />
        </>
      )}
    </AnimatePresence>
  );
}

/* ── hooks ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Monster Logo image ── */
const MonsterLogo = () => (
  <img className="ms-logo" src="/images/monster-logo.png" alt="Monster logo" />
);

/* ── SVG icons ── */
const GH = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>;
const LI = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const IG = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const MD = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>;
const SB = () => (<img src="/images/Substack.svg" alt="Substack" width="14" height="14" />);
const ML = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>;
const DL = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>;

/* ── components ── */
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  useEffect(() => {
    let mx=0,my=0,rx=0,ry=0,raf;
    const mv = e => { mx=e.clientX; my=e.clientY; };
    window.addEventListener("mousemove", mv);
    const lerp=(a,b,t)=>a+(b-a)*t;
    const tick=()=>{
      rx=lerp(rx,mx,.16); ry=lerp(ry,my,.16);
      if(dot.current) dot.current.style.transform=`translate(${mx-4}px,${my-4}px)`;
      if(ring.current) ring.current.style.transform=`translate(${rx-16}px,${ry-16}px)`;
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);

    const hoverTargets = [".drop-card", ".skill-block", ".vcell", ".hero-right-card", ".hero-cta a"];
    const getHover = (target) => hoverTargets.some((selector) => target.closest(selector));
    const over = (event) => {
      if (getHover(event.target)) {
        if (dot.current) dot.current.style.background = "rgba(255,255,255,0.9)";
        if (ring.current) ring.current.style.borderColor = "rgba(255,255,255,0.35)";
      }
    };
    const out = (event) => {
      if (!event.relatedTarget || !getHover(event.relatedTarget)) {
        if (dot.current) dot.current.style.background = "var(--burg)";
        if (ring.current) ring.current.style.borderColor = "rgba(123,28,46,0.45)";
      }
    };
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);

    return ()=>{
      window.removeEventListener("mousemove",mv);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
      cancelAnimationFrame(raf);
    };
  },[]);
  return <><div id="dot" ref={dot}/><div id="ring" ref={ring}/></>;
}

function Nav({ onLogoTap }) {
  const [sc,setSc]=useState(false);
  useEffect(()=>{
    const fn=()=>setSc(window.scrollY>50);
    window.addEventListener("scroll",fn);
    return ()=>window.removeEventListener("scroll",fn);
  },[]);
  return (
    <nav style={{boxShadow:sc?"0 2px 24px rgba(17,17,17,0.07)":"none"}}>
      <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); onLogoTap && onLogoTap(); }}>Aditi<span>.</span></a>
      <ul className="nav-links">
        <li><a href="#drops">Drops</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#writing">Writing</a></li>
        <li><a href="#thinking">Thinking</a></li>
        <li><a href="#contact" className="nav-cta">Hire Me</a></li>
      </ul>
    </nav>
  );
}

function MonsterSticker() {
  return (
    <div className="monster-sticker">
      <MonsterLogo/>
      <div className="ms-content">
        <div className="ms-role">
          <strong>Monster Energy</strong>
          Marketing Ambassador
        </div>
        <div className="ms-meta">
          <span className="ms-badge">Work Exp</span>
          <span className="ms-duration">2.5 Years</span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-deco">AR</div>
      <div className="hero-left">
        <div className="hero-status"><span className="live-dot"/>Delhi, India — Open to work</div>
        <div className="hero-eyebrow">Engineering student · Creative technologist</div>
        <h1 className="h">
          I build systems that <s>work. </s><br/>
          <em>feel right.</em>
        </h1>
        <p className="hero-sub">
          Building at the intersection of fashion, data, and product to bridge the gap between style and tech.
        </p>
        <div className="brands-row">
          <span className="brands-label">Collab'd with</span>
          {["8th Sin","444nomizo","Ichimise"].map(b=><span key={b} className="brand-chip">{b}</span>)}
        </div>
        <div className="hero-cta">
          <a href="#drops" className="btn btn-fill">View Drops</a>
          <a href="#contact" className="btn btn-stroke">Let's Build</a>
        </div>
        <div className="hero-stats">
          {[["03","Projects"],["4+","Tech domains"],["3","Brand collabs"],["∞","Taste"]].map(([n,l])=>(
            <div key={l}>
              <div className="snum">{n}<span>_</span></div>
              <div className="slabel">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-right-card">
          <div className="hrc-portrait">
          <img src="/images/my.jpg" alt="Aditi Rawat portrait" />
        </div>
          <div className="hrc-label">// Creative Engineer</div>
          <div className="hrc-name">Aditi<br/>Rawat</div>
          <div className="hrc-role">Fashion × Data </div>
          <div className="hrc-loc">📍 Delhi, India</div>
        </div>
        <MonsterSticker/>
      </div>
    </section>
  );
}

function Marquee() {
  const d2=[...marqueeData,...marqueeData];
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {d2.map((item,i)=><span key={i} className={`mi ${item.c}`}>{item.t}</span>)}
      </div>
    </div>
  );
}

function DropCard({drop}) {
  return (
    <div className="drop-card">
      <div className="drop-inner">
        <div className="drop-front">
          <div className="drop-num">{drop.num}</div>
          <div className="drop-visual">
            <div className="drop-visual-stripe"/>
            <span className="drop-visual-icon">{drop.icon}</span>
          </div>
          <h3 className="drop-title">{drop.title}</h3>
          <p className="drop-concept">{drop.concept}</p>
          <p className="drop-philosophy">{drop.philosophy}</p>
          <p className="drop-flip-hint">Hover to explore →</p>
        </div>
        <div className="drop-back">
          <div className="db-num">{drop.num} — System Details</div>
          <div className="db-row"><div className="db-label">Problem</div><p className="db-text">{drop.problem}</p></div>
          <div className="db-row"><div className="db-label">Approach</div><p className="db-text">{drop.approach}</p></div>
          <div className="db-row">
            <div className="db-label">Stack</div>
            <div className="db-stack">{drop.stack.map(t=><span key={t} className="db-tag">{t}</span>)}</div>
          </div>
          <div className="db-row"><div className="db-label">Outcome</div><p className="db-text">{drop.outcome}</p></div>
        </div>
      </div>
    </div>
  );
}

function SkillBlock({ skill, delay }) {
  const ref = useReveal();
  return (
    <div className="skill-block reveal" ref={ref} style={{ transitionDelay: `${delay}s` }}>
      <span className="skill-icon">{skill.icon}</span>
      <h3 className="skill-name">{skill.name}</h3>
      <p className="skill-desc">{skill.desc}</p>
      <div className="skill-tags">{skill.tags.map(t=><span key={t} className="skill-tag">{t}</span>)}</div>
    </div>
  );
}

function ThoughtItem({ thought, index }) {
  const ref = useReveal();
  return (
    <div className="thinking-item reveal" ref={ref} style={{ transitionDelay: `${index * 0.1}s` }}>
      <div className="t-num">0{index + 1}</div>
      <p className="t-text" dangerouslySetInnerHTML={{__html: thought.text}}/>
      <p className="t-note">{thought.note}</p>
    </div>
  );
}

function Drops() {
  const ref=useReveal();
  return (
    <section id="drops">
      <div className="drops-header reveal" ref={ref}>
        <div>
          <div className="sec-eyebrow">Selected work</div>
          <h2 className="sec-title">The <em>Drops</em></h2>
        </div>
        <div className="drops-hint">Scroll to explore</div>
      </div>
      <div className="drops-scroller">
        <div className="drops-row">
          {drops.map(d=><DropCard key={d.num} drop={d}/>)}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const ref = useReveal();
  return (
    <section id="skills">
      <div className="reveal" ref={ref}>
        <div className="sec-eyebrow">Capabilities</div>
        <h2 className="sec-title" style={{color:"var(--cream)"}}>What I can <em>actually</em> do.</h2>
      </div>
      <div className="skills-grid">
        {skills.map((s,i)=>(
          <SkillBlock key={s.name} skill={s} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}

function Writing() {
  const ref = useReveal();
  const ref2 = useReveal();
  return (
    <section id="writing">
      <div className="reveal" ref={ref} style={{marginBottom:0}}>
        <div className="sec-eyebrow">Writing</div>
        <h2 className="sec-title">From the <em>blog.</em></h2>
      </div>
      <div className="medium-featured reveal" ref={ref2}>
        <div className="mf-left">
          <div className="mf-tag">Data × Fashion</div>
          <div>
            <div className="mf-title">Tech Gets Tailored: Why Microsoft’s Majorana Chip Is the Hottest Drop in Quantum</div>
          </div>
        </div>
        <div className="mf-right">
          <p className="mf-excerpt">
            When Quantum Gets Couture: Meet Majorana 1
            <br/><br/>
            So, why is everyone in tech buzzing? For starters, Majorana 1 isn’t just another “faster chip.” It’s the first quantum processor powered by a Topological Core, built from a new family of materials called “topoconductors.” Geek speak? A little, yes, but the practical upshot is wild: this chip leverages quirky “Majorana particles” to create qubits — the atomic-scale engines behind quantum computers which are dramatically more stable and error-resistant than anything seen before.
                      </p>
          <div className="mf-meta">
            <a href="https://medium.com/@aditixrawat/tech-gets-tailored-why-microsofts-majorana-chip-is-the-hottest-drop-in-quantum-1206970f0d2f" target="_blank" rel="noreferrer" className="mf-read">
              Read on Medium →
            </a>
            <div>
              <div className="mf-date">Nov 2024</div>
              <a href="https://medium.com/@aditixrawat" target="_blank" rel="noreferrer" className="mf-medium-link">
                <MD/> medium.com/@aditixrawat ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoModal({ videoId, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <>
      <div className="video-modal-bg" onClick={onClose}/>
      <div className="video-modal">
        <button className="video-modal-close" onClick={onClose}>✕</button>
        <iframe
          src={`https://www.instagram.com/reel/${videoId}/embed/`}
          title="Instagram Reel"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </>
  );
}

function VisualEdge() {
  const ref = useReveal();
  const [activeVideo, setActiveVideo] = useState(null);
  const visualCells = [
    { caption: "Editorial Direction", icon: "◇", videoId: "DQ10LwAkusQ" },
    { caption: "Visual Storytelling", icon: "○", videoId: "DSZm9RuE-FS" },
    { caption: "Campaign Modeling", icon: "△", videoId: "DUS_2O_k_X3" },
    { caption: "Aesthetic Systems", icon: "□", videoId: "DJUZ7lUS9an" }
  ];

  return (
    <section id="visual">
      <div className="reveal" ref={ref}>
        <div className="sec-eyebrow">Visual dimension</div>
        <h2 className="sec-title">The other <em>side.</em></h2>
        <p style={{marginTop:".7rem",color:"var(--muted2)",fontSize:".8rem",fontFamily:"var(--mono)",maxWidth:440}}>
          Modeling, creative direction & visual storytelling — the instinct that sharpens the engineering.
        </p>
      </div>
      <div className="visual-grid">
        <div className="vcell">
          <div className="vcell-bg">◆</div>
          <div className="vcell-large-text">Fashion<br/><span>×</span><br/>Data</div>
          <div className="vcell-brands">
            {["8th Sin","444nomizo","Ichimise"].map(b=><span key={b} className="vcell-brand">◆ {b}</span>)}
          </div>
        </div>
        {visualCells.map((v,i)=>(
          <div key={i} className="vcell vcell-video" onClick={()=>setActiveVideo(v.videoId)}>
            <div className="vcell-bg">{v.icon}</div>
            <div className="vcell-inner">
              <span className="vcell-icon">{v.icon}</span>
              <div className="vcell-caption">{v.caption}</div>
            </div>
            <div className="vcell-play-badge">▶</div>
          </div>
        ))}
      </div>
      {activeVideo && <VideoModal videoId={activeVideo} onClose={()=>setActiveVideo(null)} />}
    </section>
  );
}

function Thinking() {
  const ref = useReveal();
  return (
    <section id="thinking">
      <div className="reveal" ref={ref}>
        <div className="sec-eyebrow">Mental model</div>
        <h2 className="sec-title" style={{color:"var(--cream)"}}>How I <em>think.</em></h2>
      </div>
      <div className="thinking-list">
        {thoughts.map((t,i)=>(
          <ThoughtItem key={i} thought={t} index={i} />
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const ref = useReveal();
  return (
    <section id="contact">
      <div className="contact-deco">HIRE</div>
      <div className="reveal" ref={ref}>
        <div className="contact-eyebrow">Available now · Delhi, India</div>
        <h2 className="contact-headline">
          Let's build something<br/>people actually use.
        </h2>
        <p className="contact-sub">Open to internships, projects & creative collaborations.</p>
        <div className="contact-btns">
          <a href="mailto:aditirawat.work@email.com" className="btn btn-white"><ML/>Say Hello</a>
          <a href="https://github.com/aditixrawat" target="_blank" rel="noreferrer" className="btn btn-outline-white"><GH/>GitHub</a>
          <a href="/AditiRawatResume.pdf" download className="btn btn-outline-white"><DL/>Resume</a>
        </div>
        <div className="social-strip">
          <a href="https://linkedin.com/in/aditixrawat" target="_blank" rel="noreferrer" className="soc-btn" title="LinkedIn"><LI/></a>
          <a href="https://instagram.com/whatwouldaditido" target="_blank" rel="noreferrer" className="soc-btn" title="Instagram"><IG/></a>
          <a href="https://medium.com/@aditixrawat" target="_blank" rel="noreferrer" className="soc-btn" title="Medium"><MD/></a>
          <a href="https://aditixrawat.substack.com" target="_blank" rel="noreferrer" className="soc-btn" title="Substack"><SB/></a>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState("whoami");
  const [glitch, setGlitch] = useState(false);
  const [lateNight, setLateNight] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  useEffect(() => {
    if (tapCount >= 5) {
      setDiagnosticsOpen(true);
      setTapCount(0); // reset
    }
    const timer = setTimeout(() => setTapCount(0), 1000);
    return () => clearTimeout(timer);
  }, [tapCount]);

  const handleLogoTap = () => {
    setTapCount(prev => prev + 1);
  };

  useEffect(() => {
    const checkMode = () => {
      const hour = new Date().getHours();
      setLateNight(hour >= 23);
    };
    checkMode();
    const interval = setInterval(checkMode, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("late-night", lateNight);
  }, [lateNight]);

  useEffect(() => {
    const handleKeydown = (event) => {
      // Use event.code === "KeyA" to avoid keyboard layout issues (e.g., AltGr mappings)
      if ((event.key.toLowerCase() === "a" || event.code === "KeyA") && event.ctrlKey && event.altKey) {
        event.preventDefault();
        setDiagnosticsOpen((prev) => !prev); // Toggle on/off
        setGlitch(true);
        setTimeout(() => setGlitch(false), 180);
      }
      if (event.key === "Escape") {
        setDiagnosticsOpen(false);
        setGlitch(true);
        setTimeout(() => setGlitch(false), 180);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const closeDiagnostics = () => {
    setDiagnosticsOpen(false);
    setGlitch(true);
    setTimeout(() => setGlitch(false), 180);
  };

  return (
    <>
      <G/>
      <Cursor/>
      <Nav onLogoTap={handleLogoTap} />
      <main>
        <Hero/>
        <Marquee/>
        <Drops/>
        <Skills/>
        <Writing/>
        <VisualEdge/>
        <Thinking/>
        <Contact/>
      </main>
      <DiagnosticsPanel
        open={diagnosticsOpen}
        selectedCommand={selectedCommand}
        setSelectedCommand={setSelectedCommand}
        onClose={closeDiagnostics}
        glitch={glitch}
      />
      <footer>
        <span className="ft">© 2025 Aditi Rawat · Systems With Taste</span>
        <div className="ft-status"><span className="ft-dot"/>Open to opportunities</div>
        <span className="ft">Delhi, India</span>
      </footer>
    </>
  );
}
