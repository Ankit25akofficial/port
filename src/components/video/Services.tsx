const SERVICES_LIST = [
  {
    id: "short-form",
    title: "Short-Form Editing",
    description: "Reels, TikToks, and Shorts crafted to maximise watch time and reshares.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect width="18" height="18" x="3" y="3" rx="2" strokeWidth="2" />
        <path d="M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18M17 7.5h4M17 16.5h4" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    features: ["Hook in 1.5s", "Retention pacing", "Native captions"]
  },
  {
    id: "talking-head",
    title: "Talking Head Edits",
    description: "Podcast clips and coach content tightened with cuts, b-roll, and emphasis.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    features: ["Jump cuts", "Dynamic captions", "B-roll layering"]
  },
  {
    id: "premium-sound",
    title: "Premium Sound Effects",
    description: "Advanced audio mixing, sound effects styling, and color correction that give your short-form videos a cinematic feel.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M3 14h3a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a9 9 0 0118 0v7a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    features: ["Sound design & SFX", "Cinematic grading", "Audio enhancement"]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-28 relative bg-[#0a0a12] text-white">
      <div className="container mx-auto px-5 max-w-6xl">
        
        {/* Header - Matches Screenshot 3 */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-[#a855f7] font-semibold">
            -- SERVICES
          </p>
          <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Built for retention. Engineered for growth.
          </h2>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="group relative p-7 rounded-2xl bg-[#10101a] border border-white/10 hover:border-[#a855f7]/40 transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              {/* Corner Glow */}
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#a855f7]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 grid place-items-center group-hover:bg-[#a855f7] group-hover:border-transparent transition-all text-white">
                    {service.icon}
                  </div>
                  
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-[#a855f7] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h10v10M7 17L17 7" />
                  </svg>
                </div>

                <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-white mb-2">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <ul className="space-y-2 pt-5 border-t border-white/10 relative z-10">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="h-1 w-1 rounded-full bg-[#a855f7]"></span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
