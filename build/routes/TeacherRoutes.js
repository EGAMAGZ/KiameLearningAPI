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
const User_1 = __importDefault(require("../models/User"));
class TeacherRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    createTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name, email, password, username } = req.body;
            let isTeacher = true;
            if (!name || !email || !password || !username) {
                return res.status(400).json({ message: "Missing values for User" });
            }
            let newUser = new User_1.default({ name, email, password, username, isTeacher });
            yield newUser.save();
            res.status(200).json({
                data: newUser,
                message: "Succesfully created"
            });
        });
    }
    getTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let username = req.params.username;
            if (!username) {
                return res.status(400).json({ message: "Missing values for User" });
            }
            let user = yield User_1.default.findOne({ username });
            res.status(200).json({
                data: user,
                message: "User found"
            });
        });
    }
    updateTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let param_username = req.params.username;
            let isTeacher = true;
            if (!param_username) {
                return res.status(400).json({ message: "Missing parameters for User" });
            }
            let { name, email, password, username } = req.body;
            if (!name || !email || !password || !username) {
                return res.status(400).json({ message: "Missing values for User" });
            }
            let user = yield User_1.default.findOneAndUpdate({ username: param_username }, { name, email, password, username, isTeacher }, { new: true });
            res.status(200).json({
                data: user,
                message: "User updated succed"
            });
        });
    }
    deleteTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let username = req.params.username;
            if (!username) {
                return res.status(400).json({ message: "Missing values for User" });
            }
            yield User_1.default.findOneAndDelete({ username });
            res.status(200).json({ message: "User Succesfully deleted" });
        });
    }
    routes() {
        this.router.post('/', this.createTeacher);
        this.router.get('/:username', this.getTeacher);
        this.router.put('/:username', this.updateTeacher);
        this.router.delete('/:username', this.deleteTeacher);
    }
}
const teacherRoutes = new TeacherRoutes();
exports.default = teacherRoutes.router;
