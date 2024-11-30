import { FC, useEffect } from "react";
import useApi from "../hooks/useApi";
import ReactSpeedometer from "react-d3-speedometer";

interface ServerMeterProps {
  seedValue: number;
}

const ServerMeter: FC<ServerMeterProps> = ({ seedValue }) => {
  const { data, getData } = useApi<{ value: number }>();

  const fetchData = async () => {
    const data = await getData(`/api/getValue/${seedValue}`);
    console.log(data);
  };

  useEffect(() => {
    window.setInterval(fetchData, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReactSpeedometer
      value={data?.value ?? seedValue}
      minValue={0}
      maxValue={100}
      segments={3}
      customSegmentStops={[0, 40, 60, 100]}
      segmentColors={["#a3be8c", "#ebcb8b", "#bf616a"]}
      needleColor={"#6046f2"}
    />
  );
};

export default ServerMeter;
