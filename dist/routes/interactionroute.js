"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postintereactionController_ts_1 = __importDefault(require("../controller/postintereactionController.ts"));
const post_js_1 = __importDefault(require("../models/post.js"));
const postinteraction_js_1 = __importDefault(require("../service/postinteraction.js"));
const auth_js_1 = __importDefault(require("../middleware/auth.js"));
class InteractionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        const interactionService = new postinteraction_js_1.default(post_js_1.default);
        this.interactionController = new postintereactionController_ts_1.default(interactionService);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/posts/:postId/like', auth_js_1.default.isAuthenticated, this.interactionController.likePost);
        this.router.post('/posts/:postId/dislike', auth_js_1.default.isAuthenticated, this.interactionController.dislikePost);
        this.router.post('/posts/:postId/comments', auth_js_1.default.isAuthenticated, this.interactionController.addComment);
        this.router.get('/posts/:postId/comments', auth_js_1.default.isAuthenticated, this.interactionController.getPostComments);
    }
}
exports.default = new InteractionRoutes().router;
