import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStackNew from "./TechStackNew";
import CallToAction from "./CallToAction";
import Certificates from "./Certificates";
import Achievements from "./Achievements";
import LeetCode from "./LeetCode";

const DeveloperPortfolio = () => {
  return (
    <div className="container-main">
      <Cursor />
      <SocialIcons />
      <div className="container-main">
        <Landing />
        <About />
        <WhatIDo />
        <Career />
        <Work />
        <Certificates />
        <Achievements />
        <LeetCode />
        <TechStackNew />
        <CallToAction />
        <Contact />
      </div>
    </div>
  );
};

export default DeveloperPortfolio;
