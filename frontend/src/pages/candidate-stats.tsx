import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApplicantStats } from "@/hooks/useApplicantStats";
import { getCandidateStats } from "@/utils/candidateChartData";
import CandidateStatsChart from "@/components/CandidateStatsChart";

export default function CandidateStatsPage() {
  const { mostChosen, leastChosen, notChosen } = useApplicantStats();
  const data = getCandidateStats(mostChosen, leastChosen, notChosen);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">Candidate Selection Stats</h1>
        <CandidateStatsChart data={data} />
      </main>

      <Footer />
    </div>
  );
}
