import { useState, useRef } from "react";
import { SHORT_FORM_PROJECTS, ShortFormProject } from "../../data/videoPortfolioData";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { IoClose, IoExpand } from "react-icons/io5";
import { BsStars } from "react-icons/bs";

const SelectedWork = () => {
  const [modalProject, setModalProject] = useState<ShortFormProject | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>({
    "porsche-911-edit": true,
    "chatgpt-motion-graphics": true,
    "tu11-motion-graphics": true,
  });

  const toggleMute = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const vid = videoRefs.current[id];
    const newMuted = !mutedStates[id];
    if (vid) {
      vid.muted = newMuted;
    }
    setMutedStates((prev) => ({ ...prev, [id]: newMuted }));
  };

  const handleCardClick = (project: ShortFormProject) => {
    const vid = videoRefs.current[project.id];
    if (vid) {
      if (vid.muted) {
        vid.muted = false;
        setMutedStates((prev) => ({ ...prev, [project.id]: false }));
      }
    }
  };

  const openTheaterModal = (e: React.MouseEvent, project: ShortFormProject) => {
    e.stopPropagation();
    setModalProject(project);
  };

  const closeTheaterModal = () => {
    setModalProject(null);
  };

  const renderCard = (project: ShortFormProject, customClass = "") => {
    const isMuted = mutedStates[project.id] ?? true;

    return (
      <div
        key={project.id}
        onClick={() => handleCardClick(project)}
        style={{ aspectRatio: "9/16" }}
        className={`relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-black cursor-pointer select-none transition-all duration-300 group/card border border-white/15 hover:border-violet-500/80 hover:shadow-[0_20px_60px_rgba(168,85,247,0.35)] hover:-translate-y-1.5 ${customClass}`}
      >
        {/* Continuous Autoplay Video */}
        <video
          ref={(el) => (videoRefs.current[project.id] = el)}
          src={project.videoUrl}
          poster={project.thumbnail}
          autoPlay
          playsInline
          loop
          muted={isMuted}
          preload="auto"
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          className="w-full h-full object-cover select-none pointer-events-auto filter brightness-95 group-hover/card:brightness-105 transition-all"
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none transition-opacity duration-300" />

        {/* Top Floating Controls Bar */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-30 pointer-events-auto">
          {/* Sound Toggle Button */}
          <button
            onClick={(e) => toggleMute(e, project.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 hover:bg-violet-600 border border-white/20 text-white text-xs shadow-2xl backdrop-blur-xl transition-all active:scale-90"
            aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? (
              <>
                <HiVolumeOff className="text-gray-300 text-sm" />
                <span className="text-[10px] text-gray-300 font-mono hidden sm:inline">Muted</span>
              </>
            ) : (
              <>
                <HiVolumeUp className="text-violet-300 text-sm animate-pulse" />
                <span className="text-[10px] text-violet-200 font-bold font-mono">Sound ON</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1.5">
            {/* Expand / Theater Mode */}
            <button
              onClick={(e) => openTheaterModal(e, project)}
              className="h-8 w-8 rounded-full bg-black/80 hover:bg-violet-600 border border-white/20 text-white grid place-items-center text-xs shadow-2xl backdrop-blur-xl transition-transform active:scale-90"
              aria-label="Full Theater Mode"
              title="Full Theater Mode"
            >
              <IoExpand className="text-sm" />
            </button>
          </div>
        </div>

        {/* Bottom Project Info Bar */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-20 pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-violet-600/80 text-[9px] font-bold uppercase tracking-wider text-white border border-white/10 shadow-sm">
              {project.category}
            </span>
            {project.views && (
              <span className="text-[10px] text-gray-400 font-mono">
                {project.views}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-violet-300 font-semibold block">
            {project.client}
          </span>
          <h4 className="font-bold text-white font-['Space_Grotesk'] text-sm sm:text-base leading-tight group-hover/card:text-violet-200 transition-colors mt-0.5">
            {project.title}
          </h4>
        </div>
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
