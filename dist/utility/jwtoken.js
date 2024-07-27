"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    static generateAuthToken(user) {
        const token = jsonwebtoken_1.default.sign({ id: user.id, user_name: user.user_name }, "2FtynxXT1NTf2K1Mo4i6AOvtdIPJKIRTY", {
            expiresIn: '1d',
        });
        return token;
    }
}
exports.default = TokenService;
