import { useAuth } from "@/context/AuthContext";
import { User,Application } from "@/types/types";
import { useState, useEffect } from "react";
interface PerCandidateInfo {
  user: User;
  courseRoles: string[];          
}
interface Stats {
  mostChosen: User[];
  mostChosenCount: number;
  leastChosen: User[];
  leastChosenCount: number;
  notChosen: User[];
  byCandidate: Record<number, PerCandidateInfo>; 
}
export function useApplicantStats(): Stats {
  const { cUsers, assignedApplications, candidatesLec } = useAuth();

  const [stats, setStats] = useState<Stats>({
    mostChosen: [],
    mostChosenCount: 0,
    leastChosen: [],
    leastChosenCount: 0,
    notChosen: [],
    byCandidate: {}
  });

  useEffect(() => {
    if (!assignedApplications.length) {
      setStats({
        mostChosen: [],
        mostChosenCount: 0,
        leastChosen: [],
        leastChosenCount: 0,
        notChosen: [],
        byCandidate: {}
      });
      return;
    }

    const byCandidate: Record<number, PerCandidateInfo> = {};
    const countMap: Record<number, number> = {};

    assignedApplications.forEach(app => {
      const cid = app.candidate.id;
      const label = `${app.course.name} – ${app.role}`;
      countMap[cid] = (countMap[cid] || 0) + (app.selectedCount ?? 0);

      const u = cUsers.find(u => u.candidate?.id === cid);
      if (!u) return;

      if (!byCandidate[cid]) {
        byCandidate[cid] = { user: u, courseRoles: [label] };
      } else if (!byCandidate[cid].courseRoles.includes(label)) {
        byCandidate[cid].courseRoles.push(label);
      }
    });

    const allCounts = Object.values(countMap);
    const max = Math.max(...allCounts);
    const nonZeroCounts = allCounts.filter(c => c > 0);
    const minNonZero = nonZeroCounts.length > 1 ? Math.min(...nonZeroCounts) : Infinity;

    const most: User[] = [];
    const least: User[] = [];
    const not: User[] = [];

    candidatesLec.forEach(cand => {
      const cid = cand.id;
      const tot = countMap[cid] ?? 0;
      const u = cUsers.find(u => u.candidate?.id === cid);
      if (!u) return;

      if (tot === 0) {
        not.push(u);
      } else {
        if (tot === max) most.push(u);

        if (tot === minNonZero && minNonZero !== Infinity && minNonZero !== max) {
          least.push(u);
        }      }
    });

    setStats({
      mostChosen: most,
      mostChosenCount: max,
      leastChosen: least,
      leastChosenCount: least.length ? minNonZero : 0,
      notChosen: not,
      byCandidate
    });
  }, [assignedApplications, candidatesLec, cUsers]);

  return stats;
}
