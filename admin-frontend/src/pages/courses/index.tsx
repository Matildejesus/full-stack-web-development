import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Course, Semester } from "../../types/types";
import { courseService } from "../../services/api";
import CourseList from "@/components/CourseList";
import CreateCourse from "@/components/CreateCourse";
import ButtonComp from "@/components/ButtonComp";
import { useToast } from "@chakra-ui/react";

/**
 * Container Component:
 * Handles business logic related to:
 *    - Fetching courses data 
 *    - Managing form states
 *    - Handling adding/editing/deleting of courses 
 *    - Rerouting to course profile and candidate list
 * 
 * Passes props to CourseList, CreateCourse, ButtonComp (presenter)
 */

export default function Courses() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [semester, setSemester] = useState<Semester>(Semester.ONE);
    const [semOneCourses, setSemOneCourses] = useState<Course[]>([]);
    const [semTwoCourses, setSemTwoCourses] = useState<Course[]>([]);
    const [semBothCourses, setSemBothCourses] = useState<Course[]>([]);
    const [error, setError] = useState("");
    const [createError, setCreateError] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    const toast = useToast();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await courseService.getAllCourses();
            setSemOneCourses(data.filter(data => data.semester === Semester.ONE));
            setSemTwoCourses(data.filter(data => data.semester === Semester.TWO));
            setSemBothCourses(data.filter(data => data.semester === Semester.BOTH));
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
            const created = await courseService.createCourse({
                name,
                code: code.toUpperCase(),
                semester, 
            }); 
            await fetchCourses();
            setName("");
            setCode("");
            setSemester(Semester.ONE);

            setIsAdding(false);
            setCreateError("");
            if (created) {
                toast({
                    title: "Course Added",
                    description: "Successfully created a course",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
            
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
            const deleted =await courseService.deleteCourse(id);
            await fetchCourses();
            if (deleted) {
                toast({
                    title: "Course Deleted",
                    description: "Successfully deleted a course",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                router.push("/courses");
            }
            
            
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
            <CourseList 
                courses={semOneCourses} 
                title="Semester One Courses"
                onCourseClick={handleCourseClick} 
                handleDelete={handleDelete}
                error={error}
            />
            <CourseList 
                courses={semTwoCourses}
                title="Semester Two Courses" 
                onCourseClick={handleCourseClick} 
                handleDelete={handleDelete}
                error={error}
            />
            <CourseList 
                courses={semBothCourses}
                title="Available All Year Courses" 
                onCourseClick={handleCourseClick} 
                handleDelete={handleDelete}
                error={error}
            />            
            <div className="flex-row flex">
                <CreateCourse
                    handleCreateCourse={handleCreateCourse}
                    isAdding={isAdding}
                    currentEvent="create"
                    name={name}
                    setName={setName}
                    code={code}
                    setCode={setCode}
                    semester={semester}
                    setSemester={setSemester}
                    createCourseClick={createCourseClick}
                    createError={createError}
                />
                <div className="ml-auto mt-3">
                    <ButtonComp
                        handleRouter={() => router.push("/candidates")}
                        text="See Candidates" 
                    />
                </div>
            </div>
        </div>
    </div>
  );
}
