import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextSplitter } from "../../utils/textSplitter";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: TextSplitter;
}

gsap.registerPlugin(ScrollTrigger);

let isSplitting = false;

export default function setSplitText() {
  if (typeof window === "undefined" || window.innerWidth < 900) return;
  if (isSplitting) return;
  isSplitting = true;

  try {
    ScrollTrigger.config({ ignoreMobileResize: true });
    const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
    const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

    if (paras.length === 0 && titles.length === 0) {
      isSplitting = false;
      return;
    }

    const TriggerStart = window.innerWidth <= 1024 ? "top 70%" : "20% 70%";
    const ToggleAction = "play none none reverse";

    paras.forEach((para: ParaElement) => {
      para.classList.add("visible");
      if (para.anim) {
        para.anim.kill();
        para.split?.revert();
      }

      para.split = new TextSplitter(para, {
        type: "lines,words",
        linesClass: "split-line",
      });

      if (para.split?.words) {
        para.anim = gsap.fromTo(
          para.split.words,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            scrollTrigger: {
              trigger: para,
              toggleActions: ToggleAction,
              start: TriggerStart,
            },
            duration: 0.8,
            ease: "power3.out",
            y: 0,
            stagger: 0.015,
          }
        );
      }
    });

    titles.forEach((title: ParaElement) => {
      if (title.anim) {
        title.anim.kill();
        title.split?.revert();
      }
      title.split = new TextSplitter(title, {
        type: "chars,lines",
        linesClass: "split-line",
      });

      if (title.split?.chars) {
        title.anim = gsap.fromTo(
          title.split.chars,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            scrollTrigger: {
              trigger: title,
              toggleActions: ToggleAction,
              start: TriggerStart,
            },
            duration: 0.6,
            ease: "power2.out",
            y: 0,
            stagger: 0.02,
          }
        );
      }
    });
  } catch (err) {
    console.warn("Text splitting deferred:", err);
  } finally {
    isSplitting = false;
  }
}
