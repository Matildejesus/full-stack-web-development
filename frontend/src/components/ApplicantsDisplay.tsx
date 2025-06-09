import React, { useMemo, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Divider,
  Box,
  SimpleGrid,
  NumberDecrementStepperProps,
} from "@chakra-ui/react";
import ApplicationDisplay from "./ApplicationDisplay";
import { LecturerSelection, Candidate, Application, AppRole } from "@/types/types";
import { useApplicantsLogic } from "@/hooks/useApplicantsLogic";

interface ApplicantsDisplayProps {
  selectedSubject: string | null;
  handleRankingChange: (rank: number, applicationId: number, candidateId: number) => void;
  handleAddComment: (comment: string, applicationId: number) => void;
  filteredCandidates: Candidate[];
  selectedCandidates: LecturerSelection[]; 
  handleSubmit: () => void;
  filteredCandidatesLength: number;
  sort?: string | null;
  lecturerCourseIds: number[];
  unavailableApplicationIds:number[];
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
  lecturerCourseIds,
  unavailableApplicationIds
}) => {
  const { filteredByLecturerCourses } = useApplicantsLogic(
    filteredCandidates,
    sort || null,
    lecturerCourseIds
  );

  const [uiSelectedIds, setUiSelectedIds] = useState<number[]>([]); // Track selected application IDs

  const handleUISelect = (applicationId: number) => {
    if (!uiSelectedIds.includes(applicationId)) {
      setUiSelectedIds((prev) => [...prev, applicationId]);
    }
  };

  // Group applications by role: Tutor or Lab Assistant
  type CandidateWithApp = { candidate: Candidate; application: Application };

  const groupedApplications = useMemo(() => {
    const tutorApps: CandidateWithApp[] = [];
    const labAssistantApps: CandidateWithApp[] = [];

    filteredByLecturerCourses.forEach(candidate => {
      candidate.applications?.forEach(app => {
        const role = app.role.toLowerCase();
        if (role.includes(AppRole.TUTOR.toLowerCase())) {
          tutorApps.push({ candidate, application: app });
        }
        if (role.includes(AppRole.LAB_ASSISTANT.toLowerCase())) {
          labAssistantApps.push({ candidate, application: app });
        }
      });
    });

    return { tutorApps, labAssistantApps };
  }, [filteredByLecturerCourses]);

  const renderApplication = ({ candidate, application }: CandidateWithApp) => {
    const isUnavailable = unavailableApplicationIds.includes(application.id);

    // Find selection by applicationId

    const selectedApp = selectedCandidates.find(c => c.application.id === application.id);

    return (
  <Box key={application.id} borderWidth="1px" borderRadius="lg" p={4} mb={6} boxShadow="sm">
    <Box display="flex" alignItems="center" mb={3} gap={4}>
      <Box flex="1">
  <Heading
    size="md"
    color={isUnavailable ? "gray.400" : "black"}
    mb={isUnavailable ? 1 : 0}
  >
    {candidate.user.firstName} {candidate.user.lastName}
  </Heading>
  {isUnavailable && (
    <Box color="red.500" fontSize="sm" fontWeight="medium">
     Candidate is unavailable for selection
    </Box>
  )}
</Box>


      {!selectedApp && !uiSelectedIds.includes(application.id) ? (
        <Button colorScheme="red" size="sm" onClick={() => handleUISelect(application.id)}>
          Select
        </Button>
      ) : (
        <select
          value={selectedApp?.rank || ""}
          onChange={(e) => handleRankingChange(Number(e.target.value), candidate.id, application.id)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            borderColor: "#CBD5E0",
            borderWidth: "1px",
            minWidth: "80px",
          }}
        >
          <option value="">...</option>
          {Array.from({ length: groupedApplications.tutorApps.length + groupedApplications.labAssistantApps.length }, (_, i) => {

            const rank = i + 1;
            const alreadyUsed = selectedCandidates.find(
              (c) => c.rank === rank && c.application.id!== application.id
            );
            if (alreadyUsed) return null;
            return (
              <option key={rank} value={rank}>
                {rank}
              </option>
            );
          })}
        </select>
      )}
    </Box>

    <ApplicationDisplay
      candidate={candidate}
      application={application}
      sort={sort}
      lecturerCourseIds={lecturerCourseIds}
    />

    {selectedApp && (
      <FormControl mt={3} isRequired>
        <FormLabel>Comment</FormLabel>
        <Input
          name="comment"
          type="text"
          value={selectedApp.comment }
          onChange={(e) => handleAddComment(e.target.value,application.id)}
          placeholder="Enter remarks for applicant..."
        />
      </FormControl>
    )}
  </Box>
);  };

  return (
    <>
      {/* Tutor Applicants Section */}
      <Heading as="h2" size="lg" mb={4}>
        Tutor Applicants
      </Heading>
      {groupedApplications.tutorApps.length === 0 ? (
        <Box mb={6} fontStyle="italic" color="gray.600">
          No tutor applications available.
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={10}>
          {groupedApplications.tutorApps.map(renderApplication)}
        </SimpleGrid>
      )}

      <Divider />

      {/* Lab Assistant Applicants Section */}
      <Heading as="h2" size="lg" my={4}>
        Lab Assistant Applicants
      </Heading>
      {groupedApplications.labAssistantApps.length === 0 ? (
        <Box mb={6} fontStyle="italic" color="gray.600">
          No lab assistant applications available.
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={10}>
          {groupedApplications.labAssistantApps.map(renderApplication)}
        </SimpleGrid>
      )}

      {/* Submit Button */}
      {selectedSubject && filteredCandidates.length > 0 && (
        <Button colorScheme="blue" size="lg" onClick={handleSubmit}>
          Submit+
        </Button>
      )}
    </>
  );
};

export default ApplicantsDisplay;
