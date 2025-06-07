import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import ApplicationDisplay from "./ApplicationDisplay";
import { LecturerSelection, Candidate } from "@/types/types";
import { useApplicantsLogic } from "@/hooks/useApplicantsLogic"; // 👈 import logic hook
import { useState } from "react";
interface ApplicantsDisplayProps {
  selectedSubject: string | null;
  handleRankingChange: (rank: number, applicantId: number) => void;
  handleAddComment: (comment: string, applicantId: number) => void;
  filteredCandidates: Candidate[];
  selectedCandidates: LecturerSelection[];
  handleSubmit: () => void;
  filteredCandidatesLength: number;
  sort?: string | null;
  lecturerCourseIds: number[];
}

const ApplicantsDisplay: React.FC<ApplicantsDisplayProps> = ({
  selectedSubject,
  handleAddComment,
  handleRankingChange,
  filteredCandidates,
  selectedCandidates,
  handleSubmit,
  filteredCandidatesLength,
  sort,
  lecturerCourseIds
}) => {
  const { filteredByLecturerCourses } = useApplicantsLogic(filteredCandidates, sort || null, lecturerCourseIds);
  
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
                  candidate={candidate}
                //   isLoggedInUser={false}
                  sort={sort}
                  lecturerCourseIds={lecturerCourseIds}
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
