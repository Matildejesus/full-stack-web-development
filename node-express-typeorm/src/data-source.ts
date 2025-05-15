import "reflect-metadata";
import { User } from "./entity/User";
import { DataSource } from "typeorm";
import { Candidate } from "./entity/Candidate";
import { Application } from "./entity/Application";
import { Lecturer } from "./entity/Lecturer";
import { Course } from "./entity/Course";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "209.38.26.237",
    port: 3306,
    username: "S4058115",
    password: "S4058115",
    database: "S4058115",
    synchronize: true,
    logging: true,
    entities: [User, Candidate,Application,Lecturer,Course  ],
    // entities: [User, Candidate, Admin, Application, JobSummary, LecturerSelection, Lecturer, LecturerSubject, Subject],
    subscribers: [],
    migrations: [],
})