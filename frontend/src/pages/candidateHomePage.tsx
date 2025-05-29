import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useRouter } from "next/router";
import SubjectList from "@/components/SubjectList";
import { Course } from "@/types/types";
import { courseService } from "@/services/api";

export default function CandidateHomePage() {

    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
        
    useEffect(() => {
        const fetchCourses = async () => {
            const data = await courseService.getAllCourses();
            setCourses(data);
            console.log(data);
        };

        if (setCourses.length === 0) {
            fetchCourses();
        }
    }, []);

    return (
        <>
        <Header />
        <div className="p-8">
            <p className="text-2xl bg-white-800 p-7 font-serif bg-red-100 border-2 border-red-500">
            Opportunities</p>
            <section className="p-5 rounded-md shadow-sm -space-y-px mx-8">
            <p className="text-l font-serif">
                The School of Computer Science has opportunities for casual tutors and lab assistants for the courses available in the current semester.
            </p>
            </section>

            <p className="text-2xl bg-white-800 p-7 font-serif bg-red-100 border-2 border-red-500">
            Available subjects in Semester 1 2025
            </p>

            <SubjectList  courses={courses}/>

            <button className="font-semibold w-full rounded-md shadow-sm bg-blue-600 text-white p-3 mt-6 hover:bg-blue-700"

            onClick={() => router.push("/applicationPage")}
            >
            Apply 
            </button>

            <button
            type="button"
            onClick={() => router.push("/applicationPage")}
            className="font-semibold w-full rounded-md shadow-sm bg-blue-600 text-white p-3 mt-6 hover:bg-blue-700"
            >
            Apply
        </button>
            </div>

            <Footer />
        </>
    );
};