import gql from "graphql-tag";

export const typeDefs = gql`
    enum Semester {
        one
        two
        both
    } 

    enum Role {
        admin
        lecturer
        candidate
    }

    enum Availability {
        full_time
        part_time
        contract
    }
    
    enum AppRole {
        tutor
        lab_assistant
    }
    
    type Course {
        id: ID!
        name: String!
        code: String!
        semester: Semester!
        applications: [Application!]!
    }

    type Admin {
        id: ID!
        user: User!
    }

    type Candidate {
        id: ID!
        user: User!
        blocked: Boolean
        available: Boolean
        applications: [Application!]!
    }

    type Lecturer {
        id: ID!
        courses: [Course!]!
        user: User!
        lecturerCourses: [LecturerCourse!]!
        lecturerSelection: [LecturerSelection!]!
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        avatarUrl: String
        role: Role!
        lecturer: Lecturer
        candidate: Candidate
        admin: Admin
        createdAt: String!
        updatedAt: String!
        blocked: Boolean!
    }

    type LecturerCourse {
        lecturerId: ID!
        courseId: ID!
        lecturer: Lecturer!
        course: Course!
        semester: Semester!
    }

    type LecturerSelection {
        id: ID!
        lecturer: Lecturer!
        application: Application!
        ranking: Int!
        comment: String!
    }

    type Application {
        id: ID!
        candidate: Candidate
        course: Course!
        previousRole: String!
        semester: Semester!
        role: AppRole!
        availability: Availability!
        skills: [String!]!
        academic: String!
        selectedCount: Int!
        lecturerSelections: [LecturerSelection!]!
    }

    type Query {
        courses: [Course!]!
        course(id: ID!): Course
        lecturerCoursesByCourseId(courseId: ID!): [LecturerCourse!]!
        lecturerCourse(id: ID!): [LecturerCourse] 
        candidates: [Candidate!]!
        candidate(id: ID!): Candidate
        users: [User!]!
        user(id: ID!): User
        lecturers: [Lecturer!]!
        lecturer(id: ID!): Lecturer
        applications: [Application!]!
        application(id: ID!): Application
        lecturerSelections: [LecturerSelection!]!
        lecturerSelection(id: ID!): LecturerSelection
    }
    
    type Mutation {
        createCourse(name: String!, code: String!, semester: Semester!): Course!
        updateCourse(id: ID!, name: String, code: String, semester: Semester): Course
        deleteCourse(id: ID!): Boolean
        login(username: String!, password: String!): User
        logout: Boolean
        createLecturerCourse(lecturerId: ID!, courseId: ID!, semester: Semester!): LecturerCourse!
        updateCandidateBlocked(id: ID!, blocked: Boolean!): Candidate
        updateCandidateAvailable(id: ID!, available: Boolean!): Candidate
    }
    
    type Subscription {
        candidateUnavailable: Candidate!
    }
`;
