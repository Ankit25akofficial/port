import "./styles/Achievements.css";
import { config } from "../config";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  useEffect(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        ".achievement-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".achievements-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
      
      // Animate the timeline line
      gsap.fromTo(
        ".timeline-line",
        { height: 0 },
        {
          height: "100%",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".achievements-section",
            start: "top 75%",
          }
        }
      );
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        ".achievement-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".achievements-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    
    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div className="achievements-section" id="achievements">
      <div className="achievements-container section-container">
        <h2 className="achievements-header-title" data-text="MILESTONES">
          Achievements
        </h2>
        
        <div className="timeline-wrapper">
          <div className="timeline-line"></div>
          
          <div className="timeline-items">
            {config.achievements.map((item, index) => (
              <div 
                className={`achievement-item ${index % 2 === 0 ? 'left' : 'right'}`} 
                key={item.id}
              >
                <div className="achievement-dot">
                  <span className="achievement-icon" role="img" aria-label="achievement-icon">{item.icon}</span>
                </div>
                
                <div className="achievement-content">
                  <div className="achievement-date">{item.date}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
