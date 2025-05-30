import { gql } from "@apollo/client";
import { Course } from "@/types/types";
import { client } from "./apollo-client";

const GET_COURSES = gql`
    query GetCourses {
        courses {
            id
            name
            code
        }
    }
`

export const courseService = {
    getAllCourses: async (): Promise<Course[]> => {
        const { data } = await client.query({ query: GET_COURSES });
        return data.courses;
    }
//     getCourse: async (courseId: string): Promise<Course> => {
//         const { data } = await client.query({
    //         query: GET_COURSE,
    //         variables: { id: courseId },
//         });
    //     return data.course;
    //   },

}
//   getPets: async (profileId: string): Promise<Pet[]> => {
//     const { data } = await client.query({
//       query: GET_PROFILE,
//       variables: { id: profileId },
//     });
//     return data.profile.pets;
//   },

//   getPet: async (petId: string): Promise<Pet> => {
//     const { data } = await client.query({
//       query: GET_PET,
//       variables: { id: petId },
//     });
//     return data.pet;
//   },

//   createPet: async (name: string): Promise<Pet> => {
//     const { data } = await client.mutate({
//       mutation: CREATE_PET,
//       variables: { name },
//     });
//     return data.createPet;
//   },

//   associatePetWithProfile: async (
//     petId: string,
//     profileId: string
//   ): Promise<Profile> => {
//     const { data } = await client.mutate({
//       mutation: ADD_PET_TO_PROFILE,
//       variables: { petId, profileId },
//     });
//     return data.addPetToProfile;
//   },

//   getPetProfiles: async (petId: string): Promise<Profile[]> => {
//     const { data } = await client.query({
//       query: GET_PET,
//       variables: { id: petId },
//     });
//     return data.pet.profiles;
//   },

//   deletePet: async (petId: string): Promise<boolean> => {
//     const { data } = await client.mutate({
//       mutation: DELETE_PET,
//       variables: { id: petId },
//     });
//     return data.deletePet;
//   },
// };
