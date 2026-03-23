import "./styles/LeetCode.css";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LeetCode = () => {
  useEffect(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        ".leetcode-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".leetcode-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        ".leetcode-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".leetcode-section",
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
    <div className="leetcode-section" id="leetcode">
      <div className="leetcode-container section-container">
        <h2 className="leetcode-header-title" data-text="STATS">
          LeetCode
        </h2>

        <div className="leetcode-content">
          <a href="https://leetcode.com/u/ankitkumar_ak/" target="_blank" rel="noopener noreferrer" className="leetcard-wrapper" data-cursor="disable">
            <img
              src="https://leetcard.jacoblin.cool/ankitkumar_ak?border=0&radius=20&theme=dark&ext=heatmap"
              alt="Ankit's LeetCode Stats"
              className="leetcard-img"
            />
          </a>

          <div className="leetcode-badges">
            <div className="badge-wrapper"><img src="https://assets.leetcode.com/static_assets/others/2550.gif" alt="50 Problems Medal" /></div>
            <div className="badge-wrapper"><img src="https://assets.leetcode.com/static_assets/others/25100.gif" alt="100 Problems Medal" /></div>
            <div className="badge-wrapper"><img src="https://assets.leetcode.com/static_assets/others/200.gif" alt="200 Problems Medal" /></div>
            <div className="badge-wrapper"><img src="https://assets.leetcode.com/static_assets/others/2025.gif" alt="300 Problems Medal" /></div>
            <div className="badge-wrapper"><img src="https://assets.leetcode.com/static_assets/marketing/365_new.gif" alt="365daya Problems Medal" /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetCode;
