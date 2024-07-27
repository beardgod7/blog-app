"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostController {
    constructor(postService) {
        this.createPost = async (req, res) => {
            var _a, _b;
            try {
                const { content, selectedCategory } = req.body;
                const imageData = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
                const imageContentType = (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype;
                console.log('Received data for post creation:', { content, selectedCategory, imageContentType });
                const post = await this.postService.createPost({ content, selectedCategory, imageData, imageContentType });
                res.status(201).json(post);
            }
            catch (error) {
                console.error('Error creating post:', error);
                res.status(500).json({ error: error.message });
            }
        };
        this.getAllPosts = async (req, res) => {
            try {
                const posts = await this.postService.getAllPosts();
                res.status(200).json(posts);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        };
        this.getAllPostsByUserId = async (req, res) => {
            try {
                const { userId } = req.params;
                const posts = await this.postService.getAllPostsByUserId(parseInt(userId, 10));
                res.status(200).json(posts);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        };
        this.getPostById = async (req, res) => {
            try {
                const { id } = req.params;
                const post = await this.postService.getPostById(parseInt(id, 10));
                if (post) {
                    res.status(200).json(post);
                }
                else {
                    res.status(404).json({ error: 'Post not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        };
        this.updatePostById = async (req, res) => {
            var _a, _b;
            try {
                const { id } = req.params;
                const { content, selectedCategory } = req.body;
                const imageData = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
                const imageContentType = (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype;
                const post = await this.postService.updatePostById(parseInt(id, 10), { content, selectedCategory, imageData, imageContentType });
                if (post) {
                    res.status(200).json(post);
                }
                else {
                    res.status(404).json({ error: 'Post not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        };
        this.deletePostById = async (req, res) => {
            try {
                const { id } = req.params;
                const deleted = await this.postService.deletePostById(parseInt(id, 10));
                if (deleted) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ error: 'Post not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        };
        this.postService = postService;
    }
}
exports.default = PostController;
