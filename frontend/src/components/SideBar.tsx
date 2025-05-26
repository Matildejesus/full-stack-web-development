import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Course } from "@/types/types";
import { courseService } from "@/services/api";

interface SidebarProps {
  onClick: (subject: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClick }) => {
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
    <aside className="bg-gray-100 p-4 w-64">
      <nav>
        <ul className="space-y-2">
        {subjects.map((u) => (
          <li key={u.id}  onClick={() => onClick(u.name)} className="hover:bg-gray-200 p-2 rounded">{u.code} {u.name}</li>
        ))}
        <li key={"all"}  onClick={() => onClick("all")} className="hover:bg-gray-200 p-2 rounded">All Applications</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;