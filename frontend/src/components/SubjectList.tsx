import { Course } from "@/types/types";
import React from "react";

/**
 * Presenter Component:
 * Handles UI rendering related to:
 *   - Displaying The Subjects available in the semester
 * 
 * Receives props from SignIn (container)
 */

interface SubjectListProps {
    courses: Course[];
}

const SubjectList: React.FC<SubjectListProps> = ({ courses }) => {
    return (
        <table className="w-[70%] mb-8 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-6 font-serif text-left">Course Code</th>
            <th className="border border-gray-300 p-4 font-serif text-left">Course name</th>
          </tr>
        </thead>
        <tbody>
            {courses.map((u) => (
                <tr  key={u.id}>
                    <td className="border border-gray-300 p-6 font-serif text-left">{u.code}</td>
                    <td className="border border-gray-300 p-1 font-serif text-left">{u.name}</td>
            </tr>
                ))}
        </tbody>
    </table>
    )
    
}

export default SubjectList;