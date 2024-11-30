import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactSpeedometer from "react-d3-speedometer";
import useApi from "./hooks/useApi";

function App() {
  const { data, getData } = useApi<{ value: number }>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("/api/getValue/40");
      console.log(data);
    }
    fetchData();
  }
  , []);

  return (
    <div className="App">
      <ReactSpeedometer
        value={data?.value ?? 0}
        minValue={0}
        maxValue={100}
        segments={3}
        customSegmentStops={[0, 40, 60, 100]}
        segmentColors={["#a3be8c", "#ebcb8b", "#bf616a"]}
        needleColor={"#6046f2"}
      />
    </div>
  );
}

export default App;
