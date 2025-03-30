"use client";

import { useEffect } from "react";
import useWindowManager from "@/os/utils/hooks/windowManagerHook";
import { IWindow } from "@/os/utils/interfaces/windowInterfaces";
import Window from "./common/Window";
import Desktop from "./common/Desktop";

export const Test = () => {
    const windows: IWindow[] = [
        {
            title: "Window 1",
            id: "window1",
            size: { width: 300, height: 200 },
            position: { x: 100, y: 100 },
            state: "normal",
        },
        {
            title: "Window 2",
            id: "window2",
            size: { width: 300, height: 200 },
            position: { x: 400, y: 100 },
            state: "normal",
        },
        {
            title: "Window 3",
            id: "window3",
            size: { width: 300, height: 200 },
            position: { x: 700, y: 100 },
            state: "normal",
        },
    ];
    const { stack, registerWindow, reArrangeWindow } = useWindowManager();

    const handleClick = () => {
        for (const window of windows) {
            registerWindow(window);
        }
    };

    const handleWindowClick = reArrangeWindow;

    return (
        <Desktop>
            <h1 className="text-3xl font-bold underline">Official Lame-OS</h1>
            <button onClick={handleClick}>render test windows</button>
            <div>
                {stack.windows.map((window) => (
                    <Window
                        key={window.id}
                        windowProp={window}
                        clickHandler={handleWindowClick}
                    >
                        contents
                    </Window>
                ))}
            </div>
        </Desktop>
    );
};
