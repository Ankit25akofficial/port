const VideoHero = () => {
  const handleScrollTo = (targetId: string) => {
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative pt-36 md:pt-44 pb-24 overflow-hidden bg-[#0a0a12] text-white">
      {/* Obume Grid Pattern & Ambient Purple Blur Circle */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_70%)]"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-[#a855f7]/20 blur-[130px] pointer-events-none"></div>

      <div className="container mx-auto px-5 max-w-6xl relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Available for work
          </div>

          {/* Headline - Matches Screenshot 1 */}
          <h1 className="font-['Space_Grotesk'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-white">
            I turn your content into{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent italic font-medium">
              high-retention
            </span>{" "}
            videos.
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-400 leading-relaxed font-['Inter']">
            Short-form edits engineered for the scroll — punchy hooks, clean captions, relentless pacing. Built to keep eyes on screen and grow your audience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleScrollTo("#work")}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#a855f7] hover:bg-[#9333ea] text-white font-medium shadow-[0_0_30px_rgba(168,85,247,0.45)] hover:scale-[1.03] transition-all"
            >
              View My Work <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>

            <button
              onClick={() => handleScrollTo("#contact")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-colors"
            >
              Hire Me
            </button>
          </div>

          {/* Social Proof Footer */}
          <div className="pt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-gray-500 font-mono">
            <span>Trusted by creators</span>
            <span className="hidden sm:block h-1 w-1 rounded-full bg-gray-600"></span>
            <span>48h turnaround</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VideoHero;
