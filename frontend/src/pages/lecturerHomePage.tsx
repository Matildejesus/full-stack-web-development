import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { applicationApi, candidateApi, courseService, userService } from "@/services/api";
import ApplicantsDisplay from "@/components/ApplicantsDisplay";
import SelectionBar from "@/components/SelectionBar";
import Sidebar from "@/components/SideBar";
import { LecturerSelection, User, Candidate, Application ,Lecturer, Course} from "@/types/types";


export default function LecturerHome() {
    const [selectedSubject, setSelectedSubject] = useState<string>("all");
    const [users, setUsers] = useState<User[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [selectedCandidates, setSelectedCandidates] = useState<LecturerSelection[]>([]);
    const { saveSelection } = useAuth();
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>("");
    const [selectedSearch, setSelectedSearch] = useState<string>("");
    const [inputText, setInputText] = useState<string>("");
        const [placeholder, setPlaceholder] = useState<string>("");
    // const { updateJobApplications } = useAuth();
    const toast = useToast();
    const router = useRouter();
    const [applications, setApplications] = useState<Application[]>([]);


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
        setFilteredCandidates(candidatesWithSelectedSubject);


    }, [candidates, applications, selectedSubject]);


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
                setPlaceholder("Please enter Fulltime or Parttime...");
            } else if (selectedSearch === "skillset") {
                setPlaceholder("Please enter a skill...");
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
        let sorting = [...filteredCandidates];
        if (selectedSearch === "availability") {
            sorting = [...sorting].map(u => ({
                ...u,
                applicationSummary: u.applications.filter(summary => summary.availability.toLowerCase() === inputText.toLowerCase())
            })).filter(user => user.applicationSummary.length > 0);
        } else if (selectedSearch === "tutor") {
            sorting = [...sorting].filter(selection => selection.user.firstName.toLowerCase() === inputText.toLowerCase());
        } else if (selectedSearch === "skillset") {
            sorting = [...sorting].map(u => ({
                ...u,
                applicationSummary: u.applications.filter(summary => summary.skills.some(
                    skill => skill.split(", ").some((skillItem) => {
                        return skillItem.toLowerCase().includes(inputText.toLowerCase())
                    }))

                )
            })).filter(user => user.applicationSummary.length > 0);
        }
        setFilteredCandidates(sorting);
    }

    console.log('Users: ', users);
    console.log("Applications:", applications);

    const applicationWithUserDetails = applications.map((app) => {
        const candidateDetails = candidates.find(c => c.id == app.candidate.id);
        if (!candidateDetails) {
            console.log(`No user found for application with email: ${app.candidate.id}`);
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
                                    <p className="text-gray-800">ApplicantEmail: {application.candidateDetails?.user.email}</p>
                                    <p className="text-gray-800">JobRole: {application.role}</p>
                                    <p className="text-gray-800">Skills: {application.skills}</p>
                                    <p className="text-gray-800">Availability: {application.availability}</p>
                                    <p className="text-gray-800 mt-2">Highest Academic Qualification:{application.academic}</p>
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