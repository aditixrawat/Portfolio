import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeliumCard() {
  const [status, setStatus] = useState("initial"); // "initial" | "loading" | "loaded"
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (status !== "loading") return;

    const sequence = [
      { delay: 0, text: "> initializing_latent_space..." },
      { delay: 500, text: "> compiling_streetwear_dataset..." },
      { delay: 1100, text: "> synthesizing_creative_strategy..." },
      { delay: 1800, text: "DONE" }
    ];

    const timers = [];

    sequence.forEach((step) => {
      const timer = setTimeout(() => {
        if (step.text === "DONE") {
          setStatus("loaded");
        } else {
          setLogs((prev) => [...prev, step.text]);
        }
      }, step.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [status]);

  const handleTrigger = () => {
    if (status === "initial") {
      setStatus("loading");
      setLogs([]);
    }
  };

  return (
    <div 
      onClick={handleTrigger}
      className="relative overflow-hidden w-full max-w-[420px] rounded-2xl border border-purple-900/30 bg-gradient-to-br from-[#0c0812] to-[#130c1e] p-6 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-purple-500/35 group cursor-pointer"
    >
      {/* Ambient background glow on card hover */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Background grain texture for premium editorial touch */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[repeating-linear-gradient(-45deg,transparent,transparent_4px,#fff_4px,#fff_8px)]" />

      {/* Header section */}
      <div className="relative z-10 flex items-start justify-between w-full mb-6">
        <div className="flex flex-col">
          <span className="text-[0.55rem] tracking-[0.28em] text-purple-400/80 font-mono uppercase mb-1">
            // EXPERIMENTAL LAYER
          </span>
          <h3 className="font-serif text-3xl font-semibold text-stone-100 tracking-tight">
            Helium
          </h3>
        </div>
        <span className="text-[0.6rem] tracking-[0.14em] font-mono text-purple-300 bg-purple-950/35 border border-purple-500/20 px-3 py-1 rounded-full uppercase backdrop-blur-md">
          Creative AI Intern
        </span>
      </div>

      {/* Interactive Terminal Window */}
      <div className="relative z-10 w-full rounded-xl bg-black border border-zinc-900/90 p-4 font-mono text-[0.72rem] leading-relaxed text-zinc-400 overflow-hidden min-h-[160px] flex flex-col justify-between transition-all duration-300 group-hover:border-zinc-800">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-zinc-900/60">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          </div>
          <span className="text-[0.55rem] text-zinc-600 tracking-widest uppercase font-mono">helium_core</span>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 flex flex-col justify-start">
          {status === "initial" && (
            <div className="flex flex-col gap-1 py-1">
              <div className="text-zinc-600">aditi@helium:~ $ ./creative_model.sh</div>
              <div className="text-purple-400/90 font-medium animate-pulse mt-2 flex items-center gap-1">
                <span>[ Tap to run creative_model.sh ]</span>
                <span className="w-1.5 h-3 bg-purple-400/90 animate-blink" />
              </div>
            </div>
          )}

          {status === "loading" && (
            <div className="flex flex-col gap-2.5 py-1 text-zinc-400">
              <div className="text-zinc-600">aditi@helium:~ $ ./creative_model.sh</div>
              <div className="flex flex-col gap-1.5">
                {logs.map((log, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -3 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-purple-300/80"
                  >
                    {log}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence>
            {status === "loaded" && (
              <motion.div 
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col gap-3 py-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[0.62rem] tracking-wider font-bold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-2 py-0.5 rounded">
                    ✓ PIPELINE ONLINE
                  </span>
                </div>
                <p className="text-[0.76rem] leading-relaxed text-zinc-300">
                  Bridging luxury streetwear aesthetic systems with custom latent diffusion models.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Terminal Footer Info */}
        <div className="flex justify-between items-center text-[0.58rem] text-zinc-700 mt-3 pt-2 border-t border-zinc-900/60 font-mono">
          <span>LOC: REMOTE</span>
          <span>EST. PIPELINE v1.0.4</span>
        </div>
      </div>
    </div>
  );
}
