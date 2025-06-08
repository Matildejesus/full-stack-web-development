import { CandidatesInCourses } from "@/pages/candidates/candidatesData";
import { Candidate } from "@/types/types";

/**
 * Presenter Component:
 * Handles UI rendering related to:
 *   - displaying candidates based on criteria
 * 
 * Receives props from candidates/candidatesData.tsx (container)
 */

interface CandidatesDataDisplayProps {
    courses: CandidatesInCourses[];
    candidates: Candidate[];
    moreThanThreeCoursesCand: Candidate[];
}

export default function CandidatesDataDisplay({courses, candidates, moreThanThreeCoursesCand}: CandidatesDataDisplayProps) {
    return (
        <>
            <div className="bg-white pl-6 pt-6 rounded-lg shadow mt-5">
                {courses.map((u) => (
                    <div key={u.course.id} className="pb-10">
                            <h3 className="font-medium text-black mb-5">{u.course.code} ({u.course.name})</h3>
                        <div className="ml-5">
                            {u.candidates.map((candidate) => (
                                <p key={candidate.id}>{candidate.user.firstName} {candidate.user.lastName}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow mt-5">
                <div>Candidates (0 chosen)</div>
                {candidates.map((u) => (
                    <div key={u.id} className="pl-5">
                        <h2>{u.user.firstName} {u.user.lastName}</h2>
                    </div>
                ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow mt-5">
                <h2>Candidates (3+ Courses)</h2>
                {moreThanThreeCoursesCand.map((u) => (
                    <div key={u.id} className="ml-5">
                        <h2>{u.user.firstName} {u.user.lastName}</h2>
                    </div>

                ))}
            </div>
        </>
    )
}
