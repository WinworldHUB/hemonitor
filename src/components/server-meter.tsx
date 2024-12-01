import { FC } from "react";

import ReactSpeedometer from "react-d3-speedometer";


interface ServerMeterProps {
  seedValue?: number;
  serverData?: number;
  isBgDark?: boolean;
}

const ServerMeter: FC<ServerMeterProps> = ({ serverData, seedValue, isBgDark }) => {
  return (
    <div>
      <ReactSpeedometer
        value={serverData ?? seedValue}
        minValue={0}
        maxValue={100}
        segments={10}
        needleColor={isBgDark ? "#ffffff" : "#000000"}
        startColor="#4caf50"
        endColor="#f44336"
        height={200}
        ringWidth={20}
      />
    </div>
  );
};

export default ServerMeter;
