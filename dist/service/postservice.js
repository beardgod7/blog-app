"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async createPost(data) {
        return await this.postModel.create(data);
    }
    async getAllPosts() {
        return await this.postModel.findAll();
    }
    async getAllPostsByUserId(userId) {
        return await this.postModel.findAll({ where: { userId } });
    }
    async getPostById(id) {
        return await this.postModel.findByPk(id);
    }
    async updatePostById(id, data) {
        const post = await this.postModel.findByPk(id);
        if (post) {
            return await post.update(data);
        }
        return null;
    }
    async deletePostById(id) {
        const post = await this.postModel.findByPk(id);
        if (post) {
            await post.destroy();
            return true;
        }
        return false;
    }
}
exports.default = PostService;
