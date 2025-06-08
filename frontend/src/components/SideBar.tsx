import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Course } from "@/types/types";
import { courseService, LecturerCoursesResponse } from "@/services/api";

interface SidebarProps {
  courses: LecturerCoursesResponse[];
  onClick: (subject: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ courses, onClick }) => {
  return (
    <aside className="bg-gray-100 p-4 w-64">
      <nav>
        <ul className="space-y-2">
        {courses.map((u) => (
          <li key={u.id}  onClick={() => onClick(u.course.name)} className="hover:bg-gray-200 p-2 rounded">{u.course.code} {u.course.name}</li>
        ))}
        <li key={"all"}  onClick={() => onClick("all")} className="hover:bg-gray-200 p-2 rounded">All Applications</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;