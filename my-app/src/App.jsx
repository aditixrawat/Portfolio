import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES — premium design system
═══════════════════════════════════════════════════════ */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Epilogue:wght@200;300;400;500;600;700;900&family=DM+Mono:wght@300;400;500&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

    :root {
      /* Core palette — dark editorial */
      --void:     #080608;
      --deep:     #0e0b10;
      --surface:  #141016;
      --panel:    #1a151e;
      --lift:     #221d28;

      /* Cream legacy (for light sections) */
      --cream:    #F5F0E8;
      --cream2:   #EDE7D9;
      --cream3:   #E4DCCB;

      /* Accent system */
      --burg:     #7B1C2E;
      --burg2:    #9B2335;
      --burg3:    #5C1221;
      --plum:     #4a1942;
      --plum2:    #6b2860;
      --silver:   #a8a4b0;
      --silver2:  #d4d0dc;
      --glass:    rgba(255,255,255,0.04);
      --glass2:   rgba(255,255,255,0.08);

      /* Monster */
      --monster:  #00FF41;

      /* Typography */
      --serif:    'Playfair Display', Georgia, serif;
      --sans:     'Epilogue', sans-serif;
      --mono:     'DM Mono', monospace;

      /* Motion */
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
      --ease-in-out: cubic-bezier(0.76, 0, 0.24, 1);
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--void);
      color: var(--cream);
      font-family: var(--sans);
      font-weight: 300;
      overflow-x: hidden;
      cursor: none;
      min-height: 100vh;
    }

    ::selection { background: var(--burg2); color: #fff; }
    ::-webkit-scrollbar { width: 2px; }
    ::-webkit-scrollbar-track { background: var(--void); }
    ::-webkit-scrollbar-thumb { background: var(--burg); }

    /* ── GRAIN OVERLAY ── */
    body::before {
      content: '';
      position: fixed; inset: 0; z-index: 9990;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
      background-size: 180px 180px;
      opacity: 0.028;
      mix-blend-mode: overlay;
    }

    /* ── VIGNETTE ── */
    body::after {
      content: '';
      position: fixed; inset: 0; z-index: 9989;
      pointer-events: none;
      background: radial-gradient(ellipse at center, transparent 50%, rgba(8,6,8,0.65) 100%);
    }

    /* ── CUSTOM CURSOR ── */
    #cursor-dot {
      position: fixed; z-index: 10010;
      width: 6px; height: 6px;
      background: var(--cream);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%,-50%);
      transition: width .2s, height .2s, background .2s;
      mix-blend-mode: difference;
    }
    #cursor-ring {
      position: fixed; z-index: 10009;
      width: 40px; height: 40px;
      border: 1px solid rgba(245,240,232,0.35);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%,-50%);
      transition: width .35s var(--ease-out), height .35s var(--ease-out), border-color .2s, background .2s;
    }
    #cursor-ring.hovering {
      width: 56px; height: 56px;
      border-color: rgba(155,35,53,0.6);
      background: rgba(155,35,53,0.06);
    }
    #cursor-ring.pressing {
      width: 32px; height: 32px;
      border-color: rgba(155,35,53,0.9);
    }

    /* ── NAV ── */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 500;
      display: flex; justify-content: space-between; align-items: center;
      padding: 1.4rem 3.5rem;
      background: rgba(8,6,8,0.6);
      backdrop-filter: blur(24px) saturate(1.4);
      -webkit-backdrop-filter: blur(24px) saturate(1.4);
      border-bottom: 1px solid rgba(255,255,255,0.045);
    }
    .nav-logo {
      font-family: var(--serif);
      font-size: 1.1rem; font-weight: 700;
      color: var(--cream);
      text-decoration: none;
      letter-spacing: -.01em;
    }
    .nav-logo span { color: var(--burg2); }
    .nav-links { display: flex; gap: 2.5rem; list-style: none; align-items: center; }
    .nav-links a {
      font-family: var(--mono); font-size: .58rem;
      letter-spacing: .18em; text-transform: uppercase;
      color: var(--silver); text-decoration: none;
      transition: color .2s;
      position: relative;
    }
    .nav-links a::after {
      content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
      height: 1px; background: var(--burg2);
      transform: scaleX(0); transform-origin: left;
      transition: transform .25s var(--ease-out);
    }
    .nav-links a:hover { color: var(--cream); }
    .nav-links a:hover::after { transform: scaleX(1); }
    .nav-cta {
      font-family: var(--mono); font-size: .56rem;
      letter-spacing: .18em; text-transform: uppercase;
      color: var(--burg2) !important; text-decoration: none;
      border: 1px solid rgba(155,35,53,0.45);
      padding: .4rem 1.1rem;
      background: rgba(155,35,53,0.06);
      transition: all .25s !important;
    }
    .nav-cta:hover {
      background: var(--burg2) !important;
      color: #fff !important;
      border-color: var(--burg2) !important;
    }
    .nav-cta::after { display: none !important; }

    /* ══════════════════════════════════════
       HERO
    ══════════════════════════════════════ */
    .hero {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      padding: 9rem 3.5rem 5rem;
      gap: 4rem;
      position: relative;
      overflow: hidden;
    }

    /* Ambient spotlight */
    .hero-ambient {
      position: absolute; z-index: 0;
      border-radius: 50%;
      filter: blur(120px);
      pointer-events: none;
    }
    .hero-ambient-1 {
      width: 600px; height: 600px;
      top: -200px; left: -150px;
      background: radial-gradient(circle, rgba(123,28,46,0.18) 0%, transparent 70%);
      animation: ambientDrift1 12s ease-in-out infinite alternate;
    }
    .hero-ambient-2 {
      width: 500px; height: 500px;
      bottom: -100px; right: -100px;
      background: radial-gradient(circle, rgba(74,25,66,0.14) 0%, transparent 70%);
      animation: ambientDrift2 15s ease-in-out infinite alternate;
    }

    /* Deco letter */
    .hero-deco {
      position: absolute; right: -.05em; top: -.12em;
      font-family: var(--serif);
      font-size: clamp(16rem,26vw,32rem);
      font-weight: 900; line-height: 1;
      color: transparent;
      -webkit-text-stroke: 1px rgba(245,240,232,0.03);
      pointer-events: none; user-select: none;
      letter-spacing: -.05em;
    }

    /* Hero left */
    .hero-left { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 1.8rem; }
    .hero-status {
      display: inline-flex; align-items: center; gap: .5rem;
      font-family: var(--mono); font-size: .55rem;
      letter-spacing: .22em; text-transform: uppercase;
      color: var(--silver);
    }
    .live-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--burg2);
      box-shadow: 0 0 8px rgba(155,35,53,0.7);
      animation: burgBlink 2.2s ease-in-out infinite;
    }
    .hero-eyebrow {
      font-family: var(--mono); font-size: .58rem;
      letter-spacing: .3em; text-transform: uppercase;
      color: rgba(168,164,176,0.65);
      display: flex; align-items: center; gap: .8rem;
    }
    .hero-eyebrow::before {
      content: ''; display: inline-block;
      width: 28px; height: 1px; background: var(--burg2);
    }
    h1.h {
      font-family: var(--serif);
      font-size: clamp(3.2rem, 5.5vw, 6rem);
      font-weight: 900; line-height: .92;
      letter-spacing: -.03em;
      color: var(--cream);
    }
    h1.h em { color: var(--burg2); font-style: italic; }
    h1.h s {
      text-decoration-color: rgba(155,35,53,0.5);
      text-decoration-thickness: 2px;
      color: var(--silver);
    }
    .hero-sub {
      font-size: .85rem; line-height: 1.9;
      color: var(--silver); max-width: 420px;
    }

    /* Brand chips */
    .brands-row { display: flex; gap: .5rem; align-items: center; flex-wrap: wrap; }
    .brands-label {
      font-family: var(--mono); font-size: .5rem;
      letter-spacing: .2em; color: rgba(168,164,176,0.45);
      text-transform: uppercase;
    }
    .brand-chip {
      font-family: var(--mono); font-size: .52rem;
      letter-spacing: .1em; padding: .18rem .6rem;
      border: 1px solid rgba(155,35,53,0.25);
      color: var(--burg2); text-transform: uppercase;
      background: rgba(155,35,53,0.04);
      transition: all .2s;
    }
    .brand-chip:hover {
      border-color: rgba(155,35,53,0.6);
      background: rgba(155,35,53,0.1);
    }

    /* CTA buttons */
    .hero-cta { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
    .btn {
      padding: .85rem 2rem;
      font-family: var(--mono); font-size: .6rem;
      letter-spacing: .18em; text-transform: uppercase;
      text-decoration: none; display: inline-flex; align-items: center; gap: .5rem;
      cursor: pointer; border: none; position: relative; overflow: hidden;
      transition: all .25s var(--ease-out);
    }
    .btn::before {
      content: ''; position: absolute; inset: 0;
      background: rgba(255,255,255,0.04);
      transform: translateX(-100%) skewX(-12deg);
      transition: transform .4s var(--ease-out);
    }
    .btn:hover::before { transform: translateX(0) skewX(0); }
    .btn-fill { background: var(--cream); color: var(--void); }
    .btn-fill:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(245,240,232,0.15); }
    .btn-glass {
      background: var(--glass);
      color: var(--cream);
      border: 1px solid rgba(245,240,232,0.12);
      backdrop-filter: blur(8px);
    }
    .btn-glass:hover {
      background: var(--glass2);
      border-color: rgba(245,240,232,0.2);
      transform: translateY(-2px);
    }

    /* Stats */
    .hero-stats {
      display: flex; gap: 3rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    .snum {
      font-family: var(--serif);
      font-size: 2.2rem; font-weight: 700;
      color: var(--cream); line-height: 1;
    }
    .snum span { color: var(--burg2); }
    .slabel {
      font-family: var(--mono); font-size: .52rem;
      letter-spacing: .18em; text-transform: uppercase;
      color: var(--silver); margin-top: .3rem;
      opacity: .6;
    }

    /* Hero right */
    .hero-right {
      display: flex; flex-direction: column; gap: .9rem;
      align-items: flex-end; position: relative; z-index: 1;
    }

    /* Identity card — glassmorphism */
    .id-card {
      width: 100%; max-width: 340px;
      background: rgba(26,21,30,0.7);
      backdrop-filter: blur(20px) saturate(1.5);
      -webkit-backdrop-filter: blur(20px) saturate(1.5);
      border: 1px solid rgba(255,255,255,0.07);
      padding: 2.5rem;
      position: relative; overflow: hidden;
    }
    .id-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--burg2), transparent);
    }
    .id-card::after {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at top right, rgba(155,35,53,0.08) 0%, transparent 60%);
      pointer-events: none;
    }
    .id-portrait {
      position: absolute; top: 2.5rem; right: 1.5rem;
      width: 130px; height: 130px; border-radius: 50%;
      overflow: hidden;
      border: 1px solid rgba(155,35,53,0.35);
      box-shadow: 0 0 0 1px rgba(0,0,0,.3), 0 0 24px rgba(155,35,53,0.12);
    }
    .id-portrait img { width: 100%; height: 100%; object-fit: cover; }
    .id-label {
      font-family: var(--mono); font-size: .5rem;
      letter-spacing: .25em; text-transform: uppercase;
      color: rgba(168,164,176,0.3); margin-bottom: 1.2rem;
    }
    .id-name {
      font-family: var(--serif); font-size: 1.9rem;
      font-weight: 700; color: var(--cream); line-height: 1.05; margin-bottom: .35rem;
    }
    .id-role {
      font-family: var(--mono); font-size: .55rem;
      letter-spacing: .15em; text-transform: uppercase;
      color: var(--burg2); margin-bottom: 1.8rem;
    }
    .id-loc {
      font-family: var(--mono); font-size: .52rem;
      letter-spacing: .15em; text-transform: uppercase;
      color: rgba(168,164,176,0.3);
    }

    /* Monster sticker */
    .monster-sticker {
      width: 100%; max-width: 340px;
      background: var(--monster);
      padding: 1rem 1.3rem;
      display: flex; align-items: center; gap: 1rem;
      border: 2px solid #000;
      box-shadow: 4px 4px 0 #000;
      position: relative; overflow: hidden;
      cursor: default;
    }
    .monster-sticker::before {
      content: ''; position: absolute; inset: 0;
      background: repeating-linear-gradient(-45deg,transparent,transparent 6px,rgba(0,0,0,0.04) 6px,rgba(0,0,0,0.04) 12px);
    }
    .ms-logo { flex-shrink: 0; position: relative; z-index: 1; width: 64px; height: 64px; object-fit: contain; }
    .ms-content { position: relative; z-index: 1; }
    .ms-role { font-family: var(--mono); font-size: .6rem; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: #000; line-height: 1.4; }
    .ms-role strong { display: block; font-size: .7rem; }
    .ms-meta { display: flex; align-items: center; gap: .4rem; margin-top: .3rem; }
    .ms-badge { font-family: var(--mono); font-size: .46rem; letter-spacing: .15em; text-transform: uppercase; background: #000; color: var(--monster); padding: .14rem .45rem; }
    .ms-dur { font-family: var(--mono); font-size: .46rem; letter-spacing: .12em; text-transform: uppercase; color: rgba(0,0,0,.55); }

   

    /* ── SECTIONS ── */
    section { padding: 7rem 3.5rem; position: relative; z-index: 1; }
    .sec-eyebrow {
      font-family: var(--mono); font-size: .52rem;
      letter-spacing: .3em; text-transform: uppercase;
      color: var(--burg2); margin-bottom: .7rem;
      display: flex; align-items: center; gap: .6rem;
    }
    .sec-eyebrow::before { content: '//'; color: rgba(168,164,176,0.3); }
    .sec-title {
      font-family: var(--serif);
      font-size: clamp(2.2rem, 3.5vw, 3.8rem);
      font-weight: 900; line-height: .96;
      letter-spacing: -.028em;
      color: var(--cream);
    }
    .sec-title em { color: var(--burg2); font-style: italic; }
    .sec-title .dim { color: var(--silver); font-weight: 400; font-style: italic; }

    /* ── DROPS ── */
    #drops { background: var(--void); }
    .drops-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
    .drops-count {
      font-family: var(--mono); font-size: .52rem; letter-spacing: .2em;
      text-transform: uppercase; color: rgba(168,164,176,0.3);
    }
    .drops-hint {
      font-family: var(--mono); font-size: .52rem; letter-spacing: .18em;
      text-transform: uppercase; color: rgba(168,164,176,0.35);
      display: flex; align-items: center; gap: .4rem;
    }
    .drops-hint::after { content: '→'; animation: nudge 1.8s ease-in-out infinite; }

    .drops-scroller { overflow-x: auto; padding-bottom: 1.5rem; scrollbar-width: thin; scrollbar-color: var(--burg) transparent; }
    .drops-scroller::-webkit-scrollbar { height: 2px; }
    .drops-scroller::-webkit-scrollbar-thumb { background: var(--burg); }
    .drops-row { display: flex; gap: 1.5rem; width: max-content; padding: .5rem 0; }

    /* Drop card — premium editorial */
    .drop-card { perspective: 1200px; width: 380px; height: 520px; flex-shrink: 0; }
    .drop-inner {
      position: relative; width: 100%; height: 100%;
      transform-style: preserve-3d;
      transition: transform .75s cubic-bezier(.23,1,.32,1);
    }
    .drop-card:hover .drop-inner { transform: rotateY(180deg); }
    .drop-front, .drop-back {
      position: absolute; inset: 0;
      backface-visibility: hidden; -webkit-backface-visibility: hidden;
      display: flex; flex-direction: column; padding: 2.2rem; overflow: hidden;
    }

    /* Front — deep charcoal with glass */
    .drop-front {
      background: var(--panel);
      border: 1px solid rgba(255,255,255,0.055);
    }
    .drop-front::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at top left, rgba(155,35,53,0.07), transparent 65%);
      pointer-events: none;
    }
    .drop-front::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, transparent, var(--burg2), transparent);
      transform: scaleX(0); transform-origin: left;
      transition: transform .5s var(--ease-out);
    }
    .drop-card:hover .drop-front::after { transform: scaleX(1); }

    /* Back */
    .drop-back {
      background: var(--surface);
      border: 1px solid rgba(255,255,255,0.05);
      transform: rotateY(180deg);
    }
    .drop-back::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at bottom right, rgba(74,25,66,0.15), transparent 65%);
      pointer-events: none;
    }

    .drop-num {
      font-family: var(--mono); font-size: .5rem; letter-spacing: .3em;
      text-transform: uppercase; color: rgba(168,164,176,0.3); margin-bottom: .4rem;
    }
    .drop-visual {
      flex: 1; display: flex; align-items: center; justify-content: center;
      margin: 0 -2.2rem; position: relative; overflow: hidden;
      background: rgba(0,0,0,0.35);
      transition: transform .35s var(--ease-out), filter .35s;
    }
    .drop-card:hover .drop-visual { transform: translateY(-3px) scale(1.01); filter: brightness(1.06); }
    .drop-visual-icon { font-size: 3.5rem; opacity: .25; position: relative; z-index: 1; }
    .drop-visual-stripe {
      position: absolute; inset: 0;
      background: repeating-linear-gradient(-45deg,transparent,transparent 12px,rgba(245,240,232,0.012) 12px,rgba(245,240,232,0.012) 24px);
    }
    .drop-visual-glow {
      position: absolute; inset: 0;
      background: radial-gradient(circle at 50% 50%, rgba(155,35,53,0.08), transparent 70%);
    }

    .drop-title {
      font-family: var(--serif); font-size: 1.6rem;
      font-weight: 700; color: var(--cream);
      line-height: 1.1; margin-top: 1.4rem; margin-bottom: .35rem;
    }
    .drop-concept { font-size: .76rem; color: var(--silver); font-style: italic; line-height: 1.65; opacity: .7; }
    .drop-philosophy {
      font-family: var(--mono); font-size: .62rem; letter-spacing: .1em;
      text-transform: uppercase; color: rgba(155,35,53,0.35);
      margin-top: .6rem; opacity: 0;
      transition: opacity .3s, transform .3s; transform: translateY(5px);
    }
    .drop-card:hover .drop-philosophy { opacity: 1; transform: translateY(0); }
    .drop-flip-hint {
      font-family: var(--mono); font-size: .48rem; letter-spacing: .2em;
      text-transform: uppercase; color: rgba(168,164,176,0.18); margin-top: .8rem;
    }

    /* Back content */
    .db-num { font-family: var(--mono); font-size: .48rem; letter-spacing: .28em; text-transform: uppercase; color: rgba(168,164,176,0.2); margin-bottom: 1.2rem; }
    .db-row { margin-bottom: .85rem; }
    .db-label { font-family: var(--mono); font-size: .48rem; letter-spacing: .25em; text-transform: uppercase; color: var(--burg2); margin-bottom: .22rem; opacity: .8; }
    .db-text { font-size: .73rem; color: rgba(245,240,232,0.65); line-height: 1.7; }
    .db-stack { display: flex; flex-wrap: wrap; gap: .3rem; margin-top: .22rem; }
    .db-tag {
      font-family: var(--mono); font-size: .52rem; letter-spacing: .06em;
      padding: .16rem .5rem;
      border: 1px solid rgba(155,35,53,0.25);
      color: var(--burg2); background: rgba(155,35,53,0.06);
    }

    /* ── SKILLS ── */
    #skills { background: var(--deep); }
    .skills-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; margin-top: 4rem; background: rgba(255,255,255,0.03); }
    .skill-block {
      background: var(--panel); padding: 2.4rem 2rem;
      position: relative; overflow: hidden; transition: background .3s;
    }
    .skill-block::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at top left, rgba(155,35,53,0.06), transparent 70%);
      opacity: 0; transition: opacity .4s;
    }
    .skill-block:hover { background: var(--lift); }
    .skill-block:hover::before { opacity: 1; }
    .skill-block::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg,var(--burg3),var(--burg2));
      transform: scaleX(0); transform-origin: left; transition: transform .4s var(--ease-out);
    }
    .skill-block:hover::after { transform: scaleX(1); }
    .skill-icon { font-size: 1.7rem; margin-bottom: 1.2rem; display: block; }
    .skill-name { font-family: var(--serif); font-size: 1.25rem; font-weight: 700; color: var(--cream); margin-bottom: .55rem; }
    .skill-desc { font-size: .72rem; color: rgba(168,164,176,0.45); line-height: 1.8; margin-bottom: 1.1rem; }
    .skill-tags { display: flex; flex-wrap: wrap; gap: .3rem; }
    .skill-tag {
      font-family: var(--mono); font-size: .52rem; letter-spacing: .06em;
      padding: .16rem .5rem; background: rgba(155,35,53,0.07);
      color: var(--burg2); border: 1px solid rgba(155,35,53,0.2);
    }

    /* ── WRITING ── */
    #writing { background: var(--void); }
    .writing-inner { display: grid; grid-template-columns: 1fr 1fr; margin-top: 3.5rem; border: 1px solid rgba(255,255,255,0.05); }
    .wf-left {
      background: var(--burg3); padding: 3.5rem;
      display: flex; flex-direction: column; justify-content: space-between;
      position: relative; overflow: hidden;
    }
    .wf-left::before {
      content: ''; position: absolute; top: -40%; right: -20%;
      width: 300px; height: 300px; border-radius: 50%;
      background: rgba(155,35,53,0.25); pointer-events: none;
    }
    .wf-left::after {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at bottom left, rgba(74,25,66,0.3), transparent 70%);
      pointer-events: none;
    }
    .wf-tag { font-family: var(--mono); font-size: .5rem; letter-spacing: .28em; text-transform: uppercase; color: rgba(245,240,232,0.35); padding-bottom: 2rem; }
    .wf-title { font-family: var(--serif); font-size: 1.8rem; font-weight: 700; color: var(--cream); line-height: 1.15; letter-spacing: -.02em; margin-bottom: 1rem; position: relative; z-index: 1; }
    .wf-date { font-family: var(--mono); font-size: .5rem; letter-spacing: .18em; text-transform: uppercase; color: rgba(245,240,232,0.28); position: relative; z-index: 1; }
    .wf-right {
      background: var(--surface); padding: 3.5rem;
      display: flex; flex-direction: column; justify-content: space-between;
      border-left: 1px solid rgba(255,255,255,0.04);
    }
    .wf-excerpt { font-size: .84rem; color: var(--silver); line-height: 1.9; flex: 1; margin-bottom: 2rem; opacity: .75; }
    .wf-read {
      display: inline-flex; align-items: center; gap: .6rem;
      font-family: var(--mono); font-size: .58rem; letter-spacing: .18em;
      text-transform: uppercase; color: var(--burg2); text-decoration: none;
      border-bottom: 1px solid rgba(155,35,53,0.4); padding-bottom: 2px;
      transition: gap .25s, border-color .2s;
    }
    .wf-read:hover { gap: 1rem; border-color: var(--burg2); }
    .wf-meta { display: flex; justify-content: space-between; align-items: flex-end; }
    .wf-medium-link {
      display: flex; align-items: center; gap: .4rem;
      font-family: var(--mono); font-size: .52rem; letter-spacing: .14em;
      text-transform: uppercase; color: rgba(168,164,176,0.3);
      text-decoration: none; margin-top: 1.2rem; transition: color .2s;
    }
    .wf-medium-link:hover { color: var(--burg2); }

    /* ── VISUAL EDGE ── */
    #visual { background: var(--deep); }
    .visual-grid {
      display: grid; grid-template-columns: 2fr 1fr 1fr;
      grid-template-rows: 230px 230px; gap: 2px; margin-top: 3.5rem;
    }
    .vcell {
      background: var(--panel); border: 1px solid rgba(255,255,255,0.04);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      position: relative; overflow: hidden;
      transition: border-color .3s, transform .3s var(--ease-out);
      cursor: pointer;
    }
    .vcell:hover { border-color: rgba(155,35,53,0.3); }
    .vcell:first-child { grid-row: 1/3; cursor: default; }
    .vcell:first-child:hover { border-color: rgba(255,255,255,0.06); }
    .vcell-bg {
      position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
      font-size: 5rem; opacity: .04; pointer-events: none; transition: transform .5s var(--ease-out);
    }
    .vcell:hover .vcell-bg { transform: translate(8px,-6px); }
    .vcell-inner { position: relative; z-index: 1; text-align: center; padding: 1.5rem; }
    .vcell-icon { font-size: 1.4rem; opacity: .25; margin-bottom: .55rem; display: block; }
    .vcell-caption { font-family: var(--mono); font-size: .5rem; letter-spacing: .25em; text-transform: uppercase; color: rgba(168,164,176,0.4); }
    .vcell-brands { position: absolute; bottom: 1rem; left: 1rem; display: flex; flex-direction: column; gap: .22rem; }
    .vcell-brand { font-family: var(--mono); font-size: .46rem; letter-spacing: .18em; text-transform: uppercase; color: var(--burg2); opacity: .6; }
    .vcell-headline {
      font-family: var(--serif); font-size: clamp(1.8rem,4vw,3.2rem);
      font-weight: 900; color: var(--cream); line-height: 1; text-align: center;
      padding: 2rem; position: relative; z-index: 1;
    }
    .vcell-headline span { color: var(--burg2); font-style: italic; }
    .vcell-play {
      position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%) scale(.88);
      font-size: 2.2rem; color: var(--burg2); opacity: .55;
      transition: all .25s; z-index: 2;
    }
    .vcell-video:hover .vcell-play { opacity: 1; transform: translate(-50%,-50%) scale(1); }
    .vcell-hover-glow {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at center, rgba(155,35,53,0.06), transparent 70%);
      opacity: 0; transition: opacity .35s;
    }
    .vcell-video:hover .vcell-hover-glow { opacity: 1; }

    /* Video modal */
    .video-modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.88); z-index: 9998; backdrop-filter: blur(6px); }
    .video-modal-wrapper {
      position: fixed; inset: 0;
      display: flex; align-items: center; justify-content: center;
      z-index: 9999;
    }
    .video-modal {
      position: relative; width: min(92vw,900px); aspect-ratio: 16/9;
      background: #000; border-radius: 12px; overflow: hidden;
      box-shadow: 0 32px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,0.05);
    }
    .video-modal iframe { width: 100%; height: 100%; border: none; display: block; }
    .video-modal-close {
      position: absolute; top: 1rem; right: 1rem; width: 40px; height: 40px;
      background: rgba(255,255,255,0.08); border: none; border-radius: 50%;
      color: #fff; font-size: 1.1rem; cursor: pointer; z-index: 1; transition: all .2s;
    }
    .video-modal-close:hover { background: rgba(255,255,255,0.16); }

   
    /* ── CONTACT ── */
    #contact {
      background: var(--burg3); text-align: center;
      min-height: 70vh; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 7rem 3.5rem; position: relative; overflow: hidden;
    }
    #contact::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at 50% 0%, rgba(155,35,53,0.4), transparent 70%);
      pointer-events: none;
    }
    #contact::after {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at 50% 100%, rgba(74,25,66,0.25), transparent 70%);
      pointer-events: none;
    }
    .contact-deco {
      position: absolute; font-family: var(--serif);
      font-size: clamp(10rem,20vw,26rem); font-weight: 900;
      color: rgba(255,255,255,0.03); top: -8%; left: 50%;
      transform: translateX(-50%); pointer-events: none;
      user-select: none; white-space: nowrap; letter-spacing: -.05em;
    }
    .contact-eyebrow {
      font-family: var(--mono); font-size: .52rem; letter-spacing: .3em;
      text-transform: uppercase; color: rgba(245,240,232,.35);
      margin-bottom: 1.5rem; position: relative;
    }
    .contact-headline {
      font-family: var(--serif); font-size: clamp(2.8rem,5.5vw,5rem);
      font-weight: 900; color: #fff; line-height: .96;
      letter-spacing: -.03em; margin-bottom: 1.2rem; position: relative;
    }
    .contact-sub {
      font-family: var(--mono); font-size: .58rem; letter-spacing: .18em;
      text-transform: uppercase; color: rgba(245,240,232,0.4);
      margin-bottom: 3rem; position: relative;
    }
    .contact-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; position: relative; }
    .btn-white { background: #fff; color: var(--burg3); border: none; }
    .btn-white:hover { background: var(--cream2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,255,255,0.15); }
    .btn-outline-w { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.3); }
    .btn-outline-w:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.5); }
    .social-strip { display: flex; justify-content: center; gap: .7rem; margin-top: 3rem; position: relative; }
    .soc-btn {
      width: 42px; height: 42px;
      border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.06);
      display: flex; align-items: center; justify-content: center;
      color: #fff; text-decoration: none; transition: all .2s;
    }
    .soc-btn:hover { background: #fff; color: var(--burg3); border-color: #fff; }

    /* ── FOOTER ── */
    footer {
      background: var(--void); padding: 1.6rem 3.5rem;
      display: flex; justify-content: space-between; align-items: center;
      border-top: 1px solid rgba(255,255,255,0.04);
      position: relative; z-index: 1;
    }
    .ft { font-family: var(--mono); font-size: .5rem; letter-spacing: .18em; text-transform: uppercase; color: rgba(168,164,176,0.2); }
    .ft-status { display: flex; align-items: center; gap: .4rem; font-family: var(--mono); font-size: .5rem; letter-spacing: .15em; text-transform: uppercase; color: var(--burg2); opacity: .7; }
    .ft-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--burg2); box-shadow: 0 0 6px rgba(155,35,53,0.7); animation: burgBlink 2s ease-in-out infinite; }

    /* ── DIAGNOSTICS ── */
    .diag-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);z-index:10000;}
    .diagnostics-shell{position:fixed;top:50%;left:50%;width:min(90vw,800px);max-height:85vh;background:rgba(14,11,16,0.92);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.1);border-radius:14px;box-shadow:0 24px 60px rgba(0,0,0,0.6),0 0 0 1px rgba(155,35,53,0.15);z-index:10001;overflow:hidden;display:flex;flex-direction:column;}
    .diag-topbar{display:flex;justify-content:center;align-items:center;padding:.8rem 1rem;background:rgba(255,255,255,0.03);border-bottom:1px solid rgba(255,255,255,0.06);position:relative;}
    .diag-traffic{position:absolute;left:1rem;display:flex;gap:7px;}
    .diag-dot{width:11px;height:11px;border-radius:50%;}
    .diag-dot.red{background:#FF5F56;cursor:pointer;}
    .diag-dot.yellow{background:#FFBD2E;}
    .diag-dot.green{background:#27C93F;}
    .diag-title{font-family:var(--mono);font-size:.75rem;color:rgba(255,255,255,0.6);letter-spacing:.05em;}
    .diag-container{display:grid;grid-template-columns:220px 1fr;min-height:420px;}
    .diag-sidebar{padding:1.4rem .9rem;background:rgba(0,0,0,0.3);border-right:1px solid rgba(255,255,255,0.05);display:flex;flex-direction:column;gap:1.8rem;overflow-y:auto;}
    .diag-sec-title{font-family:var(--mono);font-size:.56rem;text-transform:uppercase;color:rgba(255,255,255,0.3);letter-spacing:.08em;margin-bottom:.4rem;padding-left:.7rem;}
    .diag-stats{display:flex;flex-direction:column;gap:.5rem;padding:0 .7rem;}
    .diag-stat{display:flex;justify-content:space-between;font-family:var(--mono);font-size:.68rem;color:rgba(255,255,255,0.55);}
    .diag-stat strong{color:rgba(255,255,255,0.85);font-weight:400;}
    .diag-cmds{display:flex;flex-direction:column;gap:.15rem;}
    .diag-cmd{background:transparent;border:none;color:rgba(255,255,255,0.5);text-align:left;padding:.5rem .7rem;border-radius:6px;font-family:var(--mono);font-size:.78rem;cursor:pointer;transition:all .18s;width:100%;}
    .diag-cmd:hover{background:rgba(255,255,255,0.06);color:#fff;}
    .diag-cmd.active{background:rgba(155,35,53,0.25);color:var(--burg2);border-left:2px solid var(--burg2);}
    .diag-main{padding:1.4rem;font-family:'SF Mono',Consolas,Menlo,monospace;color:#E2E8F0;display:flex;flex-direction:column;background:rgba(0,0,0,0.5);overflow-y:auto;}
    .diag-prompt{font-size:.8rem;line-height:1.6;white-space:pre-wrap;margin-bottom:.8rem;}
    .diag-prompt-g{color:#27C93F;}
    .diag-prompt-b{color:#3B82F6;}
    .diag-out{display:flex;flex-direction:column;gap:.45rem;font-size:.8rem;opacity:.85;}
    .diag-glitch{position:fixed;inset:0;pointer-events:none;z-index:10002;opacity:0;mix-blend-mode:screen;}
    .diag-glitch.on{opacity:.08;animation:glitchPulse .18s ease-out;}

    /* ── KEYFRAMES ── */
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes burgBlink{0%,100%{opacity:1;box-shadow:0 0 8px rgba(155,35,53,0.7)}50%{opacity:.3;box-shadow:none}}
    @keyframes nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(5px)}}
    @keyframes stickerIn{0%{transform:rotate(-4deg) scale(.7);opacity:0}70%{transform:rotate(-1.5deg) scale(1.04)}100%{transform:rotate(-1.5deg) scale(1);opacity:1}}
    @keyframes ambientDrift1{0%{transform:translate(0,0)}100%{transform:translate(5%,6%)}}
    @keyframes ambientDrift2{0%{transform:translate(0,0)}100%{transform:translate(-4%,-5%)}}
    @keyframes glitchPulse{0%{opacity:.2;transform:translate3d(0,0,0)}30%{opacity:.08;transform:translate3d(3px,-2px,0)}60%{opacity:.15;transform:translate3d(-2px,1px,0)}100%{opacity:0}}

    /* Scroll reveal */
    .reveal{opacity:0;transform:translateY(22px);transition:opacity .75s var(--ease-out),transform .75s var(--ease-out)}
    .reveal.visible{opacity:1;transform:translateY(0)}

    body.late-night{background:#06050a!important}
    body.late-night .hero,.body.late-night #drops,.body.late-night #skills{filter:brightness(.9)}

    @media(max-width:1100px){
      .hero{grid-template-columns:1fr;gap:3rem;padding:7rem 2rem 4rem}
      .hero-right{align-items:flex-start}
      .id-card,.monster-sticker{max-width:100%}
      .skills-grid{grid-template-columns:repeat(2,1fr)}
      .writing-inner{grid-template-columns:1fr}
    }
    @media(max-width:768px){
      .nav{padding:1rem 1.2rem}
      .nav-links{gap:1.2rem}
      section{padding:4.5rem 1.2rem}
      h1.h{font-size:3rem}
      .hero-stats{gap:1.5rem}
      .skills-grid{grid-template-columns:1fr}
      .visual-grid{grid-template-columns:1fr 1fr;grid-template-rows:auto}
      .vcell:first-child{grid-row:auto;grid-column:1/-1;min-height:180px}
      .t-note{display:none}
      footer{flex-direction:column;gap:.5rem;text-align:center}
      .diag-container{grid-template-columns:1fr;grid-template-rows:auto 1fr}
      .diag-sidebar{border-right:none;border-bottom:1px solid rgba(255,255,255,0.05);max-height:220px}
    }
  `}</style>
);

/* ═══════════════════════════════════════════════════════
   FRAMER MOTION VARIANTS
═══════════════════════════════════════════════════════ */
const fUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24, skewY: 1 },
  visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] } }
});
const fIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.65, delay } }
});
const fRight = (delay = 0) => ({
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } }
});
const stagger = { visible: { transition: { staggerChildren: 0.09 } } };
const wordReveal = {
  hidden: { opacity: 0, y: 28, skewY: 3 },
  visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const drops = [
  { num: "DROP I", icon: "🏷️", title: "DeepFashion Tagger", concept: "Teaching machines to read a fit.", philosophy: "Data-led style that feels considered, not arbitrary.", problem: "Fashion metadata is inconsistent and expensive to label at scale.", approach: "Classification model on the DeepFashion dataset — auto-tagging garment attributes: category, color, silhouette, formality.", stack: ["Python", "PyTorch", "OpenCV", "Flask API", "Pandas"], outcome: "~70% reduction in manual tagging time. Exposed limits of single-label classification on layered outfits." },
  { num: "DROP II", icon: "🧴", title: "Skincare Intel Scraper", concept: "Beauty data, finally structured.", philosophy: "Beauty systems are better when they speak the same language.", problem: "Skincare ingredient data is scattered across reviews, blogs, and brand pages — never in one clean source.", approach: "BeautifulSoup + Requests scraper pipeline harvesting product data into a clean, EDA-ready dataset.", stack: ["Python", "BeautifulSoup", "Requests", "Pandas", "Matplotlib"], outcome: "2,000+ product records compiled. Ingredient frequency patterns for a skincare recommender prototype." },
  { num: "DROP III", icon: "🔗", title: "CustomQR", concept: "Functional art. Encoded.", philosophy: "The interface is the brand; the code is the polish.", problem: "Standard QR codes often lack brand alignment and visual appeal, creating a disconnect between functional tech and modern aesthetics.", approach: "Bridged the gap between data encoding and tech-driven design by building a Python-based generator with a dynamic preview engine and custom styling.", stack: ["Python", "Tkinter", "ttkbootstrap", "QR Code API"], outcome: "Delivered an intuitive UI that supports real-time URL encoding and customizable color themes." },
];

const skills = [
  { icon: "📊", name: "Data Analysis", desc: "Exploratory analysis, pattern recognition, and insight storytelling via clean reproducible notebooks.", tags: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter", "EDA"] },
  { icon: "🌐", name: "Web Development", desc: "Functional, aesthetic web experiences — Flask backends to polished frontends.", tags: ["Flask", "HTML", "CSS", "JavaScript", "REST APIs"] },
  { icon: "🤖", name: "Machine Learning", desc: "Classification models, feature engineering, and applied ML on real-world datasets.", tags: ["Scikit-learn", "PyTorch", "TF-IDF", "CNNs", "Python"] },
  { icon: "🔗", name: "APIs & Scraping", desc: "Extracting, cleaning, and structuring data from the web and third-party APIs.", tags: ["BeautifulSoup", "Requests", "Selenium", "JSON", "Postman"] },
];

const thoughts = [
  { text: "Good UI reduces <em>decision fatigue.</em>", note: "UX is empathy made visible." },
  { text: "Data is only useful if it <em>changes behavior.</em>", note: "Numbers without action are noise." },
  { text: "Aesthetic instinct is an <em>engineering advantage.</em>", note: "Beauty and function aren't opposites." },
  { text: "The best systems are <em>invisible.</em>", note: "Complexity hidden, clarity exposed." },
];



const diagStats = [
  { label: "Aesthetic Engine", value: "ACTIVE" },
  { label: "Overthinking Module", value: "OVERCLOCKED" },
  { label: "Creative RAM", value: "FULL" },
  { label: "Trend Resistance", value: "HIGH" },
  { label: "Corporate Compatibility", value: "UNKNOWN" },
  { label: "Current Obsession", value: "Young Sherlock" },
  { label: "Energy Source", value: "Monster Energy" },
];

const diagCmds = [
  { id: "whoami", label: "whoami", lines: ["Aditi Rawat / Creative technologist / Fashion Systems Architect", "Building premium interfaces that feel polished, minimal, and intentional.", "This panel is a secret diagnostic layer for the quietly curious."] },
  { id: "open archive", label: "open archive", lines: ["Archive online: /collections /moodboards /runway /motion", "Current favorite archive: fashion tech collateral from 2025.", "Hidden notes live in the corners of every line."] },
  { id: "current obsession", label: "current obsession", lines: ["DIGITAL DECAY", "A system that feels polished but remembers the edge.", "The ideal output is elegant, gritty, and quietly unexpected."] },
  { id: "visual memory", label: "visual memory", lines: ["Aesthetic references: black lacquer, plum glass, neon haze.", "Subtle grain, scanline rhythm, soft motion blur.", "Design language: fashion archive meets experimental terminal."] },
  { id: "unfinished ideas", label: "unfinished ideas", lines: ["1. Modular capsule wardrobe recommender based on mood scans.", "2. Fashion metadata engine that talks in color, pattern, and memory.", "3. Responsive visual system for editorial drops with soundscapes."] },
  { id: "system logs", label: "system logs", lines: ["[00:02] boot sequence complete.", "[00:08] calibration stable: motion, grain, glow.", "[00:11] diagnostics activated by hidden shortcut.", "[00:14] interface ready. waiting for next command."] },
];

/* ═══════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════ */
const GH = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>;
const LI = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
const IG = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>;
const MDIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" /></svg>;
const SB = () => <img src="/images/Substack.svg" alt="Substack" width="13" height="13" />;
const ML = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const DL = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>;
const MonsterLogo = () => <img className="ms-logo" src="/images/monster-logo.png" alt="Monster Energy" />;

/* ═══════════════════════════════════════════════════════
   CUSTOM CURSOR — premium with blend-mode difference
═══════════════════════════════════════════════════════ */
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(mx, { stiffness: 90, damping: 22 });
  const ry = useSpring(my, { stiffness: 90, damping: 22 });

  useEffect(() => {
    const onMove = e => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", onMove);

    const hoverEls = [".drop-card", ".skill-block", ".vcell", ".id-card", ".btn", ".nav-links a", ".soc-btn", ".monster-sticker"];
    const isHover = t => hoverEls.some(s => t.closest && t.closest(s));
    const onOver = e => {
      if (isHover(e.target)) {
        ring.current?.classList.add("hovering");
      }
    };
    const onOut = e => {
      if (!e.relatedTarget || !isHover(e.relatedTarget)) {
        ring.current?.classList.remove("hovering");
      }
    };
    const onDown = () => ring.current?.classList.add("pressing");
    const onUp = () => ring.current?.classList.remove("pressing");
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // Direct DOM for dot (no lag), spring for ring
  useEffect(() => {
    const unsub1 = mx.on("change", v => { if (dot.current) dot.current.style.left = v + "px"; });
    const unsub2 = my.on("change", v => { if (dot.current) dot.current.style.top = v + "px"; });
    const unsub3 = rx.on("change", v => { if (ring.current) ring.current.style.left = v + "px"; });
    const unsub4 = ry.on("change", v => { if (ring.current) ring.current.style.top = v + "px"; });
    return () => { unsub1(); unsub2(); unsub3(); unsub4(); };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dot} />
      <div id="cursor-ring" ref={ring} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════ */
function Nav({ onLogoTap }) {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <motion.nav
      className="nav"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ boxShadow: sc ? "0 2px 32px rgba(0,0,0,0.4)" : "none" }}
    >
      <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); onLogoTap?.(); }}>
        Aditi<span>.</span>
      </a>
      <ul className="nav-links">
        <li><a href="#drops">Drops</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#writing">Writing</a></li>
        <li><a href="#contact" className="nav-cta">Hire Me</a></li>
      </ul>
    </motion.nav>
  );
}

/* ─── TEXT MORPHER ─── */
function TextMorpher() {
  const words = ["CREATIVE TECHNOLOGIST", "CREATIVE AI @ HELIUM"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center">
      <span>ENGINEER ·&nbsp;</span>
      <span className="relative inline-block overflow-hidden h-[1.2em] align-bottom">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO — full cinematic treatment
═══════════════════════════════════════════════════════ */
function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const decoY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const decoOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const smoothContentY = useSpring(contentY, { stiffness: 70, damping: 18 });

  // Headline words
  const words = [
    { text: "I build systems that ", em: false, s: false },
    { text: "work. ", em: false, s: true },
    { text: null, br: true },
    { text: "feel right.", em: true, s: false },
  ];

  return (
    <section className="hero" ref={heroRef}>
      {/* Ambient glow spots */}
      <div className="hero-ambient hero-ambient-1" />
      <div className="hero-ambient hero-ambient-2" />

      {/* Parallax deco */}
      <motion.div
        className="hero-deco"
        style={{ y: decoY, opacity: decoOpacity }}
      >AR</motion.div>

      {/* LEFT */}
      <motion.div className="hero-left" style={{ y: smoothContentY, opacity: contentOpacity }}>
        {/* Status */}
        <motion.div className="hero-status" variants={fIn(0.2)} initial="hidden" animate="visible">
          <span className="live-dot" />Delhi, India — Open to work
        </motion.div>

        {/* Eyebrow */}
        <motion.div className="hero-eyebrow" variants={fRight(0.32)} initial="hidden" animate="visible">
          <TextMorpher />
        </motion.div>

        {/* Headline — word-by-word stagger */}
        <motion.h1
          className="h"
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ display: "block" }}
        >
          {words.map((w, i) =>
            w.br ? <br key={i} /> :
              w.s ? (
                <motion.s key={i} variants={wordReveal} style={{ display: "inline" }}>{w.text}</motion.s>
              ) : w.em ? (
                <motion.em key={i} variants={wordReveal} style={{ display: "inline" }}>{w.text}</motion.em>
              ) : (
                <motion.span key={i} variants={wordReveal} style={{ display: "inline" }}>{w.text}</motion.span>
              )
          )}
        </motion.h1>

        {/* Sub */}
        <motion.p className="hero-sub" variants={fUp(0.65)} initial="hidden" animate="visible">
          Building at the intersection of fashion, data, and product to bridge the gap between style and tech.
        </motion.p>

        {/* Brands */}
        <motion.div className="brands-row" variants={fIn(0.78)} initial="hidden" animate="visible">
          <span className="brands-label">Collab'd with</span>
          {["8th Sin", "444nomizo", "Ichimise"].map((b, i) => (
            <motion.span
              key={b} className="brand-chip"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85 + i * 0.08, duration: 0.4, ease: "easeOut" }}
            >{b}</motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div className="hero-cta" variants={fUp(0.92)} initial="hidden" animate="visible">
          <motion.a
            href="#drops" className="btn btn-fill"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
          >View Drops</motion.a>
          <motion.a
            href="#contact" className="btn btn-glass"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
          >Let's Build</motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="hero-stats"
          initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 1.1 } } }}
        >
          {[["03", "Projects"], ["4+", "Tech domains"], ["3", "Brand collabs"], ["∞", "Taste"]].map(([n, l]) => (
            <motion.div key={l} variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: .5 } } }}>
              <div className="snum">{n}<span>_</span></div>
              <div className="slabel">{l}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* RIGHT */}
      <motion.div className="hero-right" style={{ y: smoothContentY }}>
        {/* ID Card */}
        <motion.div
          className="id-card"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(155,35,53,0.15)" }}
        >
          <div className="id-portrait">
            <img src="/images/my.jpg" alt="Aditi Rawat" />
          </div>
          <div className="id-label">// Creative Engineer</div>
          <div className="id-name">Aditi<br />Rawat</div>
          <div className="id-role">Fashion × Data</div>
          <div className="id-loc">📍 Delhi, India</div>
        </motion.div>

        {/* Monster sticker */}
        <motion.div
          className="monster-sticker"
          initial={{ opacity: 0, rotate: -4, scale: 0.75 }}
          animate={{ opacity: 1, rotate: -1.5, scale: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 16, delay: 1.1 }}
          whileHover={{ rotate: 0, scale: 1.03, boxShadow: "6px 6px 0 #000", transition: { type: "spring", stiffness: 300, damping: 15 } }}
        >
          <MonsterLogo />
          <div className="ms-content">
            <div className="ms-role">
              <strong>Monster Energy</strong>
              Marketing Ambassador
            </div>
            <div className="ms-meta">
              <span className="ms-badge">Work Exp</span>
              <span className="ms-dur">2.5 Years</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}


/* ─── DROP CARD ─── */
function DropCard({ drop, index }) {
  return (
    <motion.div
      className="drop-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="drop-inner">
        <div className="drop-front">
          <div className="drop-num">{drop.num}</div>
          <div className="drop-visual">
            <div className="drop-visual-stripe" />
            <div className="drop-visual-glow" />
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
            <div className="db-stack">{drop.stack.map(t => <span key={t} className="db-tag">{t}</span>)}</div>
          </div>
          <div className="db-row"><div className="db-label">Outcome</div><p className="db-text">{drop.outcome}</p></div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── DROPS SECTION ─── */
function Drops() {
  const ref = useReveal();
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
          {drops.map((d, i) => <DropCard key={d.num} drop={d} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── SKILL BLOCK ─── */
function SkillBlock({ skill, delay }) {
  const ref = useReveal();
  return (
    <div className="skill-block reveal" ref={ref} style={{ transitionDelay: `${delay}s` }}>
      <span className="skill-icon">{skill.icon}</span>
      <h3 className="skill-name">{skill.name}</h3>
      <p className="skill-desc">{skill.desc}</p>
      <div className="skill-tags">{skill.tags.map(t => <span key={t} className="skill-tag">{t}</span>)}</div>
    </div>
  );
}

function Skills() {
  const ref = useReveal();
  return (
    <section id="skills">
      <div className="reveal" ref={ref}>
        <div className="sec-eyebrow">Capabilities</div>
        <h2 className="sec-title">What I can <em>actually</em> do.</h2>
      </div>
      <div className="skills-grid">
        {skills.map((s, i) => <SkillBlock key={s.name} skill={s} delay={i * 0.08} />)}
      </div>
    </section>
  );
}

/* ─── WRITING ─── */
function Writing() {
  const r1 = useReveal(), r2 = useReveal();
  return (
    <section id="writing">
      <div className="reveal" ref={r1}>
        <div className="sec-eyebrow">Writing</div>
        <h2 className="sec-title">From the <em>blog.</em></h2>
      </div>
      <div className="writing-inner reveal" ref={r2}>
        <div className="wf-left">
          <div className="wf-tag">Tech × Fashion</div>
          <div>
            <div className="wf-title">Tech Gets Tailored: Why Microsoft's Majorana Chip Is the Hottest Drop in Quantum</div>
            <div className="wf-date">Nov 2024</div>
          </div>
        </div>
        <div className="wf-right">
          <p className="wf-excerpt">
            When Quantum Gets Couture: Meet Majorana 1.<br /><br />
            Majorana 1 isn't just another "faster chip." It's the first quantum processor powered by a Topological Core, built from a new family of materials called "topoconductors." This chip leverages quirky "Majorana particles" to create qubits — the atomic-scale engines behind quantum computers — which are dramatically more stable and error-resistant than anything seen before.
          </p>
          <div className="wf-meta">
            <a href="https://medium.com/@aditixrawat/tech-gets-tailored-why-microsofts-majorana-chip-is-the-hottest-drop-in-quantum-1206970f0d2f" target="_blank" rel="noreferrer" className="wf-read">Read on Medium →</a>
            <div>
              <a href="https://medium.com/@aditixrawat" target="_blank" rel="noreferrer" className="wf-medium-link"><MDIcon /> medium.com/@aditixrawat ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── VIDEO MODAL ─── */
function VideoModal({ videoId, onClose }) {
  useEffect(() => {
    if (!videoId) return;
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [videoId, onClose]);
  return (
    <AnimatePresence>
      {videoId && (
        <>
          <motion.div
            className="video-modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="video-modal-wrapper" onClick={onClose}>
            <motion.div
              className="video-modal"
              initial={{ opacity: 0, scale: .94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: .94, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="video-modal-close" onClick={onClose}>✕</button>
              <iframe
                src={`https://www.instagram.com/reel/${videoId}/embed/`}
                title="Reel"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── VISUAL EDGE ─── */
function VisualEdge() {
  const ref = useReveal();
  const [active, setActive] = useState(null);
  const cells = [
    { caption: "Editorial Direction", icon: "◇", videoId: "DQ10LwAkusQ" },
    { caption: "Visual Storytelling", icon: "○", videoId: "DSZm9RuE-FS" },
    { caption: "Campaign Modeling", icon: "△", videoId: "DUS_2O_k_X3" },
    { caption: "Aesthetic Systems", icon: "□", videoId: "DJUZ7lUS9an" },
  ];
  return (
    <section id="visual">
      <div className="reveal" ref={ref}>
        <div className="sec-eyebrow">Visual dimension</div>
        <h2 className="sec-title">The other <em>side.</em></h2>
        <p style={{ marginTop: ".7rem", color: "var(--silver)", fontSize: ".78rem", fontFamily: "var(--mono)", maxWidth: 440, opacity: .55 }}>
          Modeling, creative direction & visual storytelling — the instinct that sharpens the engineering.
        </p>
      </div>
      <div className="visual-grid">
        {/* Hero cell */}
        <div className="vcell">
          <div className="vcell-bg">◆</div>
          <div className="vcell-headline">Fashion<br /><span>×</span><br />Data</div>
          <div className="vcell-brands">
            {["8th Sin", "444nomizo", "Ichimise"].map(b => <span key={b} className="vcell-brand">◆ {b}</span>)}
          </div>
        </div>
        {/* Video cells */}
        {cells.map((v, i) => (
          <motion.div
            key={i} className="vcell vcell-video"
            onClick={() => setActive(v.videoId)}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
          >
            <div className="vcell-bg">{v.icon}</div>
            <div className="vcell-hover-glow" />
            <div className="vcell-inner">
              <span className="vcell-icon">{v.icon}</span>
              <div className="vcell-caption">{v.caption}</div>
            </div>
            <div className="vcell-play">▶</div>
          </motion.div>
        ))}
      </div>
      <VideoModal videoId={active} onClose={() => setActive(null)} />
    </section>
  );
}



/* ─── CONTACT ─── */
function Contact() {
  const ref = useReveal();
  return (
    <section id="contact">
      <div className="contact-deco">HIRE</div>
      <div className="reveal" ref={ref}>
        <div className="contact-eyebrow">Available now · Delhi, India</div>
        <h2 className="contact-headline">
          Let's build something<br />people actually use.
        </h2>
        <p className="contact-sub">Open to internships, projects & creative collaborations.</p>
        <div className="contact-btns">
          <motion.a href="mailto:aditirawat.work@email.com" className="btn btn-white" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: .97 }}><ML />Say Hello</motion.a>
          <motion.a href="https://github.com/aditixrawat" target="_blank" rel="noreferrer" className="btn btn-outline-w" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: .97 }}><GH />GitHub</motion.a>
          <motion.a href="/AditiRawatResume.pdf" download className="btn btn-outline-w" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: .97 }}><DL />Resume</motion.a>
        </div>
        <div className="social-strip">
          {[
            { href: "https://linkedin.com/in/aditixrawat", Icon: LI, label: "LinkedIn" },
            { href: "https://instagram.com/whatwouldaditido", Icon: IG, label: "Instagram" },
            { href: "https://medium.com/@aditixrawat", Icon: MDIcon, label: "Medium" },
            { href: "https://aditixrawat.substack.com", Icon: SB, label: "Substack" },
          ].map(({ href, Icon, label }) => (
            <motion.a key={label} href={href} target="_blank" rel="noreferrer" className="soc-btn" title={label} whileHover={{ scale: 1.1 }} whileTap={{ scale: .95 }}>
              <Icon />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── DIAGNOSTICS ─── */
function Diagnostics({ open, selectedCmd, setCmd, onClose, glitch }) {
  const cmd = diagCmds.find(c => c.id === selectedCmd) || diagCmds[0];
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="diag-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .22 }} onClick={onClose} />
          <motion.section
            className={`diagnostics-shell ${glitch ? "glitch" : ""}`}
            initial={{ y: "-40%", x: "-50%", opacity: 0, scale: .95 }}
            animate={{ y: "-50%", x: "-50%", opacity: 1, scale: 1 }}
            exit={{ y: "-40%", x: "-50%", opacity: 0, scale: .95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="diag-topbar">
              <div className="diag-traffic">
                <div className="diag-dot red" onClick={onClose} />
                <div className="diag-dot yellow" />
                <div className="diag-dot green" />
              </div>
              <div className="diag-title">aditi@macbook-pro:~</div>
            </div>
            <div className="diag-container">
              <div className="diag-sidebar">
                <div>
                  <div className="diag-sec-title">System Status</div>
                  <div className="diag-stats">
                    {diagStats.map(s => (
                      <div key={s.label} className="diag-stat"><span>{s.label}</span><strong>{s.value}</strong></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="diag-sec-title">Commands</div>
                  <div className="diag-cmds">
                    {diagCmds.map(item => (
                      <button key={item.id} className={`diag-cmd ${item.id === selectedCmd ? "active" : ""}`} onClick={() => setCmd(item.id)}>{item.label}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="diag-main">
                <div className="diag-prompt">
                  <span className="diag-prompt-g">aditi@macbook-pro</span>
                  <span className="diag-prompt-b"> ~ %</span>
                  <span> {cmd.label}</span>
                </div>
                <div className="diag-out">
                  {cmd.lines.map((line, i) => <div key={i}>{line}</div>)}
                </div>
              </div>
            </div>
          </motion.section>
          <div className={`diag-glitch ${glitch ? "on" : ""}`} />
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [selCmd, setSelCmd] = useState("whoami");
  const [glitch, setGlitch] = useState(false);
  const [lateNight, setLateNight] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  // Logo tap Easter egg
  useEffect(() => {
    if (tapCount >= 5) { setDiagOpen(true); setTapCount(0); }
    const t = setTimeout(() => setTapCount(0), 1000);
    return () => clearTimeout(t);
  }, [tapCount]);

  // Late night mode
  useEffect(() => {
    const check = () => setLateNight(new Date().getHours() >= 23);
    check(); const iv = setInterval(check, 60000); return () => clearInterval(iv);
  }, []);
  useEffect(() => { document.body.classList.toggle("late-night", lateNight); }, [lateNight]);

  // Keyboard shortcut Ctrl+Alt+A
  useEffect(() => {
    const fn = e => {
      if ((e.key.toLowerCase() === "a" || e.code === "KeyA") && e.ctrlKey && e.altKey) {
        e.preventDefault();
        setDiagOpen(p => !p); triggerGlitch();
      }
      if (e.key === "Escape") { setDiagOpen(false); triggerGlitch(); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const triggerGlitch = () => { setGlitch(true); setTimeout(() => setGlitch(false), 200); };
  const closeD = () => { setDiagOpen(false); triggerGlitch(); };

  return (
    <>
      <G />
      <Cursor />
      <Nav onLogoTap={() => setTapCount(p => p + 1)} />
      <main>
        <Hero />

        <Drops />
        <Skills />
        <Writing />
        <VisualEdge />
        <Contact />
      </main>
      <Diagnostics open={diagOpen} selectedCmd={selCmd} setCmd={setSelCmd} onClose={closeD} glitch={glitch} />
      <footer>
        <span className="ft">© 2025 Aditi Rawat · Systems With Taste</span>
        <div className="ft-status"><span className="ft-dot" />Open to opportunities</div>
        <span className="ft">Delhi, India</span>
      </footer>
    </>
  );
}