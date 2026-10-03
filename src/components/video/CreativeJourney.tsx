import { CREATIVE_JOURNEY_TIMELINE } from "../../data/videoPortfolioData";

const CreativeJourney = () => {
  return (
    <section className="relative w-full py-28 px-6 bg-[#08080a]" id="journey">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
            Evolution & Milestones
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight font-['Syne']">
            MY CREATIVE JOURNEY
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mt-3">
            From discovering basic cuts in 2022 to producing advanced 3D motion, VFX, and viral content today.
          </p>
          <div className="w-16 h-1 bg-red-500 mt-4 rounded-full"></div>
        </div>

        <div className="relative border-l border-white/10 ml-4 sm:ml-32 space-y-12 pl-6 sm:pl-10">
          {CREATIVE_JOURNEY_TIMELINE.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="sm:absolute sm:-left-40 sm:top-0 mb-3 sm:mb-0 text-left sm:text-right">
                <span className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 font-extrabold text-sm sm:text-base font-mono">
                  {item.year}
                </span>
              </div>

              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#08080a] border-2 border-red-500 group-hover:bg-red-500 group-hover:scale-125 transition-all"></div>

              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-red-500/30 transition-all duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 font-['Outfit']">
                  {item.title}
                </h3>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-4 font-mono">
                  {item.subtitle}
                </h4>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CreativeJourney;
