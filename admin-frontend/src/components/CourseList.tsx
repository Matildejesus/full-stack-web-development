import { Button, Text } from "@chakra-ui/react";
import { Course } from "../types/types";

interface CourseListProps {
    courses: Course[];
    onCourseClick: (courseId: number) => void;
    handleDelete: (id: number) => void;
    error: string;
}

export default function CourseList({ courses, onCourseClick, handleDelete, error }: CourseListProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-black">Courses</h2>
        <div className="space-y-2">
            {courses.map((u) => (
            <div
                key={u.id}
                className="p-3 border rounded hover:bg-gray-50 cursor-pointer text-black flex flex-row justify-between"
            >
                <div>
                    <h3 className="font-medium text-black">{u.name}</h3>
                    <p className="text-xs text-gray-400">Code: {u.code}</p>
                </div>
                <div className="justify-end flex gap-10">
                     <Button
                        type="button" className="z-50 px-6 py-4"
                        onClick={() => onCourseClick(u.id)}
                    >
                        Update
                    </Button>
                    <Button
                        type="button" className="z-50 px-6 py-4"
                        onClick={() => handleDelete(u.id)}
                    >
                        Delete
                    </Button>
                </div>
            </div>
            ))}
             <Text color="red.500">{error}</Text>
        </div>
        </div>
    );
}
