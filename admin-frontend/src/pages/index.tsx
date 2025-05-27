import { useState, useEffect } from "react";
import { Geist } from "next/font/google";
// import { useRouter } from "next/router";
import { Course } from "../types/types";
import { courseService } from "../services/api";
import CourseList from "@/components/CourseList";

const geist = Geist({
    subsets: ["latin"],
});

export default function Home() {
    // const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);

    // Fetch profiles on component mount
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
        const data = await courseService.getAllCourses();
        setCourses(data);
        } catch (error) {
        console.error("Error fetching profiles:", error);
        }
    };

    return (
        <div
        className={`${geist.className} min-h-screen p-8 bg-gray-50 text-black`}
        >
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-black">
            Course Management System
            </h1>
            <CourseList courses={courses} />
        </div>
        </div>
    );
}
