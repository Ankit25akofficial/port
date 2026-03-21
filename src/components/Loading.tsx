import { useEffect, useRef } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import gsap from "gsap";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const textRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (percent >= 100) {
      // 1. Give it a tiny moment to rest at 100%
      setTimeout(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            import("./utils/initialFX").then((module) => {
              if (module.initialFX) {
                module.initialFX();
              }
              setIsLoading(false);
            });
          },
        });

        // Split text animation & slide up
        tl.to([textRef.current, brandRef.current], {
          y: -50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.inOut",
        });

        // Elevate the 5 panels upwards to reveal the site smoothly
        tl.to(
          panelsRef.current,
          {
            yPercent: -100,
            duration: 0.8,
            stagger: 0.08,
            ease: "power4.inOut",
          },
          "-=0.2"
        );
      }, 500);
    }
  }, [percent, setIsLoading]);

  return (
    <div className="new-loading-screen">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="new-loading-panel"
          ref={(el) => {
            panelsRef.current[i] = el;
          }}
        />
      ))}
      <div className="new-loading-content-wrapper">
        <div ref={textRef} className="new-loading-text">
          {percent}
          <span className="new-loading-percent-sign">%</span>
        </div>
        <div ref={brandRef} className="new-loading-brand">
          Loading
        </div>
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
