import { User, Candidate, Role } from "../types/types";
import { gql } from "@apollo/client";
import { client } from "./apollo-client";

const GET_USERS = gql`
    query GetUsers {
        users {
            id
            email
            firstName
            lastName
            password
            avatarUrl
            role
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
                    jobRole
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
`

const GET_USER = gql`
    query GetUser($id: ID!) {
        user(id: $id) {
            id
            email
            firstName
            lastName
            password
            avatarUrl
            role
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
                    jobRole
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

const CREATE_USER = gql`
    mutation CreateUser(
        $email: String!
        $firstName: String!
        $lastName: String!
        $password: String
        $avatarUrl: String
        $role: Role
    ) {
        createUser(
            email: $email
            firstName: $firstName
            lastName: $lastName
            password: $password
            avatarUrl: $avatarUrl
            role: $role
        ) {
            id
            email
            firstName
            lastName
            password
            avatarUrl
            role
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
                    jobRole
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

const UPDATE_USER = gql`
    mutation UpdateUser(
        $id: ID!
        $email: String
        $firstName: String
        $lastName: String
        $password: String
        $avatarUrl: String
        $role: Role
    ) {
        updateUser(
            id: $id
            email: $email
            firstName: $firstName
            lastName: $lastName
            password: $password
            avatarUrl: $avatarUrl
            role: $role
        ) {
            id
            email
            firstName
            lastName
            password
            avatarUrl
            role
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
                    jobRole
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

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;



export const userService = {
    getAllUsers: async (): Promise<User[]> => {
        const { data } = await client.query({ query: GET_USERS });
        return data.users
    },

    createUser: async (user: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        avatarUrl?: string | null;
        role: Role;
    }): Promise<User> => {
        const { data } = await client.mutate({
            mutation: CREATE_USER,
            variables: user,
        });
        return data.createUser;
    },

    getUser: async (id: number): Promise<User> => {
        const { data } = await client.query({
            query: GET_USER,
            variables: { id },
        });
        return data.user;
    },

    deleteUser: async (id: number): Promise<boolean> => {
        const { data } = await client.mutate({
            mutation: DELETE_USER,
            variables: { id },
        });
        return data.deleteUser;
    },

    updateUser: async (
        id: number,
        user: {
            firstName?: string;
            lastName?: string;
            email?: string;
            password?: string;
            avatarUrl?: string;
            role?: Role;
        }
    ): Promise<User> => {
        const { data } = await client.mutate({
            mutation: UPDATE_USER,
            variables: { id, ...user },
        });
        return data.updateUser;
    }
}