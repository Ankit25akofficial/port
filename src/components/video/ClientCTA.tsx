import { CLIENT_CTA_DATA } from "../../data/videoPortfolioData";

const ClientCTA = () => {
  const handleScrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full py-24 px-6 bg-gradient-to-b from-[#08080a] to-[#0d0d14]">
      <div className="max-w-5xl mx-auto glass-card p-10 sm:p-16 rounded-3xl border border-red-500/20 text-center flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 blur-[100px] pointer-events-none rounded-full"></div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight font-['Syne'] mb-4">
          {CLIENT_CTA_DATA.heading}
        </h2>
        
        <p className="text-gray-300 text-base sm:text-xl max-w-2xl mb-8 leading-relaxed font-['Outfit']">
          {CLIENT_CTA_DATA.subtext}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 relative z-10">
          <button
            onClick={handleScrollToContact}
            className="glow-btn text-base py-3.5 px-8"
          >
            {CLIENT_CTA_DATA.primaryBtn}
          </button>
          
          <button
            onClick={handleScrollToContact}
            className="outline-btn text-base py-3.5 px-8"
          >
            {CLIENT_CTA_DATA.secondaryBtn}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientCTA;
