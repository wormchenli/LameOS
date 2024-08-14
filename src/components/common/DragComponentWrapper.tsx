import { ReactElement } from "react";
import { DraggableComponent } from "./DraggableComponent";
export const DragableComponent = ({
  children,
}: {
  children: ReactElement<typeof DraggableComponent>;
}) => {
  return <div className="w-auto relative">{children}</div>;
};
