import multer, { StorageEngine } from 'multer';
import { Request, Express } from 'express';
import ErrorHandler from '../utility/Errorhandler';


class FileUploader {
  private storage: StorageEngine;
  private maxFileSize: number; // Maximum file size in bytes

  constructor() {
    this.storage = multer.memoryStorage();
    this.maxFileSize = 0.005 * 10 * 10; // Example: 2 MB
  }

  private fileFilter(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new ErrorHandler('Invalid file type. Only JPG, PNG, and GIF are allowed.', 400));
    }
  }

  public getUploader() {
    return multer({
      storage: this.storage,
      fileFilter: this.fileFilter.bind(this),
      limits: {
        fileSize: this.maxFileSize, // Set the file size limit
      },
    }).single('image');  // 'image' is the name of the field in the form
  }
}

export default new FileUploader();


