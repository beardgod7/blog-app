"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = __importDefault(require("../models/post"));
const Errorhandler_1 = __importDefault(require("../utility/Errorhandler"));
class AuthorizationMiddleware {
}
AuthorizationMiddleware.authorizeUser = (req, res, next) => {
    const user = req.user;
    if (!user) {
        return next(new Errorhandler_1.default("Unauthorized", 401));
    }
    const postId = parseInt(req.params.postId, 10);
    post_1.default.findByPk(postId).then(post => {
        if (post && post.userid === user.id) {
            next();
        }
        else {
            res.status(403).json({ message: 'Forbidden' });
        }
    }).catch(error => {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    });
};
exports.default = AuthorizationMiddleware;
