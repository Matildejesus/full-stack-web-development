// here most chosen ,leastchosen and not chosen is based on the selection count on applications of courses
// that is assiogned to the lecturer
import { useAuth } from "@/context/AuthContext";
import { User, Application } from "@/types/types";
import { useState, useEffect } from "react";
export interface PerCandidateInfo {
  user: User;
  applications: Application[];
}
interface Stats {
  mostChosen: PerCandidateInfo[];
  mostChosenCount: number;
  leastChosen: PerCandidateInfo[];
  leastChosenCount: number;
  notChosen: PerCandidateInfo[];
}
export function useApplicantStats(): Stats {
  const { cUsers, assignedApplications, candidatesLec } = useAuth();

  const [stats, setStats] = useState<Stats>({
    mostChosen: [],
    mostChosenCount: 0,
    leastChosen: [],
    leastChosenCount: 0,
    notChosen: [],
  });

  useEffect(() => {
    if (!assignedApplications.length) {
      setStats({
        mostChosen: [],

        mostChosenCount: 0,
        leastChosen: [],
        leastChosenCount: 0,
        notChosen: [],
      });
      return;
    }

    const byCandidate: Record<number, PerCandidateInfo> = {};
    const countMap: Record<number, number> = {};

    assignedApplications.forEach(app => {
      const cid = app.candidate.id;
      countMap[cid] = (countMap[cid] || 0) + (app.selectedCount ?? 0);

      const user = cUsers.find(u => u.candidate?.id === cid);
      if (!user) return;

      if (!byCandidate[cid]) {
        byCandidate[cid] = { user, applications: [app] };
      } else {
        byCandidate[cid].applications.push(app);
      }

    });

    const allCounts = Object.values(countMap);
    const max = Math.max(...allCounts);
    const nonZeroCounts = allCounts.filter(c => c > 0);
    const minNonZero = nonZeroCounts.length > 1 ? Math.min(...nonZeroCounts) : Infinity;

    const most: PerCandidateInfo[] = [];
    const least: PerCandidateInfo[] = [];
    const not: PerCandidateInfo[] = [];

    Object.entries(byCandidate).forEach(([cidStr, info]) => {
      const cid = Number(cidStr);
      const total = countMap[cid] ?? 0;

      if (total === max) {
        most.push(info);
      } else if (total === minNonZero && minNonZero !== Infinity && minNonZero !== max) {
        least.push(info);
      }
      else if (total === 0) {
        not.push(info)
      }
    });

    setStats({
      mostChosen: most,
      mostChosenCount: max,
      leastChosen: least,
      leastChosenCount: least.length ? minNonZero : 0,
      notChosen: not,
    });
  }, [assignedApplications, candidatesLec, cUsers]);

  return stats;
}
