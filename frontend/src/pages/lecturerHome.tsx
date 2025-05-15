import ApplicantsDisplay from "../components/ApplicantsDisplay";
import ApplicationDisplay from "../components/ApplicationDisplay";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SelectionBar from "../components/SelectionBar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { LecturerSelection } from "../types/lecturerSelection";
// import { DEFAULT_USERS, User } from "../types/user";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { applicationApi, Application,userApi, User } from "@/services/api";
import App from "./_app";
import { AppleImage } from "next/dist/lib/metadata/types/extra-types";


export default function LecturerHome(){
    const [selectedSubject, setSelectedSubject] = useState<string>("all");
    const [users, setUsers] = useState<User[]>([]);
    const [selectedCandidates, setSelectedCandidates] = useState<LecturerSelection[]>([]);
    const {saveSelection} = useAuth();
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>("");
    const [selectedSearch, setSelectedSearch] = useState<string>("");
    const [inputText, setInputText] = useState<string>("");
    const {updateJobApplications } = useAuth(); 
    const toast = useToast(); 
    const router = useRouter();
    const[applications, setApplications]= useState<Application[]>([]);

    useEffect(() => {
        // NEW code
        fetchSavedApplications();
        // const storedUsers = localStorage.getItem("users");
        // if (!storedUsers) {
        //     localStorage.setItem("users", JSON.stringify(DEFAULT_USERS));
        //     setUsers(DEFAULT_USERS);
        // } else {
        //     setUsers(JSON.parse(storedUsers));
        // } 
    },[]);
// NEW
    const fetchSavedApplications=async()=>{
        try{
            const data=await applicationApi.getAllApplications();
            setApplications(data);
        }catch(error){
            console.error("Error fetching applications",error);
        }
    }
    useEffect(() => {
    const fetchUsers = async () => {
        try {
            const data = await userApi.getAllUsers(); 
            console.log("Fetched users data:", data);
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    fetchUsers();
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

    const usersWithSelectedSubject = users.map(user => {
        // Filter applications for this user and selected course
        const userApplications = applications.filter(app => 
            app.email === user.email && app.course_Name === selectedSubject
        );

        // Returns user + applications only if there's a match
        if (userApplications.length > 0) {
            return {
                ...user,
                applications: userApplications // override applications to include only matching ones
            };
        }
        return null;
    }).filter(user => user !== null); // Remove users with no matching apps

    // Step 2: Save to state
    console.log("User with selected subjects",usersWithSelectedSubject)
    setFilteredUsers(usersWithSelectedSubject);


}, [users, applications, selectedSubject]);


    const filteredUsersLength = filteredUsers.length;
// Ranking

    const handleRankingChange = (rank: number, applicantId: string) => {
        const currSelection = selectedCandidates.find((u) => u.userId === applicantId);
        
        if (currSelection) {
            const updatedSelection = selectedCandidates.map((candidate) => 
                candidate.userId === applicantId ? {...currSelection, rank} : candidate);
            setSelectedCandidates(updatedSelection);
        } else {
            setSelectedCandidates((prevState) => [
                ...prevState, 
                {
                    course: selectedSubject,
                    userId: applicantId,
                    rank: rank,
                    comment: ""
                }
            ])
        }
    }

    // validation: comments must be shorter than 500 characters
    const handleAddComment = (comment: string, applicantId: string) => {
        const currSelection = selectedCandidates.find((u) => u.userId === applicantId);
        if (comment.length > 500 ) {
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
                candidate.userId === applicantId ? {...currSelection, comment} : candidate);
            setSelectedCandidates(updatedComment);
        } 
    }
    
    const handleSubmit = () => {
        const success = saveSelection(selectedCandidates);

        selectedCandidates.map(candidate => updateJobApplications(candidate));
        
        if (success) {
            router.push( '/lecturerSelection');
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
        let sorting = [...filteredUsers];
        if (selectedSearch === "availability") {
            sorting = [...sorting].map(u => ({
                ...u,
                applicationSummary: u.applicationSummary.filter(summary => summary.availability.toLowerCase() === inputText.toLowerCase())
            })).filter(user => user.applicationSummary.length > 0);     
        } else if (selectedSearch === "tutor") {
            sorting = [...sorting].filter(selection => selection.firstname.toLowerCase() === inputText.toLowerCase());
        } else if (selectedSearch === "skillset") {
            sorting = [...sorting].map(u => ({
                ...u,
                applicationSummary: u.applicationSummary.filter(summary => summary.skills.some(
                    skill=>skill.split(", ").some((skillItem) => {
                       return skillItem.toLowerCase().includes(inputText.toLowerCase())
                    }) )
                
            )
            })).filter(user => user.applicationSummary.length > 0);  
        }
        setFilteredUsers(sorting);
    }

    console.log('Users: ', users);
    console.log("Applications:", applications);

    const applicationWithUserDetails = applications.map((application, index) => {
    const userApplicant = users.find(u => u.email === application.email);
    if (!userApplicant) {
    console.log(`No user found for application with email: ${application.email}`);
  }
    return { ...application, userApplicant };
    });


    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex">
                <Sidebar onClick={setSelectedSubject}/>
                <div className="flex-row flex-grow pr-20 pt-8 pl-5">
                    <SelectionBar 
                        selectedSort={selectedSort}
                        setSelectedSort={setSelectedSort} 
                        selectedSubject={selectedSubject} 
                        selectedSearch={selectedSearch} 
                        setSelectedSearch={setSelectedSearch} 
                        handleSearchSubmit={handleSearchSubmit}
                        inputText={inputText}
                        setInputText={setInputText}
                    />
                    {selectedSubject === "all" ? 
                        (<div className="grid grid-cols-2">
                            
                            
                    {applicationWithUserDetails.map((application,index) => (
                        <div key={index} className="p-4 border rounded">
                          <p className="text-gray-800">Applicant Name: {application.userApplicant?.firstName}{" "}{application.userApplicant?.lastName}</p>
                          <p className="text-gray-800">ApplicantEmail: {application.email}</p>
                          <p className="text-gray-800">JobRole: {application.jobRole}</p>
                          <p className="text-gray-800">Skills: {application.skills}</p>
                          <p className="text-gray-800">Availability: {application.availability}</p>
                          <p className="text-gray-800 mt-2">Highest Academic Qualification:{application.academic}</p>
                          <p className="text-gray-800">Course Name: {application.course_Name}</p>
                          <p className="text-gray-800">Previous Role: {application.previousRole}</p>
                          
                        </div>
                      ))}


                        {/* {users.map((u) => 
                            u.role === "Tutor" && (
                                <div key={u.id} className="pt-8 pl-4 pr-4">
                                    {u.applicationSummary.length > 0 && <h3 className="font-bold text-lg">{u.firstname}</h3> }
                                    <ApplicationDisplay user={u} isLoggedInUser={false} sort={selectedSort}/> 
                                </div>
                            )
                            
                        )} */}
                        </div>
                        ) : (
                            <ApplicantsDisplay 
                                selectedSubject={selectedSubject} 
                                handleAddComment={handleAddComment} 
                                handleSubmit={handleSubmit}
                                handleRankingChange={handleRankingChange}
                                filteredUsers={filteredUsers}
                                selectedCandidates={selectedCandidates}
                                filteredUsersLength={filteredUsersLength}
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