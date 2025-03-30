import { useState } from "react";
import { IWindow } from "@/os/utils/interfaces/windowInterfaces";

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

    const handleMouseDown = () => {
        // Add global listeners on mouse down to track movement and release.
        clickHandler(windowProp.id);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <div
            className="absolute bg-white border border-gray-300 shadow-lg"
            style={{
                left: position.x,
                top: position.y,
                zIndex: windowProp.zIndex,
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div>{windowProp.title}</div>
            {children}
        </div>
    );
};

export default Window;
