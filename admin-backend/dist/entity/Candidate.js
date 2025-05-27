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
exports.Candidate = void 0;
const typeorm_1 = require("typeorm");
const Application_1 = require("./Application");
const User_1 = require("./User");
let Candidate = class Candidate {
};
exports.Candidate = Candidate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
    __metadata("design:type", Number)
], Candidate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.candidate),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], Candidate.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Application_1.Application, (application) => application.candidate),
    __metadata("design:type", Array)
], Candidate.prototype, "applications", void 0);
exports.Candidate = Candidate = __decorate([
    (0, typeorm_1.Entity)({ name: "candidates" })
], Candidate);
//# sourceMappingURL=Candidate.js.map