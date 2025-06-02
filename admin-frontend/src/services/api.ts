import { Candidate, Course, Lecturer, LecturerCourse, Semester } from "@/types/types";
import { client } from "./apollo-client";
import { CREATE_COURSE, CREATE_LECTURER_COURSE, DELETE_COURSE, GET_CANDIDATE, GET_CANDIDATES, GET_COURSE, GET_COURSES, GET_LECTURERCOURSES_BY_COURSEID, GET_LECTURERS, LOGIN, LOGOUT, UPDATE_CANDIDATE_BLOCKED, UPDATE_COURSE } from "./graphql";


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
            fetchPolicy: "no-cache",
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
            refetchQueries: [{ query: GET_COURSE }],
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

export const lecturerCoursesService = {
    getLecturerCoursesByCourseId: async (courseId: string): Promise<LecturerCourse[]> => {
        const { data } = await client.query({ 
            query: GET_LECTURERCOURSES_BY_COURSEID,
            variables: { courseId },
            fetchPolicy: "no-cache",
        });
        return data.lecturerCoursesByCourseId;
    },
    createLecturerCourse: async (
        lecturerId: string,
        courseId: string,
        semester: Semester,
    ): Promise<LecturerCourse> => {
        const { data } = await client.mutate({
            mutation: CREATE_LECTURER_COURSE,
            variables: { lecturerId, courseId, semester },
            refetchQueries: [{ query: GET_LECTURERCOURSES_BY_COURSEID }],
        });
        return data.createLecturerCourse;
    },
};

export const lecturerService = {
    getAllLecturers: async (): Promise<Lecturer[]> => {
        const { data } = await client.query({ 
            query: GET_LECTURERS,
            fetchPolicy: "no-cache",
        });
        return data.lecturers;
    },
}

export const candidateService = {
    getAllCandidates: async (): Promise<Candidate[]> => {
        const { data } = await client.query({ 
            query: GET_CANDIDATES,
            fetchPolicy: "no-cache",
        });
        return data.candidates;
    },
    getCandidate: async (id: string): Promise<Candidate> => {
        const { data } = await client.query({
            query: GET_CANDIDATE,
            variables: { id },
            fetchPolicy: "no-cache",
        });
        return data.candidate;
    },
    updateCandidateBlocked: async (
        id: string,
        candidate: {
            blocked: boolean;
        }
    ): Promise<Course> => {
        const { data } = await client.mutate({
            mutation: UPDATE_CANDIDATE_BLOCKED,
            variables: { id, ...candidate },
            refetchQueries: [{ query: GET_CANDIDATES }],
        });
        return data.updateCandidateBlocked;
    },
}