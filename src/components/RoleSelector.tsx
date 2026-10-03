import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

const RoleSelector = () => {
  const { setRole } = useRole();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[9999] bg-[#070709] text-white flex flex-col items-center justify-center p-6 overflow-y-auto">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[140px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[140px] pointer-events-none rounded-full"></div>

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mb-12 animate-fadeIn">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500 mb-3 block">
          Welcome to my Creative Space
        </span>
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight uppercase mb-4 font-['Syne']">
          ANKIT KUMAR
        </h1>
        <p className="text-gray-400 text-base sm:text-xl font-['Outfit']">
          Select a portfolio experience to explore my work
        </p>
      </div>

      {/* Role Dual Selection Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        
        {/* VIDEO EDITOR CARD */}
        <div
          onClick={() => {
            setRole("video-editor");
            navigate("/video-service");
          }}
          className="glass-card group cursor-pointer p-8 sm:p-10 rounded-3xl border border-red-500/30 bg-[#0d0d14]/80 hover:bg-[#131320] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between hover:shadow-[0_0_50px_rgba(255,51,102,0.25)] relative overflow-hidden"
        >
          {/* Badge */}
          <div className="absolute top-0 right-0 px-4 py-1.5 bg-red-600 text-[10px] font-extrabold uppercase tracking-widest text-white rounded-bl-xl font-mono">
            CREATIVE
          </div>

          <div>
            <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/30 text-red-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className="text-3xl font-extrabold text-white mb-2 group-hover:text-red-400 transition-colors font-['Syne']">
              VIDEO EDITOR & CREATIVE
            </h2>

            <span className="text-xs font-semibold uppercase tracking-wider text-red-400 block mb-4 font-mono">
              3+ Years Experience • VFX • Motion Design • 3D
            </span>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
              Cinematic video post-production, retention-focused YouTube edits, motion graphics, 3D renders, and color grading for creators & brands.
            </p>
          </div>

          <button className="glow-btn w-full justify-center py-4 text-sm font-bold uppercase tracking-wider">
            Explore Video Portfolio 🎬
          </button>
        </div>

        {/* SOFTWARE DEVELOPER CARD */}
        <div
          onClick={() => {
            setRole("developer");
            navigate("/portfolio");
          }}
          className="glass-card group cursor-pointer p-8 sm:p-10 rounded-3xl border border-purple-500/30 bg-[#0d0d14]/80 hover:bg-[#131320] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] relative overflow-hidden"
        >
          {/* Badge */}
          <div className="absolute top-0 right-0 px-4 py-1.5 bg-purple-600 text-[10px] font-extrabold uppercase tracking-widest text-white rounded-bl-xl font-mono">
            ENGINEERING
          </div>

          <div>
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>

            <h2 className="text-3xl font-extrabold text-white mb-2 group-hover:text-purple-400 transition-colors font-['Syne']">
              SOFTWARE DEVELOPER
            </h2>

            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 block mb-4 font-mono">
              Full-Stack • WebGL • React • Systems & Algorithms
            </span>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
              Web applications, interactive 3D web experiences, full-stack architecture, algorithms, and software development projects.
            </p>
          </div>

          <button className="w-full py-4 text-sm font-bold uppercase tracking-wider rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-lg shadow-purple-600/30">
            Explore Developer Portfolio 💻
          </button>
        </div>

      </div>

      <div className="relative z-10 mt-12 text-xs text-gray-500">
        You can switch between portfolios at any time using the navigation toggle.
      </div>
    </div>
  );
};

export default RoleSelector;
