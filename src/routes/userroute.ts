import { Router } from 'express';
import UserController from '../controller/usercontroller';
import UserService from '../service/userservice';
import User from '../models/user';
import  IUserService from '../service/userservice'; 
import FileUploader from '../middleware/multerconnection'
import AuthMiddleware from '../middleware/auth';
class UserRouter {
    public router: Router;
    private userController: UserController;
  
    constructor() {
      this.router = Router();
      const userService: IUserService = new UserService(User);
    this.userController = new UserController(userService);
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
      this.router.post('/create-users', FileUploader.getUploader(),AuthMiddleware.isAuthenticated,  this.userController.createUser);
      this.router.get('/users', AuthMiddleware.isAuthenticated, this.userController.getAllUsers);
      this.router.get('/users/:id', AuthMiddleware.isAuthenticated, this.userController.getUserById);
      this.router.put('/users/:id', AuthMiddleware.isAuthenticated, FileUploader.getUploader(), this.userController.updateUserById);
      this.router.delete('/users/:id', AuthMiddleware.isAuthenticated, this.userController.deleteUserById);
      this.router.post('/login', this.userController.login);
    }
  }
  
  export default new UserRouter().router;
  