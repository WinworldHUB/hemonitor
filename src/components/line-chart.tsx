"use client";
import { Line } from "react-chartjs-2";
import { defaults } from "chart.js/auto";
import { FC } from "react";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "white";

export type TimeLineData = {
  label: string;
  server1Value: number;
  server2Value: number;
  server3Value: number;
  server4Value: number;
};

interface LineChartProps {
  data: TimeLineData[];
}

const LineChart: FC<LineChartProps> = ({ data }) => {
  console.log(data);

  return (
    <div>
      <Line
        style={{ height: "500px", width: "100%   " }}
        data={{
          //labels: revenueData.map((data) => data.label),
          labels: data.map((data) => data.label),
          datasets: [
            {
              label: data[0]?.label,
              //data: revenueData.map((data) => data.revenue),
              data: data.map((data) => data.server1Value),
              backgroundColor: "#000",
              borderColor: "#000",
            },
            {
              label: data[1]?.label,
              //data: revenueData.map((data) => data.revenue),
              data: data.map((data) => data.server2Value),
              backgroundColor: "#ffc000",
              borderColor: "#ffc000",
            },
            {
              label: data[2]?.label,
              //data: revenueData.map((data) => data.revenue),
              data: data.map((data) => data.server3Value),
              backgroundColor: "#03f8fc",
              borderColor: "#03f8fc",
            },
            {
              label: data[3]?.label,
              //data: revenueData.map((data) => data.revenue),
              data: data.map((data) => data.server4Value),
              backgroundColor: "#03fc52",
              borderColor: "#03fc52",
            },
          ],
        }}
        options={{
          elements: {
            line: {
              tension: 0.5,
            },
          },
          plugins: {
            title: {
              text: "Monthly Revenue & Cost",
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
