import { WindowManager } from "./components/sys/WindowManager";
import { WindowManagerContextProvider } from "./components/sys/WindowManagerContextProvider";
function App() {
  return (
    <div className="overflow-hidden">
      <WindowManagerContextProvider>
        <WindowManager />
      </WindowManagerContextProvider>
    </div>
  );
}

export default App;
