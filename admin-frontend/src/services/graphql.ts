import { gql } from "@apollo/client";

// QUERY
export const GET_COURSES = gql`
    query GetCourses {
        courses {
            id
            name
            code
            semester
            applications {
                id
                selectedCount
                candidate {
                    id
                    user {
                        id 
                        firstName
                        lastName
                        avatarUrl
                    }
                }
            }
        }
    }
`;

export const GET_COURSE = gql`
    query GetCourse($id: ID!) {
        course(id: $id) {
            id
            name
            code
            semester
        }
    }
`;

export const GET_USER = gql`
    query GetUser($id: ID!) {
        user(id: $id) {
            id
            email
            firstName
            lastName
            password
            avatarUrl
            role
            blocked
            lecturer {
                id
                lecturerCourses {
                    lecturerId
                    courseId
                    semester
                    course {
                        id
                        code
                        name
                        semester
                    }
                }
                lecturerSelection {
                    id
                    rank
                    comment
                }
            }
            candidate {
                id
                applications {
                    id
                    course {
                        id
                        code
                        name
                        semester
                    }
                    previousRole
                    role
                    availability
                    skills
                    academic
                    selectedCount
                    lecturerSelections {
                        id
                        rank
                        comment
                    }
                }
            }
            admin {
                id
            }
        }    
    }
`;

export const GET_LECTURERCOURSES_BY_COURSEID = gql`
    query GetLecturerCoursesByCourseId($courseId: ID!) {
        lecturerCoursesByCourseId(courseId: $courseId) {
            lecturerId
            courseId
            semester
            lecturer {
                id
                user {
                   id
                   firstName
                   lastName
                   email
                   avatarUrl
                   role
                   createdAt
                   updatedAt
                }
            }
        }
    }
`;

export const GET_LECTURERS = gql`
    query GetLecturers {
        lecturers {
            id
            user {
                id
                firstName
                lastName
                email
            }
            lecturerCourses {
                courseId
            }
        }
    }
`;

export const GET_CANDIDATES = gql`
    query GetCandidates {
        candidates {
            id
            blocked
            user {
                id
                firstName
                lastName
                email
                avatarUrl
            }
            applications { 
                selectedCount   
                role
                course {
                    id
                }
            }
        }
    }
`;

export const GET_CANDIDATE = gql`
    query GetCandidate($id: ID!) {
        candidate(id: $id) {
            id
            blocked
            user {
                id
                firstName
                lastName
                email
                avatarUrl
            }
        }
    }
`;

// get candidates is missing applications implement later

// MUTATION
export const CREATE_COURSE = gql`
    mutation CreateCourse(
        $name: String!
        $code: String!
        $semester: Semester!
    ) {
        createCourse(
            name: $name
            code: $code
            semester: $semester
        ) {
            name
            code
            semester
        }
    }
`;

export const CREATE_LECTURER_COURSE = gql`
    mutation CreateLecturerCourse(
        $lecturerId: ID!,
        $courseId: ID!,
        $semester: Semester!
    ) {
        createLecturerCourse(
            lecturerId: $lecturerId
            courseId: $courseId
            semester: $semester
        ) {
            lecturerId
            courseId
            semester
        }
    }
`

export const UPDATE_COURSE = gql`
    mutation UpdateCourse(
        $id: ID!
        $name: String
        $code: String
        $semester: Semester
    ) {
        updateCourse(
            id: $id
            name: $name
            code: $code
            semester: $semester
        ) {
            id
            name
            code
            semester
        }
    }
`;

export const UPDATE_CANDIDATE_BLOCKED = gql`
    mutation UpdateCandidateBlocked(
        $id: ID!
        $blocked: Boolean!
    ) {
        updateCandidateBlocked(
            id: $id
            blocked: $blocked
        ) {
            id
            blocked
            user {
                id
                firstName
                lastName
                email
                avatarUrl
            }
        }
    }
`;

export const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;


export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            firstName
            lastName
            email
            role
        }
    }
`;

export const LOGOUT = gql`
    mutation Logout {
        logout
    }
`;
