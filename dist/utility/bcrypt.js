"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
class Userhash {
    static async hashPassword(user) {
        if (user.changed('password')) {
            user.password = await bcryptjs_1.default.hash(user.password, 10);
        }
    }
    static async comparePassword(user, password) {
        try {
            return await bcryptjs_1.default.compare(password, user.password);
        }
        catch (error) {
            throw new Error('Password comparison failed');
        }
    }
}
user_1.default.beforeCreate(async (user) => {
    await Userhash.hashPassword(user);
});
user_1.default.beforeUpdate(async (user) => {
    await Userhash.hashPassword(user);
});
exports.default = Userhash;
