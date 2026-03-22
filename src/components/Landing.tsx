import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {firstName.toUpperCase()}
              {' '}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
          </div>
          <div className="landing-info">
            <h3>A</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Video Editor</div>
            </h2>
            <h2>
              <h3>&nbsp;</h3>

              <div
                className="landing-h2-info"
                style={{ fontSize: "clamp(18px, 2.5vw, 38px)", letterSpacing: "1px" }}>
                FULL-STACK DEVELOPER
              </div>
            </h2>
          </div>
          {/* Mobile photo - shows only on mobile when 3D character is hidden */}
          <div className="mobile-photo">
            <img src="/images/mypicnbg.jpeg" alt="Ankit Kumar" />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
