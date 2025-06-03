import { courseService } from "@/services/api";
import { Course } from "@/types/types";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function CandidatesData() {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await courseService.getAllCourses();
            setCourses(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching candidates: ", error);
        }
    }
    
    const router = useRouter();
    return (
        <div>Reported data will be displayed here</div>
    )
}