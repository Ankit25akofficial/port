import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lenis from "lenis";
import "./styles/Navbar.css";
import { useRole } from "../context/RoleContext";
import { HiMenu, HiX } from "react-icons/hi";

export let lenis: Lenis | null = null;

const devNavLinks = [
  { text: "About", href: "#about" },
  { text: "Skills", href: "#services" },
  { text: "Career", href: "#career" },
  { text: "Work", href: "#work" },
  { text: "Contact", href: "#contact" },
];

const videoNavLinks = [
  { text: "Home", href: "#hero" },
  { text: "Videos", href: "#work" },
  { text: "Services", href: "#services" },
  { text: "About", href: "#about" },
  { text: "Contact", href: "#contact" },
];

const Navbar = () => {
  const { role, setRole } = useRole();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isVideo = role === "video-editor";
  const navLinks = isVideo ? videoNavLinks : devNavLinks;

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href) as HTMLElement;
    if (target) {
      if (lenis) {
        lenis.scrollTo(target, { offset: -50, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (window.innerWidth > 768) {
      lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.5,
        touchMultiplier: 2,
        infinite: false,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500 py-3 sm:py-4">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <nav className="flex items-center justify-between rounded-full px-4 sm:px-6 py-2.5 bg-[#0a0a12]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="flex items-center group shrink-0"
            title="Ankit Kumar"
          >
            <div className="relative inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-purple-600 via-violet-500 to-indigo-400 p-0.5 shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/images/slogo.png"
                alt="Logo"
                className="w-full h-full object-contain rounded-full bg-black p-0.5"
              />
            </div>
          </a>

          {/* Navigation Links & Action Buttons (Always Visible) */}
          <ul className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-medium text-gray-300">
            {navLinks.map(({ text, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(href);
                  }}
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  {text}
                </a>
              </li>
            ))}

            {/* Role Switcher Animated Button (Always Visible) */}
            <li>
              <button
                onClick={() => {
                  if (isVideo) {
                    setRole("developer");
                    navigate("/portfolio");
                  } else {
                    setRole("video-editor");
                    navigate("/video-service");
                  }
                }}
                className="custom-circle-btn"
                title={isVideo ? "Switch to Software Developer Portfolio" : "Switch to Video Editor Portfolio"}
              >
                <span className="circle1" />
                <span className="circle2" />
                <span className="circle3" />
                <span className="circle4" />
                <span className="circle5" />
                <span className="text">
                  {isVideo ? "Dev View ⇄" : "🎬 Video Editor ⇄"}
                </span>
              </button>
            </li>
          </ul>

          {/* Right Action: Hire Me CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white text-black hover:bg-gray-200 transition-all hover:scale-[1.03] active:scale-95 shadow-lg whitespace-nowrap"
            >
              Hire Me <span aria-hidden="true">→</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden p-1.5 sm:p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 text-lg sm:text-xl transition-colors"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl bg-[#0a0a12]/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-3 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs text-gray-400 font-mono uppercase font-bold">
                Active: <span className="text-violet-400">{isVideo ? "Video Editor" : "Software Dev"}</span>
              </span>
              <button
                onClick={() => {
                  if (isVideo) {
                    setRole("developer");
                    navigate("/portfolio");
                  } else {
                    setRole("video-editor");
                    navigate("/video-service");
                  }
                  setMenuOpen(false);
                }}
                className="text-xs font-bold px-3 py-1 rounded-full bg-violet-600 hover:bg-violet-500 text-white transition-colors"
              >
                {isVideo ? "Switch to Dev 💻" : "Switch to Video 🎬"}
              </button>
            </div>

            {navLinks.map(({ text, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(href);
                }}
                className="text-sm font-medium text-gray-300 hover:text-white py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                {text}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

