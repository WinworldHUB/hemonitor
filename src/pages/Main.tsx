import React from "react";
import ServerMeter from "../components/server-meter";

const Main = () => {
  return (
    <div className="App">
      <ServerMeter seedValue={40} />
      <ServerMeter seedValue={45} />
      <ServerMeter seedValue={50} />
      <ServerMeter seedValue={55} />

    </div>
  );
};

export default Main;
