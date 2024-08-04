"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtoken_1 = __importDefault(require("../utility/jwtoken"));
class UserController {
    constructor(userService) {
        this.createUser = async (req, res) => {
            var _a, _b;
            try {
                const { user_name, password, role } = req.body;
                const imageData = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
                const imageContentType = (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype;
                const user = await this.userService.createUser({ user_name, password, imageData, role, imageContentType });
                if (user) {
                    const token = jwtoken_1.default.generateAuthToken(user);
                    res.status(201).json({ user, token });
                }
                else {
                    res.status(409).json({ message: 'User already exists' });
                }
            }
            catch (error) {
                console.error('Error creating user:', error);
                res.status(500).json({ error: error.message });
            }
        };
        this.getAllUsers = async (req, res) => {
            try {
                const users = await this.userService.getAllUsers();
                if (users.length === 0) {
                    res.status(200).json({ message: "No user registered" });
                }
                else {
                    res.status(200).json(users);
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        };
        this.getUserById = async (req, res) => {
            try {
                const { id } = req.params;
                const user = await this.userService.getUserById(parseInt(id, 10));
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        };
        this.updateUserById = async (req, res) => {
            try {
                const { id } = req.params;
                const user = await this.userService.updateUserById(parseInt(id, 10), req.body);
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        };
        this.deleteUserById = async (req, res) => {
            try {
                const { id } = req.params;
                const deleted = await this.userService.deleteUserById(parseInt(id, 10));
                if (deleted) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        };
        this.login = async (req, res) => {
            try {
                const { user_name, password } = req.body;
                console.log('Request Body:', req.body);
                if (!user_name || !password) {
                    res.status(400).json({ message: 'Username and password are required' });
                    return;
                }
                const result = await this.userService.login({ user_name, password });
                if (result) {
                    res.status(200).json({ user: result.user, token: result.token, message: 'Login successful' });
                }
                else {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        };
        this.userService = userService;
    }
}
exports.default = UserController;
