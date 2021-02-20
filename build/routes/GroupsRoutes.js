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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Groups_1 = __importDefault(require("../models/Groups"));
class GroupsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    createGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { title, description, teacherId } = req.body;
            if (!title || !teacherId) {
                return res.status(400).json({ message: "Missing values for Group" });
            }
            let newGroup = new Groups_1.default({ title, description, owner: teacherId });
            yield newGroup.save();
            res.status(200).json({
                data: newGroup,
                message: "Succesfully created"
            });
        });
    }
    getGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let groupId = req.params.groupId;
            if (!groupId) {
                return res.status(400).json({ message: "Missing values to search groups" });
            }
            let group = yield Groups_1.default.findOne({ _id: groupId }).populate('owner', 'name -_id');
            res.status(200).json({
                data: group,
                message: "Group Found"
            });
        });
    }
    getStudentList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let groupId = req.params.groupId;
            if (!groupId) {
                return res.status(400).json({ message: "Missing values to search groups" });
            }
            let students = yield Groups_1.default.findOne({ _id: groupId })
                .populate('students', 'name -_id').select('students -_id');
            res.status(200).json({
                data: students,
                message: "Stundents correctly found"
            });
        });
    }
    joinGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let paramGroupId = req.params.groupId;
            let studentId = req.body.studentId;
            if (!studentId) {
                return res.status(400).json({ message: "Missing values to Join" });
            }
            yield Groups_1.default.findOneAndUpdate({ _id: paramGroupId }, { "$push": { "students": studentId } });
            res.status(200).json({ message: "Student Joined Correctly" });
        });
    }
    routes() {
        this.router.post('/', this.createGroup);
        this.router.get('/:groupId', this.getGroup);
        this.router.put('/join/:groupId', this.joinGroup);
        this.router.get('/students/:groupId', this.getStudentList);
    }
}
const groupsRoutes = new GroupsRoutes();
exports.default = groupsRoutes.router;
