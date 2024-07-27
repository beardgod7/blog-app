"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class sortController {
    constructor(sortService) {
        this.getPostsSortedByCategory = async (req, res) => {
            try {
                const posts = await this.sortService.getPostsSortedByCategory();
                res.status(200).json(posts);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        };
        this.getPostsFilteredByCategory = async (req, res) => {
            try {
                const { category } = req.params;
                const posts = await this.sortService.getPostsFilteredByCategory(category);
                res.status(200).json(posts);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        };
        this.sortService = sortService;
    }
}
exports.default = sortController;
