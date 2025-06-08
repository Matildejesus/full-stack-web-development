import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import ApplicationDisplay from "./ApplicationDisplay";
import { LecturerSelection, Candidate } from "@/types/types";
import { useState } from "react";
import { LecturerCoursesResponse } from "@/services/api";
interface ApplicantsDisplayProps {
    selectedSubject: string | null;
    handleRankingChange: (rank: number, applicantId: number) => void;
    handleSubmit: () => void;
    handleAddComment: (comment: string, applicantId: number) => void;
    filteredApplications: Application[];
    lecturerSelections: LecturerSelection[];
    filteredCandidatesLength: number;
    lecturerCourses: LecturerCoursesResponse[];
}

const ApplicantsDisplay: React.FC<ApplicantsDisplayProps> = ({
    selectedSubject,
    handleAddComment
    handleSubmit,
    handleRankingChange,
    filteredApplications
    lecturerSelections,
    filteredCandidatesLength
}) => {
    const [uiSelectedIds, setUiSelectedIds] = useState<number[]>([]);

    const handleUISelect = (id: number) => {
        if (!uiSelectedIds.includes(id)) {
        setUiSelectedIds(prev => [...prev, id]);
        }
    };


  return (
        <>
        <div className="grid grid-cols-2 gap-4">
            {filteredByLecturerCourses.length === 0 ? (
            <h3 className="mb-6 p-8">No Applications Right Now!...</h3>
            ) : (
            filteredByLecturerCourses.map(candidate => {
                const selected = selectedCandidates.find(c => c.id === candidate.id);

                return (
                <div key={candidate.id} className="mb-6 p-4">
                    <div className="flex gap-7 row ">
                    <h3 className="font-bold text-lg">{candidate.user.firstName}</h3>
                    {!selected && !uiSelectedIds.includes(candidate.id) ? (
                        <button
                        onClick={() => handleUISelect(candidate.id)}
                        className="bg-red-800 text-white"
                        >
                        Select
                        </button>
                    ) : (
                        <>
                    
                    <select
                        value={selected?.rank || ""}
                        onChange={(e) =>
                        handleRankingChange(Number(e.target.value), candidate.id)
                        }
                        className="border p-2 rounded"
                    >
                        <option value="">...</option>
                        {Array.from({ length: filteredCandidatesLength }, (_, index) => {
                        const rank = index + 1;
                        const alreadyUsed = selectedCandidates.find(c => c.rank === rank && c.id !== candidate.id);
                        if (alreadyUsed) return null;

                        return (
                            <option key={rank} value={rank}>
                            {rank}
                            </option>
                        );
                        })}
                    </select>
                    </>
                    )}
                    </div>

                    <ApplicationDisplay
                    applications={applications}
                    //   isLoggedInUser={false}
                    // sort={sort}
                    />

                    {selected && (
                    <FormControl isRequired>
                        <FormLabel>Comment</FormLabel>
                        <Input
                        name="comment"
                        type="text"
                        value={selected.comment || ""}
                        onChange={(e) => handleAddComment(e.target.value, candidate.id)}
                        placeholder="Enter remarks for applicant..."
                        />
                    </FormControl>
                    )}
                </div>
                );
            })
            )}
        </div>

        {selectedSubject && filteredCandidates.length > 0 && (
            <Button type="button" className="z-50 px-6 py-4" onClick={handleSubmit}>
            Submit+
            </Button>
        )}
        </>
    );
};

export default ApplicantsDisplay;
