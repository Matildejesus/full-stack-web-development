import "reflect-metadata";
import { DataSource } from "typeorm";
import { Course } from "./entity/Course";
import { User } from "./entity/User";
import { Candidate } from "./entity/Candidate";
import { Lecturer } from "./entity/Lecturer";
import { Admin } from "./entity/Admin";
import { Application } from "./entity/Application";
import { LecturerSelection } from "./entity/LecturerSelection";
import { LecturerCourse } from "./entity/LecturerCourse";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "209.38.26.237",
  port: 3306,
  username: "S4085733",
  password: "S4085733",
  database: "S4085733",
  synchronize: true,
  logging: true,
  entities: [Course, User, Candidate, Lecturer, Admin, Application, LecturerSelection, LecturerCourse],
  migrations: [],
  subscribers: [],
});
