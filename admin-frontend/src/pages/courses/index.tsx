import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Course, Semester } from "../../types/types";
import { courseService } from "../../services/api";


export default function Courses() {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [semester, setSemester] = useState<Semester>(Semester.ONE);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await courseService.getAllCourses();
            setCourses(data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleCreateCourse = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await courseService.createCourse({
                name,
                code,
                semester, 
            });
            setName("");
            setCode("");
            setSemester(Semester.ONE);
            fetchCourses();
        } catch (error) {
            console.error("Error creating course:", error);
        }
    };

    const handleCourseClick = (id: string) => {
        router.push(`/course/${id}`);
    };

  return (
    <div className={"min-h-screen p-8 bg-gray-50 text-black"}>
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-black">Courses</h1>
            
            {/* <div className="space-y-6">
            <CreatePetForm
                onSubmit={handleCreatePet}
                petName={newPetName}
                onPetNameChange={setNewPetName}
            />

            <PetsList pets={pets} onPetClick={handlePetClick} /> */}
        </div>
    </div>
  );
}
