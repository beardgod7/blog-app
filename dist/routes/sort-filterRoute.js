"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sort_filter_1 = __importDefault(require("../controller/sort-filter"));
const sort_filterservice_1 = __importDefault(require("../service/sort-filterservice"));
const auth_1 = __importDefault(require("../middleware/auth"));
const sortService = new sort_filterservice_1.default();
const sortController = new sort_filter_1.default(sortService);
class sortRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/posts/sorted', auth_1.default.isAuthenticated, sortController.getPostsSortedByCategory);
        this.router.get('/posts/category/:category', auth_1.default.isAuthenticated, sortController.getPostsFilteredByCategory);
    }
}
exports.default = new sortRoutes().router;
