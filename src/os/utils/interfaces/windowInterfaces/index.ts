interface IWindow {
    title: string;
    id: string;
    size: { width: number; height: number };
    position: { x: number; y: number };
    state: "maximized" | "minimized" | "normal";
    isActive?: boolean;
    zIndex?: number;
}

interface IWindowStack {
    windows: IWindow[];
    activeWindow: IWindow | null;
}

export type { IWindow, IWindowStack };
