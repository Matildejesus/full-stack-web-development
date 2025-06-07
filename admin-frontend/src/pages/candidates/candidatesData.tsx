import ButtonComp from "@/components/ButtonComp";
import CandidatesDataDisplay from "@/components/CandidatesDataDisplay";
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

export interface CandidatesInCourses {
    course: Course;
    candidates: Candidate[];
}

export default function CandidatesData() {
    const [courses, setCourses] = useState<CandidatesInCourses[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [moreThanThreeCoursesCand, setMoreThanThreeCoursesCand] = useState<Candidate[]>([]);

    useEffect(() => {
        fetchCourses();
        fetchCandidates();
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await courseService.getAllCourses();
            const courseCandidates = [];

            for (const course of data) {
                const selectedCandidates : Candidate[] = [];

                for (const application of course.applications) {

                    if (application.selectedCount > 0) {
                        const candidate = await candidateService.getCandidate(application.candidate.id.toString());

                        const alreadyAdded = selectedCandidates.some((u) => u.id === candidate.id);
                        if (!alreadyAdded) {
                            selectedCandidates.push(candidate);
                        }
                    }
                }
                if (selectedCandidates.length > 0) {
                   courseCandidates.push({
                        course,
                        candidates: selectedCandidates,
                    }); 
                }
                
            }
            setCourses(courseCandidates);
            console.log(courseCandidates);
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
                // console.log(candidate);
                const applications = candidate.applications;

                const uniqueCount = new Set(applications.map(application => application.course.id));

                if (uniqueCount.size >= 3) {
                    chosenThreeCand.push(candidate);
                    // console.log("the candidate with more than 3 application: ", candidate);
                }
                if (applications.length === 0) {
                    zeroCand.push(candidate);
                } else {
                    let notSelected = true;
                    for (let app of applications) {
                        // console.log(typeof app.selectedCount);
                        if (app.selectedCount !== 0) {
                            // console.log("it does not equal to 0");
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
            // console.log(zeroCand);
            setMoreThanThreeCoursesCand(chosenThreeCand);
            // console.log("the onese with more than 3 applications: : ", chosenThreeCand);
        } catch (error) {
            console.error("Error fetching candidates: ", error);
        }
    };

    
    const router = useRouter();
    return (
        <div className={"min-h-screen p-8 bg-gray-50 text-black"}>
            <ButtonComp
                handleRouter={() => router.back()}
                text="Back" 
            />
            <CandidatesDataDisplay 
                courses={courses}
                candidates={candidates}
                moreThanThreeCoursesCand={moreThanThreeCoursesCand}
            /> 
        </div>
    )
}