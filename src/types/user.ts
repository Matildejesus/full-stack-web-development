
import { JobSummary } from "./JobSummary";
import { LecturerSelection } from "./lecturerSelection";


export interface User {
    id: string;
    firstname: string;
    email: string;
    password: string;
    role: String;
    jobSummary: JobSummary[];
    lecturerSelection: LecturerSelection[],
};

export const DEFAULT_USERS: User[] = [
    {
        id: "1", 
        firstname: "Jane", 
        email: "janedoe@gmail.com", 
        password: "Password123", 
        role: "Lecturer",
        jobSummary:[],
        lecturerSelection: []
        
    },
    {
        id: "2", 
        firstname: "Steve", 
        email: "steve@gmail.com", 
        password: "Password456", 
        role: "Tutor",
        jobSummary:[],
        lecturerSelection: []
    },
    {
        id: "3",
        firstname: "Bob",
        email: "bob@gmail.com",
        password: "Password456",
        role: "Tutor",
        jobSummary: [],
        lecturerSelection: []
    },
    {
        id: "4",
        firstname: "Mill",
        email: "mill@gmail.com",
        password: "Password456",
        role: "Tutor",
        jobSummary: [],
        lecturerSelection: []
    },
    {
        id: "5",
        firstname: "Jade",
        email: "jade@gmail.com",
        password: "Password456",
        role: "Tutor",
        jobSummary: [],
        lecturerSelection: []
    },
    {
        id: "6",
        firstname: "Piya",
        email: "piya@gmail.com",
        password: "Password456",
        role: "Lecturer",
        jobSummary: [],
        lecturerSelection: []
    }
];