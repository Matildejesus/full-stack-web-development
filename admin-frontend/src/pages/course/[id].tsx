import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Course, Lecturer, LecturerCourse, Semester } from "../../types/types";
import { courseService, lecturerCoursesService, lecturerService } from "../../services/api";
import CreateCourse from "@/components/CreateCourse";
import LecturerList from "@/components/LecturerList";
import ButtonComp from "@/components/ButtonComp";
import { useToast } from "@chakra-ui/react";

/**
 * Container Component:
 * Handles business logic related to:
 *    - Retrieval of courses and the related lecturers
 *    - Managing form states
 *    - The update of course details
 *    - The assigning of lecturers
 * 
 * Passes props to CreateCourse, LecturerList, ButtonComp (presenter)
 */

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
    const [addLecturerError, setAddLecturerError] = useState("");
    const toast = useToast();

    useEffect(() => {
        if (id) {
            fetchCourse();
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
            const courseId = id;
            const data = await lecturerCoursesService.getLecturerCoursesByCourseId(courseId as string);
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
            setAllLecturers(data.filter(data => !lecturerIds.includes(data.id)));
        } catch (error) {
            console.error("Error fetching all lecturers: ", error);
        }
    };

    const addLecturerToCourse = async () => {
        if (!chosenLecturer) {
            setAddLecturerError("Please select a lecturer before clicking 'Add Lecturer'.");
            return;
        }
        try {
            setAddLecturerError("");
            let sem;
            if (semester == Semester.BOTH && lecturerSemester) {
                sem = lecturerSemester;
            } else {
                sem = semester;
            }
            const data = await lecturerCoursesService.createLecturerCourse(
                chosenLecturer,
                id as string, 
                sem
            )
            if (data) {
                toast({
                    title: "Lecturer Added",
                    description: "Successfully added a lecturer to course",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
            await fetchLecturerCourses();

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
            const result = await courseService.updateCourse(id as string, {
                name,
                code: code.toUpperCase(),
                semester, 
            }); 
            if (result) {
                toast({
                    title: "Course Updated",
                    description: "Successfully updated course data",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
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
                    <ButtonComp
                        handleRouter={() => router.back()}
                        text="Back" 
                    />
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
                        lecturerError={addLecturerError}
                    />
                )}
            </div>
        </div>
    );
}