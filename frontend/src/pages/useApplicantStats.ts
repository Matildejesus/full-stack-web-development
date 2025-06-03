import { useAuth } from "@/context/AuthContext";
import { LecturerSelection, User, Candidate, Application ,Lecturer, Course} from "@/types/types";
import { useState, useEffect } from "react";

interface useApplicantStatsResult {
  mostChosen: User[];
  mostChosenCount: number;
  leastChosen: User[];
  leastChosenCount: number;
  notChosen: User[];
}

export function useApplicantStats(): useApplicantStatsResult {
  const [mostChosen, setMostChosen] = useState<User[]>([]);
  const [leastChosen, setLeastChosen] = useState<User[]>([]);
  const [notChosen, setNotChosen] = useState<User[]>([]);
  const [mostChosenCount, setMostChoseCount] = useState<number>(0);
  const [leastChosenCount, setLeastChosenCount] = useState<number>(0);
  const { user } = useAuth();

  useEffect(() => {
    let count = 0;
    let minCount = 0;
    let maxCount = 0;

    user?.forEach((u) => {
        if (u.role === "Tutor") {
        u.jobSummary.forEach((summary) => {
          count += summary.selectedCount;
        });
        
        if (count === 0) {
          setNotChosen((prev) => [...prev, u]);
        }
        else {
          if (maxCount === 0 && minCount == 0) {
            maxCount = count;
            minCount = count;
            setMostChosen((prev) => [...prev, u]);
            setLeastChosen((prev) => [...prev, u]);
          } else if (count > maxCount) {
            maxCount = count;
            setMostChosen([u]);
          } else if (count === maxCount) {
            setMostChosen((prev) => [...prev, u]);
          } else if (count < minCount) {
            minCount = count;
            setLeastChosen([u]);
          } else if (count === minCount) {
            setLeastChosen((prev) => [...prev, u]);
          }
        }
      count = 0;
        }
    });

    setMostChoseCount(maxCount);
    setLeastChosenCount(minCount);
  }, [users]);

  return {
    mostChosen,
    mostChosenCount,
    leastChosen,
    leastChosenCount,
    notChosen,
  };
}
