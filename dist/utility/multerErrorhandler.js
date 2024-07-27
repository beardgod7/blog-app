"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("multer");
const Errorhandler_1 = __importDefault(require("../utility/Errorhandler"));
class MulterErrorHandler {
    static handle(err, req, res, next) {
        if (err instanceof multer_1.MulterError) {
            const multerError = new Errorhandler_1.default(`Invalid file type. ${err.message}`, 400);
            res.status(multerError.statusCode).json({
                success: false,
                message: multerError.message,
            });
        }
        else {
            next(err);
        }
    }
}
exports.default = MulterErrorHandler;
