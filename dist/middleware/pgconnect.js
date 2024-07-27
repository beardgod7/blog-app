"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDatabase = void 0;
const pgconfig_1 = __importDefault(require("../database/pgconfig"));
const syncDatabase = async () => {
    try {
        await pgconfig_1.default.sync();
        console.log('Database synchronized.');
    }
    catch (error) {
        console.error('Database synchronization failed:', error);
    }
};
exports.syncDatabase = syncDatabase;
