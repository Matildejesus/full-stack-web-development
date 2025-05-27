import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";

const courseRepository = AppDataSource.getRepository(Course);

export const resolvers = {
  Query: {
    courses: async () => {
      return await courseRepository.find();
    },
    course: async (_: any, { id }: { id: string }) => {
      return await courseRepository.findOne({
        where: { id: parseInt(id) },
      });
    },
  },
};
