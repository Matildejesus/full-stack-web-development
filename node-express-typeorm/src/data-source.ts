import "reflect-metadata";
import { User } from "./entity/User";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "209.38.26.237",
    port: 3306,
    username: "S4085733",
    password: "S4085733",
    database: "S4085733",
    synchronize: true,
    logging: true,
    entities: [User],
    // entities: [User, Candidate, Admin, Application, JobSummary, LecturerSelection, Lecturer, LecturerSubject, Subject],
    subscribers: [],
    migrations: [],
})