import { useEffect, useRef } from "react";
import "./styles/Career.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const getDisplayYear = (period: string) => {
  if (period.includes("Present")) return "NOW";
  if (period.includes(" - ")) {
    return period.split(" - ")[0];
  }
  return period;
};

const Career = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eduTitleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const eduLineRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<(HTMLDivElement | null)[]>([]);
  const eduBoxesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ---- Experience Title Animation ----
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 80, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ---- Education Title Animation ----
      if (eduTitleRef.current) {
        gsap.fromTo(
          eduTitleRef.current,
          { opacity: 0, y: 80, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: eduTitleRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ---- Experience Timeline line ----
      gsap.to(lineRef.current, {
        maxHeight: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: lineRef.current?.parentElement,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      // ---- Education Timeline line ----
      gsap.to(eduLineRef.current, {
        maxHeight: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: eduLineRef.current?.parentElement,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      // ---- Experience Cards ----
      boxesRef.current.forEach((box, index) => {
        if (!box) return;
        const isEven = index % 2 === 0;
        const xOffset = window.innerWidth > 900 ? (isEven ? -50 : 50) : 0;
        const yOffset = window.innerWidth > 900 ? 0 : 50;
        gsap.fromTo(
          box,
          { opacity: 0, x: xOffset, y: yOffset },
          {
            opacity: 1, x: 0, y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: box,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ---- Education Cards (staggered + scale) ----
      eduBoxesRef.current.forEach((box, index) => {
        if (!box) return;
        gsap.fromTo(
          box,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.9,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: box,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Animate inner elements with stagger
        const inner = box.querySelectorAll(".edu-degree, .edu-institution, .edu-meta");
        gsap.fromTo(
          inner,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: box,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="career-section section-container" id="career" ref={containerRef}>
      <div className="career-container">

        {/* ── Experience Section ── */}
        <h2 className="career-title-anim" ref={titleRef}>
          My career <span>&</span>
          <br />experience
        </h2>
        <div className="career-info">
          <div className="career-timeline" ref={lineRef}>
            <div className="career-dot"></div>
          </div>
          {config.experiences.map((exp, index) => (
            <div
              key={index}
              className={`career-info-box ${index % 2 === 0 ? 'left' : 'right'}`}
              ref={(el) => { boxesRef.current[index] = el; }}
            >
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{exp.position}</h4>
                  <h5>{exp.company}</h5>
                </div>
                <h3 className="career-year">{getDisplayYear(exp.period)}</h3>
              </div>
              <p className="career-desc">{exp.description}</p>
            </div>
          ))}
        </div>

        {/* ── Education Section ── */}
        <h2 className="career-title-anim edu-section-title" ref={eduTitleRef}>
          My
          <br />education
        </h2>
        <div className="career-info edu-info">
          <div className="career-timeline edu-timeline" ref={eduLineRef}>
            <div className="career-dot edu-dot"></div>
          </div>
          {config.education.map((edu, index) => (
            <div
              key={index}
              className="edu-card"
              ref={(el) => { eduBoxesRef.current[index] = el; }}
            >
              {/* Pill badge */}
              <span className="edu-badge">{edu.period}</span>

              <div className="edu-body">
                <p className="edu-degree">{edu.degree}</p>
                <p className="edu-institution">{edu.institution}</p>
                <div className="edu-meta">
                  <span className="edu-score-label"></span>
                  <span className="edu-score">{edu.score}</span>
                </div>
              </div>

              {/* Decorative gradient orb */}
              <div className="edu-orb"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Career;
