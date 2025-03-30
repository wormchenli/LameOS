"use client";

import { useState, useCallback } from "react";
import WindowManager from "@/os/sys/services/windowManager";
import { IWindow, IWindowStack } from "@/os/utils/interfaces/windowInterfaces";

export default function useWindowManager(): {
    stack: IWindowStack;
    registerWindow: (window: IWindow) => void;
    unregisterWindow: (windowId: string) => void;
    reArrangeWindow: (windowId: string) => void;
} {
    const manager = WindowManager.getInstance();

    const [stack, setStack] = useState<IWindowStack>(manager.getStack());

    // Update local state from the manager.
    const updateStack = useCallback(() => {
        const currentStack = manager.getStack();
        setStack({
            windows: [...currentStack.windows],
            activeWindow: currentStack.activeWindow,
        });
    }, [manager]);

    const registerWindow = useCallback(
        (window: IWindow) => {
            manager.registerWindow(window);
            updateStack();
        },
        [manager, updateStack]
    );

    const unregisterWindow = useCallback(
        (windowId: string) => {
            manager.unregisterWindow(windowId);
            updateStack();
        },
        [manager, updateStack]
    );

    const reArrangeWindow = useCallback(
        (windowId: string) => {
            manager.reArrangeWindow(windowId);
            updateStack();
        },
        [manager, updateStack]
    );
    return { stack, registerWindow, unregisterWindow, reArrangeWindow };
}
