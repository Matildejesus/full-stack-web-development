import { gql } from "@apollo/client";

export const GET_COURSES = gql`
    query GetCourses {
        courses {
            id
            name
            code
            semester
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

export const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
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
                courses {
                    id
                    code
                    name
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
