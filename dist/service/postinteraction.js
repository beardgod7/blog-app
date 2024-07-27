"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = __importDefault(require("../models/post"));
class InteractionService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async likePost(postId, userId) {
        try {
            const post = await post_1.default.findByPk(postId);
            if (post) {
                post.likes += 1;
                await post.save();
            }
            else {
                throw new Error('Post not found');
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to like post: ${error.message}`);
            }
            else {
                throw new Error('An unexpected error occurred while liking the post');
            }
        }
    }
    async dislikePost(postId, userId) {
        try {
            const post = await post_1.default.findByPk(postId);
            if (post) {
                post.dislikes += 1;
                await post.save();
            }
            else {
                throw new Error('Post not found');
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to dislike post: ${error.message}`);
            }
            else {
                throw new Error('An unexpected error occurred while disliking the post');
            }
        }
    }
    async addComment(postId, userId, content) {
        try {
            const post = await post_1.default.findByPk(postId);
            if (post) {
                const comments = post.comments || [];
                comments.push({ userId, content, createdAt: new Date() });
                post.comments = comments;
                await post.save();
            }
            else {
                throw new Error('Post not found');
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to add comment: ${error.message}`);
            }
            else {
                throw new Error('An unexpected error occurred while adding the comment');
            }
        }
    }
    async getPostComments(postId) {
        try {
            const post = await post_1.default.findByPk(postId);
            if (post) {
                return post.comments || [];
            }
            else {
                throw new Error('Post not found');
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to get post comments: ${error.message}`);
            }
            else {
                throw new Error('An unexpected error occurred while getting the comments');
            }
        }
    }
}
exports.default = InteractionService;
