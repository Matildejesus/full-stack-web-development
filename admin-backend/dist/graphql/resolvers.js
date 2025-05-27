"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const data_source_1 = require("../data-source");
const Course_1 = require("../entity/Course");
const courseRepository = data_source_1.AppDataSource.getRepository(Course_1.Course);
exports.resolvers = {
    Query: {
        courses: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield courseRepository.find();
        }),
        course: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return yield courseRepository.findOne({
                where: { id: parseInt(id) },
            });
        }),
    },
};
//# sourceMappingURL=resolvers.js.map