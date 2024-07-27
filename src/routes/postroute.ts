import { Router } from 'express';
import PostController from '../controller/postcontroller';
import PostService from '../service/postservice';
import Post from '../models/post';
import { IPostService } from '../service/postservice';
import FileUploader from '../middleware/multerconnection'
import AuthMiddleware from '../middleware/auth.js'
import AuthorizationMiddleware from '../middleware/authorization.js';

class PostRouter {
    public router: Router;
    private postController: PostController;
  
    constructor() {
      this.router = Router();
      const postService: IPostService = new PostService(Post);
    this.postController = new PostController(postService);
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
      this.router.post('/create-posts', FileUploader.getUploader(), AuthMiddleware.isAuthenticated,this.postController.createPost);
      this.router.get('/posts', AuthMiddleware.isAuthenticated,this.postController.getAllPosts);
      this.router.get('/posts/:id', AuthMiddleware.isAuthenticated,this.postController.getPostById);
      this.router.put('/posts/:id', AuthMiddleware.isAuthenticated,AuthorizationMiddleware.authorizeUser,FileUploader.getUploader(), this.postController.updatePostById);
      this.router.delete('/posts/:id', AuthMiddleware.isAuthenticated,
        AuthorizationMiddleware.authorizeUser,this.postController.deletePostById);
      
    }
  }
  
  export default new PostRouter().router;
  
