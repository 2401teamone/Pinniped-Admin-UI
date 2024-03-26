import { useState, useEffect } from "react";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { format } from "date-fns";

export default function Chart({ data }) {
  const [chartWidth, setChartWidth] = useState(0);
  const groupData = (data) => {
    // Sort data by timestamp
    data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // Group data by 12-hour intervals
    const groupedData = data.reduce((result, item) => {
      const timestamp = new Date(item.timestamp);
      const hour = timestamp.getHours();
      const timeBucket = new Date(
        timestamp.getFullYear(),
        timestamp.getMonth(),
        timestamp.getDate(),
        hour >= 12 ? hour - 12 : hour
      );

      if (!result[timeBucket]) {
        result[timeBucket] = {
          timeBucket,
          formattedTimeBucket: format(timeBucket, "M/d/yy hh a"),
          count: 0,
        };
      }

      result[timeBucket].count++;

      return result;
    }, {});

    const chartData = Object.values(groupedData);

    return chartData;
  };

  const chartData = groupData(data);

  useEffect(() => {
    const determineWidth = () => {
      const chartContainer = document.querySelector(".chart");
      const chartContainerWidth = chartContainer.offsetWidth;
      const chartWidth = chartContainerWidth - 100;
      setChartWidth(chartWidth);
    };

    determineWidth();

    window.addEventListener("resize", determineWidth);

    return () => {
      window.removeEventListener("resize", determineWidth);
    };
  }, []);

  return (
    <LineChart
      width={chartWidth}
      height={400}
      data={chartData}
      margin={{ top: 5, right: 5, tottom: 5, left: 5 }}
    >
      <Line
        type="natural"
        dataKey="count"
        stroke="rgba(215, 122, 97, 0.5)"
        dot={false}
        strokeWidth={2}
      />
      <XAxis dataKey="formattedTimeBucket" />
      <YAxis interval={1} />
      <Tooltip />
    </LineChart>
  );
}
