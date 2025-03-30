/*
    Li Chen
 */
import { IWindow, IWindowStack } from "@/os/utils/interfaces/windowInterfaces";

class WindowManager {
    private static instance: WindowManager;
    private stack: IWindowStack;

    private constructor() {
        this.stack = { windows: [], activeWindow: null };
    }

    public static getInstance(): WindowManager {
        if (!WindowManager.instance) {
            WindowManager.instance = new WindowManager();
        }
        return WindowManager.instance;
    }

    public getStack(): IWindowStack {
        return this.stack;
    }

    /* 
            when registering a window, it should be added into the stack.
            frontend will use this stack to render windows. the position of each window in the stack
            is important as frontend will set different z-index for each element in the stack.
    
            when a new window is created, it will be added to the top of the stack.
    */
    private resetZIndex = () => {
        this.stack.windows.forEach((window, index) => {
            window.zIndex = this.stack.windows.length - index;
        });
    };

    public registerWindow(window: IWindow) {
        this.stack.windows = [window, ...this.stack.windows];
        this.resetZIndex();
        this.stack.activeWindow = window;
    }

    public unregisterWindow(windowId: string) {
        const index = this.stack.windows.findIndex((w) => w.id === windowId);
        if (index !== -1) {
            this.stack.windows.splice(index, 1);
        }
        if (this.stack.activeWindow?.id === windowId) {
            this.stack.activeWindow = null;
        }
        this.resetZIndex();
    }

    /* bring passed window to the the start of the stack array, and making the
            window to be active window.
    */
    public reArrangeWindow(windowId: string) {
        const index = this.stack.windows.findIndex((w) => w.id === windowId);
        if (index !== -1) {
            const [window] = this.stack.windows.splice(index, 1);
            this.stack.windows.unshift(window);
            this.stack.activeWindow = window;
        }
        this.resetZIndex();
    }
}

export default WindowManager;
