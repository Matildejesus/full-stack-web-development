import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseStatsChart from '@/components/CourseStatsChart';
import { useApplicantStats } from '@/hooks/useApplicantStats';
import { getCourseStats } from '@/utils/chartData';

export default function CourseStatsPage() {
  const { mostChosen, leastChosen, notChosen } = useApplicantStats();
  const courseStats = getCourseStats(mostChosen, leastChosen, notChosen);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">Course Statistics - Shows the no of chosen, least chosen and not chosen applicants based on selection</h1>
        <CourseStatsChart data={courseStats} />
      </main>
      <Footer />
    </div>
  );
}
