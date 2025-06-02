import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Course, Lecturer, LecturerCourse, Semester } from "../../types/types";
import { courseService, lecturerCoursesService, lecturerService } from "../../services/api";
import { Button } from "@chakra-ui/react";
import CreateCourse from "@/components/CreateCourse";
import LecturerList from "@/components/LecturerList";

export default function CoursePage() {
    const router = useRouter();
    const { id } = router.query;
    const [course, setCourse] = useState<Course | null>(null);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [semester, setSemester] = useState<Semester>(Semester.ONE);
    const [createError, setCreateError] = useState("");
    const [lecturers, setLecturers] = useState<LecturerCourse[]>([]);
    const [retrievingLecturers, setRetrievingLecturers] = useState(true);
    const [allLecturers, setAllLecturers] = useState<Lecturer[]>([]);
    const [chosenLecturer, setChosenLecturer] = useState("");
    const [lecturerIds, setLecturerIds] = useState<number[]>([]);
    const [lecturerSemester, setLecturerSemester] = useState<Semester>();

    useEffect(() => {
        if (id) {
            fetchCourse();
            console.log("the id: ", id);
            fetchLecturerCourses();
            fetchAllLecturers();
            
        }
    }, [id]);

     useEffect(() => {
        if (lecturers) {
            fetchAllLecturers();
        }
    }, [lecturers]);

    const fetchCourse = async () => {
        try {
            const data = await courseService.getCourse(id as string);
            setCourse(data);
            // Set local state from fetched data
            setName(data.name);
            setCode(data.code);
            setSemester(data.semester);
        } catch (error) {
            console.error("Error fetching course:", error);
        }
    };

    const fetchLecturerCourses = async () => {
        try {
            setRetrievingLecturers(true);
            console.log("fetching lecturers from id: ", id);
            const courseId = id;
            const data = await lecturerCoursesService.getLecturerCoursesByCourseId(courseId as string);
            console.log("the lecturers have been fetched: ", data);
            
            setLecturers(data);
            setLecturerIds(data.map(data => data.lecturerId));
        } catch (error) {
            console.error("Error fetching lecturers: ", error);
        } finally {
            setRetrievingLecturers(false);
        }
    }

    const fetchAllLecturers = async () => {
        try {
            const data = await lecturerService.getAllLecturers();
            console.log("list of lecturers: ", data);
            console.log("list of lecturers in course: ", lecturers); // why is this 0 it should be one, we know it exists because it is displayed when displaying the list of lectureres 
            console.log("list of ids: ", lecturerIds);
            setAllLecturers(data.filter(data => !lecturerIds.includes(data.id)));
        } catch (error) {
            console.error("Error fetching all lecturers: ", error);
        }
    };

    const addLecturerToCourse = async () => {
        try {
            let sem;
            if (lecturerSemester) {
                sem = lecturerSemester;
            } else {
                sem = semester;
            }
            const data = await lecturerCoursesService.createLecturerCourse(
                chosenLecturer,
                id as string, 
                sem
            )
        } catch (error) {
            console.error("Error adding lecturer to course: ", error);
        }
    }

    const handleUpdateCourse = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const codePattern = /^[A-Z]{4}\d{4}$/;
            if (!codePattern.test(code.toUpperCase())) {
                setCreateError("Code is in wrong format. Ex. COSC1030");
                return;
            }
            await courseService.updateCourse(id as string, {
                name,
                code: code.toUpperCase(),
                semester, 
            }); 
            await fetchCourse(); 
            setCreateError("");
        } catch (error) {
            setCreateError("Error updating course.");
        }
    };

    if (!course) {
        return <div>Loading...</div>; 
    }

    return (
        <div className={"min-h-screen p-8 bg-gray-50 text-black"}>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center">
                    <Button
                        type="button"
                        className="z-50 px-6 py-4"
                        onClick={() => router.back()}
                    >
                        Back
                    </Button>  
                </div>
                <CreateCourse 
                    handleCreateCourse={handleUpdateCourse}
                    name={name}
                    setName={setName}
                    code={code}
                    currentEvent="update"
                    setCode={setCode}
                    isAdding={true}
                    semester={semester}
                    setSemester={setSemester} 
                    createError={createError}
                />
                {!retrievingLecturers && lecturers && (
                    <LecturerList 
                        lecturers={lecturers}
                        allLecturers={allLecturers}
                        chosenLecturer={chosenLecturer}
                        setChosenLecturer={setChosenLecturer}
                        addLecturerToCourse={addLecturerToCourse}
                        lecturerSemester={lecturerSemester}
                        setLecturerSemester={setLecturerSemester}
                        courseSemester={semester}
                    />
                )}
            </div>
        </div>
    );
}