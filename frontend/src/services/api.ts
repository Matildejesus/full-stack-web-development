import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api", //  backend URL
});
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role:string;
}
export interface Candidate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role:string;
}
export interface Application{
  email:string,
  course_Name: string,
  jobRole:string,
  previousRole: string,
  availability: string,
  skills: string,
  academic: string
}
export const userApi = {

    createUser: async (user: User) => {
      const response = await api.post("/users", user);
      return response.data;
    },

    getUserByEmailPassword: async (email:string, password:string) => {
      const response = await api.post("/login",{ email, password});
      return response.data;
    },

    getUserByEmail: async (email: string) => {
      const response = await axios.get(`/api/users/${email}`);
      return response.data;
    },

    getAllUsers: async ()=>{
      const response = await api.get("/users"); 
      return response.data;
    }
};
export const applicationApi ={

  saveApplication:async(application: Application )=>{
    const response = await api.post("/applications", application);
    return response.data ;
  },

  getAllApplications: async ():Promise<Application[]> => {
    try {
      const response = await api.get("/applications");
      console.log("dchbdshmcv",response.data);
      return response.data as Application[];
    } catch (error) {
      console.error("Error fetching applications:", error);
      throw error;
    }
  }
};