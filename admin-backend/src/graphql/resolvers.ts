import { Semester } from "../entity/Semester";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";
import { LecturerCourse } from "../entity/LecturerCourse";
import { Candidate } from "../entity/Candidate";
import { Role, User } from "../entity/User";
import { Lecturer } from "../entity/Lecturer";
import { Application } from "../entity/Application";
import { LecturerSelection } from "../entity/LecturerSelection";
import bcrypt from "bcrypt";

const courseRepository = AppDataSource.getRepository(Course);
const lecturerCourseRepository = AppDataSource.getRepository(LecturerCourse);
const candidateRepository = AppDataSource.getRepository(Candidate);
const userRepository = AppDataSource.getRepository(User);
const lecturerRepository = AppDataSource.getRepository(Lecturer);
const applicationRepository = AppDataSource.getRepository(Application);
const lecturerSelectionRepository = AppDataSource.getRepository(LecturerSelection);

export const resolvers = {
    Query: {
        courses: async () => {
            return await courseRepository.find({
                // relations: ['applications', 'applications.candidate', 'applications.candidate.user']
                relations: ['applications', 'applications.candidate', 'applications.candidate.user']
            });
        },
        course: async (_: any, { id }: { id: string }) => {
            return await courseRepository.findOne({
                where: { id: parseInt(id) },
            });
        },
        lecturerCoursesByCourseId: async (_: any, { courseId }: {courseId: string}) => {
            return await lecturerCourseRepository.find({
                where: { courseId: parseInt(courseId) },
                relations: ['lecturer', 'lecturer.user'],
            });
        },
        lecturerCourse: async (_: any, { id }: { id: string }) => {
            return await lecturerCourseRepository.find({
                where: { lecturerId: parseInt(id) },
                relations: ['course'], 
            });
        },
        candidates: async () => {
            return await candidateRepository.find({
                relations: ['user']
            });
        },
        candidate: async (_: any, { id }: { id: string }) => {
            return await candidateRepository.findOne({
                where: { id: parseInt(id) },
                relations: ['user']
            });
        },
        users: async () => {
            return await userRepository.find();
        },
        user: async (_: any, { id }: { id: string }) => {
            return await userRepository.findOne({
                where: { id: parseInt(id) },
            });
        },
        lecturers: async () => {
            return await lecturerRepository.find({
                relations: ['user', 'lecturerCourses']
            });
        },
        lecturer: async (_: any, { id }: { id: string }) => {
            return await lecturerRepository.findOne({
                where: { id: parseInt(id) },
            });
        },
        applications: async () => {
            return await applicationRepository.find();
        },
        application: async (_: any, { id }: { id: string }) => {
            return await applicationRepository.findOne({
                where: { id: parseInt(id) },
            });
        },
        lecturerSelections: async () => {
            return await lecturerSelectionRepository.find();
        },
        lecturerSelection: async (_: any, { id }: { id: string }) => {
            return await lecturerSelectionRepository.findOne({
                where: { id: parseInt(id) },
            });
        },
        
    },
    Mutation: {
        createCourse: async (
            _: any,
            { name, code, semester }: { name: string; code: string; semester: Semester }
        ) => {
            const course = courseRepository.create({ name, code, semester });
            const savedCourse = await courseRepository.save(course);
            return savedCourse;
        },
        updateCourse: async (
            _: any,
            { id, ...args }: { id: string } & Partial<Course>
        ) => {
            await courseRepository.update(id, args);
            return await courseRepository.findOne({
                where: { id: parseInt(id) },
            });
        },
        deleteCourse: async (_: any, { id }: { id: string }) => {
            const result = await courseRepository.delete(id);
            return result.affected !== 0;
        },
        login: async (_: any, { username, password }: { username: string; password: string }) => {
            const user = await userRepository.findOne({
                where: { firstName: username }
            });
            
            if (!user) {
                throw new Error("User not found");
            }

            if (user.role !== Role.ADMIN) {
                throw new Error("User is not an admin");
            }
          

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Incorrect password");
            }
            return user;
        },
        logout: async () => {
            return true; 
        },
        createLecturerCourse: async (
            _: any,
            { lecturerId, courseId, semester }: { lecturerId: string; courseId: string; semester: Semester }
        ) => {
            const lecturerCourse = lecturerCourseRepository.create({
                lecturer: { id: parseInt(lecturerId) }, 
                course: { id: parseInt(courseId) },  
                semester
            });
            const savedLecturerCourse = await lecturerCourseRepository.save(lecturerCourse);
            return savedLecturerCourse;
        },
        updateCandidateBlocked: async (
            _: any,
            { id, blocked }: { id: string, blocked: boolean }
        ) => {
            await candidateRepository.update({ id: parseInt(id) }, { blocked });
            return await candidateRepository.findOne({
                where: { id: parseInt(id) },
                relations: ['user']
            });
        },
    }
};