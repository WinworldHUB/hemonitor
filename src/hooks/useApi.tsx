import { useState } from "react";
import { API_BASE_URL } from "../constants";


interface APIState<T> {
  data: T | undefined;
  /**
   * API Get method.
   * @param url: Url of the endpoint starting with '/'
   * @returns: Requested object or array of objects
   */
  getData: (url: string) => Promise<T>;
}

const useApi = <T,>(baseUrl?: string): APIState<T> => {
  const [data, setData] = useState<T>();

  /**
   * API Get method.
   * @param url: Url of the endpoint starting with '/'
   * @returns: Requested object or array of objects
   */
  const getData = async (url: string) => {
    try {
      const response = await fetch(`${baseUrl ?? API_BASE_URL}${url}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setData(data);
      return data;
    } catch (error) {
      console.error("GET request failed:", error);
      return undefined; // Propagate the error to the caller
    }
  };

  return { data, getData };
};

export default useApi;
