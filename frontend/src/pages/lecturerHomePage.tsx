import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { applicationApi, candidateApi, courseService, userService,lecturerCourseService, lecturerService } from "@/services/api";
import ApplicantsDisplay from "@/components/ApplicantsDisplay";
import SelectionBar from "@/components/SelectionBar";
import Sidebar from "@/components/SideBar";
import { LecturerSelection, User, Candidate, Application ,Lecturer, Course, LecturerCourse} from "@/types/types";


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
    // const { updateJobApplications } = useAuth();
    const toast = useToast();
    const router = useRouter();
    const [applications, setApplications] = useState<Application[]>([]);
    const { user } = useAuth();
    const[lecturerCourses,setLecturerCourses]=useState<LecturerCourse[]>([]);

    const [courses, setCourses] = useState<Course[]>([]);
    
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
            const data = await applicationApi.getAllApplications();
            setApplications(data);
        } catch (error) {
            console.error("Error fetching applications", error);
        }
    }
    useEffect(() => {
        // NEW code
        fetchSavedApplications();

    }, []);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userService.getAllUsers();
                console.log("Fetched users data:", data);
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users", error);
            }
        };

        fetchUsers();
    }, []);
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const data = await candidateApi.getAllCandidates();
                console.log("Fetched Candidates data:", data);
                setCandidates(data);
            } catch (error) {
                console.error("Error fetching candidates", error);
            }
        };

        fetchCandidates();
    }, []);
    useEffect(() => {
        const fetchLecturer = async () => {
            try {
                const data = await lecturerService.getAllLecturers() ;
                console.log("Fetched Candidates data:", data);
                setLecturer(data);
            } catch (error) {
                console.error("Error fetching candidates", error);
            }
        };

        fetchLecturer();
    }, []);
        useEffect(() => {
        const fetchlectCourses = async () => {
            try {
                const data = await lecturerCourseService.getAllLecturerCourses();
                console.log("@@@@@@@@@@@@@@@Fetched lecturer course data:", data);
                setLecturerCourses(data);
            } catch (error) {
                console.error("@@@@@@@@@@@@@@@Error fetching lecturer assigned course details", error);
            }
        };

        fetchlectCourses();
    }, []);
    // old
    // useEffect(() => {
    //     setInputText("");
    //     setSelectedCandidates([]);
    //     let applicationList = users.map(u => ({
    //         ...u,
    //         applicationSummary: u.applicationSummary.filter(summary => summary.course === selectedSubject)
    //     })).filter(user => user.applicationSummary.length > 0); 
    //     setFilteredUsers(applicationList);
    // }, [users, selectedSubject]);
    // new
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

        // Step 2: Save to state
        console.log("Candidates with selected subjects", candidatesWithSelectedSubject)
        setSubjectFilteredCandidates(candidatesWithSelectedSubject);
        setFilteredCandidates(candidatesWithSelectedSubject);
    }, [candidates, applications, selectedSubject]);
   useEffect(() => {
        if (selectedSort) {
            handleSorting();
        }
        }, [selectedSort]);


    const filteredCandidatesLength = filteredCandidates.length;
    // Ranking

    const handleRankingChange = (rank: number, applicantId: number) => {
        const currSelection = selectedCandidates.find((u) => u.id === applicantId);

        if (currSelection) {
            const updatedSelection = selectedCandidates.map((candidate) =>
                candidate.id === applicantId ? { ...currSelection, rank } : candidate);
            setSelectedCandidates(updatedSelection);

        }
        else {
            const newSelection: LecturerSelection = {
            id: 0, // This can be replaced when the object is persisted
            rank: rank,
            comment: "",
            lecturer: {} as Lecturer, // Placeholder lecturer (replace this with actual data)
            application: {} as Application, // Placeholder application (replace this with actual data)
        };
            setSelectedCandidates((prevState) => [
                ...prevState,newSelection
            ]);
        }
    }

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
                candidate.id === applicantId ? { ...currSelection, comment } : candidate);
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
    
    const handleSubmit = () => {
        const success = saveSelection(selectedCandidates);

        // selectedCandidates.map(candidate => updateJobApplications(candidate));

        if (success) {
            router.push('/lecturerSelection');
            toast({
                title: "Selection Updated",
                description: "You have successfully ranked and commented.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

        }
    }

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
    const lecturerDetails=users.find(currentUser=>currentUser.id===user?.id)
    const lecturerId=lecturerDetails?.lecturer?.id;

    // Get all course IDs assigned to the current lecturer
    const lecturerCourseIds = lecturerCourses
        .filter(lc => lc.lecturerId === lecturerId)
        .map(lc => lc.courseId);

    console.log("Courses assigned to current lecturer:", lecturerCourseIds);

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
                <Sidebar onClick={setSelectedSubject} courses={courses} />
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