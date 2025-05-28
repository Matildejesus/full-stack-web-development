import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ApplicationDisplay from "./ApplicationDisplay";
import { LecturerSelection, User, Candidate } from "@/types/types";

interface ApplicantsDisplayProps {
    selectedSubject: string | null;
    handleRankingChange: (rank: number, applicantId: number) => void;
    handleAddComment: (comment: string, applicantId: number) => void;
    filteredCandidates: Candidate[];
    selectedCandidates: LecturerSelection[];
    handleSubmit: () => void;
    filteredUsersLength: number;  
    sort?: string | null;
}

const ApplicantsDisplay: React.FC<ApplicantsDisplayProps> = ({ 
    selectedSubject, handleAddComment, handleRankingChange, 
    filteredCandidates, selectedCandidates, handleSubmit, 
    filteredUsersLength, sort }) => {

    const [sortedList, setSortedList] = useState<Candidate[]>([]);

    useEffect(() => {
        console.log("Fil cand is ",filteredCandidates)
        let sorting = [...filteredCandidates];
        
        if (sort === "availability") {
            sorting.sort((a, b) => {
                const aAvail = a.applications[0]?.availability || "";
                const bAvail = b.applications[0]?.availability || "";
                return aAvail.localeCompare(bAvail);
            });
        }
        setSortedList(sorting);
    }, [filteredCandidates, sort]);

    return (
        <>
        <div className="grid grid-cols-2 gap-4">
        {sortedList?.length === 0 ? (
            <h3 className="mb-6 p-8">No Applications Right Now !...</h3>
            ):( sortedList.map(candidate => (
                <div key={candidate.id} className="mb-6 p-4">
                    <div className="flex gap-7 row ">
                        <h3 className="font-bold text-lg">{candidate.user.firstName}</h3>
                        <select
                            value={selectedCandidates.find((c) => c.id === candidate.id)?.rank || ""}
                            onChange={(e) => handleRankingChange(Number(e.target.value), candidate.id)}

                            className="border p-2 rounded"
                        >
                            <option key={0} value={""}>...</option>
                            {Array.from({length: filteredUsersLength}, (_, index) => {
                                if (selectedCandidates.find((c) => c.rank === index + 1 && c.id != candidate.id)) return null;
                                    
                                return (
                                    <option key={index} value={index + 1}>
                                        {index + 1}
                                    </option>
                                )
                            }
                            )}
                        </select>
                    </div>
                    <ApplicationDisplay candidate={candidate} isLoggedInUser={false} sort={sort}/>  
                    {selectedCandidates.find((c) => c.id == candidate.id) && (
                        <FormControl isRequired>
                            <FormLabel>Comment</FormLabel>
                            <Input
                            name="comment"
                            type="text"
                            value={selectedCandidates.find((c) => c.id === candidate.id)?.comment || ""}
                            onChange={(e) => handleAddComment(e.target.value, candidate.id)}
                            placeholder="Enter remarks for applicant..."
                            />
                        </FormControl>
                    )} 
                </div>
                ))
            )
        }
        </div>
        {selectedSubject && filteredCandidates && (
            <Button
                type="button"
                className="z-50 px-6 py-4"
                onClick={handleSubmit}
            >
                Submit
            </Button>
        )}    
        </>
    )
}

export default ApplicantsDisplay;