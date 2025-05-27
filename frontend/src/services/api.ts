import { User, Candidate, Role, Course,Availability, Application } from "../types/types";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

export const userService = {
    getAllUsers: async (): Promise<User[]> => {
        // const { data } = await client.query({ query: GET_USERS });
        // return data.users;
        const { data } = await axios.get<User[]>(`${API_BASE_URL}/users`);
        return data;
    },

    createUser: async (user: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        // avatarUrl?: string | null;
        role: Role;
    }): Promise<User> => {
        console.log("Sending user data to backend:", JSON.stringify(user, null, 2));

        const { data } = await axios.post<User>(`${API_BASE_URL}/users`, user);
        console.log("create user data",data)
        return data;

        // const { data } = await client.mutate({
        //     mutation: CREATE_USER,
        //     variables: user,
        // });
        // return data.createUser;
    },

    getUser: async (id: number): Promise<User> => {
        // const { data } = await client.query({
        //     query: GET_USER,
        //     variables: { id },
        // });
        // return data.user;
        const { data } = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
        return data;
    },

    deleteUser: async (id: number): Promise<void> => {
        // const { data } = await client.mutate({
        //     mutation: DELETE_USER,
        //     variables: { id },
        // });
        // return data.deleteUser;
        await axios.delete(`${API_BASE_URL}/users/${id}`);
    },

    logout: async (): Promise<void> => {
        await axios.post(`${API_BASE_URL}/logout`);
    },

    login: async (email: string, password: string): Promise<User | null> => {
        const { data } = await axios.post<User>(`${API_BASE_URL}/login`, { email, password });
        return data;
    },

    updateUser: async (
        id: number,
        user: {
            // firstName?: string;
            // lastName?: string;
            // email?: string;
            // password?: string;
            avatarUrl?: string;
            // role?: Role;
        }
    ): Promise<User> => {
        // const { data } = await client.mutate({
        //     mutation: UPDATE_USER,
        //     variables: { id, ...user },
        // });
        // return data.updateUser;
        const { data } = await axios.put<User>(`${API_BASE_URL}/users/${id}`, user);
        return data;
    }
}

export const courseService = {
    getAllCourses: async (): Promise<Course[]> => {
        const { data } = await axios.get<Course[]>(`${API_BASE_URL}/courses`);
        return data;
    },

}
export const candidateApi={
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

export const applicationApi ={

  saveApplication:async(application:{

    course: string;
    previousRole: string;
    role: string;
    availability: string;
    skills: string;
    academic: string;
    candidateId:number
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
    }
}