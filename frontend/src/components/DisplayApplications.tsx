import React from "react";
import { applicationService } from "@/services/api";
import { Application, Availability, Candidate, Role } from "@/types/types";

interface DisplayApplicationsProps {
  userId: number | undefined;
  applications: Application[];
  candidates: Candidate[]
}

const DisplayApplications: React.FC<DisplayApplicationsProps> =
  ({ userId, applications, candidates }) => {
    if (!userId || !candidates || !applications) {
      return <p>Loading user applications...</p>;
    }
    const matchedCandidate = candidates?.find(candidate => candidate?.user?.id === userId);
    const candidateId = matchedCandidate?.id;
    const userApplications = candidateId ? applications.filter(app => app?.candidate?.id === candidateId) : [];

    return (
      <div className="shadow-sm p-8 bg-gray-100 border-2 border-gray-400">
        <p className="text-2xl font-serif text-center">Submitted Applications</p>

        {userApplications.length === 0 ? (
          <p className="text-center text-gray-500">No applications submitted yet.</p>
        ) : (
          userApplications.map((application, index) => (
            <div key={index} className="p-4 mt-4 border rounded bg-white shadow">
              <h3 className="font-semibold text-xl mb-2">Job Role: {application.role}</h3>
              <p className="text-gray-800">Skills: {application.skills}</p>
              <p className="text-gray-800">Availability: {application.availability}</p>
              <p className="text-gray-800">Highest Academic Qualification: {application.academic}</p>
              <p className="text-gray-800">Course Name: {application.course.name}</p>
              <p className="text-gray-800">Semester: {application.course.semester}</p>
              <p className="text-gray-800">Previous Role: {application.previousRole}</p>
            </div>
          ))
        )}
      </div>
    );
  };

export default DisplayApplications;
