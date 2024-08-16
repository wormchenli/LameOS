import { WindowManagerContext } from "./WindowManagerContextProvider";
import { componentTypes } from "../../configs/componentTypes";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const WindowManager = () => {
  const { windowStack, setWindowStack } = useContext(WindowManagerContext);
  const TYPE = componentTypes.DRAGGABLE;

  const listAllWindows = (): {}[] => {
    return windowStack.windows;
  };

  // pass down windowType to registerWindow
  // register window does not directly create window as it will bring stale data due to closure situiation
  // it only manages windowStack which will be used to create window in return statement
  const registerWindow = (winType: string) => {
    let _windowUUID = uuidv4();
    let _windows = [
      ...windowStack.windows,
      {
        windowUUID: _windowUUID,
        windowType: winType,
        zIndex: windowStack.windows.length + 1,
      },
    ];
    _windows.sort();
    setWindowStack({
      windows: _windows,
      topWindow: _windowUUID,
    });
  };

  // after remove window, re-order zIndex from 1 to n
  const unregisterWindow = (winUUID: string) => {
    let _windows = windowStack.windows.filter(
      (win: any) => win.windowUUID !== winUUID
    );
    _windows.sort((a: any, b: any) => a.zIndex - b.zIndex);
    for (let w of _windows) {
      w.zIndex = _windows.indexOf(w) + 1;
    }
    setWindowStack({
      windows: _windows,
      topWindow:
        _windows.length === 0 ? null : _windows[_windows.length - 1].windowUUID,
    });
  };

  const bringToFront = (winUUID: string) => {
    let _windows = [
      ...windowStack.windows.filter((win: any) => win.windowUUID !== winUUID),
      {
        ...windowStack.windows.filter((win: any) => {
          win.windowUUID == winUUID;
        }),
        zIndex: windowStack.windows.length + 2,
      },
    ];
    _windows.sort((a, b) => a.zIndex - b.zIndex);
    for (let w of _windows) {
      w.zIndex = _windows.indexOf(w) + 1;
    }
    setWindowStack({
      windows: _windows,
      topWindow: window,
    });
  };

  return (
    <div>
      <button onClick={() => registerWindow("Draggable")}>create</button>
      {listAllWindows().map((win: any, idx: number) => {
        return (
          <TYPE
            key={win.windowUUID}
            sizeProp={{ height: 200, width: 300 }}
            positionProp={{ x: 20, y: 20 }}
            zIndexProp={win.zIndex}
          >
            {win.windowType}
            <button
              onClick={() => {
                bringToFront(win.windowUUID);
              }}
            >
              Bring to Front
            </button>
          </TYPE>
        );
      })}
    </div>
  );
};
