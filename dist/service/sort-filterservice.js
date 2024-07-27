"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = __importDefault(require("../models/post"));
class sortService {
    async getPostsSortedByCategory() {
        try {
            const posts = await post_1.default.findAll({
                order: [['selectedCategory', 'ASC']],
            });
            return posts;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to get posts sorted by category: ${error.message}`);
            }
            else {
                throw new Error('An unexpected error occurred while getting posts sorted by category');
            }
        }
    }
    async getPostsFilteredByCategory(category) {
        try {
            const posts = await post_1.default.findAll({
                where: { selectedCategory: category },
            });
            return posts;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to get posts filtered by category: ${error.message}`);
            }
            else {
                throw new Error('An unexpected error occurred while getting posts filtered by category');
            }
        }
    }
}
exports.default = sortService;
