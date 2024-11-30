import React from "react";
import ServerMeter from "../components/server-meter";
import { Col, Container, Row } from "react-bootstrap";

const Main = () => {
  const getBackgroundColor = (rowIndex, colIndex) => {
    // Black for even row + col, white for odd row + col
    return (rowIndex + colIndex) % 2 === 0 ? "black" : "white";
  };

  const rows = [
    [40, 45],
    [50, 55],
  ];

  return (
    <Container fluid className="App">
      {rows.map((row, rowIndex) => (
        <Row key={rowIndex} className="justify-content-center">
          {row.map((seedValue, colIndex) => (
            <Col
              key={colIndex}
              md={6}
              style={{
                backgroundColor: getBackgroundColor(rowIndex, colIndex),
                color: getBackgroundColor(rowIndex, colIndex) === "black" ? "white" : "black",
                padding: "20px",
              }}
            >
              <ServerMeter seedValue={seedValue} />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Main;
