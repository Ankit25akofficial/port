import { useEffect, useRef } from "react";
import "./styles/Career.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const getDisplayYear = (period: string) => {
  if (period.includes("Present")) return "NOW";
  if (period.includes(" - ")) {
    return period.split(" - ")[0]; // Show start year for ranges
  }
  return period; // Single year like "2021"
};

const Career = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
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

      // Animate the main gradient timeline drawing down
      gsap.to(lineRef.current, {
        maxHeight: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      // Stagger animate each career box as it comes into view
      boxesRef.current.forEach((box, index) => {
        if (!box) return;

        // Alternate left and right entrance for desktop, direct up for mobile
        const isEven = index % 2 === 0;
        const xOffset = window.innerWidth > 900 ? (isEven ? -50 : 50) : 0;
        const yOffset = window.innerWidth > 900 ? 0 : 50;

        gsap.fromTo(
          box,
          { opacity: 0, x: xOffset, y: yOffset },
          {
            opacity: 1,
            x: 0,
            y: 0,
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="career-section section-container" ref={containerRef}>
      <div className="career-container">
        <h2 className="career-title-anim" ref={titleRef}>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline" ref={lineRef}>
            <div className="career-dot"></div>
          </div>
          {config.experiences.map((exp, index) => (
            <div
              key={index}
              className={`career-info-box ${index % 2 === 0 ? 'left' : 'right'}`}
              ref={(el) => {
                boxesRef.current[index] = el;
              }}
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
      </div>
    </div>
  );
};

export default Career;
