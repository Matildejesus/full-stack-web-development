import { courseService } from "@/services/api";
import { Course } from "@/types/types";
import React, { useEffect, useState } from "react";

const SubjectList: React.FC = () => {
    const [subjects, setSubjects] = useState<Course[]>([]);
    
    useEffect(() => {
        const fetchCourses = async () => {
            const data = await courseService.getAllCourses();
            setSubjects(data);
            console.log(data);
        };

        if (subjects.length === 0) {
            fetchCourses();
        }
    }, []);

    return (
        <table className="w-[70%] mb-8 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-6 font-serif text-left">Course Code</th>
            <th className="border border-gray-300 p-4 font-serif text-left">Course name</th>
          </tr>
        </thead>
        <tbody>
            {subjects.map((u) => (
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