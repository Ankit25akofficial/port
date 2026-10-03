import FastMarquee from "react-fast-marquee";

const MARQUEE_LIST = [
  "Podcasts", "Coaches", "Lifestyle", "Brands", "Fitness", "Tech", "Creators",
  "Podcasts", "Coaches", "Lifestyle", "Brands", "Fitness", "Tech", "Creators"
];

const Marquee = () => {
  return (
    <section aria-hidden="true" className="py-8 border-y border-white/10 bg-[#07070c] overflow-hidden">
      <FastMarquee direction="right" speed={45} gradient={false}>
        {MARQUEE_LIST.map((item, idx) => (
          <span
            key={idx}
            className="font-['Space_Grotesk'] text-2xl md:text-4xl font-bold tracking-tight text-gray-500/50 hover:text-white transition-colors inline-flex items-center gap-6 mx-6"
          >
            {item}
            <span className="text-violet-500 text-lg drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
              ♦
            </span>
          </span>
        ))}
      </FastMarquee>
    </section>
  );
};

export default Marquee;
