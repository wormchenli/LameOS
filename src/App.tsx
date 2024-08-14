import { DraggableComponent } from "./components/common/DraggableComponent";
function App() {
  return (
    <div className="overflow-hidden">
      <DraggableComponent sizeProp={{ width: 200, height: 100 }}>
        <div className="bg-red-400">Hello Content</div>
      </DraggableComponent>
      <DraggableComponent sizeProp={{ width: 200, height: 100 }}>
        <div>Hello Content222</div>
      </DraggableComponent>
    </div>
  );
}

export default App;
// import React, { useState, useEffect, useCallback } from "react";

// const App = () => {
//   const [count, setCount] = useState(0);

//   function handleClick() {
//     console.log("inside handler");
//     console.log(count);
//   }

//   useEffect(() => {
//     console.log("inside useEffect");
//     document.addEventListener("click", handleClick);
//     return () => document.removeEventListener("click", handleClick);
//   }, [count]);

//   return (
//     <div>
//       <>{console.log("inside page")}</>
//       <button onClick={() => setCount(count + 1)}>Increase Count</button>
//     </div>
//   );
// };

// export default App;
