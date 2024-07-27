import { Router } from 'express';
import InteractionController from '../controller/postintereactionController.ts';
import  IInteractionService from '../service/postinteraction'; 
import Post from '../models/post.js';
import InteractionService from '../service/postinteraction.js'
import AuthMiddleware  from '../middleware/auth.js'

class InteractionRoutes {
  public router: Router;
  private interactionController: InteractionController;

  constructor() {
    this.router = Router();
    const interactionService:IInteractionService = new InteractionService(Post);
    this.interactionController = new InteractionController(interactionService);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/posts/:postId/like', AuthMiddleware.isAuthenticated, this.interactionController.likePost);
    this.router.post('/posts/:postId/dislike', AuthMiddleware.isAuthenticated, this.interactionController.dislikePost);
    this.router.post('/posts/:postId/comments',AuthMiddleware.isAuthenticated,  this.interactionController.addComment);
    this.router.get('/posts/:postId/comments', AuthMiddleware.isAuthenticated, this.interactionController.getPostComments);
  }
}

export default new InteractionRoutes().router;
