import { useState, useRef, useEffect } from "react";
import { SHOWREEL_VIDEO_URL, SHOWREEL_POSTER } from "../../data/videoPortfolioData";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsStars, BsLightningChargeFill } from "react-icons/bs";
import { FaFire } from "react-icons/fa";
import { RiMovieFill } from "react-icons/ri";

const Showreel = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.play().catch((err) => {
              console.log("Autoplay notice:", err);
            });
          } else {
            videoEl.pause();
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <section 
      className="relative w-full py-28 md:py-36 px-4 sm:px-6 bg-[#06060a] overflow-hidden" 
      id="showreel"
    >
      {/* Ambient background studio glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-tr from-purple-600/15 via-violet-600/20 to-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-300 bg-violet-500/10 border border-violet-500/25 backdrop-blur-xl mb-4 shadow-[0_0_25px_rgba(168,85,247,0.2)]">
            <BsStars className="text-violet-400 animate-spin" style={{ animationDuration: "8s" }} />
            <span>Short-Form Showreel</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight font-['Space_Grotesk'] leading-[1.05]">
            HIGH-RETENTION{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent italic">
              EDIT REEL
            </span>
          </h2>
          
          <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-xl font-['Inter'] leading-relaxed">
            Scroll-stopping hooks, kinetic typography, and fast-paced visual storytelling.
          </p>
        </div>

        {/* 3-Column Studio Showcase: Left Metric Cards + Center iPhone Reel + Right Quality Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Key Editing Metrics */}
          <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-4 order-2 lg:order-1">
            <div className="flex-1 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-violet-500/40 transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-3">
                <FaFire className="text-lg" />
              </div>
              <div className="text-2xl font-black font-['Space_Grotesk'] text-white">45-65%</div>
              <div className="text-xs text-violet-300 font-medium mt-0.5">Average Retention Boost</div>
              <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                Pacing calibrated to hold attention past the crucial 3-second dropoff mark.
              </p>
            </div>

            <div className="flex-1 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-violet-500/40 transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
                <BsLightningChargeFill className="text-lg" />
              </div>
              <div className="text-2xl font-black font-['Space_Grotesk'] text-white">24-48h</div>
              <div className="text-xs text-purple-300 font-medium mt-0.5">Fast Turnaround Time</div>
              <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                Consistent delivery schedule so your publishing never misses a beat.
              </p>
            </div>
          </div>

          {/* Center Column: Ultra-Realistic Titanium iPhone Pro Mockup */}
          <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
            <div className="relative w-[300px] sm:w-[330px] md:w-[350px] aspect-[9/18.8] rounded-[52px] p-[11px] bg-gradient-to-b from-[#3a3a46] via-[#1a1a24] to-[#12121c] border-[3px] border-[#4b4b5e]/60 shadow-[0_25px_90px_rgba(168,85,247,0.35),0_0_0_1px_rgba(255,255,255,0.15)] group">
              
              {/* Outer Titanium Side Highlight Accent */}
              <div className="absolute inset-0 rounded-[50px] border border-white/10 pointer-events-none" />

              {/* iPhone Inner Screen Bezel */}
              <div className="relative w-full h-full rounded-[42px] overflow-hidden bg-black shadow-inner flex flex-col justify-between">
                
                {/* Dynamic Island Pill */}
                <div className="absolute top-3 inset-x-0 flex justify-center z-30 pointer-events-none">
                  <div className="w-24 h-6 rounded-full bg-black border border-white/10 flex items-center justify-between px-2.5 shadow-md">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/20 flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-blue-900/80" />
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[8px] font-mono font-semibold text-emerald-400 uppercase tracking-widest">LIVE</span>
                    </span>
                  </div>
                </div>

                {/* Video Player */}
                <video
                  ref={videoRef}
                  src={SHOWREEL_VIDEO_URL}
                  poster={SHOWREEL_POSTER}
                  muted={isMuted}
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  controlsList="nodownload noplaybackrate"
                  disablePictureInPicture
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />

                {/* Screen Glare Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />

                {/* Floating Bottom Sound Toggle Pill */}
                <div className="absolute bottom-5 inset-x-0 flex justify-center z-30 pointer-events-auto">
                  <button
                    onClick={toggleMute}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 hover:bg-violet-600 text-white text-xs font-semibold backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                    aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                  >
                    {isMuted ? (
                      <>
                        <HiVolumeOff className="text-base text-gray-300" />
                        <span className="text-gray-200">Tap for Sound 🔊</span>
                      </>
                    ) : (
                      <>
                        <HiVolumeUp className="text-base text-violet-300 animate-bounce" />
                        <span className="text-violet-100 font-bold">Sound ON 🎵</span>
                      </>
                    )}
                  </button>
                </div>

                {/* iOS Bottom Home Bar Indicator */}
                <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-20 pointer-events-none">
                  <div className="w-28 h-1 rounded-full bg-white/40" />
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Creative Capabilities */}
          <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-4 order-3">
            <div className="flex-1 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-violet-500/40 transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3">
                <RiMovieFill className="text-lg" />
              </div>
              <div className="text-2xl font-black font-['Space_Grotesk'] text-white">4K 60FPS</div>
              <div className="text-xs text-indigo-300 font-medium mt-0.5">Ultra Crisp Exports</div>
              <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                Color-graded, de-noised, and sharpened for maximum fidelity on Instagram & TikTok.
              </p>
            </div>

            <div className="flex-1 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-violet-500/40 transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-3">
                <BsStars className="text-lg" />
              </div>
              <div className="text-2xl font-black font-['Space_Grotesk'] text-white">SFX & Risers</div>
              <div className="text-xs text-pink-300 font-medium mt-0.5">Custom Sound Design</div>
              <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                Impacts, whooshes, and subtle bass drops synced to visual cuts for high dopamine.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Showreel;
