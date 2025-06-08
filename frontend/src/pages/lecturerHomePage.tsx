
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { applicationService, candidateService, courseService, userService,lecturerCourseService, lecturerService, lecturerSelectionApi } from "@/services/api";
import ApplicantsDisplay from "@/components/ApplicantsDisplay";
import SelectionBar from "@/components/SelectionBar";
import Sidebar from "@/components/SideBar";
import { LecturerSelection, User, Candidate, Application ,Lecturer, Course, LecturerCourse} from "@/types/types";
import { useUnavailableCandidates } from "@/hooks/useUnavailableCanidates";

export default function LecturerHome() {
    const [selectedSubject, setSelectedSubject] = useState<string>("all");
    const [users, setUsers] = useState<User[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const[lecturer,setLecturer]=useState<Lecturer[]>([]);
    const [selectedCandidates, setSelectedCandidates] = useState<LecturerSelection[]>([]);
    const { saveSelection } = useAuth();
    const [subjectFilteredCandidates, setSubjectFilteredCandidates] = useState<Candidate[]>([]);
    const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>("");
    const [selectedSearch, setSelectedSearch] = useState<string>("");
    const [inputText, setInputText] = useState<string>("");
        const [placeholder, setPlaceholder] = useState<string>("");
    const  {unavailableCandidates}  = useUnavailableCandidates();
    const toast = useToast();
    const router = useRouter();
    const [applications, setApplications] = useState<Application[]>([]);
    const { user } = useAuth();
    const[lecturerCourses,setLecturerCourses]=useState<LecturerCourse[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [lecturerCourseIds, setLecturerCourseIds] = useState<number[]>([]);
    const lecturerDetails = useMemo(() => {
        return users.find(u => u.id === user?.id)?.lecturer;
    }, [users, user]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
      useEffect(() => {
           const fetchCourses = async () => {
                const data = await courseService.getAllCourses();
                setCourses(data);
                console.log(data);
            };
    
            if (courses.length === 0) {
                fetchCourses();
            }
          
      }, []);
    // NEW
    const fetchSavedApplications = async () => {
        try {
            const data = await applicationService.getAllApplications();
            setApplications(data);
        } catch (error) {
            console.error("Error fetching applications", error);
        }
    }
    useEffect(() => {
        // NEW code
        fetchSavedApplications();

    }, []);
    //fecthing all
    useEffect(() => {
    const fetchAllData = async () => {
        try {
        const [usersData, candidatesData, lecturersData, coursesData, lecturerCoursesData, applicationsData] = await Promise.all([
            userService.getAllUsers(),
            candidateService.getAllCandidates(),
            lecturerService.getAllLecturers(),
            courseService.getAllCourses(),
            lecturerCourseService.getAllLecturerCourses(),
            applicationService.getAllApplications(),
        ]);
        setUsers(usersData);
        setCandidates(candidatesData);
        setLecturer(lecturersData);
        setCourses(coursesData);
        setLecturerCourses(lecturerCoursesData);
        setApplications(applicationsData);
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    fetchAllData();
    }, []);

    // useEffect(() => {
    //    fetchLecturerCourses();
    // }, []);

    // const fetchLecturerCourses = async () => {
    //     let lecturerData;
    //     let lecturerCoursesData;
    //     let applicationData;
    //     if (user) {
    //         lecturerData = await lecturerService.getLecturer(user.id);
    //         setLecturer(lecturerData);
    //         console.log("gets lecturer id: ", lecturerData);
    //     }

    //     if (lecturerData) {
    //         lecturerCoursesData = await lecturerCourseService.getLecturerCourses(lecturerData.id);
    //         setLecturerCourses(lecturerCoursesData);
    //         console.log("list of courses the lecturer teaches: ", lecturerCoursesData);
    //         const lecturerSelectionData = await lecturerSelectionService.getByLecturer(lecturerData.id);
    //         if (lecturerSelectionData) {
    //             setLecturerSelections(lecturerSelectionData);
    //         }
    //     }

    //     if (lecturerCoursesData) {
    //         applicationData = await applicationService.getApplicationsWithCourseId(lecturerCoursesData);
    //         setApplications(applicationData); 
    //         console.log("list of applications belonging to the courses: ", applicationData);
    //     }

    // };

    const unavailableApplicationIds = useMemo(() => {
        return applications
            .filter(app => unavailableCandidates.includes(String(app.candidate.id)))
            .map(app => app.id);
        }, [applications, unavailableCandidates]);
    

    // const filteredSortedApplications = useMemo(() => {
    //     let courseApplications = applications;

    //     if (selectedSubject !== "all") {
    //         courseApplications = applications.filter((app) => app.course.name === selectedSubject);
    //     }

    //     if (selectedSort === "course") {
    //         courseApplications = [...courseApplications].sort((a, b) =>
    //             a.course.name.toLowerCase().localeCompare(b.course.name.toLowerCase())
    //         );
    //     } else if (selectedSort === "availability") {
    //         courseApplications = [...courseApplications].sort((a, b) =>
    //             a.availability.toLowerCase().localeCompare(b.availability.toLowerCase())
    //         );
    //     }

    //     return courseApplications;
    // }, [applications, selectedSubject, selectedSort]);


    useEffect(() => {
        setInputText("");
        setSelectedCandidates([]);

        const candidatesWithSelectedSubject = candidates.map(can => {
            // Filter applications for this user and selected course
            const candApplications = applications.filter(app =>
                app.candidate.id === can.id && app.course.name === selectedSubject
            );

            // Returns user + applications only if there's a match
            if (candApplications.length > 0) {
                return {
                    ...can,
                    applications: candApplications // override applications to include only matching ones
                };
            }
            return null;
        }).filter(can => can !== null); // Remove users with no matching apps

        console.log("Candidates with selected subjects", candidatesWithSelectedSubject)
        const filteredCandidates = candidatesWithSelectedSubject.filter(
            (candidate): candidate is Candidate => candidate !== null
            );
        setSubjectFilteredCandidates(filteredCandidates);
        setFilteredCandidates(filteredCandidates);
    }, [candidates, applications, selectedSubject]);


   useEffect(() => {
        if (selectedSort) {
            handleSorting();
        }
        }, [selectedSort]);


    const filteredCandidatesLength = filteredCandidates.length;

    const handleRankingChange = (rank: number, candidateId: number) => {
  // Find candidate details from filteredCandidates or somewhere
    const candidate = filteredCandidates.find(c => c.id === candidateId);
    if (!candidate) return;

    const application = candidate.applications.find(app => lecturerCourseIds.includes(app.course.id));
    if (!application) return;

    // Update or add new selection
    setSelectedCandidates(prev => {
    if (!lecturerDetails) {
        console.error("Lecturer details not found");
        return prev;
    }

    // Check if the candidate is already selected
    const existing = prev.find(sel => sel.application.id === applicationId);

    if (existing) {
        return prev.map(sel =>
        sel.application.id === applicationId
            ? { ...sel, rank, application, lecturer: lecturerDetails }
            : sel
        );
    } else {
        return [...prev, { id: candidateId, rank, comment: "", application, lecturer: lecturerDetails }];
    }
    });

    };
    const [savedSelections, setSavedSelections] = useState<LecturerSelection[]>([]);
    // console.log("LEC, ",lecturerDetails?.id)
        useEffect(() => {
        if (!lecturerDetails) return;
        

        const fetchSelections = async () => {
            try {
            const data = await lecturerSelectionApi.getByLecturer(lecturerDetails.id);
            setSavedSelections(data);
            } catch (err) {
            console.error("Error fetching lecturer selections", err);
            }
        };

        fetchSelections();
        }, [lecturerDetails]);

        // const applicantStats = useApplicantsStats(savedSelections);

    // validation: comments must be shorter than 500 characters
    const handleAddComment = (comment: string, applicantId: number) => {
        const currSelection = selectedCandidates.find((u) => u.id === applicantId);
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
            const updatedComment = selectedCandidates.map((candidate) =>
                candidate.application.id === applicantId ? { ...currSelection, comment } : candidate);
            setSelectedCandidates(updatedComment);
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

     useEffect(() => {
        const currentLecturer = users.find(currentUser => currentUser.id === user?.id);
        if (!currentLecturer || !currentLecturer.lecturer) {
        console.log("Lecturer details not found yet!");
        setLecturerCourseIds([]); // clear state if not found
        return;
        }

        const lecturerId = currentLecturer.lecturer.id;

        // Get all course IDs assigned to the current lecturer
        const courseIds = lecturerCourses
        .filter(lc => lc.lecturerId === lecturerId)
        .map(lc => lc.courseId);

        setLecturerCourseIds(courseIds);
    }, [users, user, lecturerCourses]);
    
    useEffect(() => {
    // Filter to only courses assigned to lecturer
        const filtered = courses.filter(c => lecturerCourseIds.includes(c.id));
        setFilteredCourses(filtered);
    }, [courses, lecturerCourseIds]);


    const handleSubmit = async () => {
    if (selectedCandidates.length === 0) {
        toast({ title: "Nothing selected", status: "error", duration: 3000, isClosable: true });
        return;
    }
    console.log("Selected candiates are, ",selectedCandidates)

    // Map UI objects → DTO expected by backend
    const payload = selectedCandidates.map((sel) => ({
        lecturerId: sel.lecturer.id,
        applicationId: sel.application.id,
        ranking: sel.rank!,   // whichever field you kept
        comment: sel.comment,
    }));
    console.log("Payload d is ",payload)
    try {
        await lecturerSelectionApi.saveSelections(payload);
        await Promise.all(
            selectedCandidates.map(sel =>
            applicationService.incrementSelectedCount(sel.application.id)
            )
        );

        await fetchSavedApplications();

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
        // let sorting = [...candidates];
        let sorting = [...subjectFilteredCandidates];
        if (selectedSearch === "availability") {
            sorting = sorting.map(u => ({
                ...u,
                applicationSummary: u.applications?.filter(summary => summary.availability.toLowerCase() === inputText.toLowerCase())||[]
            })).filter(user => user.applicationSummary.length > 0);
        } else if (selectedSearch === "tutor") {
            sorting = sorting.filter(selection => selection.user.firstName.toLowerCase() === inputText.toLowerCase());
        } else if (selectedSearch === "jobRole") {
            sorting = sorting.map(u => ({
                ...u,
                applicationSummary: u.applications?.filter(summary =>
                    summary.role.toLowerCase() === inputText.toLowerCase()
                ) || []
            })).filter(user => user.applicationSummary.length > 0);
        } else if (selectedSearch === "skillset") {
            sorting = sorting.map(u => ({
                ...u,
                applicationSummary: u.applications?.filter(summary => summary.skills.some(
                    skill => skill.split(", ").some((skillItem) => 
                         skillItem.toLowerCase().includes(inputText.toLowerCase())
                    ))

                ) || []
            })).filter(user => user.applicationSummary.length > 0);
        }
        setFilteredCandidates(sorting);
    }
    const handleSorting = () => {
        let sorted = [...filteredCandidates];

        if (selectedSort === "course") {
            sorted.sort((a, b) => {
            const courseA = a.applications?.[0]?.course.name.toLowerCase() || "";
            const courseB = b.applications?.[0]?.course.name.toLowerCase() || "";
            return courseA.localeCompare(courseB);
            });
        } else if (selectedSort === "availability") {
            sorted.sort((a, b) => {
            const availA = a.applications?.[0]?.availability.toLowerCase() || "";
            const availB = b.applications?.[0]?.availability.toLowerCase() || "";
            return availA.localeCompare(availB);
            });
        }

        setFilteredCandidates(sorted);
        };


    console.log('Users: ', users);
    console.log("Applications:", applications); //displays all applications
    console.log("Current user - lecturer details: ", users.find(currentUser=>currentUser.id===user?.id))
    // Filter applications where the course is taught by this lecturer
    const applicationWithUserDetails = applications
        .filter(app => lecturerCourseIds.includes(app.course?.id))
        .map(app => {
            const candidateDetails = candidates.find(c => c.id === app.candidate.id);
            if (!candidateDetails) {
                console.log(`No user found for application with id: ${app.candidate.id}`);
            }
            return { ...app, candidateDetails };
        });



    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex">
                <Sidebar onClick={setSelectedSubject} courses={filteredCourses} />
                <div className="flex-row flex-grow pr-20 pt-8 pl-5">
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
                    {selectedSubject === "all" ?
                        (<div className="grid grid-cols-2">


                            {applicationWithUserDetails.map((application, index) => (
                                <div key={index} className="p-4 border rounded">
                                    <p className="text-gray-800">Applicant Name: {application.candidateDetails?.user.firstName}{" "}{application.candidateDetails?.user.lastName}</p>
                                    <p className="text-gray-800">Applicant Email: {application.candidateDetails?.user.email}</p>
                                    <p className="text-gray-800">JobRole: {application.role}</p>
                                    <p className="text-gray-800">Skills: {application.skills}</p>
                                    <p className="text-gray-800">Availability: {application.availability}</p>
                                    <p className="text-gray-800 mt-2">Qualification:{application.academic}</p>
                                    <p className="text-gray-800">Course Name: {application.course.name}</p>
                                    <p className="text-gray-800">Previous Role: {application.previousRole}</p>

                                </div>
                            ))}

                        </div>
                        ) : (
                            <ApplicantsDisplay
                                selectedSubject={selectedSubject}
                                handleAddComment={handleAddComment}
                                handleSubmit={handleSubmit}
                                handleRankingChange={handleRankingChange}
                                filteredCandidates={filteredCandidates}
                                selectedCandidates={selectedCandidates}
                                filteredCandidatesLength={filteredCandidatesLength}
                                sort={selectedSort}
                                lecturerCourseIds={lecturerCourseIds}
                                unavailableApplicationIds={unavailableApplicationIds}
                            />
                        )
                    }
                </div>
            </div>

            <div className="pt-13">
                <Footer />
            </div>
        </div>
    )
}
