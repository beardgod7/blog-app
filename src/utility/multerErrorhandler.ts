import { Request, Response, NextFunction } from 'express';
import { MulterError } from 'multer';
import ErrorHandler from '../utility/Errorhandler'; 

class MulterErrorHandler {
  static handle(
    err: MulterError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (err instanceof MulterError) {
      const multerError = new ErrorHandler(`Invalid file type. ${err.message}`, 400);
      res.status(multerError.statusCode).json({
        success: false,
        message: multerError.message,
      });
    } else {

      next(err);
    }
  }
}

export default MulterErrorHandler;
