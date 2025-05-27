import gql from "graphql-tag";

export const typeDefs = gql`
    type Course {
        id: ID!
        name: String!
        code: String!
    }

    type Query {
        courses: [Course!]!
        course(id: ID!): Course
    }
`;
