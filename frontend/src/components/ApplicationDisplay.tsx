import { Application, User } from "@/types/types";
import React, { useEffect, useState } from "react";


interface ApplicationDisplayProps {
    user?: User | null;
    isLoggedInUser?: boolean;
    sort?: string | null;
}

const ApplicationDisplay: React.FC<ApplicationDisplayProps> = ({user, isLoggedInUser, sort}) => {
    console.log("User prop:", user);

    const [sortedList, setSortedList] = useState<Application[]>([]);

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
                 <p className="text-gray-800">Applicant Name: {u.userApplicant?.firstName}{" "}{u.userApplicant?.lastName}</p>
                        <p className="text-gray-800">ApplicantEmail: {u.email}</p>
                <p><strong>Course Name: </strong>{u.course}</p>
                <p><strong>Previous Role:</strong> {u.previousRole}</p>
                <p><strong>Availability:</strong> {u.availability}</p>
                <p><strong>Skills:</strong> {u.skills.join(", ")}</p>
                <p><strong>Academic Credentials:</strong> {u.academic}</p>
            </li>
            ))}
        </ul>
         {sortedList.map((u,index) => (
                        <div key={index} className="p-4 border rounded">
                          <p className="text-gray-800">Applicant Name: {u.userApplicant?.firstName}{" "}{u.userApplicant?.lastName}</p>
                          <p className="text-gray-800">ApplicantEmail: {u.email}</p>
                          <p className="text-gray-800">JobRole: {u.jobRole}</p>
                          <p className="text-gray-800">Skills: {u.skills}</p>
                          <p className="text-gray-800">Availability: {u.availability}</p>
                          <p className="text-gray-800 mt-2">Highest Academic Qualification:{u.academic}</p>
                          <p className="text-gray-800">Course Name: {u.course_Name}</p>
                          <p className="text-gray-800">Previous Role: {u.previousRole}</p>
                          
                        </div>
                      ))}
        
    )
}

export default ApplicationDisplay;