import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices for max performance
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let hover = false;
    let animId: number;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const mousePos = { x: -100, y: -100 };
    const cursorPos = { x: -100, y: -100 };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const loop = () => {
      if (!hover) {
        const delay = 5;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        cursor.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`;
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    const handleMouseOver = (e: Event) => {
      const target = (e.currentTarget as HTMLElement);
      const cursorType = target.dataset.cursor;
      if (cursorType === "icons") {
        const rect = target.getBoundingClientRect();
        cursor.classList.add("cursor-icons");
        cursor.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      } else if (cursorType === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const handleMouseOut = () => {
      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };

    const elements = document.querySelectorAll("[data-cursor]");
    elements.forEach((item) => {
      item.addEventListener("mouseenter", handleMouseOver, { passive: true });
      item.addEventListener("mouseleave", handleMouseOut, { passive: true });
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      elements.forEach((item) => {
        item.removeEventListener("mouseenter", handleMouseOver);
        item.removeEventListener("mouseleave", handleMouseOut);
      });
    };
  }, []);

  return <div className="cursor-main will-change-transform" ref={cursorRef}></div>;
};

export default Cursor;
