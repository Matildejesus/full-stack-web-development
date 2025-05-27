import { Course } from "../types/types";

interface CourseListProps {
  courses: Course[];
  // onCourseClick: (courseId: number) => void;
}

export default function CourseList({ courses }: CourseListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-black">Courses</h2>
      <div className="space-y-2">
        {courses.map((u) => (
          <div
            key={u.id}
            className="p-3 border rounded hover:bg-gray-50 cursor-pointer text-black"
            // onClick={() => onCourseClick(u.id)}
          >
            <h3 className="font-medium text-black">{u.name}</h3>
            <p className="text-xs text-gray-400">Code: {u.code}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
