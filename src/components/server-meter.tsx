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
    <div>
      <ReactSpeedometer
        value={data?.value ?? seedValue}
        minValue={0}
        maxValue={100}
        segments={5}
        customSegmentStops={[0, 20, 40, 60, 80, 100]}
        segmentColors={["#4caf50", "#9ff089", "#fdd835", "#ffb300", "#f44336"]}
        needleColor={"#6046f2"}
        height={200}
      />
    </div>
  );
};

export default ServerMeter;
