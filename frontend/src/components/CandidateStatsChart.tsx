import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import type { CandidateStat } from "@/utils/candidateChartData";

interface Props {
  data: CandidateStat[];
}

export default function CandidateStatsChart({ data }: Props) {
  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: "candidate", label: "Candidates" }]}
      yAxis={[{ label: "Selection Count" }]}
      series={[
        { dataKey: "most", label: "Most Chosen",  color: "#4caf50" },
        { dataKey: "least", label: "Least Chosen", color: "#ff9800" },
        { dataKey: "not",   label: "Not Chosen",   color: "#f44336" },
      ]}
      height={400}
    />
  );
}
