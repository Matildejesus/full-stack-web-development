import { JobSummary } from "@/types/JobSummary";
import { User } from "@/types/user";
import React, { useEffect, useState } from "react";


interface ApplicationDisplayProps {
    user?: User | null;
    isLoggedInUser?: boolean;
    sort?: string | null;
}

const ApplicationDisplay: React.FC<ApplicationDisplayProps> = ({user, isLoggedInUser, sort}) => {
    console.log("User prop:", user);
    console.log("User Job Application Summary:", user?.jobSummary);

    const [sortedList, setSortedList] = useState<JobSummary[]>([]);

    useEffect(() => {
        if (user?.jobSummary && !sort) {
            setSortedList([]);
            setSortedList(prev => [...prev, ...user.jobSummary]);
        }
        if (sort === "course") {
            const sorting = [...sortedList].sort((a, b) => a.course.localeCompare(b.course));
            setSortedList(sorting);
        } else if (sort === "availability") {
            const sorting = [...sortedList].sort((a, b) => a.availability.localeCompare(b.availability));
            setSortedList(sorting);
        }

    }, [user, sort]);

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
                sorted.sort((a, b) => a.course.localeCompare(b.course));
            } else if (sort === "availability") {
                sorted.sort((a, b) => a.availability.localeCompare(b.availability));
            }

            setSortedList(sorted); // Update the sorted list
        }
    }, [sort, sortedList]); // Re-sort whenever `sort` or `sortedList` changes


    if (!user) {
        return <p>No user data available.</p>; 
    }
    return(
        <ul className="space-y-4">
        {sortedList.map((u, index) => (
            <li key={index} className="border p-4 rounded bg-white">
                <p><strong>Course Name: </strong>{u.course}</p>
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