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
            className="absolute bg-white border border-gray-300 shadow-lg"
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
            <div
                id="titlebar"
                className="transparent h-20 flex items-center justify-between border border-gray-500"
            >
                <TitleBarIconsComponent />
                <span>{windowProp.title}</span>
            </div>
            <div>{children}</div>
        </div>
    );
};

export default Window;
