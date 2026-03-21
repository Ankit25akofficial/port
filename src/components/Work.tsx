import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    let timeline: gsap.core.Timeline | null = null;
    let mm = gsap.matchMedia();

    // Desktop Animation
    mm.add("(min-width: 769px)", () => {
      let translateX = 0;
      const box = document.getElementsByClassName("work-box");
      if (box.length > 0) {
        const rectLeft = document
          .querySelector(".work-container")!
          .getBoundingClientRect().left;
        const rect = box[0].getBoundingClientRect();
        const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
        let padding = parseInt(window.getComputedStyle(box[0]).padding) / 2;
        translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
      }

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          id: "work-desktop",
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });

      gsap.utils.toArray(".work-box").forEach((box: any) => {
        gsap.fromTo(
          box.querySelectorAll(".work-info > *, .work-image"),
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: box,
              containerAnimation: timeline as any,
              start: "left 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    // Mobile Animation (Vertical Scroll)
    mm.add("(max-width: 768px)", () => {
      gsap.utils.toArray(".work-box").forEach((box: any) => {
        gsap.fromTo(
          box,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: box,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 500);

    return () => {
      mm.revert(); // Automatically cleans up ScrollTriggers matchMedia
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2 className="work-header-title" data-text="PORTFOLIO">
          Projects
        </h2>
        <div className="work-flex">
          {config.projects.slice(0, 5).map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.technologies}</p>
                
                {project.githubLink && (
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-github-link-work"
                    data-cursor="disable"
                    title="View on GitHub"
                  >
                    <FaGithub /> View Repository
                  </a>
                )}
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </div>
          ))}
          {/* See All Works Button */}
          <div className="work-box work-box-cta">
            <div className="see-all-works">
              <h3>Want to see more?</h3>
              <p>Explore all of my projects and creations</p>
              <Link to="/myworks" className="see-all-btn" data-cursor="disable">
                See All Works →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
