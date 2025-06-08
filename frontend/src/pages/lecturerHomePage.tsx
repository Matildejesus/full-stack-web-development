import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { applicationService, lecturerCourseService, lecturerService, lecturerSelectionService, LecturerCoursesResponse } from "@/services/api";
import ApplicantsDisplay from "@/components/ApplicantsDisplay";
import SelectionBar from "@/components/SelectionBar";
import Sidebar from "@/components/SideBar";
import { LecturerSelection, Application ,Lecturer,} from "@/types/types";
import ApplicationDisplay from "@/components/ApplicationDisplay";

export default function LecturerHome() {
    const [selectedSubject, setSelectedSubject] = useState<string>("all");
    // const { saveSelection } = useAuth();
    // const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>("");
    const [selectedSearch, setSelectedSearch] = useState<string>("");
    const [inputText, setInputText] = useState<string>("");
    const [placeholder, setPlaceholder] = useState<string>("");
    const toast = useToast();
    const router = useRouter();

    const { user } = useAuth();
    const [lecturer, setLecturer] = useState<Lecturer>();
    
    // stores applicatrions that can be seen by the lecturere, do application.candidate.user...
    const [applications, setApplications] = useState<Application[]>([]);
    
    // stores the courses it teaches, and the data of each individual course
    const [lecturerCourses, setLecturerCourses] = useState<LecturerCoursesResponse[]>([]);  

    // filters applications based on criteria
    const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);

    const [lecturerSelections, setLecturerSelections] = useState<LecturerSelection[]>([]);

    useEffect(() => {
       fetchLecturerCourses();
    }, []);

    const fetchLecturerCourses = async () => {
        let lecturerData;
        let lecturerCoursesData;
        let applicationData;
        if (user) {
            lecturerData = await lecturerService.getLecturer(user.id);
            setLecturer(lecturerData);
            console.log("gets lecturer id: ", lecturerData);
        }

        if (lecturerData) {
            lecturerCoursesData = await lecturerCourseService.getLecturerCourses(lecturerData.id);
            setLecturerCourses(lecturerCoursesData);
            console.log("list of courses the lecturer teaches: ", lecturerCoursesData);
            const lecturerSelectionData = await lecturerSelectionService.getByLecturer(lecturerData.id);
            if (lecturerSelectionData) {
                setLecturerSelections(lecturerSelectionData);
            }
        }

        if (lecturerCoursesData) {
            applicationData = await applicationService.getApplicationsWithCourseId(lecturerCoursesData);
            setApplications(applicationData); 
            console.log("list of applications belonging to the courses: ", applicationData);
        }

    };
    const filteredSortedApplications = useMemo(() => {
        let courseApplications = applications;

        if (selectedSubject !== "all") {
            courseApplications = applications.filter((app) => app.course.name === selectedSubject);
        }

        if (selectedSort === "course") {
            courseApplications = [...courseApplications].sort((a, b) =>
                a.course.name.toLowerCase().localeCompare(b.course.name.toLowerCase())
            );
        } else if (selectedSort === "availability") {
            courseApplications = [...courseApplications].sort((a, b) =>
                a.availability.toLowerCase().localeCompare(b.availability.toLowerCase())
            );
        }

        return courseApplications;
    }, [applications, selectedSubject, selectedSort]);

    const handleRankingChange = (rank: number, applicationId: number) => {
        if (!lecturer) return;
        const app = applications.find(c => c.id === applicationId);
        if (!app) return;

        const candidateId = app.candidate.id;


        setLecturerSelections(prev => {
            const existing = prev.find(sel => sel.id === candidateId);

            if (existing) {
                return prev.map(sel =>
                    sel.id === candidateId
                        ? { ...sel, rank, application: app, lecturer }
                        : sel
                );
            } else {
                return [...prev, { id: candidateId, rank, comment: "", application: app, lecturer }];
            }
        });
    };


    const handleAddComment = (comment: string, applicationId: number) => {
        const currSelection = applications.find((u) => u.id === applicationId);
        if (comment.length > 500) {
            toast({
                title: "Message is too long",
                description: "Please shorten the message.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (currSelection) {
            const updatedComment = lecturerSelections.map((u) =>
                u.application.id === applicationId ? { ...u, comment } : u);
            setLecturerSelections(updatedComment);
        }
    }

    useEffect(() => {
        if (selectedSearch === "tutor") {
            setPlaceholder("Please enter tutor's name...");
        } else if (selectedSearch === "availability") {
            setPlaceholder("Please enter full-time or part-time...");
        } else if (selectedSearch === "skillset") {
            setPlaceholder("Please enter a skill...");
        } else if (selectedSearch === "jobRole") {
            setPlaceholder("Please enter Tutor or LabAssistant...");
        } else {
            setPlaceholder("Please select a search option...");
        }
    },[selectedSearch]);


    const handleSubmit = async () => {
    if (lecturerSelections.length === 0) {
        toast({ title: "Nothing selected", status: "error", duration: 3000, isClosable: true });
        return;
    }
    console.log("Selected candiates are, ",lecturerSelections)

    // Map UI objects → DTO expected by backend
    const payload = lecturerSelections.map((sel) => ({
        lecturerId: sel.lecturer.id,
        applicationId: sel.application.id,
        ranking: sel.rank!,   // whichever field you kept
        comment: sel.comment,
    }));
    console.log("Payload d is ",payload)
    try {
        await lecturerSelectionService.saveSelections(payload);
        await Promise.all(
            lecturerSelections.map(sel =>
            applicationService.incrementSelectedCount(sel.application.id)
            )
        );

        toast({
        title: "Selection saved",
        description: "Your rankings and comments were stored.",
        status: "success",
        duration: 3000,
        isClosable: true,
        });
        router.push("/ApplicantStatus");
    } catch (err) {
        toast({
        title: "Save failed",
        description: "Could not save selections to the server.",
        status: "error",
        duration: 3000,
        isClosable: true,
        });
    }
    };

    // Searching is only allowed if an option is selected
    // users can type anything, but will not locate any users unless they type correctly
    // it does not matter if it is uppercase or lowercase
    const handleSearchSubmit = () => {
        if (selectedSearch === "") {
            toast({
                title: "Search Unsuccessful",
                description: "Pick a search option first",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        
        let sorting = [...filteredApplications];
        if (selectedSearch === "availability") {
        sorting = sorting.filter(summary => summary.availability.toLowerCase() === inputText.toLowerCase());
        } else if (selectedSearch === "tutor") {
            sorting = sorting.filter(selection => selection.candidate.user.firstName.toLowerCase() === inputText.toLowerCase());
        } else if (selectedSearch === "jobRole") {
            sorting = sorting.filter(summary => summary.role.toLowerCase() === inputText.toLowerCase());
        } else if (selectedSearch === "skillset") {
            sorting = sorting.filter(summary => summary.skills.some(
                        skill => skill.split(", ").some((skillItem) => 
                        skillItem.toLowerCase().includes(inputText.toLowerCase())
                    )));
        }
        setFilteredApplications(sorting);
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex">
                <Sidebar onClick={setSelectedSubject} courses={lecturerCourses} />
            </div>
                <SelectionBar
                    selectedSort={selectedSort}
                    setSelectedSort={setSelectedSort}
                    selectedSubject={selectedSubject}
                    selectedSearch={selectedSearch}
                    setSelectedSearch={setSelectedSearch}
                    handleSearchSubmit={handleSearchSubmit}
                    placeholder={placeholder}
                    inputText={inputText}
                    setInputText={setInputText}
                />
                <div className="flex flex-row flex-grow pr-20 pt-8 pl-5">
                {selectedSubject === "all" ?
                    (<div className="grid grid-cols-2">
                        <ApplicationDisplay 
                            applications={filteredSortedApplications}
                        />
                    </div>
                    ) : (
                        // <ApplicantsDisplay
                        //     selectedSubject={selectedSubject}
                        //     handleAddComment={handleAddComment}
                        //     handleSubmit={handleSubmit}
                        //     handleRankingChange={handleRankingChange}
                        //     filteredApplications={filteredSortedApplications}
                        //     lecturerSelections={lecturerSelections}
                        // />
                        <ApplicantsDisplay
                            selectedSubject={selectedSubject}
                            handleAddComment={handleAddComment}
                            handleSubmit={handleSubmit}
                            handleRankingChange={handleRankingChange}
                            filteredApplications={filteredSortedApplications}
                            lecturerSelections={lecturerSelections}
                            filteredCandidatesLength={filteredSortedApplications.length}
                        />

                    )}
            </div>
            <div className="pt-13">
                <Footer />
            </div>
        </div>
    )
}