import { useState } from "react";
import useApi from "./useApi";

interface useSensorsProps {
  data: number[];
  fetchSensorData: () => Promise<number[]>;
}

const useSensors = (seedValues: number[]): useSensorsProps => {
  const { getData } = useApi<{ value: number }>();
  const [data, setData] = useState<number[]>([]);

  const fetchSensorData = async (): Promise<number[]> => {
    try {
      const results = await Promise.all(
        seedValues.map(async (seedValue) => {
          const response = await getData(`/api/getValue/${seedValue}`);
          return response.value;
        })
      );

      setData([...results]);
      return Promise.resolve([...results]);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
      setData([]);
      return Promise.reject([]);
    }
  };

  return {
    data,
    fetchSensorData,
  };
};

export default useSensors;
