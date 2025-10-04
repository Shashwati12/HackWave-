import "express";
import {MulterFile} from 'multer';

declare global {
    namespace Express {
        interface Request {
            userId: number;
            file?: MulterFile; 
        }
    }
}