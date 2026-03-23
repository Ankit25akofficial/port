import "./styles/Certificates.css";
import { config } from "../config";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaExternalLinkAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Certificates = () => {
  useEffect(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        ".certificate-box",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".certificates-section",
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
    <div className="certificates-section" id="certificates">
      <div className="certificates-container section-container">
        <h2 className="certificates-header-title" data-text="AWARDS">
          Certificates
        </h2>
        <div className="certificates-grid">
          {config.certificates.map((cert) => (
            <div className="certificate-box" key={cert.id}>
              <div className="certificate-content">
                <div className="certificate-image">
                  <img src={cert.image} alt={cert.title} />
                </div>
                <div className="certificate-info">
                  <h3>{cert.title}</h3>
                  <p className="certificate-issuer">{cert.issuer}</p>
                  <p className="certificate-date">{cert.date}</p>
                  {cert.link && cert.link !== "#" && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="certificate-link" data-cursor="disable">
                      View Credential <FaExternalLinkAlt size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
