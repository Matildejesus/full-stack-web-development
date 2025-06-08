import { LecturerSelection, Candidate, Application, AppRole } from "@/types/types";

interface ApplicationDisplayProps {
  candidate: Candidate;
  application: Application; // single application to show
  sort?: string | null;
  lecturerCourseIds: number[];
}

const ApplicationDisplay: React.FC<ApplicationDisplayProps> = ({
  candidate,
  application,
  sort,
  lecturerCourseIds,
}) => {
  if (!candidate || !application) return <p>No data available.</p>;

  // Render details for this single application
  return (
    <ul className="space-y-6">
      <li
        key={application.id}
        className="flex gap-4 p-5 rounded-2xl shadow-sm bg-white border"
      >
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-semibold">Application ID:</span> {application.id}
          </p>
          <p>
            <span className="font-semibold">Course:</span> {application.course.name}
          </p>
          <p>
            <span className="font-semibold">Job Role:</span> {application.role}
          </p>
          <p>
            <span className="font-semibold">Previous Role:</span> {application.previousRole}
          </p>
          <p>
            <span className="font-semibold">Availability:</span> {application.availability}
          </p>
          <p>
            <span className="font-semibold">Skills:</span> {application.skills.join(", ")}
          </p>
          <p>
            <span className="font-semibold">Academic:</span> {application.academic}
          </p>
        </div>
      </li>
    </ul>
  );
};

export default ApplicationDisplay;
