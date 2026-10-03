import { CREATIVE_TOOLKIT } from "../../data/videoPortfolioData";

const CreativeToolkit = () => {
  return (
    <section className="relative w-full py-28 px-6 bg-[#060608]" id="toolkit">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
            Creative Stack
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight font-['Syne']">
            TOOLS I USE
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mt-3">
            Industry-standard software for video editing, motion design, compositing, 3D renders, and thumbnail design.
          </p>
          <div className="w-16 h-1 bg-red-500 mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CREATIVE_TOOLKIT.map((tool, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl border border-white/10 flex items-start gap-4 hover:border-red-500/40 hover:bg-[#12121a] transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 font-extrabold text-xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all font-mono">
                {tool.icon}
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors font-['Outfit']">
                      {tool.name}
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-red-400 block mb-2">
                    {tool.category}
                  </span>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">
                    {tool.description}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded w-fit">
                  {tool.experience}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CreativeToolkit;
