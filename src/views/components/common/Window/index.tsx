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
                <div
                    id="n-resizer"
                    className="absolute top-0 left-0 w-full h-2 border cursor-n-resize"
                />
                <div
                    id="s-resizer"
                    className="absolute bottom-0 left-0 w-full h-2 border cursor-s-resize"
                />
                <div
                    id="w-resizer"
                    className="absolute top-0 left-0 h-full w-2 border cursor-w-resize"
                />
                <div
                    id="e-resizer"
                    className="absolute top-0 right-0 h-full w-2 border cursor-e-resize"
                />
                <div
                    id="nw-resizer"
                    className="absolute w-3 h-3 top-0 left-0 border cursor-nw-resize"
                />
                <div
                    id="ne-resizer"
                    className="absolute w-3 h-3 top-0 right-0 border cursor-ne-resize"
                />
                <div
                    id="sw-resizer"
                    className="absolute w-3 h-3 bottom-0 left-0 border cursor-sw-resize"
                />
                <div
                    id="se-resizer"
                    className="absolute w-3 h-3 bottom-0 right-0 border cursor-se-resize"
                />
            </div>
            <div
                id="titlebar"
                className="absolute top-0 left-0 transparent mx-1 my-1 w-[calc(100%-8px)] h-12 flex items-center justify-between "
            >
                <TitleBarIconsComponent />
                <span>{windowProp.title}</span>
            </div>
            <div className="absolute mx-2 my-2 top-12 w-[calc(100%-16px)]">
                {children}
            </div>
        </div>
    );
};

export default Window;
