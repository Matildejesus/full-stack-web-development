import { LecturerSelection } from "@/types/lecturerSelection";
import { User } from "@/types/user";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ApplicationDisplay from "./ApplicationDisplay";

interface ApplicantsDisplayProps {
    selectedSubject: string | null;
    handleRankingChange: (rank: number, applicantId: string) => void;
    handleAddComment: (comment: string, applicantId: string) => void;
    filteredUsers: User[];
    selectedCandidates: LecturerSelection[];
    handleSubmit: () => void;
    filteredUsersLength: number;  
    sort?: string | null;
}

const ApplicantsDisplay: React.FC<ApplicantsDisplayProps> = ({ selectedSubject, handleAddComment, handleRankingChange, filteredUsers, selectedCandidates, handleSubmit, filteredUsersLength, sort }) => {
    const [sortedList, setSortedList] = useState<User[]>([]);

    useEffect(() => {
        let sorting = [...filteredUsers];
        if (sort === "availability") {
            sorting = [...sorting].sort((a, b) => a.jobSummary[0].availability.localeCompare(b.jobSummary[0].availability));
        }
        setSortedList(sorting);
    }, [filteredUsers, sort]);

    return (
        <>
        <div className="grid grid-cols-2 gap-4">
        {sortedList?.length === 0 ? (
            <h3 className="mb-6 p-8">No Applications Right Now...</h3>
            ):( sortedList.map(user => (
                <div key={user.id} className="mb-6 p-4">
                    <div className="flex gap-7 row ">
                        <h3 className="font-bold text-lg">{user.firstname}</h3>
                        <select
                            value={selectedCandidates.find((u) => u.userId === user.id)?.rank || ""}
                            onChange={(e) => handleRankingChange(Number(e.target.value), user.id)}

                            className="border p-2 rounded"
                        >
                            <option key={0} value={""}>...</option>
                            {Array.from({length: filteredUsersLength}, (_, index) => {
                                if (selectedCandidates.find((u) => u.rank === index + 1 && u.userId != user.id)) return null;
                                    
                                return (
                                    <option key={index} value={index + 1}>
                                        {index + 1}
                                    </option>
                                )
                            }
                            )}
                        </select>
                    </div>
                    <ApplicationDisplay user={user} isLoggedInUser={false} sort={sort}/>  
                    {selectedCandidates.find((u) => u.userId == user.id) && (
                        <FormControl isRequired>
                            <FormLabel>Comment</FormLabel>
                            <Input
                            name="comment"
                            type="text"
                            value={selectedCandidates.find((u) => u.userId === user.id)?.comment || ""}
                            onChange={(e) => handleAddComment(e.target.value, user.id)}
                            placeholder="Enter remarks for applicant..."
                            />
                        </FormControl>
                    )} 
                </div>
                ))
            )
        }
        </div>
        {selectedSubject && filteredUsers && (
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