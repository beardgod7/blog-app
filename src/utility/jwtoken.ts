import jwt from 'jsonwebtoken';
import { UserAttributes } from '../models/user'; 



class TokenService {
  static generateAuthToken(user: UserAttributes): string {
    const token = jwt.sign(
      { id: user.id, user_name: user.user_name },
      process.env.JWT_SECRET as string,  
      {
        expiresIn: '1d',
      }
    );
    return token;
  }
}




export default TokenService;
