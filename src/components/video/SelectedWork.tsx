import { useState, useRef } from "react";
import { SHORT_FORM_PROJECTS, ShortFormProject } from "../../data/videoPortfolioData";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { IoClose, IoPlay, IoExpand } from "react-icons/io5";
import { BsPlayFill, BsStars } from "react-icons/bs";

const SelectedWork = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [modalProject, setModalProject] = useState<ShortFormProject | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handleCardClick = (project: ShortFormProject) => {
    if (activeVideoId === project.id) {
      const vid = videoRefs.current[project.id];
      if (vid) {
        if (vid.paused) {
          vid.play().catch(() => {});
          setIsPaused(false);
        } else {
          vid.pause();
          setIsPaused(true);
        }
      }
    } else {
      // Pause previous active video
      if (activeVideoId && videoRefs.current[activeVideoId]) {
        videoRefs.current[activeVideoId]?.pause();
      }
      setActiveVideoId(project.id);
      setIsPaused(false);

      // Immediately play selected video
      setTimeout(() => {
        const newVid = videoRefs.current[project.id];
        if (newVid) {
          newVid.currentTime = 0;
          newVid.play().catch(() => {
            newVid.muted = true;
            setIsMuted(true);
            newVid.play().catch(() => {});
          });
        }
      }, 50);
    }
  };

  const handleStopVideo = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (videoRefs.current[id]) {
      videoRefs.current[id]?.pause();
    }
    setActiveVideoId(null);
    setIsPaused(false);
  };

  const toggleMute = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (videoRefs.current[id]) {
      const nextMuted = !videoRefs.current[id]!.muted;
      videoRefs.current[id]!.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const openTheaterModal = (e: React.MouseEvent, project: ShortFormProject) => {
    e.stopPropagation();
    if (activeVideoId && videoRefs.current[activeVideoId]) {
      videoRefs.current[activeVideoId]?.pause();
    }
    setModalProject(project);
  };

  const closeTheaterModal = () => {
    setModalProject(null);
  };

  const renderCard = (project: ShortFormProject, customClass = "", isTall = false) => {
    const isPlaying = activeVideoId === project.id;
    const isHovered = hoveredCardId === project.id;

    return (
      <div
        key={project.id}
        onClick={() => handleCardClick(project)}
        onMouseEnter={() => setHoveredCardId(project.id)}
        style={{ aspectRatio: "9/16" }}
        className={`relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-[#0d0d15] cursor-pointer select-none transition-all duration-300 group/card ${customClass} ${
          isPlaying
            ? "ring-4 ring-violet-500 shadow-[0_0_50px_rgba(168,85,247,0.6)] scale-[1.01] z-20"
            : "border border-white/15 hover:border-violet-500/60 hover:shadow-[0_20px_50px_rgba(168,85,247,0.25)] hover:-translate-y-1.5"
        }`}
      >
        {isPlaying ? (
          /* PURE CLEAN FULL-BLEED VIDEO PLAYBACK */
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            <video
              ref={(el) => (videoRefs.current[project.id] = el)}
              src={project.videoUrl}
              autoPlay
              playsInline
              loop
              muted={isMuted}
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="w-full h-full object-cover select-none pointer-events-auto"
            />

            {/* Floating Top Controls (Visible on Hover / Tap) */}
            <div 
              className={`absolute top-3.5 inset-x-3.5 flex items-center justify-between z-30 transition-opacity duration-200 ${
                isHovered || isPaused ? "opacity-100" : "opacity-0 sm:opacity-80"
              }`}
            >
              <button
                onClick={(e) => toggleMute(e, project.id)}
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-black/80 hover:bg-violet-600 border border-white/20 text-white grid place-items-center text-xs shadow-2xl backdrop-blur-xl transition-transform active:scale-90"
                aria-label={isMuted ? "Unmute" : "Mute"}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <HiVolumeOff className="text-gray-300" /> : <HiVolumeUp className="text-violet-300" />}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={(e) => openTheaterModal(e, project)}
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-black/80 hover:bg-violet-600 border border-white/20 text-white grid place-items-center text-xs shadow-2xl backdrop-blur-xl transition-transform active:scale-90"
                  aria-label="Theater Mode"
                  title="Full Theater Mode"
                >
                  <IoExpand className="text-sm" />
                </button>
                <button
                  onClick={(e) => handleStopVideo(e, project.id)}
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-black/80 hover:bg-red-600 border border-white/20 text-white grid place-items-center text-xs shadow-2xl backdrop-blur-xl transition-transform active:scale-90"
                  aria-label="Close"
                  title="Close video"
                >
                  <IoClose className="text-base sm:text-lg" />
                </button>
              </div>
            </div>

            {/* Center Pause Indicator */}
            {isPaused && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center pointer-events-none z-20">
                <div className="w-14 h-14 rounded-full bg-violet-600/90 text-white grid place-items-center border border-white/20 shadow-2xl">
                  <IoPlay className="text-2xl ml-0.5" />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* CLEAN MINIMALIST THUMBNAIL */
          <div className="relative w-full h-full">
            <img
              src={project.thumbnail}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105 filter brightness-95"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 group-hover/card:from-black/90 transition-colors" />

            {/* Category Tag Top Left */}
            <div className="absolute top-3.5 left-3.5 z-10">
              <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-bold uppercase tracking-wider text-violet-300 border border-white/15 shadow-md">
                {project.category}
              </span>
            </div>

            {/* Center Glowing Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`rounded-full bg-violet-600/90 text-white flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.85)] border border-white/25 transform group-hover/card:scale-115 transition-transform duration-300 ${
                isTall ? "w-14 h-14" : "w-12 h-12"
              }`}>
                <BsPlayFill className={`${isTall ? "text-3xl" : "text-2xl"} ml-0.5`} />
              </div>
            </div>

            {/* Clean Bottom Title Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-violet-400 font-semibold block mb-0.5">
                {project.client}
              </span>
              <h4 className={`font-bold text-white font-['Space_Grotesk'] leading-tight group-hover/card:text-violet-300 transition-colors ${
                isTall ? "text-base sm:text-lg" : "text-sm sm:text-base"
              }`}>
                {project.title}
              </h4>
            </div>
          </div>
        )}
      </div>
    );
  };

  const p0 = SHORT_FORM_PROJECTS[0]; // Left: Porsche 911 Velocity Edit
  const p1 = SHORT_FORM_PROJECTS[1]; // Right Top: ChatGPT AI Motion Graphics
  const p2 = SHORT_FORM_PROJECTS[2]; // Right Bottom: TU11 Kinetic VFX Edit

  return (
    <section id="work" className="py-24 md:py-36 relative bg-[#06060a] overflow-hidden">
      {/* Ambient background studio aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-violet-600/15 via-purple-600/20 to-indigo-600/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-violet-300 bg-violet-500/10 border border-violet-500/20 backdrop-blur-md mb-3">
              <BsStars className="text-violet-400" />
              Selected Portfolio
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Short-Form{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent italic">
                Edits.
              </span>
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-mono backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Click any video to play</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            3-COLUMN SIDE-BY-SIDE 9:16 VERTICAL REEL LAYOUT
            Left: Porsche 911 Edit | Mid: ChatGPT AI Edit | Right: TU11 VFX Edit
            ══════════════════════════════════════════════════════════════ */}
        <div className="selected-work-grid">
          
          {/* 1. LEFT CARD (Porsche 911 Velocity Edit) */}
          {p0 && (
            <div className="w-full flex justify-center">
              <div className="w-full">
                {renderCard(p0, "shadow-2xl")}
              </div>
            </div>
          )}

          {/* 2. MIDDLE / CENTER CARD (ChatGPT AI Motion Graphics) */}
          {p1 && (
            <div className="w-full flex justify-center">
              <div className="w-full">
                {renderCard(p1, "shadow-2xl")}
              </div>
            </div>
          )}

          {/* 3. RIGHT CARD (TU11 Kinetic VFX Edit) */}
          {p2 && (
            <div className="w-full flex justify-center">
              <div className="w-full">
                {renderCard(p2, "shadow-2xl")}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Full 4K Theater Pop-Up Modal */}
      {modalProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 select-none"
          onClick={closeTheaterModal}
        >
          <div 
            className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] max-h-[85vh] rounded-3xl overflow-hidden bg-black border border-white/20 shadow-2xl flex flex-col justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeTheaterModal}
              className="absolute top-4 right-4 z-40 h-10 w-10 rounded-full bg-black/80 hover:bg-red-600 text-white border border-white/20 grid place-items-center shadow-2xl backdrop-blur-md transition-all active:scale-90"
              aria-label="Close modal"
            >
              <IoClose className="text-xl" />
            </button>

            <video
              src={modalProject.videoUrl}
              poster={modalProject.thumbnail}
              controls
              autoPlay
              playsInline
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="w-full h-full object-cover select-none"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectedWork;
