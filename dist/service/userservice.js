"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("../utility/bcrypt"));
const jwtoken_1 = __importDefault(require("../utility/jwtoken"));
class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(data) {
        const existingUser = await this.userModel.findOne({ where: { user_name: data.user_name } });
        if (existingUser) {
            return null;
        }
        return await this.userModel.create(data);
    }
    async getAllUsers() {
        return await this.userModel.findAll();
    }
    async getUserById(id) {
        return await this.userModel.findByPk(id);
    }
    async getUserByUsername(user_name) {
        return await this.userModel.findOne({ where: { user_name } });
    }
    async updateUserById(id, data) {
        const user = await this.userModel.findByPk(id);
        if (user) {
            return await user.update(data);
        }
        return null;
    }
    async deleteUserById(id) {
        const user = await this.userModel.findByPk(id);
        if (user) {
            await user.destroy();
            return true;
        }
        return false;
    }
    async login(data) {
        const user = await this.userModel.findOne({ where: { user_name: data.user_name } });
        if (user && await bcrypt_1.default.comparePassword(user, data.password)) {
            const token = jwtoken_1.default.generateAuthToken(user);
            return { user, token };
        }
        return null;
    }
}
exports.default = UserService;
