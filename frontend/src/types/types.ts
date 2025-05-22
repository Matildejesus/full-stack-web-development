export enum Role {
    ADMIN = "admin",
    CANDIDATE = "candidate",
    LECTURER = "lecturer"
}

export enum Availability {
    FULL_TIME = 'full-time',
    PART_TIME = 'part-time',
    CONTRACT = 'contract',
}

export interface Admin {
    id: number;
    user: User;
}

export interface Application {
    id: number;
    candidate: Candidate;
    course: Course;
    previousRole: string;
    jobRole: string;
    availability: Availability;
    skills: string[];
    academic: string;
    selectedCount: number;
    lecturerSelections: LecturerSelection[];
}

export interface Candidate {
    id: number;
    user: User;
    applications: Application[];
}

export interface Course {
    id: number;
    code: string;
    name: string;
    lecturer: Lecturer;
    applications: Application[];
}

export interface Lecturer {
    id: number;
    user: User;
    courses: Course[];
    lecturerSelections: LecturerSelection[];
}

export interface LecturerSelection {
    id: number;
    rank: number | null;
    comment: string;
    lecturer: Lecturer;
    application: Application;
   
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatarUrl: string | null;
    role: Role;
    lecturer?: Lecturer;
    candidate?: Candidate;
    admin?: Admin;
    createdAt: Date;
    updatedAt: Date;
}
