"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const Errorhandler_1 = __importDefault(require("../utility/Errorhandler"));
class AuthMiddleware {
}
_a = AuthMiddleware;
AuthMiddleware.isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return next(new Errorhandler_1.default("Please login to continue", 401));
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_1.default.findByPk(decoded.id);
        if (!user) {
            return next(new Errorhandler_1.default("User not found", 404));
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(new Errorhandler_1.default("Invalid or expired token", 401));
    }
};
exports.default = AuthMiddleware;
