import React from "react";
import { Application, Candidate } from "@/types/types";
import { useApplicationList } from "@/hooks/useApplicationList";

interface ApplicationDisplayProps {
  applications?: Application[] | null;
  // sort?: string | null;
  // lecturerCourseIds: number[];
}

const ApplicationDisplay: React.FC<ApplicationDisplayProps> = ({
  applications,
  // sort,
  // lecturerCourseIds,
}) => {

  // const applications = useApplicationList(candidate, sort, lecturerCourseIds);

  if (!applications) return <p>No candidate data available.</p>;

  return (
    <ul className="space-y-6">
      {applications.map(app => (
        <li
          key={app.id}
          className="flex gap-4 p-5 rounded-2xl shadow-sm bg-white border"
        >
          {app.candidate.user.avatarUrl && (
            <img
              src={app.candidate.user.avatarUrl}
              className="w-16 h-16 rounded-full object-cover border border-gray-300 shrink-0"
            />
          )}

          <div className="space-y-1 text-sm">
            <p>
              <span className="font-semibold">Application ID:</span> {app.id}
            </p>
            <p>
              <span className="font-semibold">Course:</span> {app.course.code} 
            </p>
            <p>
              <span className="font-semibold">Job Role:</span> {app.role}</p>
            <p>
              <span className="font-semibold">Previous Role:</span>{" "}
              {app.previousRole}
            </p>
            <p>
              <span className="font-semibold">Availability:</span>{" "}
              {app.availability}
            </p>
            <p>
              <span className="font-semibold">Skills:</span>{" "}
              {app.skills.join(", ")}
            </p>
            <p>
              <span className="font-semibold">Academic:</span> {app.academic}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ApplicationDisplay;
