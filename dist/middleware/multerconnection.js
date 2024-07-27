"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const Errorhandler_1 = __importDefault(require("../utility/Errorhandler"));
class FileUploader {
    constructor() {
        this.storage = multer_1.default.memoryStorage();
        this.maxFileSize = 0.005 * 10 * 10; // Example: 2 MB
    }
    fileFilter(req, file, cb) {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Errorhandler_1.default('Invalid file type. Only JPG, PNG, and GIF are allowed.', 400));
        }
    }
    getUploader() {
        return (0, multer_1.default)({
            storage: this.storage,
            fileFilter: this.fileFilter.bind(this),
            limits: {
                fileSize: this.maxFileSize, // Set the file size limit
            },
        }).single('image'); // 'image' is the name of the field in the form
    }
}
exports.default = new FileUploader();
