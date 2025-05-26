import { User, Candidate, Role, Course,Availability, Application } from "../types/types";
import { gql } from "@apollo/client";
import axios from "axios";
import App from "next/app";

// const GET_USERS = gql`
//     query GetUsers {
//         users {
//             id
//             email
//             firstName
//             lastName
//             password
//             avatarUrl
//             role
//             lecturer {
//                 id
//                 courses {
//                     id
//                     code
//                     name
//                 }
//                 lecturerSelection {
//                     id
//                     rank
//                     comment
//                 }
//             }
//             candidate {
//                 id
//                 applications {
//                     id
//                     course {
//                         id
//                         code
//                         name
//                     }
//                     previousRole
//                     role
//                     availability
//                     skills
//                     academic
//                     selectedCount
//                     lecturerSelections {
//                         id
//                         rank
//                         comment
//                     }
//                 }
//             }
//             admin {
//                 id
//             }
//         }    
//     }
// `

// const GET_USER = gql`
//     query GetUser($id: ID!) {
//         user(id: $id) {
//             id
//             email
//             firstName
//             lastName
//             password
//             avatarUrl
//             role
//             lecturer {
//                 id
//                 courses {
//                     id
//                     code
//                     name
//                 }
//                 lecturerSelection {
//                     id
//                     rank
//                     comment
//                 }
//             }
//             candidate {
//                 id
//                 applications {
//                     id
//                     course {
//                         id
//                         code
//                         name
//                     }
//                     previousRole
//                     role
//                     availability
//                     skills
//                     academic
//                     selectedCount
//                     lecturerSelections {
//                         id
//                         rank
//                         comment
//                     }
//                 }
//             }
//             admin {
//                 id
//             }
//         }    
//     }
// `;

// const CREATE_USER = gql`
//     mutation CreateUser(
//         $email: String!
//         $firstName: String!
//         $lastName: String!
//         $password: String
//         $avatarUrl: String
//         $role: Role
//     ) {
//         createUser(
//             email: $email
//             firstName: $firstName
//             lastName: $lastName
//             password: $password
//             avatarUrl: $avatarUrl
//             role: $role
//         ) {
//             id
//             email
//             firstName
//             lastName
//             password
//             avatarUrl
//             role
//             lecturer {
//                 id
//                 courses {
//                     id
//                     code
//                     name
//                 }
//                 lecturerSelection {
//                     id
//                     rank
//                     comment
//                 }
//             }
//             candidate {
//                 id
//                 applications {
//                     id
//                     course {
//                         id
//                         code
//                         name
//                     }
//                     previousRole
//                     role
//                     availability
//                     skills
//                     academic
//                     selectedCount
//                     lecturerSelections {
//                         id
//                         rank
//                         comment
//                     }
//                 }
//             }
//             admin {
//                 id
//             }
//         }
//     }
// `;

// const UPDATE_USER = gql`
//     mutation UpdateUser(
//         $id: ID!
//         $email: String
//         $firstName: String
//         $lastName: String
//         $password: String
//         $avatarUrl: String
//         $role: Role
//     ) {
//         updateUser(
//             id: $id
//             email: $email
//             firstName: $firstName
//             lastName: $lastName
//             password: $password
//             avatarUrl: $avatarUrl
//             role: $role
//         ) {
//             id
//             email
//             firstName
//             lastName
//             password
//             avatarUrl
//             role
//             lecturer {
//                 id
//                 courses {
//                     id
//                     code
//                     name
//                 }
//                 lecturerSelection {
//                     id
//                     rank
//                     comment
//                 }
//             }
//             candidate {
//                 id
//                 applications {
//                     id
//                     course {
//                         id
//                         code
//                         name
//                     }
//                     previousRole
//                     role
//                     availability
//                     skills
//                     academic
//                     selectedCount
//                     lecturerSelections {
//                         id
//                         rank
//                         comment
//                     }
//                 }
//             }
//             admin {
//                 id
//             }
//         }
//     }
// `;

// const DELETE_USER = gql`
//   mutation DeleteUser($id: ID!) {
//     deleteUser(id: $id)
//   }
// `;

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

export const applicationApi ={

  saveApplication:async(application:{

    course: string;
    previousRole: string;
    role: string;
    availability: string;
    skills: string;
    academic: string;
    userId:number
  } ):Promise<Application>=>{
    const {data} = await axios.post<Application>(`${API_BASE_URL}/applications`, application);
    console.log("Body is ",data)
    console.log("Req is ", application)
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