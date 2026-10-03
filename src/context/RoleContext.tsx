import { createContext, useContext, useState, useEffect, PropsWithChildren } from "react";

export type RoleType = "selector" | "video-editor" | "developer";

interface RoleContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
  openSelector: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const getInitialRole = (): RoleType => {
  if (typeof window !== "undefined") {
    const path = window.location.pathname.toLowerCase();
    if (
      path === "/video-service" ||
      path === "/video" ||
      path === "/videos" ||
      path === "/video-editor" ||
      path === "/edits"
    ) {
      return "video-editor";
    }
    if (
      path === "/portfolio" ||
      path === "/developer" ||
      path === "/dev" ||
      path === "/tech"
    ) {
      return "developer";
    }
    const saved = localStorage.getItem("ankit_portfolio_role");
    if (saved === "video-editor" || saved === "developer" || saved === "selector") {
      return saved as RoleType;
    }
  }
  return "selector";
};

export const RoleProvider = ({ children }: PropsWithChildren) => {
  const [role, setRoleState] = useState<RoleType>(getInitialRole);

  const setRole = (newRole: RoleType) => {
    setRoleState(newRole);
    localStorage.setItem("ankit_portfolio_role", newRole);
  };

  const openSelector = () => {
    setRoleState("selector");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole, openSelector }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
