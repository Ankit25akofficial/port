import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import { LoadingProvider } from "./context/LoadingProvider";
import { RoleProvider } from "./context/RoleContext";

import { useEffect } from "react";
import { useRole, RoleType } from "./context/RoleContext";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const MyWorks = lazy(() => import("./pages/MyWorks"));
const Play = lazy(() => import("./pages/Play"));

const MainPortfolioView = ({ targetRole }: { targetRole?: RoleType }) => {
  const { setRole } = useRole();

  useEffect(() => {
    if (targetRole) {
      setRole(targetRole);
    }
  }, [targetRole, setRole]);

  return (
    <LoadingProvider>
      <Suspense fallback={<div className="min-h-screen bg-[#070709] text-white flex items-center justify-center font-mono">Loading Portfolio...</div>}>
        <MainContainer>
          <Suspense fallback={null}>
            <CharacterModel />
          </Suspense>
        </MainContainer>
      </Suspense>
    </LoadingProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <RoleProvider>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<MainPortfolioView />} />

          {/* Direct Video Editor Portfolio Routes */}
          <Route path="/video-service" element={<MainPortfolioView targetRole="video-editor" />} />
          <Route path="/video" element={<MainPortfolioView targetRole="video-editor" />} />
          <Route path="/videos" element={<MainPortfolioView targetRole="video-editor" />} />
          <Route path="/video-editor" element={<MainPortfolioView targetRole="video-editor" />} />
          <Route path="/edits" element={<MainPortfolioView targetRole="video-editor" />} />

          {/* Direct Tech / Developer Portfolio Routes */}
          <Route path="/portfolio" element={<MainPortfolioView targetRole="developer" />} />
          <Route path="/developer" element={<MainPortfolioView targetRole="developer" />} />
          <Route path="/dev" element={<MainPortfolioView targetRole="developer" />} />
          <Route path="/tech" element={<MainPortfolioView targetRole="developer" />} />

          {/* Other Pages */}
          <Route
            path="/myworks"
            element={
              <Suspense fallback={<div className="min-h-screen bg-[#070709] text-white flex items-center justify-center font-mono">Loading...</div>}>
                <MyWorks />
              </Suspense>
            }
          />
          <Route
            path="/play"
            element={
              <Suspense fallback={<div className="min-h-screen bg-[#070709] text-white flex items-center justify-center font-mono">Loading...</div>}>
                <Play />
              </Suspense>
            }
          />

          {/* Catch-all Fallback */}
          <Route path="*" element={<MainPortfolioView />} />
        </Routes>
      </RoleProvider>
      <Analytics />
    </BrowserRouter>
  );
};

export default App;
