import { PropsWithChildren, useEffect, useState } from "react";
import Navbar from "./Navbar";
import RoleSelector from "./RoleSelector";
import VideoEditorPortfolio from "./VideoEditorPortfolio";
import DeveloperPortfolio from "./DeveloperPortfolio";
import { useRole } from "../context/RoleContext";
import setSplitText from "./utils/splitText";

const MainContainer = ({ children }: PropsWithChildren) => {
  const { role } = useRole();
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth > 1024 : true
  );
  const [isMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    let timeoutId: number;
    const resizeHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setIsDesktopView(window.innerWidth > 1024);
        if (role === "developer") {
          setSplitText();
        }
      }, 150);
    };

    if (role === "developer") {
      const initTimer = setTimeout(() => setSplitText(), 100);
      return () => clearTimeout(initTimer);
    }

    window.addEventListener("resize", resizeHandler, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [role]);

  return (
    <div className="w-full min-h-screen bg-[#0a0a12] text-white">
      {/* Role Selection Gate Screen */}
      {role === "selector" && <RoleSelector />}

      {/* Main App & Views */}
      {role !== "selector" && (
        <>
          <Navbar />

          {/* Render 3D Canvas Character ONLY for Developer Portfolio on Desktop */}
          {role === "developer" && isDesktopView && !isMobile && children}

          {/* Render Active View */}
          {role === "video-editor" ? (
            <VideoEditorPortfolio />
          ) : (
            <DeveloperPortfolio />
          )}
        </>
      )}
    </div>
  );
};

export default MainContainer;
