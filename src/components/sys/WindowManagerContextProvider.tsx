import { useState, createContext, useContext } from "react";

export const WindowManagerContext = createContext<any>(null);

export const WindowManagerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [windowStack, setWindowStack] = useState<{
    windows: { windowUUID: string; windowType: String; zIndex: number }[];
    topWindow: string;
  }>({
    windows: [],
    topWindow: "",
  });

  return (
    <WindowManagerContext.Provider value={{ windowStack, setWindowStack }}>
      {children}
    </WindowManagerContext.Provider>
  );
};
