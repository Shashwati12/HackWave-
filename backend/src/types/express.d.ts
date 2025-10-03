import "express";
import {MulterFile} from 'multer';

declare global {
    namespace Express {
        interface Request {
            user?: { id: string };
            file?: MulterFile; 
        }
    }
}