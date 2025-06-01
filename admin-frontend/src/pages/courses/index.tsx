import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Course, Semester } from "../../types/types";
import { courseService } from "../../services/api";
import CourseList from "@/components/CourseList";
import CreateCourse from "@/components/CreateCourse";

export default function Courses() {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [semester, setSemester] = useState<Semester>(Semester.ONE);
    const [error, setError] = useState("");
    const [createError, setCreateError] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await courseService.getAllCourses();
            console.log("Data: ", data);
            setCourses(data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleCreateCourse = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const codePattern = /^[A-Z]{4}\d{4}$/;
            if (!codePattern.test(code.toUpperCase())) {
                setCreateError("Code is in wrong format. Ex. COSC1030");
                return;
            }
            await courseService.createCourse({
                name,
                code: code.toUpperCase(),
                semester, 
            }); 
            await fetchCourses();
            setName("");
            setCode("");
            setSemester(Semester.ONE);
           
            console.log("data is refetched: ", courses);

            setIsAdding(false);
            setCreateError("");
        } catch (error) {
            setCreateError("Error creating course.");
        }
    };

    const handleCourseClick = (id: number) => {
        router.push(`/course/${id}`);
    };

    const handleDelete = async (id: number) => {
        setError("");

        try {
            await courseService.deleteCourse(id);
            await fetchCourses();
            router.push("/courses");
        } catch (error) {
            setError("Failed to delete course. Please try again.");
        }
    };

    const createCourseClick = async () => {
        setIsAdding(true);
    }

  return (
    <div className={"min-h-screen p-8 bg-gray-50 text-black"}>
        <div className="max-w-4xl mx-auto">
            {/* <h1 className="text-3xl font-bold mb-8 text-black">Course</h1> */}
            <CourseList 
                courses={courses} 
                onCourseClick={handleCourseClick} 
                handleDelete={handleDelete}
                error={error}
            />
            <CreateCourse
                handleCreateCourse={handleCreateCourse}
                isAdding={isAdding}
                name={name}
                setName={setName}
                code={code}
                setCode={setCode}
                semester={semester}
                setSemester={setSemester}
                createCourseClick={createCourseClick}
                createError={createError}
            />
        </div>
    </div>
  );
}
