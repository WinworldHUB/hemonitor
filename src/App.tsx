import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactSpeedometer from "react-d3-speedometer";

function App() {
  return (
    <div className="App">
      <ReactSpeedometer
        value={33}
        minValue={0}
        maxValue={100}
        segments={3}
        customSegmentStops={[0, 40, 60, 100]}
        segmentColors={["#a3be8c", "#ebcb8b", "#bf616a"]}
        needleColor={"#bf616a"}
      />
    </div>
  );
}

export default App;
