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
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name, email, password, username } = req.body;
            if (!name || !email || !password || !username) {
                return res.status(400).json({ message: "Missing values for User" });
            }
            let newUser = new User_1.default({ name, email, password, username });
            yield newUser.save();
            res.status(200).json({
                data: newUser,
                message: "Succesfully created"
            });
        });
    }
    getUser(req, res) {
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
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let param_username = req.params.username;
            if (!param_username) {
                return res.status(400).json({ message: "Missing parameters for User" });
            }
            let { name, email, password, username } = req.body;
            if (!name || !email || !password || !username) {
                return res.status(400).json({ message: "Missing values for User" });
            }
            let user = yield User_1.default.findOneAndUpdate({ username: param_username }, req.body, { new: true });
            res.status(200).json({
                data: user,
                message: "User updated succed"
            });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let username = req.params.username;
            if (!username) {
                return res.status(400).json({ message: "Missing values for User" });
            }
            yield User_1.default.findOneAndDelete({ username });
            res.status(200).json({ message: "User Succesfully deleted" });
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ message: "Missing values for User" });
            }
            let user = yield User_1.default.findOne({ username, password });
            if (user == null) {
                return res.status(200).json({
                    data: null,
                    message: "Invalid password or email"
                });
            }
            res.status(200).json({
                data: user,
                message: "Valid User"
            });
        });
    }
    routes() {
        this.router.post('/', this.createUser);
        this.router.post('/login', this.loginUser);
        this.router.get('/:username', this.getUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
