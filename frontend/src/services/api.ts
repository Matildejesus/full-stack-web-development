import { User, Candidate, Role, Course, Application, LecturerCourse, Lecturer, Semester, AppRole, LecturerSelection } from "../types/types";
import axios from "axios";

const API_BASE_URL = "https://full-stack-web-development-k1qn.vercel.app/api"; 

export interface LecturerCoursesResponse {
    id: number;
    semester: Semester;
    course: {
        id: number;
        name: string;
        code: string;
    };
}

export const userService = {
    getAllUsers: async (): Promise<User[]> => {
        const { data } = await axios.get<User[]>(`${API_BASE_URL}/users`);
        return data;
    },

    createUser: async (user: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }): Promise<User> => {
        console.log("Sending user data to backend:", JSON.stringify(user, null, 2));

        const { data } = await axios.post<User>(`${API_BASE_URL}/users`, user);
        console.log("create user data",data)
        return data;
    },

    getUser: async (id: number): Promise<User> => {
        const { data } = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
        return data;
    },

    deleteUser: async (id: number): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/users/${id}`);
    },

    logout: async (): Promise<void> => {
        await axios.post(`${API_BASE_URL}/logout`);
    },

    login: async (email: string, password: string): Promise<User | null> => {
        const { data } = await axios.post<User>(`${API_BASE_URL}/login`, { email, password });
        // if (data.role === Role.CANDIDATE) {
        //     const { data: candData } = await axios.get<Candidate>(`${API_BASE_URL}/candidates`,
        //         {params:{userId: data.id}
        //     });
        //     if (candData.blocked) {
        //         return null;
        //     }
        // }
        return data;
    },

    updateUser: async (
        id: number,
        user: {
            avatarUrl?: string;
        }
    ): Promise<User> => {
        const { data } = await axios.put<User>(`${API_BASE_URL}/users/${id}`, user);
        return data;
    },

    uploadAvatar: async (file: File): Promise<{ url: string }> => {
        const formData = new FormData();
        formData.append("avatar", file);

        const { data } = await axios.post<{ url: string }>(
        `${API_BASE_URL}/users/upload-avatar`,
        formData,
        {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        }
        );

        return data;
    },

}

export const courseService = {
    getAllCourses: async (): Promise<Course[]> => {
        const { data } = await axios.get<Course[]>(`${API_BASE_URL}/courses`);
        console.log("data are ", data)
        return data;
    },
    getCourse: async (): Promise<Course> => {
        const { data } = await axios.get<Course>(`${API_BASE_URL}/courses`);
        return data;
    }

}

export const lecturerService = { 
    
    getLecturer: async (id: number): Promise<Lecturer> => {
        const { data } = await axios.get<Lecturer>(`${API_BASE_URL}/lecturers/${id}`);
        console.log("This is shown in profile: ", data);
        return data;
    },
    getAllLecturers: async ():Promise<Lecturer[]> => {
        const { data } = await axios.get<Lecturer[]>(`${API_BASE_URL}/lecturers`);
        return data;
    },
    // getLecturerByUserId: async (userId: number): Promise<Lecturer> => {
    // const { data } = await axios.get<Lecturer>(`${API_BASE_URL}/lecturers/user/:${userId}`);
    // return data;
// }
}

export const lecturerCourseService = {
    getLecturerCourses: async (id: number): Promise<LecturerCoursesResponse[]> => {
        const { data } = await axios.get<LecturerCoursesResponse[]>(`${API_BASE_URL}/lecturerCourses/${id}`);
        return data;
    },
    getAllLecturerCourses: async (): Promise<LecturerCourse[]> => {
        const { data } = await axios.get<LecturerCourse[]>(`${API_BASE_URL}/lecturerCourses`);
        return data;
    }
}

export const candidateService={
    getCandidateByUserId: async (userId: number):Promise<Candidate | null > =>{
        const {data}=await axios.get<Candidate>(`${API_BASE_URL}/candidates`,
            {params:{userId}
        });
        return data;
    },
    getAllCandidates: async (): Promise<Candidate[]> => {
        const { data } = await axios.get<Candidate[]>(`${API_BASE_URL}/candidates`);
        return data;
    },
}

export const applicationService ={

  saveApplication:async(application:{
    course: string;
    previousRole: string;
    role: AppRole;
    availability: string;
    skills: string;
    academic: string;
    semester:Semester;
    // candidateId:number
  } ):Promise<Application>=>{
    console.log("Req is ", application)
    const {data} = await axios.post<Application>(`${API_BASE_URL}/applications`, application);
    console.log("Body is ",data)
    
    return data ;
  },

    getAllApplications: async ():Promise<Application[]> => {
        try {
        const {data }= await axios.get<Application[]>(`${API_BASE_URL}/applications`);
        console.log("List of submitted Appplications",data);
        return data;
        } catch (error) {
        console.error("Error fetching applications:", error);
        throw error;
        }
    },

    incrementSelectedCount: async (applicationId: number,increment = 1
    ): Promise<Application> => {
    const { data } = await axios.patch<Application>(`${API_BASE_URL}/applications/${applicationId}/selected`,
        { increment }
    );
    return data;
    },
}
export const lecturerSelectionApi = {
     saveSelections: async (
        selections: {
        lecturerId: number;
        applicationId: number;
        ranking: number;
        comment: string;
        }[]
    ): Promise<void> => {
        await axios.post(`${API_BASE_URL}/lecturer-selections`, selections);
    },
    
    getByLecturer: async (lecturerId: number) => {
        const { data } = await axios.get(`${API_BASE_URL}/lecturer-selections`, {
        params: { lecturerId },
        });
        
        return data as LecturerSelection[];
    },
}