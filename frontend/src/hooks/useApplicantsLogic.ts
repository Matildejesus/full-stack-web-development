import { useEffect, useState } from "react";
import { Candidate, LecturerSelection } from "@/types/types";

export function useApplicantsLogic(
  filteredCandidates: Candidate[],
  sort: string | null,
  lecturerCourseIds: number[]
) {
  const [sortedList, setSortedList] = useState<Candidate[]>([]);

  // Sorting and setting candidates
  useEffect(() => {
    let sorting = [...filteredCandidates];
    
    if (sort === "availability") {
      sorting.sort((a, b) => {
        const aAvail = a.applications[0]?.availability || "";
        const bAvail = b.applications[0]?.availability || "";
        return aAvail.localeCompare(bAvail);
      });
    }

    setSortedList(sorting);
  }, [filteredCandidates, sort]);

  // Filtering based on lecturer courses
  const filteredByLecturerCourses = sortedList.filter(candidate =>
    candidate.applications.some(app => lecturerCourseIds.includes(app.course.id))
  );

  return {
    filteredByLecturerCourses
  };
}
