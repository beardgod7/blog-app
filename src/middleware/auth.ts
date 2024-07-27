import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import ErrorHandler from '../utility/Errorhandler';



class AuthMiddleware {
    public static isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { token } = req.cookies;

            if (!token) {
                return next(new ErrorHandler("Please login to continue", 401));
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };

            const user = await User.findByPk(decoded.id);

            if (!user) {
                return next(new ErrorHandler("User not found", 404));
            }

            (req as any).user = user; 

            next();
        } catch (error) {
            next(new ErrorHandler("Invalid or expired token", 401));
        }
    };
    static this: any;
    static interactionController: any;
  static postController: any;
}



export default AuthMiddleware;
