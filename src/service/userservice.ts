import User, { UserAttributes, UserCreationAttributes } from '../models/user';
import Userhash from '../utility/bcrypt';
import TokenService from '../utility/jwtoken';

export interface IUserService {
  createUser(data: CreateUserDTO): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | null>;
  getUserByUsername(user_name: string): Promise<User | null>;
  updateUserById(id: number, data: UpdateUserDTO): Promise<User | null>;
  deleteUserById(id: number): Promise<boolean>;
  login(data: LoginUserDTO): Promise<{ user: User; token: string } | null>;
  logout(token: string): Promise<null>;
}

export interface CreateUserDTO {
  user_name: string;
  imageData?: Buffer;
  role:string;
  imageContentType?: string;
  password: string;
}

export interface UpdateUserDTO {
  user_name?: string;
  imageData?: Buffer;
  imageContentType?: string;
  password?: string;
}

export interface LoginUserDTO {
  user_name: string;
  password: string;
}

class UserService implements IUserService {
  private userModel: typeof User;

  constructor(userModel: typeof User) {
    this.userModel = userModel;
  }

  async createUser(data: CreateUserDTO): Promise<User | null> {
    const existingUser = await this.userModel.findOne({ where: { user_name: data.user_name } });
    if (existingUser) {
      return null;
    }
    return await this.userModel.create(data as UserCreationAttributes);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userModel.findByPk(id);
  }

  async getUserByUsername(user_name: string): Promise<User | null> {
    return await this.userModel.findOne({ where: { user_name } });
  }

  async updateUserById(id: number, data: UpdateUserDTO): Promise<User | null> {
    const user = await this.userModel.findByPk(id);
    if (user) {
      return await user.update(data as Partial<UserAttributes>);
    }
    return null;
  }

  async deleteUserById(id: number): Promise<boolean> {
    const user = await this.userModel.findByPk(id);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }

  async login(data: LoginUserDTO): Promise<{ user: User; token: string } | null> {
    const user = await this.userModel.findOne({ where: { user_name: data.user_name } });
    if (user && await Userhash.comparePassword(user, data.password)) {
      const token = TokenService.generateAuthToken(user);
      return { user, token };
    }
    return null;
  }

  //async logout(res: Response): Promise<void> {
   // await LogoutService.logout(res);
  //}
 

}

export default UserService;
