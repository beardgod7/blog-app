import { Request, Response, NextFunction } from 'express';
import Post from '../models/post'; 
import ErrorHandler from '../utility/Errorhandler'; 

class AuthorizationMiddleware {
  public static authorizeUser = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return next(new ErrorHandler("Unauthorized", 401));
    }

    const postId = parseInt(req.params.postId, 10);

    Post.findByPk(postId).then(post => {
      if (post && post.userid === user.id) {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden' });
      }
    }).catch(error => {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    });
  };
}

export default AuthorizationMiddleware;


