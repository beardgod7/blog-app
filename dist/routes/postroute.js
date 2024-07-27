"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postcontroller_1 = __importDefault(require("../controller/postcontroller"));
const postservice_1 = __importDefault(require("../service/postservice"));
const post_1 = __importDefault(require("../models/post"));
const multerconnection_1 = __importDefault(require("../middleware/multerconnection"));
const auth_js_1 = __importDefault(require("../middleware/auth.js"));
const authorization_js_1 = __importDefault(require("../middleware/authorization.js"));
class PostRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        const postService = new postservice_1.default(post_1.default);
        this.postController = new postcontroller_1.default(postService);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/create-posts', multerconnection_1.default.getUploader(), auth_js_1.default.isAuthenticated, this.postController.createPost);
        this.router.get('/posts', auth_js_1.default.isAuthenticated, this.postController.getAllPosts);
        this.router.get('/posts/:id', auth_js_1.default.isAuthenticated, this.postController.getPostById);
        this.router.put('/posts/:id', auth_js_1.default.isAuthenticated, authorization_js_1.default.authorizeUser, multerconnection_1.default.getUploader(), this.postController.updatePostById);
        this.router.delete('/posts/:id', auth_js_1.default.isAuthenticated, authorization_js_1.default.authorizeUser, this.postController.deletePostById);
    }
}
exports.default = new PostRouter().router;
