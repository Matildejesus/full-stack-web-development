import { candidateService, courseService } from "@/services/api";
import { Candidate, Course } from "@/types/types";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

/**
 * Container Component:
 * Handles business logic related to:
 *    - Fetching courses, candidates and their related applications
 *    - Identifying the candidates that are never chosen
 *    - Identifying the candidates that are selected for more than 3 courses
 *    - Identifying all candidates chosen for each course 
 *    - Rerouting to home pages 
 * 
 * Passes props to ... (presenter)
 */

export default function CandidatesData() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [moreThanThreeCoursesCand, setMoreThanThreeCoursesCand] = useState<Candidate[]>([]);

    useEffect(() => {
        fetchCourses();
        fetchCandidates();
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await courseService.getAllCourses();
            setCourses(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching courses: ", error);
        }
    }

    const fetchCandidates = async () => {
        try {
            const data = await candidateService.getAllCandidates();
            const zeroCand: Candidate[] = [];
            const chosenThreeCand: Candidate[] = [];

            for (let candidate of data) {
                console.log(candidate);
                const applications = candidate.applications;

                const uniqueCount = new Set(applications.map(application => application.course.id));

                if (uniqueCount.size >= 3) {
                    chosenThreeCand.push(candidate);
                }
                // check houw many unique
                // if less than 3, continure
                // else we map the applications into a temporary array
                // we thne check how many unique role ("tutor")
                // then if tutor role has 3 than great
                // we add applicant to the moreThan3courses array
                // if its less than we get total number - tutotr role,
                // if more than 3 we also add applicant to array
                // if not move on
                if (applications.length === 0) {
                    zeroCand.push(candidate);
                } else {
                    let notSelected = true;
                    for (let app of applications) {
                        console.log(typeof app.selectedCount);
                        if (app.selectedCount !== 0) {
                            console.log("it does not equal to 0");
                            notSelected = false;
                            break;
                        }
                    }
                    if (notSelected) {
                        zeroCand.push(candidate);
                    }
                }
            }

            setCandidates(zeroCand); 
            console.log(zeroCand);
            setMoreThanThreeCoursesCand(chosenThreeCand);
            console.log(chosenThreeCand);
        } catch (error) {
            console.error("Error fetching candidates: ", error);
        }
    };

    
    const router = useRouter();
    return (
        <>
            <div>Reported data will be displayed here</div>
            {candidates.map((u) => (
                <div key={u.id}>
                    <h2>{u.user.firstName}</h2>
                    <h2>{u.applications.length}</h2>
                </div>
            ))}
            <h2>more than 3 courses</h2>
            {moreThanThreeCoursesCand.map((u) => {
                <div key={u.id}>
                    <h2>{u.user.firstName}</h2>
                    <h2>{u.applications.length}</h2>
                </div>

            })}
        </>
    )
}