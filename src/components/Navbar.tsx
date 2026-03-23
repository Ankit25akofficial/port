import { useEffect, useRef, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

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

    // --- SCROLL REACTIVITY ---
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // --- NEW GSAP ENTRY ANIMATION ---
    if (headerRef.current) {
      const navElements = headerRef.current.querySelectorAll(".nav-anim");
      
      // The entire navbar drops in with an elastic bounce
      gsap.fromTo(
        headerRef.current,
        { y: -150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.8,
          ease: "elastic.out(1, 0.5)", // Bouncy elastic ease
          delay: 2.3, // wait for loading screen
        }
      );

      // Inner elements stagger fade in and slide up
      gsap.fromTo(
        navElements,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 2.7,
        }
      );

      // --- MAGNETIC HOVER EFFECT ---
      const magneticElements = headerRef.current.querySelectorAll(".magnetic-wrap");
      
      magneticElements.forEach((el) => {
        const element = el as HTMLElement;
        const inner = element.querySelector(".magnetic-inner") as HTMLElement;
        if (!inner) return;

        element.addEventListener("mousemove", (e) => {
          const rect = element.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.4; // Magnetic strength 0.4
          const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
          
          gsap.to(inner, {
            x: x,
            y: y,
            duration: 0.4,
            ease: "power2.out"
          });
        });

        element.addEventListener("mouseleave", () => {
          gsap.to(inner, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)" // Spring back
          });
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
        <div className="magnetic-wrap nav-anim">
          <a href="/#" className="navbar-title magnetic-inner" data-cursor="disable">
            © {new Date().getFullYear()} {config.developer.name.toUpperCase()}
          </a>
        </div>


        <ul>
          <li className="nav-anim">
            <div className="magnetic-wrap">
              <a className="magnetic-inner" data-href="#about" href="#about">
                <HoverLinks text="ABOUT" />
              </a>
            </div>
          </li>
          <li className="nav-anim">
            <div className="magnetic-wrap">
              <a className="magnetic-inner" data-href="#work" href="#work">
                <HoverLinks text="WORK" />
              </a>
            </div>
          </li>
          <li className="nav-anim">
            <div className="magnetic-wrap">
              <a className="magnetic-inner" data-href="#certificates" href="#certificates">
                <HoverLinks text="CERTIFICATES" />
              </a>
            </div>
          </li>
          <li className="nav-anim">
            <div className="magnetic-wrap">
              <a className="magnetic-inner" data-href="#achievements" href="#achievements">
                <HoverLinks text="ACHIEVEMENTS" />
              </a>
            </div>
          </li>
          <li className="nav-anim">
            <div className="magnetic-wrap">
              <a className="magnetic-inner" data-href="#contact" href="#contact">
                <HoverLinks text="CONTACT" />
              </a>
            </div>
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
