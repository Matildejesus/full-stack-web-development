/* ---------- shared types ---------- */
import type { PerCandidateInfo } from "@/hooks/useApplicantStats";

export type CandidateStat = {
  candidate: string;   // name on X-axis
  most: number;        // count shown in green bar
  least: number;       // count shown in orange bar
  not: number;         // count shown in red bar (usually 0)
};

/* ---------- build dataset ---------- */
export function getCandidateStats(
  mostChosen: PerCandidateInfo[],
  leastChosen: PerCandidateInfo[],
  notChosen: PerCandidateInfo[]
): CandidateStat[] {
  const map = new Map<string, CandidateStat>();


  const add = (
    info: PerCandidateInfo,
    key: "most" | "least" | "not"
  ) => {
    const name = info.user.firstName;
    const count = info.applications.reduce(
      (sum, app) => sum + (app.selectedCount ?? 0),
      0
    );

    if (!map.has(name)) {
      map.set(name, { candidate: name, most: 0, least: 0, not: 0 });
    }
    map.get(name)![key] = count; 
  };

  mostChosen.forEach((info) => add(info, "most"));
  leastChosen.forEach((info) => add(info, "least"));
  notChosen.forEach((info) => add(info, "not"));

  return Array.from(map.values());
}
