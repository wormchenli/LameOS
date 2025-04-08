"use client";

import useWindowManager from "@/os/utils/hooks/windowManagerHook";
import { IWindow } from "@/os/utils/interfaces/windowInterfaces";
import Window from "./common/Window";
import Desktop from "./common/Desktop";
import { osConfig } from "@/os/os.config";
import { loadComponent } from "@/os/utils/componentLoader";
import { useEffect, useState } from "react";
import DraggableResizableWindow from "./common/Window2";

export const Test = ({ componentName }: { componentName: string }) => {
    const windows: IWindow[] = [
        {
            title: "Window 1",
            id: "window1",
            size: {
                width: osConfig.Windows.defaultSize.width,
                height: osConfig.Windows.defaultSize.height,
            },
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
    const [LoadedComponent, setLoadedComponent] =
        useState<React.ComponentType | null>(null);

    const handleClick = () => {
        for (const window of windows) {
            registerWindow(window);
        }
    };

    const handleWindowClick = reArrangeWindow;

    useEffect(() => {
        loadComponent(componentName).then((comp) => {
            setLoadedComponent(() => comp);
        });
    }, [componentName]);

    return (
        <Desktop>
            {/* <h1 className="text-3xl font-bold underline">Official Lame-OS</h1>
            <button onClick={handleClick}>render test windows</button>
            <div>
                {stack.windows.map((window) => (
                    <Window
                        key={window.id}
                        windowProp={window}
                        clickHandler={handleWindowClick}
                    >
                        {LoadedComponent ? <LoadedComponent /> : null}
                    </Window>
                ))}
            </div> */}
            <DraggableResizableWindow>
                <div>Test</div>
            </DraggableResizableWindow>
        </Desktop>
    );
};
