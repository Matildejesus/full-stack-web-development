import { useState, useEffect } from "react";
import {
  applicationService,
  candidateService,
  courseService,
} from "@/services/api";
import { Application, Candidate, Course } from "@/types/types";
import { useAuth } from "@/context/AuthContext";

export function useApplicationsData() {
  const { user } = useAuth();

  /* ---------- shared state ---------- */
  const [candidates,  setCandidates]  = useState<Candidate[]>([]);
  const [applications,setApplications]= useState<Application[]>([]);
  const [courses,     setCourses]     = useState<Course[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);

  /* ---------- load on mount ---------- */
  useEffect(() => {
    const load = async () => {
      try {
        const [cands, apps, crs] = await Promise.all([
          candidateService.getAllCandidates(),
          applicationService.getAllApplications(),
          courseService.getAllCourses(),
        ]);
        setCandidates(cands);
        setApplications(apps);
        setCourses(crs);
      } catch (err) {
        console.error(err);
        setError("Could not fetch applications");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const refreshApps = async () => {
    try {
      const data = await applicationService.getAllApplications();
      setApplications(data);
    } catch {
      setError("Could not refresh applications");
    }
  };

  const meAsCandidate = candidates.find(c => c.user.id === user?.id);

  return {
    loading,
    error,
    courses,
    applications,
    candidates,
    meAsCandidate,
    refreshApps,
  };
}
