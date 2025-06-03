import { Application, Candidate } from "@/types/types";
import React, { useEffect, useState } from "react";

interface ApplicationDisplayProps {
    candidate?: Candidate | null;
    isLoggedInUser?: boolean;
    sort?: string | null;
    lecturerCourseIds: number[];
}

const ApplicationDisplay: React.FC<ApplicationDisplayProps> = ({ candidate, sort, lecturerCourseIds }) => {
    const [sortedList, setSortedList] = useState<Application[]>([]);

    useEffect(() => {
        if (!candidate?.applications) {
            setSortedList([]);
            return;
        }

        let applications = candidate.applications.filter(app => 
            lecturerCourseIds.includes(app.course.id)
        );

        if (sort === "course") {
            applications.sort((a, b) => a.course.name.localeCompare(b.course.name));
        } else if (sort === "availability") {
            applications.sort((a, b) => a.availability.localeCompare(b.availability));
        }

        setSortedList(applications);
    }, [candidate, sort, lecturerCourseIds]);

    if (!candidate) {
        return <p>No candidate data available.</p>;
    }

    return (
        <ul className="space-y-4">
            {sortedList.map((u, index) => (
                <li key={index} className="border p-4 rounded bg-white">
                    <p><strong>Application Id: </strong>{u.id}</p>
                    <p><strong>Candidate Id: </strong>{u.candidate.id}</p>
                    <p><strong>Course Name: </strong>{u.course.name}</p>
                    <p><strong>Job Role:</strong> {u.role}</p>
                    <p><strong>Previous Role:</strong> {u.previousRole}</p>
                    <p><strong>Availability:</strong> {u.availability}</p>
                    <p><strong>Skills:</strong> {u.skills.join(", ")}</p>
                    <p><strong>Academic Credentials:</strong> {u.academic}</p>
                </li>
            ))}
        </ul>
    );
};

export default ApplicationDisplay;
