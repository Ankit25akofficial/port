const BehindTheEdit = () => {
  return (
    <section id="about" className="py-28 relative bg-[#0a0a12] text-white">
      <div className="container mx-auto px-5 max-w-6xl">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#a855f7] font-semibold">
            -- ABOUT
          </p>

          <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            I'm a freelance editor obsessed with{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent italic font-medium">
              making creators grow
            </span>
            .
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto font-['Inter']">
            Ankit Kumar is a one-person studio focused on short-form. I work with creators, coaches, and brands who care about retention not just posting. If you have the content, I'll turn it into the kind of edits people watch twice.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BehindTheEdit;
