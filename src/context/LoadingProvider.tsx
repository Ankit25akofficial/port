import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";
import { useRole } from "./RoleContext";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const { role } = useRole();
  const [isLoading, setIsLoading] = useState(() => {
    // Skip loading on mobile
    if (window.innerWidth <= 768) return false;
    return true;
  });
  const [loading, setLoading] = useState(0);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };

  useEffect(() => {
    // Auto-progress loading screen when not loading 3D character (Video Editor or Selector mode)
    if (role !== "developer") {
      let current = 0;
      const interval = setInterval(() => {
        current += 15;
        if (current >= 100) {
          setLoading(100);
          clearInterval(interval);
        } else {
          setLoading(current);
        }
      }, 25);
      return () => clearInterval(interval);
    }
  }, [role]);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      import("../components/utils/initialFX").then((module) => {
        if (module.initialFX) {
          setTimeout(() => {
            module.initialFX();
          }, 100);
        }
      });
    }
  }, []);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
