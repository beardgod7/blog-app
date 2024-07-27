"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgconfig_1 = __importDefault(require("../database/pgconfig"));
const user_1 = __importDefault(require("../models/user"));
class Post extends sequelize_1.Model {
}
Post.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.default,
            key: 'id'
        }
    },
    imageData: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: true,
    },
    imageContentType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    selectedCategory: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    comments: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    likes: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    dislikes: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    isEditing: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: pgconfig_1.default,
    tableName: 'Post',
});
exports.default = Post;
