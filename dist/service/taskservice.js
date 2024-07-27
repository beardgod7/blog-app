"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async createTask(data) {
        return await this.taskModel.create(data);
    }
    async getAllTasks() {
        return await this.taskModel.findAll();
    }
    async getTaskById(id) {
        return await this.taskModel.findByPk(id);
    }
    async updateTaskById(id, data) {
        const task = await this.taskModel.findByPk(id);
        if (task) {
            return await task.update(data);
        }
        return null;
    }
    async deleteTaskById(id) {
        const task = await this.taskModel.findByPk(id);
        if (task) {
            await task.destroy();
            return true;
        }
        return false;
    }
}
exports.default = TaskService;
