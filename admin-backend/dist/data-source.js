"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Course_1 = require("./entity/Course");
const User_1 = require("./entity/User");
const Candidate_1 = require("./entity/Candidate");
const Lecturer_1 = require("./entity/Lecturer");
const Admin_1 = require("./entity/Admin");
const Application_1 = require("./entity/Application");
const LecturerSelection_1 = require("./entity/LecturerSelection");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "209.38.26.237",
    port: 3306,
    username: "S4085733",
    password: "S4085733",
    database: "S4085733",
    synchronize: true,
    logging: true,
    entities: [Course_1.Course, User_1.User, Candidate_1.Candidate, Lecturer_1.Lecturer, Admin_1.Admin, Application_1.Application, LecturerSelection_1.LecturerSelection],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map