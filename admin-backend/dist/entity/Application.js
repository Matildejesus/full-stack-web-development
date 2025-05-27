"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = exports.AppRole = exports.Availability = void 0;
const typeorm_1 = require("typeorm");
const Candidate_1 = require("./Candidate");
const Course_1 = require("./Course");
const LecturerSelection_1 = require("./LecturerSelection");
var Availability;
(function (Availability) {
    Availability["FULL_TIME"] = "full-time";
    Availability["PART_TIME"] = "part-time";
    Availability["CONTRACT"] = "contract";
})(Availability || (exports.Availability = Availability = {}));
var AppRole;
(function (AppRole) {
    AppRole["TUTOR"] = "tutor";
    AppRole["LAB_ASSISTANT"] = "lab_assistant";
})(AppRole || (exports.AppRole = AppRole = {}));
let Application = class Application {
};
exports.Application = Application;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
    __metadata("design:type", Number)
], Application.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Candidate_1.Candidate, (candidate) => candidate.applications),
    (0, typeorm_1.JoinColumn)({ name: "candidate_id" }),
    __metadata("design:type", Candidate_1.Candidate)
], Application.prototype, "candidate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Course_1.Course, (course) => course.applications),
    (0, typeorm_1.JoinColumn)({ name: "course_id" }),
    __metadata("design:type", Course_1.Course)
], Application.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "previousRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: AppRole }),
    __metadata("design:type", String)
], Application.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Availability,
    }),
    __metadata("design:type", String)
], Application.prototype, "availability", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array"),
    __metadata("design:type", Array)
], Application.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "academic", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Application.prototype, "selected_count", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LecturerSelection_1.LecturerSelection, (lecturerSelection) => lecturerSelection.application),
    __metadata("design:type", Array)
], Application.prototype, "lecturerSelections", void 0);
exports.Application = Application = __decorate([
    (0, typeorm_1.Entity)({ name: "applications" }),
    (0, typeorm_1.Unique)(["candidate", "course", "role"])
], Application);
//# sourceMappingURL=Application.js.map