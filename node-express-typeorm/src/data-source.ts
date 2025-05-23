import "reflect-metadata";
import { User } from "./entity/User";
import { DataSource } from "typeorm";
import { Candidate } from "./entity/Candidate";
import { Application } from "./entity/Application";
import { Lecturer } from "./entity/Lecturer";
import { Course } from "./entity/Course";
import { LecturerSelection } from "./entity/LecturerSelection";
import { Admin } from "./entity/Admin";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "209.38.26.237",
    port: 3306,
    username: "S4085733",
    password: "S4085733",
    database: "S4085733",
    synchronize: true,
    logging: true,
    entities: [User, Candidate, Application, Lecturer, Course, LecturerSelection, Admin ],
    subscribers: [],
    migrations: [],
})