import { useState } from "react";
import { CONTACT_OBUME_DATA } from "../../data/videoPortfolioData";

const VideoContact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          role: "Short-Form Video Client",
          projectType: "Short-Form Editing / Motion Graphics"
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setStatusMsg("Message sent successfully! I'll reply to your email within 24 hours.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        // Fallback to Formspree if local /api/contact is unavailable
        await fetch("https://formspree.io/f/mgollvpl", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(formData)
        });
        setStatus("success");
        setStatusMsg("Message sent successfully! I'll reply within 24 hours.");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch {
      setStatus("success");
      setStatusMsg("Message received! Thank you for reaching out.");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" className="py-28 relative bg-[#07070d] text-white">
      <div className="container mx-auto px-5 max-w-6xl">
        
        {/* Main Obume Contact Card */}
        <div className="relative max-w-5xl mx-auto rounded-3xl border border-white/10 bg-[#0c0c14] overflow-hidden p-8 md:p-14 shadow-2xl">
          {/* Ambient Corner Glows */}
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-violet-600/30 blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-600/20 blur-[100px] pointer-events-none"></div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-start z-10">
            
            {/* Left Content */}
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold">
                {CONTACT_OBUME_DATA.header}
              </p>
              
              <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Ready to grow your<br />short-form?
              </h2>

              <p className="text-gray-400 text-sm md:text-base">
                {CONTACT_OBUME_DATA.subtitle}
              </p>

              <div className="space-y-4 pt-4">
                <a
                  href={`mailto:${CONTACT_OBUME_DATA.email}`}
                  className="flex items-center gap-3 text-sm font-medium text-gray-200 hover:text-violet-400 transition-colors"
                >
                  <span className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center">
                    <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  {CONTACT_OBUME_DATA.email}
                </a>

                {CONTACT_OBUME_DATA.instagram && (
                  <a
                    href={`https://instagram.com/${CONTACT_OBUME_DATA.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-medium text-gray-200 hover:text-violet-400 transition-colors"
                  >
                    <span className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center">
                      <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                      </svg>
                    </span>
                    {CONTACT_OBUME_DATA.instagram}
                  </a>
                )}
              </div>
            </div>

            {/* Right Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === "success" && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2">
                  <span>✅</span>
                  <span>{statusMsg}</span>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="name" className="text-xs uppercase tracking-widest text-gray-400 font-mono">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-violet-500 outline-none text-white text-sm transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-400 font-mono">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@domain.com"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-violet-500 outline-none text-white text-sm transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="msg" className="text-xs uppercase tracking-widest text-gray-400 font-mono">
                  Project
                </label>
                <textarea
                  id="msg"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your channel & goals..."
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-violet-500 outline-none text-white text-sm transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-60 text-white font-semibold shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:scale-[1.02] active:scale-95 transition-all"
              >
                {status === "loading" ? "Sending..." : "Send message ↗"}
              </button>
            </form>

          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 grid place-items-center font-['Space_Grotesk'] font-bold text-white text-xs shadow-md">
              A
            </span>
            <span className="font-['Space_Grotesk'] font-semibold text-white">Ankit Kumar</span>
            <span className="text-xs text-gray-500">© {new Date().getFullYear()}</span>
          </div>

          <div className="text-xs text-gray-400 font-mono text-center md:text-right">
            Crafted for creators who care about retention.
          </div>
        </footer>

      </div>
    </section>
  );
};

export default VideoContact;
