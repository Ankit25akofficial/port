const WHY_OBUME_ITEMS = [
  {
    icon: (
      <svg className="w-6 h-6 text-[#a855f7] mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect width="18" height="14" x="3" y="5" rx="2" strokeWidth="2" />
        <path d="M7 15h4M15 15h2M7 11h2M13 11h4" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Clean Captions",
    description: "Readable, on-brand, perfectly synced -- every frame."
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#a855f7] mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Fast Pacing",
    description: "Cuts that match the beat of the scroll, never the script."
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#a855f7] mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <circle cx="12" cy="12" r="6" strokeWidth="2" />
        <circle cx="12" cy="12" r="2" strokeWidth="2" />
      </svg>
    ),
    title: "Hook-Focused",
    description: "First 3 seconds engineered to stop the thumb."
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#a855f7] mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M22 7L13.5 15.5L8.5 10.5L2 17M16 7h6v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Trend Aware",
    description: "Editing styles tuned to what's working this week."
  }
];

const WhyChooseMe = () => {
  return (
    <section className="py-28 relative bg-[#0a0a12] text-white">
      <div className="container mx-auto px-5 max-w-6xl">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 items-start">
          
          {/* Sticky Left Header - Matches Screenshot 4 */}
          <div className="lg:sticky lg:top-32 space-y-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#a855f7] font-semibold">
              -- WHY ANKIT
            </p>
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              The difference is in the details.
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed">
              Every cut, caption, and transition is intentional -- designed to keep viewers watching from the first frame to the last.
            </p>
          </div>

          {/* Right 2x2 Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {WHY_OBUME_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#10101a] border border-white/10 hover:border-[#a855f7]/40 hover:-translate-y-1 transition-all duration-500"
              >
                {item.icon}
                <h3 className="font-['Space_Grotesk'] font-semibold text-lg text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseMe;
