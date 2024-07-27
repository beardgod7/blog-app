import { Request, Response } from 'express';
import IUserService from '../service/userservice';  
import TokenService from '../utility/jwtoken';


class UserController {
  private userService: IUserService;  

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user_name, password } = req.body;
      const imageData = req.file?.buffer;
      const imageContentType = req.file?.mimetype;

      console.log('Received data for user creation:', { user_name, password, imageContentType });

      const user = await this.userService.createUser({ user_name, password, imageData, imageContentType });
      if (user) {
        const token = TokenService.generateAuthToken(user);
        res.status(201).json({ user, token });
      } else {
        res.status(409).json({ message: 'User already exists' });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      if (users.length === 0) {
        res.status(200).json({ message: "No user registered" });
      } else {
        res.status(200).json(users);
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(parseInt(id, 10));
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userService.updateUserById(parseInt(id, 10), req.body);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.userService.deleteUserById(parseInt(id, 10));
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user_name, password } = req.body;
      console.log('Request Body:', req.body);
      if (!user_name || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
      }

      const result = await this.userService.login({ user_name, password });

      if (result) {
        res.status(200).json({ user: result.user, token: result.token, message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
}

export default UserController;





