import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
type CourseStat = {
  course: string;
  most: number;
  least: number;
  not: number;
};

interface CourseStatsChartProps {
  data: CourseStat[];
}
export default function CourseStatsChart({ data }: CourseStatsChartProps) {
  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'course', label: 'Courses' }]} // X-axis = course names
      yAxis={[{ label: 'Selection Count' }]}             // Y-axis = counts
      series={[
        { dataKey: 'most', label: 'Most Chosen', color: '#4caf50' },
        { dataKey: 'least', label: 'Least Chosen', color: '#ff9800' },
        { dataKey: 'not', label: 'Not Chosen', color: '#f44336' },
      ]}
      height={400}
    />
  );
}
