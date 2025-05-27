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
exports.LecturerSelection = void 0;
const typeorm_1 = require("typeorm");
const Lecturer_1 = require("./Lecturer");
const Application_1 = require("./Application");
let LecturerSelection = class LecturerSelection {
};
exports.LecturerSelection = LecturerSelection;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
    __metadata("design:type", Number)
], LecturerSelection.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Lecturer_1.Lecturer, (lecturer) => lecturer.lecturerSelections),
    (0, typeorm_1.JoinColumn)({ name: "lecturer_id" }),
    __metadata("design:type", Lecturer_1.Lecturer)
], LecturerSelection.prototype, "lecturer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Application_1.Application, (application) => application.lecturerSelections),
    (0, typeorm_1.JoinColumn)({ name: "application_id" }),
    __metadata("design:type", Application_1.Application)
], LecturerSelection.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], LecturerSelection.prototype, "ranking", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], LecturerSelection.prototype, "comment", void 0);
exports.LecturerSelection = LecturerSelection = __decorate([
    (0, typeorm_1.Entity)({ name: "lecturer_selections" }),
    (0, typeorm_1.Unique)(["lecturer", "application"])
], LecturerSelection);
//# sourceMappingURL=LecturerSelection.js.map