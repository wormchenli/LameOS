import { useState, useEffect, useCallback } from "react";
import { IUiProp } from "../../interfaces/IUiProp";
import "../../index.css";

export const DraggableComponent: React.FC<IUiProp> = ({
  sizeProp = { height: 400, width: 600 },
  positionProp = { x: 0, y: 0 },
  cssStyleProp,
  tailWindStyleProp,
  zIndexProp = 1,
  children,
}) => {
  // Hooks
  const [currentPosition, setCurrentPosition] =
    useState<typeof positionProp>(positionProp);

  const [dragging, setDragging] = useState<boolean>(false);
  const [offset, setOffset] = useState<typeof positionProp>({
    x: 0,
    y: 0,
  });

  // Mouse down handler
  const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - currentPosition.x,
      y: e.clientY - currentPosition.y,
    });
  };

  // Mouse move handler
  const mouseMoveHandler = useCallback(
    (e: MouseEvent) => {
      if (dragging) {
        setCurrentPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      }
    },
    [dragging]
  );

  // Mouse up handler
  const mouseUpHandler = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    } else {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    }

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [dragging]);

  return (
    <div
      className={
        tailWindStyleProp || `border-[1px] border-[black] opacity-100 bg-white`
      }
      style={{
        position: "absolute",
        top: currentPosition.y,
        left: currentPosition.x,
        width: sizeProp?.width,
        height: sizeProp?.height,
        ...cssStyleProp,
      }}
      onMouseDown={mouseDownHandler}
    >
      {/* simulate a title bar */}
      <div className="w-full h-6 border-b-2"></div>
      <div className="p-4" onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
