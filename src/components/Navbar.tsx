import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";
import { config } from "../config";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const navLinks = [
  { text: "ABOUT", href: "#about" },
  { text: "CAREER", href: "#career" },
  { text: "WORK", href: "#work" },
  { text: "CERTIFICATES", href: "#certificates" },
  { text: "ACHIEVEMENTS", href: "#achievements" },
  { text: "CONTACT", href: "#contact" },
];

const Navbar = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const next = !prev;
      if (mobileMenuRef.current) {
        if (next) {
          gsap.fromTo(
            mobileMenuRef.current,
            { opacity: 0, y: -20, pointerEvents: "none" },
            { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", pointerEvents: "auto" }
          );
          // Stagger menu items
          gsap.fromTo(
            mobileMenuRef.current.querySelectorAll(".mobile-nav-item"),
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.35, stagger: 0.07, ease: "power2.out", delay: 0.1 }
          );
        } else {
          gsap.to(mobileMenuRef.current, {
            opacity: 0, y: -10, duration: 0.3, ease: "power2.in",
            onComplete: () => {
              if (mobileMenuRef.current) mobileMenuRef.current.style.pointerEvents = "none";
            }
          });
        }
      }
      return next;
    });
  };

  const handleMobileNavClick = (href: string) => {
    setMenuOpen(false);
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, { opacity: 0, y: -10, duration: 0.3, ease: "power2.in" });
    }
    const target = document.querySelector(href) as HTMLElement;
    if (target) {
      if (lenis) {
        lenis.scrollTo(target, { offset: 0, duration: 1.5 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    // Initialize Lenis smooth scroll
    if (window.innerWidth > 768) {
      lenis = new Lenis({
        duration: 1.7,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.7,
        touchMultiplier: 2,
        infinite: false,
      });

      lenis.stop();

      const raf = (time: number) => {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section && lenis) {
            const target = document.querySelector(section) as HTMLElement;
            if (target) {
              lenis.scrollTo(target, { offset: 0, duration: 1.5 });
            }
          }
        }
      });
    });

    window.addEventListener("resize", () => {
      if (lenis) lenis.resize();
      // Close mobile menu on resize to desktop
      if (window.innerWidth > 768) setMenuOpen(false);
    });

    // Scroll reactivity
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // GSAP entry animation
    if (headerRef.current) {
      const navElements = headerRef.current.querySelectorAll(".nav-anim");

      gsap.fromTo(
        headerRef.current,
        { y: -150, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.8, ease: "elastic.out(1, 0.5)", delay: 2.3 }
      );

      gsap.fromTo(
        navElements,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 2.7 }
      );

      // Magnetic hover
      const magneticElements = headerRef.current.querySelectorAll(".magnetic-wrap");
      magneticElements.forEach((el) => {
        const element = el as HTMLElement;
        const inner = element.querySelector(".magnetic-inner") as HTMLElement;
        if (!inner) return;

        element.addEventListener("mousemove", (e) => {
          const rect = element.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
          gsap.to(inner, { x, y, duration: 0.4, ease: "power2.out" });
        });

        element.addEventListener("mouseleave", () => {
          gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
        });
      });
    }

    return () => {
      lenis?.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`header ${scrolled ? "scrolled" : ""}`} ref={headerRef}>
        {/* Logo */}
        <div className="magnetic-wrap nav-anim">
          <a href="/#" className="navbar-title magnetic-inner" data-cursor="disable">
            © {new Date().getFullYear()} {config.developer.name.toUpperCase()}
          </a>
        </div>

        {/* Desktop nav */}
        <ul className="desktop-nav">
          {navLinks.map(({ text, href }) => (
            <li className="nav-anim" key={href}>
              <div className="magnetic-wrap">
                <a className="magnetic-inner" data-href={href} href={href}>
                  <HoverLinks text={text} />
                </a>
              </div>
            </li>
          ))}
        </ul>

        {/* Hamburger button (mobile only) */}
        <button
          className={`hamburger nav-anim ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          data-cursor="disable"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`mobile-menu ${menuOpen ? "visible" : ""}`}
        ref={mobileMenuRef}
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        {navLinks.map(({ text, href }) => (
          <a
            key={href}
            href={href}
            className="mobile-nav-item"
            onClick={(e) => { e.preventDefault(); handleMobileNavClick(href); }}
          >
            {text}
          </a>
        ))}
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
