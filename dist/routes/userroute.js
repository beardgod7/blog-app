"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = __importDefault(require("../controller/usercontroller"));
const userservice_1 = __importDefault(require("../service/userservice"));
const user_1 = __importDefault(require("../models/user"));
const multerconnection_1 = __importDefault(require("../middleware/multerconnection"));
const auth_1 = __importDefault(require("../middleware/auth"));
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        const userService = new userservice_1.default(user_1.default);
        this.userController = new usercontroller_1.default(userService);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/create-users', multerconnection_1.default.getUploader(), auth_1.default.isAuthenticated, this.userController.createUser);
        this.router.get('/users', auth_1.default.isAuthenticated, this.userController.getAllUsers);
        this.router.get('/users/:id', auth_1.default.isAuthenticated, this.userController.getUserById);
        this.router.put('/users/:id', auth_1.default.isAuthenticated, multerconnection_1.default.getUploader(), this.userController.updateUserById);
        this.router.delete('/users/:id', auth_1.default.isAuthenticated, this.userController.deleteUserById);
        this.router.post('/login', this.userController.login);
    }
}
exports.default = new UserRouter().router;
