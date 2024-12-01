import React, { useEffect, useState } from "react";
import ServerMeter from "../components/server-meter";
import { Col, Container, Row } from "react-bootstrap";
import LineChart, { TimeLineData } from "../components/line-chart";
import useSensors from "../hooks/useSensors";
import { DateTime } from "luxon";

const THRESHOLD = 25;

const Main = () => {
  const getBackgroundColor = (rowIndex, colIndex) => {
    // Black for even row + col, white for odd row + col
    return (rowIndex + colIndex) % 2 === 0 ? "black" : "white";
  };

  const rows = [
    [
      { index: 0, label: "Server 1", seed: 40 },
      { index: 1, label: "Server 2", seed: 45 },
    ],
    [
      { index: 2, label: "Server 3", seed: 50 },
      { index: 3, label: "Server 4", seed: 55 },
    ],
  ];

  // Flatten the rows to extract all seed values
  const seedValues = rows.flat().map((server) => server.seed);
  const { data: sensorsData, fetchSensorData } = useSensors(seedValues);
  
  const [timeLineData, setTimeLineData] = useState<TimeLineData[]>([]);

  console.log("serverData", sensorsData);
  
  const getSensorData = () => { 
    fetchSensorData();
    const seriesLength = timeLineData.length;
    const series = seriesLength < THRESHOLD ? timeLineData : timeLineData.splice(seriesLength - THRESHOLD, seriesLength);

    setTimeLineData([...series, {
      label: DateTime.now().toFormat("hh:mm:ss"),
      server1Value: sensorsData[0],
      server2Value: sensorsData[1],
      server3Value: sensorsData[2],
      server4Value: sensorsData[3],
    }]);
  }


  useEffect(() => { 
    setInterval(getSensorData, 1000);
  }, []);

  // Map server data to TimeLineData format

  return (
    <Container fluid className="App">
      {rows.map((row, rowIndex) => (
        <Row key={rowIndex} className="justify-content-center">
          {row.map((server, colIndex) => {

            return (
              <Col
                key={colIndex}
                md={6}
                className="d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: getBackgroundColor(rowIndex, colIndex),
                  color:
                    getBackgroundColor(rowIndex, colIndex) === "black"
                      ? "white"
                      : "black",
                  padding: "20px",
                }}
              >
                <ServerMeter
                  isBgDark={getBackgroundColor(rowIndex, colIndex) === "black"}
                  seedValue={server.seed}
                  serverData={sensorsData[server.index]}
                />
              </Col>
            );
          })}
        </Row>
      ))}
      <Row>
        <Col>
          <LineChart data={timeLineData} />
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
