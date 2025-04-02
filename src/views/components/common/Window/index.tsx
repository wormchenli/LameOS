import { useState } from "react";
import { IWindow } from "@/os/utils/interfaces/windowInterfaces";
import { TitleBarIconsComponent } from "../TitleBarIcons";

interface IPosition {
    x: number;
    y: number;
}

const Window = ({
    children,
    windowProp,
    clickHandler,
}: {
    children: React.ReactNode;
    windowProp: IWindow;
    clickHandler: (windowId: string) => void;
}) => {
    const [position, setPosition] = useState<IPosition>({
        x: windowProp.position.x,
        y: windowProp.position.y,
    });

    const handleMouseMove = (e: MouseEvent) => {
        setPosition((prev) => ({
            x: prev.x + e.movementX,
            y: prev.y + e.movementY,
        }));
    };

    const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        // Add global listeners on mouse down to track movement and release.
        clickHandler(windowProp.id);
        if ((e.target as HTMLElement).id === "titlebar") {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
    };

    return (
        <div
            className="absolute bg-white border border-gray-300 shadow-lg min-w-160 min-h-100"
            style={{
                width: windowProp.size.width,
                height: windowProp.size.height,
                left: position.x,
                top: position.y,
                zIndex: windowProp.zIndex,
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div className="relative top-0 left-0 w-full h-full">
                <div className="absolute top-0 left-0 w-full h-2 border cursor-n-resize" />
                <div className="absolute bottom-0 left-0 w-full h-2 border cursor-s-resize" />
                <div className="absolute top-0 left-0 h-full w-2 border cursor-w-resize" />
                <div className="absolute top-0 right-0 h-full w-2 border cursor-e-resize" />
                <div className="absolute w-3 h-3 top-0 left-0 border cursor-nw-resize" />
                <div className="absolute w-3 h-3 top-0 right-0 border cursor-ne-resize" />
                <div className="absolute w-3 h-3 bottom-0 left-0 border cursor-sw-resize" />
                <div className="absolute w-3 h-3 bottom-0 right-0 border cursor-se-resize" />
            </div>
            <div
                id="titlebar"
                className="absolute top-0 left-0 transparent mx-0.5 my-0.5 w-[calc(100%-4px)] flex items-center justify-between border-gray-500 "
            >
                <TitleBarIconsComponent />
                <span>{windowProp.title}</span>
            </div>
            {children}
        </div>
    );
};

export default Window;
