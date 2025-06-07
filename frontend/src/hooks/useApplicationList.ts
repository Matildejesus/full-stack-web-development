import { useEffect, useState } from "react";
import { Application, Candidate } from "@/types/types";

export function useApplicationList(
  candidate: Candidate | null | undefined,
  sort: string | null | undefined,
  lecturerCourseIds: number[]
) {
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    if (!candidate?.applications?.length) {
      setApps([]);
      return;
    }

    //  filter: only apps that belong to this lecturer’s courses
    let filtered = candidate.applications.filter(app =>
      lecturerCourseIds.includes(app.course.id)
    );

    // sorting
    if (sort === "course") {
      filtered.sort((a, b) => a.course.name.localeCompare(b.course.name));
    } else if (sort === "availability") {
      filtered.sort((a, b) => a.availability.localeCompare(b.availability));
    }

    setApps(filtered);
  }, [candidate, sort, lecturerCourseIds]);

  return apps;
}
