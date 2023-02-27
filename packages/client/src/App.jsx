import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-bold text-center">
      <h1>Upfront Local Insights</h1>
    </div>
  );
}

export default App;
