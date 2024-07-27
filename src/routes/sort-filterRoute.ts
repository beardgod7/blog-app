import { Router } from 'express';
import SortController from '../controller/sort-filter';
import SortService from '../service/sort-filterservice'; 
import AuthMiddleware from '../middleware/auth';
const sortService = new SortService();
const sortController = new SortController(sortService);

class sortRoutes {
  public router: Router

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/posts/sorted', AuthMiddleware.isAuthenticated, sortController.getPostsSortedByCategory);
    this.router.get('/posts/category/:category', AuthMiddleware.isAuthenticated, sortController.getPostsFilteredByCategory);
  }
}

export default new sortRoutes().router;
