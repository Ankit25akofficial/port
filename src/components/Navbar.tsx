import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";
import { config } from "../config";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  const headerRef = useRef<HTMLDivElement>(null);

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
              lenis.scrollTo(target, {
                offset: 0,
                duration: 1.5,
              });
            }
          }
        }
      });
    });

    window.addEventListener("resize", () => {
      if (lenis) lenis.resize();
    });

    // --- NEW GSAP ENTRY ANIMATION --- //
    // Animate navbar elements dropping down with a stagger
    if (headerRef.current) {
      const navElements = headerRef.current.querySelectorAll(".nav-anim");
      gsap.fromTo(
        navElements,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
          delay: 2.5, // wait for loading screen
        }
      );
    }

    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <div className="header" ref={headerRef}>
        <a href="/#" className="navbar-title nav-anim" data-cursor="disable">
          © {new Date().getFullYear()} {config.developer.name.toUpperCase()}
        </a>

        {/* Replaced Email with a unique Available for Work badge */}
        <div className="navbar-status nav-anim" data-cursor="disable">
          <div className="status-dot"></div>
          Available for freelance
        </div>

        <ul>
          <li className="nav-anim">
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li className="nav-anim">
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li className="nav-anim">
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
