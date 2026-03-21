import "./styles/About.css";
import { config } from "../config";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="about-header-title" data-text="ABOUT ME">{config.about.title}</h3>
        <p className="para">{config.about.description}</p>

        {config.contact.github && (
          <div
            className="github-stats"
            style={{ marginTop: "40px" }}
            data-cursor="disable"
          >
            <h4 style={{ color: "#eae5ec", marginBottom: "15px", fontSize: "16px", fontWeight: "600", letterSpacing: "0.5px" }}>
              GitHub Contributions
            </h4>
            <a
              href={config.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", background: "rgba(255,255,255,0.03)", padding: "15px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <img
                src={`https://ghchart.rshah.org/4ade80/Ankit25akofficial`}
                alt="GitHub Contributions"
                style={{
                  maxWidth: "100%",
                  opacity: 0.9,
                  transition: "opacity 0.3s, transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                  e.currentTarget.style.transform = "none";
                }}
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
