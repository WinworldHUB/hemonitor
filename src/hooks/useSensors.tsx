import {useState } from "react";
import useApi from "./useApi";

interface useSensorsProps {
  data: number[];
  fetchSensorData: VoidFunction;
}


const useSensors = (seedValues: number[]): useSensorsProps => {
  const { getData } = useApi<{ value: number }>();
  const [data, setData] = useState<number[]>([]);
  

  const fetchSensorData = async () =>  { 
    try {
      const results = await Promise.all(
        seedValues.map(async (seedValue) => {
          const response = await getData(`/api/getValue/${seedValue}`);
          return response.value;
        })
      );

      setData([...results]);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
      setData([]);
    };
  };

  return {
    data,
    fetchSensorData
  };
}

export default useSensors;
