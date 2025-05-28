import { Application, User, Candidate } from "@/types/types";
import React, { useEffect, useState } from "react";


interface ApplicationDisplayProps {
    candidate?: Candidate | null;
    isLoggedInUser?: boolean;
    sort?: string | null;
}

const ApplicationDisplay: React.FC<ApplicationDisplayProps> = ({ candidate, isLoggedInUser, sort }) => {
    console.log("User prop:", candidate);

    const [sortedList, setSortedList] = useState<Application[]>([]);

    useEffect(() => {
        if (candidate?.applications && !sort) {
            setSortedList([]);
            setSortedList(prev => [...prev, ...candidate.applications]);
        }
        if (sort === "course") {
            const sorting = [...sortedList].sort((a, b) => a.course.name.localeCompare(b.course.name));
            setSortedList(sorting);
        } else if (sort === "availability") {
            const sorting = [...sortedList].sort((a, b) => a.availability.localeCompare(b.availability));
            setSortedList(sorting);
        }

    }, [candidate, sort]);

    // useEffect(() => {
    //     if (user?.jobSummary) {
    //         // Ensure the jobSummary is set initially
    //         setSortedList(user.jobSummary);
    //     }
    // }, [user]);

    useEffect(() => {
        if (sort) {
            const sorted = [...sortedList];

            if (sort === "course") {
                sorted.sort((a, b) => a.course.name.localeCompare(b.course.name));
            } else if (sort === "availability") {
                sorted.sort((a, b) => a.availability.localeCompare(b.availability));
            }

            setSortedList(sorted); // Update the sorted list
        }
    }, [sort, sortedList]); // Re-sort whenever `sort` or `sortedList` changes


    if (!candidate) {
        return <p>No candidate data available.</p>;
    }
    return (
        <ul className="space-y-4">
            {sortedList.map((u, index) => (
                <li key={index} className="border p-4 rounded bg-white">
                    <p><strong>Application Id: </strong>{u.id}</p>
                    <p> <strong>Candidate Id: </strong>{u.candidate.id}</p>
                    {/* <p><strong>Applicant Name: </strong>{u.candidate.user.firstName}</p> */}
                    <p><strong>Course Name: </strong>{u.course.name}</p>
                    <p><strong>Job Role:</strong>{u.role}</p>
                    <p><strong>Previous Role:</strong> {u.previousRole}</p>
                    <p><strong>Availability:</strong> {u.availability}</p>
                    <p><strong>Skills:</strong> {u.skills.join(", ")}</p>
                    <p><strong>Academic Credentials:</strong> {u.academic}</p>
                </li>
            ))}
        </ul>
    )
}

export default ApplicationDisplay;