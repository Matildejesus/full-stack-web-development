import { Course, Semester } from "@/types/types";
import { client } from "./apollo-client";
import { CREATE_COURSE, DELETE_COURSE, GET_COURSE, GET_COURSES, LOGIN, LOGOUT, UPDATE_COURSE } from "./graphql";


export const courseService = {
    getAllCourses: async (): Promise<Course[]> => {
        const { data } = await client.query({ 
            query: GET_COURSES,
            fetchPolicy: "no-cache",
        });
        return data.courses;
    },
    getCourse: async (id: string): Promise<Course> => {
        const { data } = await client.query({
            query: GET_COURSE,
            variables: { id },
        });
        return data.course;
    },
    createCourse: async (course: {
        name: string;
        code: string;
        semester: Semester;
    }): Promise<Course> => {
        const { data } = await client.mutate({
            mutation: CREATE_COURSE,
            variables: course,
            refetchQueries: [{ query: GET_COURSES }],
        });
        return data.createCourse;
    },
    updateCourse: async (
        id: string,
        course: {
            name?: string;
            code?: string;
            semester?: Semester;
        }
    ): Promise<Course> => {
        const { data } = await client.mutate({
            mutation: UPDATE_COURSE,
            variables: { id, ...course },
        });
        return data.updateCourse;
    },
    deleteCourse: async (id: number): Promise<boolean> => {
        const { data } = await client.mutate({
        mutation: DELETE_COURSE,
        variables: { id },
        refetchQueries: [{ query: GET_COURSES }],
        });
        return data.deleteCourse;
    },
}

export const userService = {
    login: async (username: string, password: string): Promise<boolean> => {
        const { data } = await client.mutate({
            mutation: LOGIN,
            variables: { username, password },
        });
        return data.login;
    },
    logout: async (): Promise<boolean> => {
        const { data } = await client.mutate({
            mutation: LOGOUT
        })
        return data.logout;
    }
};


