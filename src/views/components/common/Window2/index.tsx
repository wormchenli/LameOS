import React, {
    useState,
    useRef,
    useCallback,
    MouseEvent,
    useEffect,
} from "react";
import { TitleBarIconsComponent } from "../TitleBarIcons";

interface Position {
    x: number;
    y: number;
}

interface Size {
    width: number;
    height: number;
}

type ResizeDirection =
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "all";

const DraggableResizableWindow = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    const [position, setPosition] = useState<Position>({ x: 100, y: 100 });
    const [size, setSize] = useState<Size>({ width: 450, height: 350 });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState<ResizeDirection | null>(null);
    const dragStartRef = useRef<Position>({ x: 0, y: 0 });
    const resizeStartRef = useRef<{
        mouseX: number;
        mouseY: number;
        initialX: number;
        initialY: number;
        initialWidth: number;
        initialHeight: number;
    } | null>(null);

    const minWidth = 200;
    const minHeight = 150;

    const handleMouseDownDraggable = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            setIsDragging(true);
            const clientX = e.clientX;
            const clientY = e.clientY;
            dragStartRef.current = {
                x: clientX - position.x,
                y: clientY - position.y,
            };
            // prevent text being selected when dragging
            document.body.style.userSelect = "none";
        },
        [position]
    );

    const handleMouseDownResizable = useCallback(
        (e: MouseEvent<HTMLDivElement>, direction: ResizeDirection) => {
            // stop triggering drag when clicking on resize handle
            e.stopPropagation();
            setIsResizing(direction);
            const clientX = e.clientX;
            const clientY = e.clientY;
            resizeStartRef.current = {
                mouseX: clientX,
                mouseY: clientY,
                initialX: position.x,
                initialY: position.y,
                initialWidth: size.width,
                initialHeight: size.height,
            };
            document.body.style.userSelect = "none";
        },
        [position, size]
    );

    const handleMouseMove = useCallback(
        (e: globalThis.MouseEvent) => {
            const clientX = e.clientX;
            const clientY = e.clientY;

            if (isDragging) {
                setPosition({
                    x: Math.max(0, clientX - dragStartRef.current.x),
                    y: Math.max(0, clientY - dragStartRef.current.y),
                });
            } else if (isResizing && resizeStartRef.current) {
                const dx = clientX - resizeStartRef.current.mouseX;
                const dy = clientY - resizeStartRef.current.mouseY;
                let newWidth = resizeStartRef.current.initialWidth;
                let newHeight = resizeStartRef.current.initialHeight;
                let newX = resizeStartRef.current.initialX;
                let newY = resizeStartRef.current.initialY;

                if (isResizing.includes("right"))
                    newWidth = Math.max(
                        minWidth,
                        resizeStartRef.current.initialWidth + dx
                    );
                if (isResizing.includes("bottom"))
                    newHeight = Math.max(
                        minHeight,
                        resizeStartRef.current.initialHeight + dy
                    );
                if (isResizing.includes("left")) {
                    const potentialWidth =
                        resizeStartRef.current.initialWidth - dx;
                    if (potentialWidth >= minWidth) {
                        newWidth = potentialWidth;
                        newX = resizeStartRef.current.initialX + dx;
                    } else {
                        newWidth = minWidth;
                        newX =
                            resizeStartRef.current.initialX +
                            (resizeStartRef.current.initialWidth - minWidth);
                    }
                }
                if (isResizing.includes("top")) {
                    const potentialHeight =
                        resizeStartRef.current.initialHeight - dy;
                    if (potentialHeight >= minHeight) {
                        newHeight = potentialHeight;
                        newY = resizeStartRef.current.initialY + dy;
                    } else {
                        newHeight = minHeight;
                        newY =
                            resizeStartRef.current.initialY +
                            (resizeStartRef.current.initialHeight - minHeight);
                    }
                }

                setSize({ width: newWidth, height: newHeight });
                setPosition({ x: newX, y: newY });
            }
        },
        [isDragging, isResizing]
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setIsResizing(null);
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
    }, []);

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    const resizeHandles: {
        direction: ResizeDirection;
        className: string;
        cursor: string;
    }[] = [
        {
            direction: "top-left",
            className: "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
            cursor: "cursor-nwse-resize",
        },
        {
            direction: "top-right",
            className: "top-0 right-0 translate-x-1/2 -translate-y-1/2",
            cursor: "cursor-nesw-resize",
        },
        {
            direction: "bottom-left",
            className: "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
            cursor: "cursor-nesw-resize",
        },
        {
            direction: "bottom-right",
            className: "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
            cursor: "cursor-nwse-resize",
        },
        {
            direction: "top",
            className:
                "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-full",
            cursor: "cursor-ns-resize",
        },
        {
            direction: "bottom",
            className:
                "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2 w-full",
            cursor: "cursor-ns-resize",
        },
        {
            direction: "left",
            className:
                "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-full",
            cursor: "cursor-ew-resize",
        },
        {
            direction: "right",
            className:
                "top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-full",
            cursor: "cursor-ew-resize",
        },
    ];

    return (
        <div
            className="absolute bg-white rounded-lg shadow-xl overflow-hidden border border-neutral-300 flex flex-col"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                minWidth: `${minWidth}px`,
                minHeight: `${minHeight}px`,
            }}
        >
            {/* title bar */}
            <div
                className="h-9 bg-gradient-to-b from-neutral-100 to-neutral-200 border-b border-neutral-300 text-neutral-800 flex items-center justify-between px-3 select-none flex-shrink-0"
                onMouseDown={handleMouseDownDraggable}
            >
                <TitleBarIconsComponent />
                <span className="font-medium text-sm truncate">
                    Draggable & Resizable Window
                </span>
            </div>
            {/* content area */}
            <div className="p-5 text-neutral-700 flex-grow overflow-auto bg-white">
                {children}
            </div>
            {resizeHandles.map((handle) => (
                <div
                    key={handle.direction}
                    className={`absolute bg-transparent ${handle.className} ${
                        handle.cursor
                    } ${handle.direction.includes("-") ? "w-4 h-4" : ""}`}
                    style={{ zIndex: 50 }}
                    onMouseDown={(e) =>
                        handleMouseDownResizable(e, handle.direction)
                    }
                />
            ))}
        </div>
    );
};

export default DraggableResizableWindow;
