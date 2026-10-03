import { useState, useRef } from "react";
import { BEFORE_AFTER_SAMPLES } from "../../data/videoPortfolioData";

const BeforeAfter = () => {
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const sample = BEFORE_AFTER_SAMPLES[activeSampleIndex];

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      setSliderPosition(percentage);
    }
  };

  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="relative w-full py-28 px-6 bg-[#060608]" id="before-after">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">
            Visual Transformation
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight font-['Space_Grotesk']">
            BEFORE & AFTER
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mt-3">
            Drag the slider below to see raw unedited footage transformed into final color-graded & composited edits.
          </p>
          <div className="w-16 h-1 bg-violet-500 mt-4 rounded-full"></div>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {BEFORE_AFTER_SAMPLES.map((item: { id: string; title: string }, idx: number) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSampleIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                activeSampleIndex === idx
                  ? "bg-violet-600 text-white border border-violet-500 shadow-md shadow-violet-500/20"
                  : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-video rounded-2xl overflow-hidden glass-card border border-white/15 cursor-ew-resize select-none shadow-2xl"
        >
          <div className="absolute inset-0">
            <img
              src={sample.editedImage}
              alt="Final Edit"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-violet-600/90 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border border-white/20 shadow-lg backdrop-blur-md">
              {sample.editedLabel}
            </div>
          </div>

          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={sample.rawImage}
              alt="Raw Footage"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover filter contrast-75 brightness-90 grayscale-[40%]"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%",
                maxWidth: "none"
              }}
            />
            <div className="absolute top-4 left-4 bg-black/80 text-gray-300 text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border border-white/10 shadow-lg backdrop-blur-md">
              {sample.rawLabel}
            </div>
          </div>

          <div
            className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-violet-600 border-2 border-white text-white flex items-center justify-center shadow-2xl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400 max-w-2xl mx-auto">
          {sample.description}
        </div>

      </div>
    </section>
  );
};

export default BeforeAfter;
